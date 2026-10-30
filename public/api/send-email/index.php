<?php
/**
 * Efficacious Mailer Endpoint for Production / Apache / cPanel / LiteSpeed Hosting
 * Handles contact form, careers application (with resume attachment), and product demo inquiries.
 */

// Define guard constant for configuration
define('EFFICACIOUS_MAILER', true);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$phpMailerAvailable = false;
if (file_exists(__DIR__ . '/PHPMailer/PHPMailer.php')) {
    require_once __DIR__ . '/PHPMailer/Exception.php';
    require_once __DIR__ . '/PHPMailer/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/SMTP.php';
    $phpMailerAvailable = true;
}

// Disable error display in production output to ensure pure JSON response
error_reporting(0);
ini_set('display_errors', '0');

// Set CORS and JSON response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(["status" => "ok"]);
    exit;
}

// Handle GET request (e.g. testing in browser)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);
    echo json_encode([
        "status" => "active",
        "service" => "Efficacious Mailer API",
        "server" => "PHP " . (defined('PHP_VERSION') ? PHP_VERSION : 'Active'),
        "message" => "Endpoint is online and ready to receive POST submissions."
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method Not Allowed. Use POST."]);
    exit;
}

// Load external mail configuration if present (checks current folder or root public_html)
$configFile = __DIR__ . '/mail_config.php';
if (!file_exists($configFile)) {
    $configFile = dirname(dirname(__DIR__)) . '/mail_config.php';
}
$config = file_exists($configFile) ? (include $configFile) : [];
if (!is_array($config)) $config = [];

// Read JSON input
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true);

if (!$body || !is_array($body)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid JSON payload."]);
    exit;
}

// Decrypt password helper (AES-256-GCM)
function decryptEmailPass($cipherText, $secret = "Efficacious@Secure2026!Key#9876") {
    if (!$cipherText || strpos($cipherText, "enc:v1:") !== 0) {
        return $cipherText;
    }
    $parts = explode(":", $cipherText);
    if (count($parts) < 5) return $cipherText;
    
    $iv = hex2bin($parts[2]);
    $authTag = hex2bin($parts[3]);
    $encrypted = hex2bin($parts[4]);
    $key = hash("sha256", $secret, true);
    
    $decrypted = openssl_decrypt($encrypted, "aes-256-gcm", $key, OPENSSL_RAW_DATA, $iv, $authTag);
    return $decrypted !== false ? $decrypted : $cipherText;
}

// Configuration values with fallbacks
$smtpUser = $config['sender_email'] ?? "info@efficacious.co.in";
$secretKey = $config['secret_key'] ?? "Efficacious@Secure2026!Key#9876";
$encryptedPass = $config['smtp_pass'] ?? ($config['password'] ?? ($config['encrypted_pass'] ?? "enc:v1:663f01195bfc68e71a9d9719:2f23ccc527e680935b8e862bedc861b2:53eb399d182ae65d1b320b8c41fc5b2e"));
$smtpPass = decryptEmailPass($encryptedPass, $secretKey);
$recipient = $config['recipient'] ?? "info@efficacious.co.in";

// Extract payload fields
$type = $body['type'] ?? 'contact';
$product = $body['product'] ?? null;
$name = $body['name'] ?? null;
$firstName = $body['firstName'] ?? null;
$lastName = $body['lastName'] ?? null;
$email = trim($body['email'] ?? '');
$mobile = trim($body['mobile'] ?? ($body['phone'] ?? ''));
$address = trim($body['address'] ?? ($body['city'] ?? ''));
$schoolName = trim($body['schoolName'] ?? '');
$restaurant = trim($body['restaurant'] ?? '');
$company = trim($body['company'] ?? '');
$outlets = trim($body['outlets'] ?? '');
$studentCount = trim($body['studentCount'] ?? '');
$time = trim($body['time'] ?? '');
$details = trim($body['details'] ?? '');
$subject = trim($body['subject'] ?? '');
$position = trim($body['position'] ?? '');
$message = trim($body['message'] ?? '');
$resumeName = trim($body['resumeName'] ?? '');
$resumeSize = trim($body['resumeSize'] ?? '');
$resumeDataUrl = $body['resumeDataUrl'] ?? '';

