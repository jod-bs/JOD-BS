<?php
/**
 * ==============================================================================
 * JOD Business Services — Site-Wide Contact Form Handler (Hardenend)
 * ==============================================================================
 * Handles submissions from #contactForm on all service/contact pages and the
 * site-wide #consultModalForm.
 *
 * Security features:
 * - Production error hiding (display_errors = 0, log_errors = 1)
 * - Strict POST method enforcement
 * - Same-Origin & Referer cross-site request validation
 * - Open Redirect prevention on _next and HTTP_REFERER with whitelist validation
 * - CRLF / Header injection prevention on all redirects and email headers
 * - Honeypot spam bot trapping (_honey)
 * - Strict server-side input validation and bounded length constraints
 * - Strict HTML entity escaping for email body (XSS / HTML injection defense)
 * - Zoho Mail send over HTTPS (port 443), so GoDaddy can deliver mail
 * - Safe failure handling without credential or filesystem path disclosure
 * ==============================================================================
 */

declare(strict_types=1);

// Prevent information leakage via PHP errors
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

require_once __DIR__ . '/smtp-config.php';

/**
 * Send an HTTP redirect and terminate execution.
 * Strips carriage returns and newlines to prevent HTTP response splitting / header injection.
 */
function jod_redirect(string $url): void
{
    $cleanUrl = str_replace(["\r", "\n"], '', $url);
    header('Location: ' . $cleanUrl, true, 303);
    exit;
}

/**
 * Append a query flag to a URL safely without clobbering existing parameters.
 */
function jod_with_flag(string $url, string $flag): string
{
    $cleanUrl = str_replace(["\r", "\n"], '', $url);
    $separator = strpos($cleanUrl, '?') === false ? '?' : '&';

    // Keep a simple key=value flag readable. urlencode() would turn "=" into "%3D".
    if (preg_match('/^[A-Za-z0-9_]+=[A-Za-z0-9_]+$/', $flag)) {
        return $cleanUrl . $separator . $flag;
    }

    return $cleanUrl . $separator . rawurlencode($flag);
}

/**
 * Whitelist and sanitize redirect targets to prevent Open Redirect vulnerabilities.
 * Only allows known internal relative pages or exact same-origin URLs.
 */
function jod_sanitize_redirect(string $target, string $default = 'thank-you.html'): string
{
    $target = trim($target);
    if ($target === '') {
        return $default;
    }

    // Disallow protocol-relative URLs (//evil.com) and URI schemes like javascript: or data:
    if (strpos($target, '//') === 0 || stripos($target, 'javascript:') === 0 || stripos($target, 'data:') === 0) {
        return $default;
    }

    $parsed = parse_url($target);
    if ($parsed === false) {
        return $default;
    }

    // If an external host is present, verify it matches our current domain
    if (isset($parsed['host'])) {
        $serverHost = strtolower($_SERVER['HTTP_HOST'] ?? '');
        $serverHost = preg_replace('/:\d+$/', '', $serverHost); // strip port if present
        $targetHost = strtolower($parsed['host']);

        $allowedHosts = array_filter([$serverHost, 'jodbs.com', 'www.jodbs.com', 'localhost']);
        if (!in_array($targetHost, $allowedHosts, true)) {
            return $default;
        }
        $path = $parsed['path'] ?? '/';
    } else {
        $path = $parsed['path'] ?? $target;
    }

    // Strip leading slashes and traversal attempts
    $path = ltrim($path, '/');
    $path = str_replace(['../', '..\\'], '', $path);

    // Whitelist of valid internal destinations on jodbs.com
    $allowedPages = [
        'thank-you.html',
        'index.html',
        'contact.html',
        'about.html',
        'branding-company-in-chennai.html',
        'content-marketing-agency-in-chennai.html',
        'personal-branding-agency-in-chennai.html',
        'ppc-agency-in-chennai.html',
        'seo-company-in-chennai.html',
        'social-media-marketing-agency-in-chennai.html',
        'video-production-company-in-chennai.html',
        'web-design-company-in-chennai.html',
        'web-development-company-in-chennai.html',
        'privacy-policy.html',
        'terms-conditions.html',
    ];

    if (in_array($path, $allowedPages, true)) {
        return $path;
    }

    return $default;
}

