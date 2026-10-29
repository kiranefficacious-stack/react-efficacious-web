using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Efficacious.Mailer.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Efficacious.Mailer.Services;

public class EmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    private const string DefaultMasterSecret = "Efficacious@Secure2026!Key#9876";
    private const string DefaultFallbackEncryptedPass = "enc:v1:663f01195bfc68e71a9d9719:2f23ccc527e680935b8e862bedc861b2:53eb399d182ae65d1b320b8c41fc5b2e";
    private const string DefaultSmtpUser = "info@efficacious.co.in";
    private const string DefaultRecipient = "info@efficacious.co.in";
    private const string DefaultSmtpHost = "smtpout.secureserver.net";

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public static string DecryptPassword(string cipherText, string secret)
    {
        if (string.IsNullOrWhiteSpace(cipherText) || !cipherText.StartsWith("enc:v1:"))
            return cipherText;

        try
        {
            var parts = cipherText.Split(':');
            if (parts.Length < 5) return cipherText;

            byte[] iv = Convert.FromHexString(parts[2]);
            byte[] authTag = Convert.FromHexString(parts[3]);
            byte[] encrypted = Convert.FromHexString(parts[4]);

            byte[] key = SHA256.HashData(Encoding.UTF8.GetBytes(secret));
            byte[] decrypted = new byte[encrypted.Length];

            using var aesGcm = new AesGcm(key, authTag.Length);
            aesGcm.Decrypt(iv, encrypted, authTag, decrypted);

            return Encoding.UTF8.GetString(decrypted);
        }
        catch
        {
            return cipherText;
        }
    }

    public async Task<EmailResponse> SendEmailAsync(EmailRequest request)
    {
        var fullName = (request.Name 
            ?? (!string.IsNullOrWhiteSpace(request.FirstName) && !string.IsNullOrWhiteSpace(request.LastName) 
                ? $"{request.FirstName} {request.LastName}" 
                : request.FirstName ?? request.LastName) 
            ?? "Prospective Client").Trim();

        var email = (request.Email ?? string.Empty).Trim();
        var contactPhone = (request.Mobile ?? request.Phone ?? string.Empty).Trim();
        var orgName = (request.SchoolName ?? request.Restaurant ?? request.Company ?? string.Empty).Trim();
        var location = (request.City ?? request.Address ?? string.Empty).Trim();

        if (string.IsNullOrWhiteSpace(fullName) || string.IsNullOrWhiteSpace(email))
        {
            return new EmailResponse
            {
                Success = false,
                Error = "Name and Email are required."
            };
        }

        var isCareer = string.Equals(request.Type, "career", StringComparison.OrdinalIgnoreCase);
        var isProduct = !string.IsNullOrWhiteSpace(request.Product) 
            || string.Equals(request.Type, "product_contact", StringComparison.OrdinalIgnoreCase);

        string emailSubject;
        string emailText;
        string emailHtml;

        if (isCareer)
        {
            var pos = string.IsNullOrWhiteSpace(request.Position) ? "Open Role" : request.Position;
            var cvTag = !string.IsNullOrWhiteSpace(request.ResumeName) ? " [CV Attached]" : string.Empty;
            emailSubject = $"{fullName} <{email}> - Application: {pos}{cvTag}";

            emailText = $"New Job Application Received:\n" +
                        $"--------------------------------------------------\n" +
                        $"Candidate Name:   {fullName}\n" +
                        $"Email Address:    {email}\n" +
                        $"Mobile Number:    {(string.IsNullOrWhiteSpace(contactPhone) ? "N/A" : contactPhone)}\n" +
                        $"Location / City:  {(string.IsNullOrWhiteSpace(location) ? "N/A" : location)}\n" +
                        $"Applied Position: {pos}\n" +
                        $"Resume:           {(!string.IsNullOrWhiteSpace(request.ResumeName) ? request.ResumeName : "None")}\n\n" +
                        $"Cover Letter / Notes:\n{(string.IsNullOrWhiteSpace(request.Message) ? "No notes provided" : request.Message)}\n" +
                        $"--------------------------------------------------\n" +
                        $"To: info@efficacious.co.in\nFrom: info@efficacious.co.in";

            emailHtml = $@"<div style=""font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;"">
  <div style=""border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;"">
    <h2 style=""color: #0f172a; margin: 0; font-size: 20px;"">New Job Application</h2>
    <p style=""color: #64748b; font-size: 13px; margin: 4px 0 0 0;"">Received at: info@efficacious.co.in</p>
  </div>
  <table style=""width: 100%; border-collapse: collapse; font-size: 14px;"">
    <tr><td style=""padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;"">Candidate:</td><td style=""padding: 8px 0; color: #0f172a; font-weight: bold;"">{fullName}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Email:</td><td style=""padding: 8px 0; color: #0284c7;""><a href=""mailto:{email}"" style=""color: #0284c7; text-decoration: none;"">{email}</a></td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Phone:</td><td style=""padding: 8px 0; color: #0f172a;"">{(string.IsNullOrWhiteSpace(contactPhone) ? "Not provided" : contactPhone)}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Location:</td><td style=""padding: 8px 0; color: #0f172a;"">{(string.IsNullOrWhiteSpace(location) ? "Not specified" : location)}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Position:</td><td style=""padding: 8px 0; color: #d97706; font-weight: bold;"">{pos}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Resume:</td><td style=""padding: 8px 0; color: #0f172a;"">{(!string.IsNullOrWhiteSpace(request.ResumeName) ? $"<strong>{request.ResumeName}</strong> ({request.ResumeSize ?? ""})" : "No file attached")}</td></tr>
  </table>
  <hr style=""border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;"" />
  <h4 style=""margin: 0 0 8px 0; color: #0f172a; font-size: 14px;"">Cover Letter / Notes:</h4>
  <div style=""background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;"">{(string.IsNullOrWhiteSpace(request.Message) ? "No notes provided" : request.Message)}</div>
  <div style=""margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;"">
    Sent from Efficacious Careers Application Form to info@efficacious.co.in via .NET API
  </div>
</div>";
        }
        else if (isProduct)
        {
            var prodName = !string.IsNullOrWhiteSpace(request.Product) ? request.Product : "Product";
            var subj = !string.IsNullOrWhiteSpace(request.Subject) ? request.Subject : "Demo / Inquiry";
            var orgPrefix = !string.IsNullOrWhiteSpace(orgName) ? $"{orgName} - " : string.Empty;
            emailSubject = $"{fullName} <{email}> - [{prodName}] {orgPrefix}{subj}";

            emailText = $"New {prodName} Inquiry Received:\n" +
                        $"--------------------------------------------------\n" +
                        $"Product:          {prodName}\n" +
                        $"Full Name:        {fullName}\n" +
                        $"Email Address:    {email}\n" +
                        $"Phone Number:     {(string.IsNullOrWhiteSpace(contactPhone) ? "N/A" : contactPhone)}\n" +
                        $"Organization:     {(string.IsNullOrWhiteSpace(orgName) ? "N/A" : orgName)}\n" +
                        $"City/Location:    {(string.IsNullOrWhiteSpace(location) ? "N/A" : location)}\n" +
                        $"Message / Notes:\n{(string.IsNullOrWhiteSpace(request.Message) ? "No message provided" : request.Message)}\n" +
                        $"--------------------------------------------------\n" +
                        $"To: info@efficacious.co.in\nFrom: info@efficacious.co.in";

            emailHtml = $@"<div style=""font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;"">
  <div style=""border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;"">
    <div style=""display: inline-block; padding: 3px 10px; border-radius: 20px; background: #fff7ed; color: #c2410c; font-size: 12px; font-weight: bold; margin-bottom: 6px;"">{prodName}</div>
    <h2 style=""color: #0f172a; margin: 0; font-size: 20px;"">New Product Inquiry / Demo Request</h2>
    <p style=""color: #64748b; font-size: 13px; margin: 4px 0 0 0;"">Received at: info@efficacious.co.in</p>
  </div>
  <table style=""width: 100%; border-collapse: collapse; font-size: 14px;"">
    <tr><td style=""padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;"">Contact Person:</td><td style=""padding: 8px 0; color: #0f172a; font-weight: bold;"">{fullName}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Email:</td><td style=""padding: 8px 0; color: #0284c7;""><a href=""mailto:{email}"" style=""color: #0284c7; text-decoration: none;"">{email}</a></td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Phone:</td><td style=""padding: 8px 0; color: #0f172a;"">{(string.IsNullOrWhiteSpace(contactPhone) ? "Not provided" : contactPhone)}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Organization:</td><td style=""padding: 8px 0; color: #0f172a;"">{(string.IsNullOrWhiteSpace(orgName) ? "Not specified" : orgName)}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Location:</td><td style=""padding: 8px 0; color: #0f172a;"">{(string.IsNullOrWhiteSpace(location) ? "Not specified" : location)}</td></tr>
  </table>
  <hr style=""border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;"" />
  <h4 style=""margin: 0 0 8px 0; color: #0f172a; font-size: 14px;"">Notes / Requirements:</h4>
  <div style=""background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;"">{(string.IsNullOrWhiteSpace(request.Message) ? "No message provided" : request.Message)}</div>
  <div style=""margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;"">
    Sent from Efficacious Website Product Demo Request to info@efficacious.co.in via .NET API
  </div>
</div>";
        }
        else
        {
            var subj = !string.IsNullOrWhiteSpace(request.Subject) ? request.Subject : "General Inquiry";
            emailSubject = $"{fullName} <{email}> - Website Contact: {subj}";

            emailText = $"New Website Contact Form Submission:\n" +
                        $"--------------------------------------------------\n" +
                        $"Name:          {fullName}\n" +
                        $"Email Address: {email}\n" +
                        $"Mobile Number: {(string.IsNullOrWhiteSpace(contactPhone) ? "N/A" : contactPhone)}\n" +
                        $"Location/City: {(string.IsNullOrWhiteSpace(location) ? "N/A" : location)}\n" +
                        $"Subject:       {subj}\n\n" +
                        $"Message:\n{(string.IsNullOrWhiteSpace(request.Message) ? "No message provided" : request.Message)}\n" +
                        $"--------------------------------------------------\n" +
                        $"To: info@efficacious.co.in\nFrom: info@efficacious.co.in";

            emailHtml = $@"<div style=""font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;"">
  <div style=""border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;"">
    <h2 style=""color: #0f172a; margin: 0; font-size: 20px;"">New Website Contact Message</h2>
    <p style=""color: #64748b; font-size: 13px; margin: 4px 0 0 0;"">Received at: info@efficacious.co.in</p>
  </div>
  <table style=""width: 100%; border-collapse: collapse; font-size: 14px;"">
    <tr><td style=""padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;"">Name:</td><td style=""padding: 8px 0; color: #0f172a; font-weight: bold;"">{fullName}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Email:</td><td style=""padding: 8px 0; color: #0284c7;""><a href=""mailto:{email}"" style=""color: #0284c7; text-decoration: none;"">{email}</a></td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Phone:</td><td style=""padding: 8px 0; color: #0f172a;"">{(string.IsNullOrWhiteSpace(contactPhone) ? "Not provided" : contactPhone)}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Location:</td><td style=""padding: 8px 0; color: #0f172a;"">{(string.IsNullOrWhiteSpace(location) ? "Not specified" : location)}</td></tr>
    <tr><td style=""padding: 8px 0; color: #64748b; font-weight: 600;"">Subject:</td><td style=""padding: 8px 0; color: #0f172a;"">{subj}</td></tr>
  </table>
  <hr style=""border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;"" />
  <h4 style=""margin: 0 0 8px 0; color: #0f172a; font-size: 14px;"">Message Content:</h4>
  <div style=""background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;"">{(string.IsNullOrWhiteSpace(request.Message) ? "No message provided" : request.Message)}</div>
  <div style=""margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;"">
    Sent from Efficacious Website Contact Form to info@efficacious.co.in via .NET API
  </div>
</div>";
        }

        // Build MimeMessage
        var message = new MimeMessage();
        var smtpUser = _configuration["Smtp:User"] ?? DefaultSmtpUser;
        var recipient = _configuration["Smtp:Recipient"] ?? DefaultRecipient;
        var host = _configuration["Smtp:Host"] ?? DefaultSmtpHost;
        var port = int.TryParse(_configuration["Smtp:Port"], out var p) ? p : 465;

        var secret = _configuration["Smtp:Secret"] ?? DefaultMasterSecret;
        var configuredPass = _configuration["Smtp:Pass"] ?? DefaultFallbackEncryptedPass;
        var smtpPass = DecryptPassword(configuredPass, secret);

        message.From.Add(new MailboxAddress("Efficacious Website", smtpUser));
        message.To.Add(new MailboxAddress("Efficacious Team", recipient));
        message.ReplyTo.Add(new MailboxAddress(fullName, email));
        message.Subject = emailSubject;

        var bodyBuilder = new BodyBuilder
        {
            TextBody = emailText,
            HtmlBody = emailHtml
        };

        // Attach Resume if present (Base64 data URL)
        if (!string.IsNullOrWhiteSpace(request.ResumeDataUrl) && !string.IsNullOrWhiteSpace(request.ResumeName))
        {
            try
            {
                var match = Regex.Match(request.ResumeDataUrl, @"^data:(?<type>[^;]+);base64,(?<data>.+)$");
                if (match.Success)
                {
                    var mimeType = match.Groups["type"].Value;
                    var base64Data = match.Groups["data"].Value;
                    var fileBytes = Convert.FromBase64String(base64Data);

                    var contentType = ContentType.Parse(mimeType);
                    bodyBuilder.Attachments.Add(request.ResumeName, fileBytes, contentType);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to decode resume attachment: {FileName}", request.ResumeName);
            }
        }

        message.Body = bodyBuilder.ToMessageBody();

        // Connect and send via GoDaddy SMTP
        using var client = new SmtpClient();
        client.Timeout = 15000; // 15 seconds

        try
        {
            _logger.LogInformation("Connecting to SMTP {Host}:{Port} with SSL...", host, port);
            await client.ConnectAsync(host, port, SecureSocketOptions.SslOnConnect);
            await client.AuthenticateAsync(smtpUser, smtpPass);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);

            _logger.LogInformation("Email sent successfully to {Recipient} for {FullName}", recipient, fullName);
            return new EmailResponse
            {
                Success = true,
                Message = $"Email delivered successfully via GoDaddy SSL SMTP to {recipient}."
            };
        }
        catch (Exception exSsl)
        {
            _logger.LogWarning(exSsl, "SSL Port 465 failed, attempting TLS port 587 fallback...");
            try
            {
                if (client.IsConnected) await client.DisconnectAsync(false);
                await client.ConnectAsync(host, 587, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(smtpUser, smtpPass);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);

                return new EmailResponse
                {
                    Success = true,
                    Message = $"Email delivered successfully via GoDaddy TLS SMTP to {recipient}."
                };
            }
            catch (Exception exTls)
            {
                _logger.LogError(exTls, "Both Port 465 and Port 587 delivery failed");
                return new EmailResponse
                {
                    Success = false,
                    Error = $"SMTP Delivery failed: {exTls.Message}"
                };
            }
        }
    }
}