$fullName = trim($name ?: ($firstName && $lastName ? "$firstName $lastName" : ($firstName ?: ($lastName ?: 'Prospective Client'))));
$orgName = trim($schoolName ?: ($restaurant ?: $company));
$location = trim($address);

if (empty($fullName) || empty($email)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Name and Email are required."]);
    exit;
}

$isCareer = ($type === 'career');
$isProduct = (!empty($product) || $type === 'product_contact');

$emailSubject = "";
$emailText = "";
$emailHtml = "";

if ($isCareer) {
    $emailSubject = "{$fullName} <{$email}> - Application: " . ($position ?: 'Open Role') . ($resumeName ? " [CV Attached]" : "");
    $emailText = "New Job Application Received:\n"
        . "--------------------------------------------------\n"
        . "Candidate Name:   {$fullName}\n"
        . "Email Address:    {$email}\n"
        . "Mobile Number:    " . ($mobile ?: 'N/A') . "\n"
        . "Location / City:  " . ($location ?: 'N/A') . "\n"
        . "Applied Position: " . ($position ?: 'N/A') . "\n"
        . "Resume:           " . ($resumeName ? "{$resumeName} ({$resumeSize})" : "None") . "\n\n"
        . "Cover Letter / Notes:\n"
        . ($message ?: 'No notes provided') . "\n"
        . "--------------------------------------------------\n"
        . "To: info@efficacious.co.in\n"
        . "From: info@efficacious.co.in";

    $emailHtml = '<div style="font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
  <div style="border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;">
    <h2 style="color: #0f172a; margin: 0; font-size: 20px;">New Job Application</h2>
    <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Received at: info@efficacious.co.in</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr><td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Candidate:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">' . htmlspecialchars($fullName) . '</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0284c7;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #0284c7; text-decoration: none;">' . htmlspecialchars($email) . '</a></td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($mobile ?: 'Not provided') . '</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Location:</td><td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($location ?: 'Not specified') . '</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Position:</td><td style="padding: 8px 0; color: #d97706; font-weight: bold;">' . htmlspecialchars($position ?: 'Open Role') . '</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Resume Attached:</td><td style="padding: 8px 0; color: #0f172a;">' . ($resumeName ? '<strong>' . htmlspecialchars($resumeName) . '</strong> (' . htmlspecialchars($resumeSize) . ')' : 'No file attached') . '</td></tr>
  </table>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
  <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Cover Letter / Candidate Notes:</h4>
  <div style="background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;">' . nl2br(htmlspecialchars($message ?: 'No notes provided')) . '</div>
  <div style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
    Sent from Efficacious Careers Application Form to info@efficacious.co.in
  </div>
</div>';
} elseif ($isProduct) {
    $prodName = $product ?: 'Product';
    $emailSubject = "{$fullName} <{$email}> - [{$prodName}] " . ($orgName ? "{$orgName} - " : "") . ($subject ?: 'Demo / Inquiry');
    $emailText = "New {$prodName} Inquiry Received:\n"
        . "--------------------------------------------------\n"
        . "Product:          {$prodName}\n"
        . "Full Name:        {$fullName}\n"
        . "Email Address:    {$email}\n"
        . "Phone Number:     " . ($mobile ?: 'N/A') . "\n"
        . "Organization:     " . ($orgName ?: 'N/A') . "\n"
        . "City/Location:    " . ($location ?: 'N/A') . "\n"
        . "Scale / Details:  " . ($studentCount ? "{$studentCount} Students " : "") . ($outlets ? "{$outlets} Outlets " : "") . ($details ? "{$details} " : "") . ($time ? "(Preferred: {$time})" : "") . "\n\n"
        . "Message / Notes:\n"
        . ($message ?: 'No message provided') . "\n"
        . "--------------------------------------------------\n"
        . "To: info@efficacious.co.in\n"
        . "From: info@efficacious.co.in";

    $emailHtml = '<div style="font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
  <div style="border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;">
    <div style="display: inline-block; padding: 3px 10px; border-radius: 20px; background: #fff7ed; color: #c2410c; font-size: 12px; font-weight: bold; margin-bottom: 6px;">' . htmlspecialchars($prodName) . '</div>
    <h2 style="color: #0f172a; margin: 0; font-size: 20px;">New Product Inquiry / Demo Request</h2>
    <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Received at: info@efficacious.co.in</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr><td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Product:</td><td style="padding: 8px 0; color: #E48100; font-weight: bold;">' . htmlspecialchars($prodName) . '</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Contact Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">' . htmlspecialchars($fullName) . '</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0284c7;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #0284c7; text-decoration: none;">' . htmlspecialchars($email) . '</a></td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($mobile ?: 'Not provided') . '</td></tr>'
    . ($orgName ? '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Organization:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">' . htmlspecialchars($orgName) . '</td></tr>' : '')
    . ($location ? '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">City/Location:</td><td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($location) . '</td></tr>' : '')
    . ($studentCount ? '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Students:</td><td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($studentCount) . '</td></tr>' : '')
    . ($outlets ? '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Outlets:</td><td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($outlets) . '</td></tr>' : '')
    . ($details ? '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Details:</td><td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($details) . '</td></tr>' : '')
  . '</table>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
  <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Message / Inquiry Details:</h4>
  <div style="background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;">' . nl2br(htmlspecialchars($message ?: 'No additional message provided')) . '</div>
  <div style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
    Sent from ' . htmlspecialchars($prodName) . ' Contact Form to info@efficacious.co.in
  </div>
</div>';
} else {
    $emailSubject = "{$fullName} <{$email}> - Website Inquiry: " . ($subject ?: 'General');
    $emailText = "New Contact Inquiry Received:\n"
        . "--------------------------------------------------\n"
        . "Full Name:        {$fullName}\n"
        . "Email Address:    {$email}\n"
        . "Mobile Number:    " . ($mobile ?: 'N/A') . "\n"
        . "Location/Address: " . ($location ?: 'N/A') . "\n"
        . "Subject:          " . ($subject ?: 'General Inquiry') . "\n\n"
        . "Message:\n"
        . ($message ?: 'No message provided') . "\n"
        . "--------------------------------------------------\n"
        . "To: info@efficacious.co.in\n"
        . "From: info@efficacious.co.in";

    $emailHtml = '<div style="font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
  <div style="border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;">
    <h2 style="color: #0f172a; margin: 0; font-size: 20px;">New Website Contact Inquiry</h2>
    <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Received at: info@efficacious.co.in</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr><td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Full Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">' . htmlspecialchars($fullName) . '</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0284c7;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #0284c7; text-decoration: none;">' . htmlspecialchars($email) . '</a></td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Mobile:</td><td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($mobile ?: 'Not provided') . '</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Location:</td><td style="padding: 8px 0; color: #0f172a;">' . htmlspecialchars($location ?: 'Not specified') . '</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td><td style="padding: 8px 0; color: #d97706; font-weight: bold;">' . htmlspecialchars($subject ?: 'General Inquiry') . '</td></tr>
  </table>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
  <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Message Content:</h4>
  <div style="background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;">' . nl2br(htmlspecialchars($message ?: 'No message provided')) . '</div>
  <div style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
    Sent from Efficacious Website Contact Form to info@efficacious.co.in
  </div>
</div>';
}

// Check for base64 file attachment (Resume / CV)
$attachmentContent = null;
$attachmentFilename = null;
$attachmentType = "application/octet-stream";

if ($resumeDataUrl && $resumeName) {
    if (preg_match('/^data:([^;]+);base64,(.+)$/', $resumeDataUrl, $matches)) {
        $attachmentType = $matches[1];
        $attachmentContent = base64_decode($matches[2]);
        $attachmentFilename = $resumeName;
    }
}

// Build MIME message
$boundary = "==Multipart_Boundary_x" . md5(time()) . "x";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "From: Efficacious Website <{$smtpUser}>\r\n";
$headers .= "Reply-To: {$fullName} <{$email}>\r\n";

if ($attachmentContent) {
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    $bodyMime  = "--{$boundary}\r\n";
    $bodyMime .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
    $bodyMime .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $bodyMime .= $emailHtml . "\r\n\r\n";

    $bodyMime .= "--{$boundary}\r\n";
    $bodyMime .= "Content-Type: {$attachmentType}; name=\"" . addslashes($attachmentFilename) . "\"\r\n";
    $bodyMime .= "Content-Disposition: attachment; filename=\"" . addslashes($attachmentFilename) . "\"\r\n";
    $bodyMime .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $bodyMime .= chunk_split(base64_encode($attachmentContent)) . "\r\n\r\n";
    $bodyMime .= "--{$boundary}--\r\n";
} else {
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $bodyMime = $emailHtml;
}

// Function to send via GoDaddy SMTP over SSL / TLS / Localhost
function sendViaSmtp($host, $port, $user, $pass, $from, $to, $subject, $body, $headers = '', $timeout = 3) {
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);
    
    $prefix = ($port == 465) ? "ssl://" : "";
    $socket = @stream_socket_client("{$prefix}{$host}:{$port}", $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        if ($port == 465) {
            $socket = @fsockopen("ssl://{$host}", $port, $errno, $errstr, $timeout);
        } else {
            $socket = @fsockopen($host, $port, $errno, $errstr, $timeout);
        }
    }
    if (!$socket) {
        return false;
    }

    // Strict 3-second timeout on socket operations so reads never hang
    stream_set_timeout($socket, $timeout);

    $read = function() use ($socket) {
        $res = '';
        while ($line = fgets($socket, 512)) {
            $res .= $line;
            if (substr($line, 3, 1) === ' ') break;
            $info = stream_get_meta_data($socket);
            if (!empty($info['timed_out'])) break;
        }
        return $res;
    };

    $send = function($cmd) use ($socket) {
        fputs($socket, $cmd . "\r\n");
    };

    $greeting = $read();
    if (substr($greeting, 0, 3) !== '220') {
        fclose($socket);
        return false;
    }

    $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'efficacious.co.in'));
    $ehloResp = $read();
    if (empty($ehloResp)) {
        fclose($socket);
        return false;
    }

    // On Port 587, issue STARTTLS and upgrade the socket to TLS encryption
    if ($port == 587) {
        $send("STARTTLS");
        $tlsResp = $read();
        if (substr($tlsResp, 0, 3) !== '220') {
            fclose($socket);
            return false;
        }

        $cryptoMethod = STREAM_CRYPTO_METHOD_TLS_CLIENT;
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
            $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
        }
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
            $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
        }

        $cryptoOk = @stream_socket_enable_crypto($socket, true, $cryptoMethod);
        if (!$cryptoOk) {
            fclose($socket);
            return false;
        }

        // RFC 3207 requires re-sending EHLO after TLS handshake
        $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'efficacious.co.in'));
        $ehloResp2 = $read();
        if (empty($ehloResp2)) {
            fclose($socket);
            return false;
        }
    }

    if (!empty($user) && !empty($pass) && $port != 25) {
        $send("AUTH LOGIN");
        $authResp = $read();
        if (substr($authResp, 0, 3) === '334') {
            $send(base64_encode($user));
            $userResp = $read();
            if (substr($userResp, 0, 3) === '334') {
                $send(base64_encode($pass));
                $passResp = $read();
                if (substr($passResp, 0, 3) !== '235') {
                    fclose($socket);
                    return false;
                }
            } else {
                fclose($socket);
                return false;
            }
        }
    }

    $send("MAIL FROM: <{$from}>");
    $mailResp = $read();
    if (substr($mailResp, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }

    $send("RCPT TO: <{$to}>");
    $rcptResp = $read();
    if (substr($rcptResp, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }

    $send("DATA");
    $dataResp = $read();
    if (substr($dataResp, 0, 3) !== '354') {
        fclose($socket);
        return false;
    }

    $rawMessage  = "To: {$to}\r\n";
    $rawMessage .= "Subject: {$subject}\r\n";
    $rawMessage .= "Date: " . date('r') . "\r\n";
    if ($headers) {
        $rawMessage .= trim($headers) . "\r\n";
    }
    $rawMessage .= "\r\n" . $body . "\r\n.\r\n";

    fputs($socket, $rawMessage);
    $sendResp = $read();
    $send("QUIT");
    fclose($socket);

    return (substr($sendResp, 0, 3) === '250');
}

// Multi-layer delivery engine for GoDaddy cPanel and external servers
$sent = false;
$deliveryMethod = '';
$smtpHost = $config['smtp_host'] ?? "smtpout.secureserver.net";
$smtpPort = intval($config['smtp_port'] ?? 587);
$lastError = '';

// 1. Primary Attempt: Official PHPMailer on smtpout.secureserver.net:587 (STARTTLS)
if ($phpMailerAvailable) {
    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = $smtpHost; // smtpout.secureserver.net
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser; // info@efficacious.co.in
        $mail->Password   = $smtpPass;
        $mail->SMTPSecure = ($smtpPort == 465) ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $smtpPort; // 587
        $mail->Timeout    = 8;
        $mail->CharSet    = 'UTF-8';
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];

        $mail->setFrom($smtpUser, 'Efficacious Website');
        $mail->addAddress($recipient);
        $mail->addReplyTo($email, $fullName);

        $mail->isHTML(true);
        $mail->Subject = $emailSubject;
        $mail->Body    = $emailHtml;
        $mail->AltBody = $emailText;

        if (!empty($attachmentContent) && !empty($attachmentFilename)) {
            $mail->addStringAttachment($attachmentContent, $attachmentFilename, 'base64', $attachmentType);
        }

        $mail->send();
        $sent = true;
        $deliveryMethod = "PHPMailer {$smtpHost}:{$smtpPort}";
    } catch (\Throwable $e) {
        $lastError = isset($mail) && $mail->ErrorInfo ? $mail->ErrorInfo : $e->getMessage();
        // Fallback: PHPMailer Port 465 SSL
        if ($smtpPort !== 465) {
            try {
                $mail465 = new PHPMailer(true);
                $mail465->isSMTP();
                $mail465->Host       = $smtpHost;
                $mail465->SMTPAuth   = true;
                $mail465->Username   = $smtpUser;
                $mail465->Password   = $smtpPass;
                $mail465->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail465->Port       = 465;
                $mail465->Timeout    = 8;
                $mail465->CharSet    = 'UTF-8';
                $mail465->SMTPOptions = [
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    ]
                ];

                $mail465->setFrom($smtpUser, 'Efficacious Website');
                $mail465->addAddress($recipient);
                $mail465->addReplyTo($email, $fullName);

                $mail465->isHTML(true);
                $mail465->Subject = $emailSubject;
                $mail465->Body    = $emailHtml;
                $mail465->AltBody = $emailText;

                if (!empty($attachmentContent) && !empty($attachmentFilename)) {
                    $mail465->addStringAttachment($attachmentContent, $attachmentFilename, 'base64', $attachmentType);
                }

                $mail465->send();
                $sent = true;
                $deliveryMethod = "PHPMailer {$smtpHost}:465";
            } catch (\Throwable $e2) {
                $lastError = isset($mail465) && $mail465->ErrorInfo ? $mail465->ErrorInfo : $e2->getMessage();
            }
        }
    }
}

// 2. Secondary Attempt: Native cPanel mail() function (if external SMTP is blocked by host firewall)
if (!$sent) {
    try {
        $mailHeaders = $headers;
        $sent = @mail($recipient, $emailSubject, $bodyMime, $mailHeaders, "-f" . $smtpUser);
        if ($sent) $deliveryMethod = 'cPanel native mail()';
    } catch (\Throwable $e) {
        $sent = false;
    }
}

// 3. Third Attempt: cPanel localhost:25 Exim
if (!$sent) {
    try {
        $sent = sendViaSmtp("localhost", 25, $smtpUser, $smtpPass, $smtpUser, $recipient, $emailSubject, $bodyMime, $headers, 2);
        if ($sent) $deliveryMethod = 'cPanel localhost:25';
    } catch (\Throwable $e) {
        $sent = false;
    }
}

if ($sent) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Email delivered successfully to {$recipient}.",
        "method" => $deliveryMethod
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "error" => "Unable to deliver message right now. " . ($lastError ? "SMTP error: {$lastError}" : "Please email directly to info@efficacious.co.in.")
    ]);
}
