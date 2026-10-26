# Contact form mail fix (Zoho Mail on GoDaddy)

This note records how the JOD Business Services contact form was made to deliver enquiries to the Zoho inbox `growth@jodbs.com` after the site was hosted on GoDaddy.

The pages, popup, and form fields were left as they were. Only the mail-sending step inside `mail-handler.php` changed.

Do not put real Client IDs, secrets, tokens, or the mailbox password in this file or in Git. Those values belong only in `.env`.

---

## 1. What problem showed up

After the site was uploaded to GoDaddy and opened as the live site:

- Submitting a contact form did not open `thank-you.html`.
- The browser stayed on the contact page.
- The address bar looked like this:

```text
https://jodbs.com/contact.html?form%3Derror
```

The same failure happened for the **Book Free Consultation** popup, because that popup posts to the same `mail-handler.php` file.

`thank-you.html` was already on the server. The form was not missing its success page. The handler refused to open it because sending the email had failed.

---

## 2. Why it failed

### 2.1 The handler only opens the thank-you page after a successful send

`mail-handler.php` accepts the form with `POST`. It checks the name, email, and message, then tries to send the enquiry. Two endings are possible:

| Result | Where the visitor goes |
|---|---|
| Zoho accepts the message | `thank-you.html` |
| Validation fails, Zoho settings are missing, or Zoho rejects the send | back to the page they came from, with `?form=error` |

So `contact.html?form=error` means the script ran and then decided the send did not succeed.

### 2.2 Why the address showed `form%3Derror`

The old code appended the error flag with `urlencode('form=error')`. That turns the equals sign into `%3D`, so the browser showed:

```text
contact.html?form%3Derror
```

instead of:

```text
contact.html?form=error
```

That encoding was a display bug. It was not the reason the email failed. The email had already failed before the redirect was built.

### 2.3 GoDaddy blocked the Zoho SMTP connection

The original sender was PHPMailer, talking to Zoho Mail’s SMTP server:

| Setting | Value in use |
|---|---|
| Host | `smtppro.zoho.in` |
| Port | `587` |
| Encryption | TLS |
| Username | `growth@jodbs.com` |
| From / To | `growth@jodbs.com` |

SMTP is a direct socket from the website server to Zoho on port 587 (or 465). GoDaddy shared hosting blocks those outbound SMTP ports. PHP can open normal website connections on port 443, and it cannot open a mail connection to Zoho.

The project `error_log` recorded the failure:

```text
SMTP Error: Could not connect to SMTP host.
Failed to connect to server
SMTP code: 101
Additional SMTP info: Network is unreachable
```

`101` / `Network is unreachable` means the server never reached Zoho’s mail port. It is not a wrong password and not a missing `thank-you.html`.

Changing the SMTP host, port, or mailbox password cannot fix that. Port 465 is blocked the same way. ZeptoMail’s SMTP host (`smtp.zeptomail.in`) would also be blocked, because it is still SMTP.

### 2.4 What the mailbox password was doing

`.env` stored the Zoho mailbox password as `SMTP_PASSWORD`. PHPMailer sent that password to `smtppro.zoho.in`. The connection died before Zoho could check the password. The live form no longer uses `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, or `SMTP_PASSWORD`.

---

## 3. The logic used to fix it

GoDaddy allows outbound **HTTPS on port 443**. Zoho Mail has a send API on that port:

```text
POST https://mail.zoho.in/api/accounts/{accountId}/messages
```

The website never opens port 587. On each submission it does this:

1. Read the long-lived refresh token from `.env`.
2. Exchange it at `https://accounts.zoho.in/oauth/v2/token` for an access token. An access token lasts about one hour, so the site requests a new one for every send and does not store it.
3. Send the enquiry as HTML to the Zoho Mail API, from `growth@jodbs.com` to `growth@jodbs.com`.
4. Open `thank-you.html` only when Zoho returns success.