/**
 * Validate that the request originates from the same site.
 */
function jod_is_same_origin(): bool
{
    $serverHost = strtolower($_SERVER['HTTP_HOST'] ?? '');
    $serverHost = preg_replace('/:\d+$/', '', $serverHost);

    // Check Origin header if supplied by browser
    if (!empty($_SERVER['HTTP_ORIGIN'])) {
        $parsedOrigin = parse_url((string)$_SERVER['HTTP_ORIGIN']);
        if ($parsedOrigin && isset($parsedOrigin['host'])) {
            $originHost = strtolower($parsedOrigin['host']);
            $allowedHosts = array_filter([$serverHost, 'jodbs.com', 'www.jodbs.com', 'localhost']);
            return in_array($originHost, $allowedHosts, true);
        }
    }

    // Check Referer header if Origin was absent
    if (!empty($_SERVER['HTTP_REFERER'])) {
        $parsedReferer = parse_url((string)$_SERVER['HTTP_REFERER']);
        if ($parsedReferer && isset($parsedReferer['host'])) {
            $refererHost = strtolower($parsedReferer['host']);
            $allowedHosts = array_filter([$serverHost, 'jodbs.com', 'www.jodbs.com', 'localhost']);
            return in_array($refererHost, $allowedHosts, true);
        }
    }

    // If both headers are absent (e.g. strict client privacy), allow form processing
    return true;
}

/**
 * Zoho Mail API credentials and the From/To addresses must all be present.
 */
function jod_zoho_is_configured(): bool
{
    foreach (['ZOHO_CLIENT_ID', 'ZOHO_CLIENT_SECRET', 'ZOHO_REFRESH_TOKEN', 'ZOHO_ACCOUNT_ID', 'SMTP_FROM_EMAIL', 'SMTP_TO_EMAIL'] as $key) {
        $value = trim((string)jod_env($key, ''));
        if ($value === '' || stripos($value, 'replace') !== false) {
            return false;
        }
    }

    return preg_match('/^\d{1,30}$/', trim((string)jod_env('ZOHO_ACCOUNT_ID', ''))) === 1;
}

/**
 * POST to Zoho over HTTPS only. The caller chooses the URL from a fixed host list.
 *
 * @param array<int, string> $headers
 * @return array{ok: bool, status: int, body: string}
 */
function jod_https_post(string $url, array $headers, string $body, int $timeout = 20): array
{
    $parts = parse_url($url);
    $host = strtolower((string)($parts['host'] ?? ''));
    $allowedHosts = ['accounts.zoho.in', 'mail.zoho.in'];
    if (($parts['scheme'] ?? '') !== 'https' || !in_array($host, $allowedHosts, true)) {
        error_log('[JOD Contact Form] Blocked an unexpected mail request host.');
        return ['ok' => false, 'status' => 0, 'body' => ''];
    }

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        if ($ch === false) {
            error_log('[JOD Contact Form] Could not start the HTTPS client.');
            return ['ok' => false, 'status' => 0, 'body' => ''];
        }

        $options = [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => false,
            CURLOPT_TIMEOUT => $timeout,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_USERAGENT => 'JOD-Contact-Form',
        ];
        if (defined('CURLPROTO_HTTPS')) {
            $options[CURLOPT_PROTOCOLS] = CURLPROTO_HTTPS;
            $options[CURLOPT_REDIR_PROTOCOLS] = CURLPROTO_HTTPS;
        }
        curl_setopt_array($ch, $options);

        $response = curl_exec($ch);
        $status = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            error_log('[JOD Contact Form] Zoho HTTPS connection failed.');
            if ($curlError !== '') {
                error_log('[JOD Contact Form] HTTPS client: connection error.');
            }
            return ['ok' => false, 'status' => $status, 'body' => ''];
        }

        return ['ok' => true, 'status' => $status, 'body' => (string)$response];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => implode("\r\n", $headers),
            'content' => $body,
            'timeout' => $timeout,
            'ignore_errors' => true,
            'follow_location' => 0,
        ],
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
        ],
    ]);

    $response = @file_get_contents($url, false, $context);
    $status = 0;
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', (string)$http_response_header[0], $match)) {
        $status = (int)$match[1];
    }
    if ($response === false) {
        error_log('[JOD Contact Form] Zoho HTTPS connection failed.');
        return ['ok' => false, 'status' => $status, 'body' => ''];
    }

    return ['ok' => true, 'status' => $status, 'body' => (string)$response];
}

