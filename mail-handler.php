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
 * - Safe environment-based SMTP loading (ZeptoMail / PHPMailer)
 * - Safe failure handling without credential or filesystem path disclosure
 * ==============================================================================
 */

declare(strict_types=1);

// Prevent information leakage via PHP errors
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

require_once __DIR__ . '/smtp-config.php';
require_once __DIR__ . '/vendor/phpmailer/Exception.php';
require_once __DIR__ . '/vendor/phpmailer/PHPMailer.php';
require_once __DIR__ . '/vendor/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

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
    return $cleanUrl . (strpos($cleanUrl, '?') === false ? '?' : '&') . urlencode($flag);
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

// 6. Check if ZeptoMail SMTP credentials are configured in .env
if (!jod_smtp_is_configured()) {
    // Fail safely server-side without leaking missing secrets to the browser
    error_log('[JOD Contact Form] Submission withheld: SMTP credentials (ZeptoMail) are not yet configured in .env.');
    jod_redirect(jod_with_flag($referer, 'form=error'));
}

// 7. Dispatch email via authenticated PHPMailer
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = (SMTP_ENCRYPTION === 'ssl' || SMTP_ENCRYPTION === 'smtps')
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;
    $mail->SMTPDebug = 0; // Never leak connection or credentials in production
    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 20;

    $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
    $mail->addAddress(SMTP_TO_EMAIL, SMTP_TO_NAME);
    $mail->addReplyTo($email, $name);

    $mail->Subject = $safeSubject;

    // Build HTML table rows safely with XSS protection
    $skipFields = ['_subject', '_next', '_honey', '_captcha', '_template'];
    $rows = '';
    $fieldCount = 0;

    foreach ($_POST as $key => $value) {
        if (in_array($key, $skipFields, true)) {
            continue;
        }

        $fieldCount++;
        if ($fieldCount > 30) { // Limit field count
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

    $mail->isHTML(true);
    $mail->Body = "<table style=\"border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#1a1c2c\">{$rows}</table>";
    $mail->AltBody = "New enquiry from the JOD Business Services website:\n\n"
        . strip_tags(str_replace(['<tr>', '</tr>', '</td><td'], ["\n", '', ': '], $mail->Body));

    $mail->send();
    jod_redirect($next);
} catch (Exception $e) {
    // PHPMailer specific exception
    error_log('[JOD Contact Form] Mail sending failed: ' . $mail->ErrorInfo);
    jod_redirect(jod_with_flag($referer, 'form=error'));
} catch (Throwable $t) {
    // General PHP 7/8 throwable
    error_log('[JOD Contact Form] Unexpected server error: ' . $t->getMessage());
    jod_redirect(jod_with_flag($referer, 'form=error'));
}