The India data center is required because this mailbox is on Zoho India (`smtppro.zoho.in`). These hosts must all stay on `.in`:

| Purpose | Host |
|---|---|
| Create the API client | `https://api-console.zoho.in` |
| Turn the refresh token into an access token | `https://accounts.zoho.in` |
| Send the email | `https://mail.zoho.in` |

A `.com` host is a different Zoho data center and will reject these credentials.

The form fields, popup markup, page layout, and `mail-handler.php` checks (POST only, same-site check, honeypot, field validation) stayed in place. The visitor’s email is included in the message body so the team can reply. The Zoho send API used here does not take a separate Reply-To field.

---

## 4. How it was fixed

1. Confirmed the live URL was the handler’s failure redirect, not a missing thank-you page.
2. Read `error_log` and matched it to “cannot connect to SMTP” rather than a bad form field.
3. Left Zoho Mail as the inbox and stopped using SMTP from GoDaddy.
4. Created a Zoho **Self Client** and collected four API values: Client ID, Client Secret, refresh token, and account ID.
5. Stored those values in `.env`, next to the existing From and To addresses.
6. Updated `mail-handler.php` so it sends with the Zoho HTTPS API.
7. Corrected the error redirect so a failed send uses `?form=error` instead of `?form%3Derror`.
8. Checked from this machine that Zoho accepts the refresh token and that the account ID returns success. No secrets were printed during that check.
9. Upload `mail-handler.php` and `.env` to GoDaddy `public_html` so the live site uses the new sender.

---

## 5. Get the Zoho credentials from scratch

Sign in to Zoho Mail as `growth@jodbs.com` before these steps. Use the India console, not the US one.

### Step 1. Create a Self Client