/**
 * Exchange the long-lived refresh token for a one-hour access token.
 */
function jod_zoho_access_token(): ?string
{
    $payload = http_build_query([
        'grant_type' => 'refresh_token',
        'client_id' => trim((string)jod_env('ZOHO_CLIENT_ID', '')),
        'client_secret' => trim((string)jod_env('ZOHO_CLIENT_SECRET', '')),
        'refresh_token' => trim((string)jod_env('ZOHO_REFRESH_TOKEN', '')),
    ], '', '&', PHP_QUERY_RFC3986);

    $result = jod_https_post(
        'https://accounts.zoho.in/oauth/v2/token',
        [
            'Accept: application/json',
            'Content-Type: application/x-www-form-urlencoded',
        ],
        $payload
    );

    $data = json_decode($result['body'], true);
    if (
        !$result['ok']
        || $result['status'] < 200
        || $result['status'] >= 300
        || !is_array($data)
        || !isset($data['access_token'])
        || !is_string($data['access_token'])
        || $data['access_token'] === ''
    ) {
        $reason = 'HTTP ' . $result['status'];
        if (is_array($data) && isset($data['error']) && is_string($data['error'])) {
            $reason = preg_replace('/[\r\n]/', ' ', $data['error']) ?? $reason;
        }
        error_log('[JOD Contact Form] Zoho token request failed: ' . $reason);
        return null;
    }

    if (preg_match('/[\r\n\x00]/', $data['access_token'])) {
        error_log('[JOD Contact Form] Zoho token request returned an unusable token.');
        return null;
    }

    return $data['access_token'];
}

/**
 * Send one enquiry through the Zoho Mail HTTPS API.
 */
