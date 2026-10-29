<?php
/**
 * Efficacious Mailer Configuration File
 * Location: public_html/api/send-email/mail_config.php
 * 
 * You can edit this file anytime on your cPanel hosting to configure:
 * - Recipient email
 * - Sender name and email
 * - Mail delivery parameters
 */

// Prevent direct unauthorized web browser access
if (!defined('EFFICACIOUS_MAILER')) {
    http_response_code(403);
    die(json_encode(["error" => "Direct access forbidden."]));
}

return [
    // Recipient email where all form submissions will be delivered
    'recipient' => 'info@efficacious.co.in',

    // Sender Identity
    'sender_email' => 'info@efficacious.co.in',
    'sender_name' => 'Efficacious India Limited',

    // Security Secret & Encrypted Password (Protected with AES-256-GCM)
    'secret_key' => 'Efficacious@Secure2026!Key#9876',
    'encrypted_pass' => 'enc:v1:663f01195bfc68e71a9d9719:2f23ccc527e680935b8e862bedc861b2:53eb399d182ae65d1b320b8c41fc5b2e',

    // SMTP Fallback Settings
    'smtp_host' => 'smtpout.secureserver.net',
    'smtp_port' => 465,
    'smtp_timeout' => 2,

    // Internal Relay Fallback Settings
    'relay_host' => 'relay-hosting.secureserver.net',
    'relay_port' => 25,
];