1. Open [https://api-console.zoho.in](https://api-console.zoho.in).
2. Choose **Self Client**, then create it.
3. Open the **Client Secret** tab.
4. Copy the **Client ID** and **Client Secret**.

A Self Client is for this website’s own server. Visitors never log in to Zoho.

### Step 2. Generate a short-lived code

1. Stay on that Self Client and open **Generate Code**.
2. Enter this scope exactly:

```text
ZohoMail.messages.CREATE,ZohoMail.accounts.READ
```

`ZohoMail.messages.CREATE` allows the site to send mail. `ZohoMail.accounts.READ` allows the next command to read the account ID.

3. Choose the longest expiry, add a short description, and generate the code.
4. Copy the code immediately. It expires in a few minutes.

### Step 3. Exchange that code for a refresh token

Open PowerShell and run this. On Windows, `curl.exe` is required so PowerShell does not replace `curl` with its own web command.

Replace the three placeholders with the values from Steps 1 and 2. Do not commit the command after the real values are filled in.

```powershell
curl.exe -X POST "https://accounts.zoho.in/oauth/v2/token" -d "grant_type=authorization_code" -d "client_id=YOUR_CLIENT_ID" -d "client_secret=YOUR_CLIENT_SECRET" -d "code=THE_CODE_FROM_STEP_2"
```

The JSON response contains:

| Field | What to do with it |
|---|---|
| `refresh_token` | Save this. It does not expire. This is what `.env` stores. |
| `access_token` | Use it once in Step 4. It expires in about one hour. Do not put it in `.env`. |
| `api_domain` | Ignore it for mail. Mail calls still go to `mail.zoho.in`. |

If this command returns `invalid_code`, the code from Step 2 has expired. Generate a new code and run the command again right away.

### Step 4. Read the account ID

Use the `access_token` from Step 3:

```powershell
curl.exe "https://mail.zoho.in/api/accounts" -H "Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN"
```

In the JSON, copy the numeric `accountId` for `growth@jodbs.com`. It is a long number. That number is `ZOHO_ACCOUNT_ID`.

There is a space after `Zoho-oauthtoken`. The header is:

```text
Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN
```

Zoho Mail does not use the word `Bearer` in this header.

### Values you should have before editing the site

| Name | Where it came from |
|---|---|
| Client ID | API console, Client Secret tab |
| Client Secret | API console, Client Secret tab |
| Refresh token | Step 3 response, `refresh_token` |
| Account ID | Step 4 response, `accountId` |

The mailbox password is not one of these values.

---

## 6. Connect those credentials to the website

### Step 1. Put them in `.env`

`.env` sits in the project root, next to `mail-handler.php`. `smtp-config.php` reads it. `.htaccess` blocks visitors from opening `.env` in a browser. `.gitignore` also ignores `.env`, so a Git upload will not include it. A manual zip of the folder will include it, which is what the live site needs.

Add the four Zoho values and keep the From and To addresses:

```env
SMTP_FROM_EMAIL=growth@jodbs.com
SMTP_FROM_NAME="JOD Business Services"
SMTP_TO_EMAIL=growth@jodbs.com
SMTP_TO_NAME="JOD Business Services"
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_ACCOUNT_ID=
```

Leave the old `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, and `SMTP_PASSWORD` lines in the file if they are already there. The form does not read them anymore.

`ZOHO_ACCOUNT_ID` must be digits only. `SMTP_FROM_EMAIL` must be the same Zoho mailbox that owns the API client.

### Step 2. What `mail-handler.php` does with them

`smtp-config.php` loads `.env` into `jod_env()`. `mail-handler.php` then:

1. Requires `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, `ZOHO_ACCOUNT_ID`, `SMTP_FROM_EMAIL`, and `SMTP_TO_EMAIL` to be non-empty.
2. Refreshes an access token:

```text
POST https://accounts.zoho.in/oauth/v2/token
grant_type=refresh_token
```

3. Sends the form contents:

```text
POST https://mail.zoho.in/api/accounts/{ZOHO_ACCOUNT_ID}/messages
Authorization: Zoho-oauthtoken {access_token}
```

The JSON body uses `fromAddress`, `toAddress`, `subject`, `content`, `mailFormat` (`html`), and `encoding` (`UTF-8`).

Requests are limited to `accounts.zoho.in` and `mail.zoho.in`. Certificate checks stay on. Tokens and the API response body are not shown to the visitor. A failure is written to `error_log` as a short reason such as `invalid_client` or Zoho’s status description.

### Step 3. Upload both files to GoDaddy

The live site changes only after these files are in `public_html`:

- `mail-handler.php`
- `.env`

In cPanel File Manager, enable **Show Hidden Files** so `.env` is visible. Replace the existing copies. Do not upload `.git`, `test.php`, `error_log`, or the old zip archives.

### Step 4. Confirm it on the live site

1. Open the live contact page or click **Book Free Consultation**.
2. Submit a real test with your own name, email, and message.
3. The browser should open `thank-you.html`.
4. The Zoho inbox `growth@jodbs.com` should receive the enquiry.
5. If the browser returns to `?form=error`, open `public_html/error_log` and read the latest line that starts with `[JOD Contact Form]`.

| Log line | Meaning |
|---|---|
| `Zoho Mail API settings are incomplete` | `.env` is missing, hidden, or one of the six required values is empty |
| `Zoho token request failed` | Client ID, Client Secret, or refresh token was rejected. Generate a new code and exchange it again |
| `Zoho send failed` | The token worked and the send call did not. Check that the account ID and From address belong to the same mailbox |
| `Zoho HTTPS connection failed` | The server could not open port 443 to Zoho |

---

## 7. Files involved

| File | Role |
|---|---|
| `mail-handler.php` | Receives every contact form and the consultation popup, then sends through Zoho HTTPS |
| `smtp-config.php` | Loads `.env`. No Zoho passwords are written in this file |
| `.env` | Holds the Client ID, Client Secret, refresh token, account ID, and From/To addresses. Never commit it |
| `.htaccess` | Stops browsers from downloading `.env` |
| `error_log` | Records send failures without printing the tokens |
| Contact HTML pages and `script.js` | Unchanged. They still post to `mail-handler.php` |