function jod_zoho_send(string $accessToken, string $subject, string $html): bool
{
    $accountId = trim((string)jod_env('ZOHO_ACCOUNT_ID', ''));
    $from = trim((string)jod_env('SMTP_FROM_EMAIL', ''));
    $to = trim((string)jod_env('SMTP_TO_EMAIL', ''));

    if (
        preg_match('/^\d{1,30}$/', $accountId) !== 1
        || !filter_var($from, FILTER_VALIDATE_EMAIL)
        || !filter_var($to, FILTER_VALIDATE_EMAIL)
        || strpbrk($from . $to, "\r\n") !== false
    ) {
        error_log('[JOD Contact Form] Zoho sender settings are invalid.');
        return false;
    }

    $payload = json_encode([
        'fromAddress' => $from,
        'toAddress' => $to,
        'subject' => $subject,
        'content' => $html,
        'mailFormat' => 'html',
        'encoding' => 'UTF-8',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    if ($payload === false) {
        error_log('[JOD Contact Form] Could not prepare the enquiry email.');
        return false;
    }

    $result = jod_https_post(
        'https://mail.zoho.in/api/accounts/' . $accountId . '/messages',
        [
            'Accept: application/json',
            'Content-Type: application/json',
            'Authorization: Zoho-oauthtoken ' . $accessToken,
        ],
        $payload
    );

    $data = json_decode($result['body'], true);
    $apiCode = null;
    if (is_array($data) && isset($data['status']['code'])) {
        $apiCode = (int)$data['status']['code'];
    }

    $hasError = is_array($data) && (
        isset($data['error'])
        || (isset($data['data']['errorCode']) && $data['data']['errorCode'] !== '')
    );

    if ($result['ok'] && $result['status'] >= 200 && $result['status'] < 300 && $apiCode === 200 && !$hasError) {
        return true;
    }

    $reason = 'HTTP ' . $result['status'];
    if (is_array($data)) {
        $description = $data['status']['description'] ?? $data['data']['errorCode'] ?? null;
        if (is_string($description) && $description !== '') {
            $reason = preg_replace('/[\r\n]/', ' ', $description) ?? $reason;
            $reason = substr($reason, 0, 180);
        }
    }
    error_log('[JOD Contact Form] Zoho send failed: ' . $reason);
    return false;
}

// 1. Enforce POST requests only
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jod_redirect('index.html');
}

// 2. Validate request origin
if (!jod_is_same_origin()) {
    error_log('[JOD Contact Form] Rejected potential cross-origin submission from Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? 'unknown'));
    jod_redirect('index.html');
}

// 3. Resolve safe redirect destinations
$next = jod_sanitize_redirect((string)($_POST['_next'] ?? 'thank-you.html'), 'thank-you.html');
$referer = jod_sanitize_redirect((string)($_SERVER['HTTP_REFERER'] ?? 'contact.html'), 'contact.html');

// 4. Honeypot check: Bots filling _honey silently redirect to success without sending mail
if (!empty($_POST['_honey'])) {
    jod_redirect($next);
}

// 5. Server-side validation of required and core fields
$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

// Validate required fields
if ($name === '' || $message === '' || $email === '') {
    jod_redirect(jod_with_flag($referer, 'form=error'));
}

// Validate lengths to prevent resource exhaustion / DoS
if (mb_strlen($name, 'UTF-8') > 150 || mb_strlen($message, 'UTF-8') > 5000 || mb_strlen($email, 'UTF-8') > 254) {
    jod_redirect(jod_with_flag($referer, 'form=error'));
}

// Validate email format and check for header injection characters
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strpbrk($email, "\r\n") !== false) {
    jod_redirect(jod_with_flag($referer, 'form=error'));
}

// Clean and sanitize subject
$rawSubject = trim((string)($_POST['_subject'] ?? 'New Enquiry — JOD Website'));
$safeSubject = str_replace(["\r", "\n"], ' ', $rawSubject);
if (mb_strlen($safeSubject, 'UTF-8') > 200) {
    $safeSubject = mb_substr($safeSubject, 0, 200, 'UTF-8');
}

// 6. Check Zoho Mail API credentials in .env
if (!jod_zoho_is_configured()) {
    error_log('[JOD Contact Form] Submission withheld: Zoho Mail API settings are incomplete in .env.');
    jod_redirect(jod_with_flag($referer, 'form=error'));
}

// 7. Build the same enquiry table the SMTP mailer used to send
$skipFields = ['_subject', '_next', '_honey', '_captcha', '_template'];
$rows = '';
$fieldCount = 0;

foreach ($_POST as $key => $value) {
    if (in_array($key, $skipFields, true)) {
        continue;
    }

    $fieldCount++;
    if ($fieldCount > 30) {
        break;
    }

    if (is_array($value)) {
        $value = implode(', ', array_map('strval', $value));
    }

    $cleanKey = preg_replace('/[^\w\s\-]/u', '', (string)$key);
    $label = ucwords(str_replace(['_', '-'], ' ', $cleanKey));
    $safeLabel = htmlspecialchars($label, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    $valStr = trim((string)$value);
    if (mb_strlen($valStr, 'UTF-8') > 5000) {
        $valStr = mb_substr($valStr, 0, 5000, 'UTF-8');
    }
    $safeValue = nl2br(htmlspecialchars($valStr, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

    $rows .= "<tr>"
        . "<td style=\"padding:9px 14px;font-weight:600;border:1px solid #e7e9f6;background:#f6f7fc;white-space:nowrap\">{$safeLabel}</td>"
        . "<td style=\"padding:9px 14px;border:1px solid #e7e9f6\">{$safeValue}</td>"
        . "</tr>";
}

$htmlBody = "<table style=\"border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#1a1c2c\">{$rows}</table>";

try {
    $accessToken = jod_zoho_access_token();
    if ($accessToken === null || !jod_zoho_send($accessToken, $safeSubject, $htmlBody)) {
        jod_redirect(jod_with_flag($referer, 'form=error'));
    }
    jod_redirect($next);
} catch (Throwable $t) {
    error_log('[JOD Contact Form] Unexpected server error.');
    jod_redirect(jod_with_flag($referer, 'form=error'));
}
