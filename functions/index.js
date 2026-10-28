const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const crypto = require("crypto");

const MASTER_SECRET = process.env.EMAIL_ENCRYPTION_SECRET || "Efficacious@Secure2026!Key#9876";

function decryptPassword(cipherText, secret = MASTER_SECRET) {
  if (!cipherText || !cipherText.startsWith("enc:v1:")) return cipherText;
  try {
    const parts = cipherText.split(":");
    const iv = Buffer.from(parts[2], "hex");
    const authTag = Buffer.from(parts[3], "hex");
    const encrypted = parts[4];
    const key = crypto.createHash("sha256").update(secret).digest();
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (err) {
    console.warn("Could not decrypt password:", err.message);
    return cipherText;
  }
}

// Google Cloud Secret Manager Secrets
// Location in Google Cloud: Security -> Secret Manager
const gmailUser = defineSecret("GMAIL_USER");
const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");

/**
 * Cloud Function to securely send emails from info@efficacious.co.in to info@efficacious.co.in
 * The password is encrypted in Google Cloud Secret Manager and NEVER sent to the browser.
 */
exports.sendEmailNotification = onRequest(
  {
    cors: true,
    secrets: [gmailUser, gmailAppPassword],
  },
  async (req, res) => {
    // Only accept POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    try {
      const {
        type = "contact", // 'contact', 'career', or 'product_contact'
        product,
        name,
        firstName,
        lastName,
        email,
        mobile,
        phone,
        address,
        city,
        schoolName,
        restaurant,
        company,
        outlets,
        studentCount,
        time,
        details,
        subject,
        position,
        message,
        resumeName,
        resumeSize,
        resumeDataUrl,
      } = req.body;

      const fullName = (name || (firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName || '')) || 'Prospective Client').trim();
      const contactPhone = (mobile || phone || '').trim();
      const orgName = (schoolName || restaurant || company || '').trim();
      const location = (city || address || '').trim();

      if (!fullName || !email) {
        return res.status(400).json({ success: false, error: "Name and Email are required." });
      }

      // Secure credentials retrieval:
      // Option 1: Google Cloud Secret Manager
      let user = "";
      let pass = "";
      try {
        user = gmailUser.value();
        pass = gmailAppPassword.value();
      } catch (secErr) {
        // Secret Manager not configured or missing permission
      }

      // Option 2: Private Firestore document (system_secrets/email_credentials)
      // Completely locked by security rules so no browser/inspect user can ever read it
      if (!pass) {
        try {
          const secretSnap = await admin.firestore().collection("system_secrets").doc("email_credentials").get();
          if (secretSnap.exists) {
            const data = secretSnap.data();
            if (data?.user) user = data.user;
            if (data?.pass) pass = decryptPassword(data.pass);
          }
        } catch (fsErr) {
          console.warn("Could not read credentials from Firestore system_secrets:", fsErr.message);
        }
      }

      // Option 3: Fallback Dummy Credentials
      user = user || "info@efficacious.co.in";
      pass = pass || "dummy_gmail_app_password_abcd1234efgh";

      const transporter = nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: pass,
        },
      });

      let emailSubject = "";
      let emailText = "";
      let emailHtml = "";

      if (type === "career") {
        emailSubject = `${fullName} <${email.trim()}> - Application: ${position || "Open Role"}${resumeName ? " [CV Attached]" : ""}`;
        emailText = `
New Job Application Received:
--------------------------------------------------
Candidate Name:   ${fullName}
Email Address:    ${email}
Mobile Number:    ${contactPhone || "N/A"}
Location/City:    ${location || "N/A"}
Applied Position: ${position || "N/A"}
Resume Uploaded:  ${resumeName ? `${resumeName} (${resumeSize || ""})` : "None"}

Cover Letter / Notes:
${message || "No cover letter provided"}
--------------------------------------------------
Sent to: info@efficacious.co.in
        `.trim();

        emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
  <h2 style="color: #0f172a; margin-top: 0;">New Job Application</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Candidate:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${fullName}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0; color: #0284c7;">${email}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${contactPhone || "N/A"}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Location:</td><td style="padding: 8px 0; color: #0f172a;">${location || "N/A"}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Position:</td><td style="padding: 8px 0; font-weight: bold; color: #d97706;">${position || "General Application"}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Resume:</td><td style="padding: 8px 0; color: #0f172a;">${resumeName ? `<strong>${resumeName}</strong> (${resumeSize || ""})` : "No file uploaded"}</td></tr>
  </table>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
  <h4 style="margin: 0 0 8px 0; color: #0f172a;">Cover Letter / Candidate Notes:</h4>
  <p style="background: #f8fafc; padding: 12px; border-radius: 6px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message || "No notes provided"}</p>
</div>
        `.trim();
      } else if (product || type === "product_contact") {
        const prodName = product || "Product";
        emailSubject = `${fullName} <${email.trim()}> - [${prodName}] ${orgName ? `${orgName} - ` : ''}${subject || 'Demo / Inquiry'}`;
        emailText = `
New ${prodName} Inquiry Received:
--------------------------------------------------
Product:          ${prodName}
Full Name:        ${fullName}
Email Address:    ${email}
Phone Number:     ${contactPhone || "N/A"}
Organization:     ${orgName || "N/A"}
City/Location:    ${location || "N/A"}
Scale / Details:  ${studentCount ? `${studentCount} Students` : ''}${outlets ? `${outlets} Outlets` : ''}${details ? `${details}` : ''}${time ? ` (Preferred: ${time})` : ''}

Message / Notes:
${message || "No message provided"}
--------------------------------------------------
Sent to: info@efficacious.co.in
        `.trim();

        emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
  <div style="display: inline-block; padding: 3px 10px; border-radius: 20px; background: #fff7ed; color: #c2410c; font-size: 12px; font-weight: bold; margin-bottom: 6px;">${prodName}</div>
  <h2 style="color: #0f172a; margin-top: 0;">New Product Inquiry</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Product:</td><td style="padding: 8px 0; font-weight: bold; color: #E48100;">${prodName}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Full Name:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${fullName}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0; color: #0284c7;">${email}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${contactPhone || "N/A"}</td></tr>
    ${orgName ? `<tr><td style="padding: 8px 0; color: #64748b;">Organization:</td><td style="padding: 8px 0; color: #0f172a;">${orgName}</td></tr>` : ''}
    ${location ? `<tr><td style="padding: 8px 0; color: #64748b;">Location:</td><td style="padding: 8px 0; color: #0f172a;">${location}</td></tr>` : ''}
    ${studentCount ? `<tr><td style="padding: 8px 0; color: #64748b;">Students:</td><td style="padding: 8px 0; color: #0f172a;">${studentCount}</td></tr>` : ''}
    ${outlets ? `<tr><td style="padding: 8px 0; color: #64748b;">Outlets:</td><td style="padding: 8px 0; color: #0f172a;">${outlets}</td></tr>` : ''}
    ${details ? `<tr><td style="padding: 8px 0; color: #64748b;">Details:</td><td style="padding: 8px 0; color: #0f172a;">${details}</td></tr>` : ''}
  </table>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
  <h4 style="margin: 0 0 8px 0; color: #0f172a;">Message / Notes:</h4>
  <p style="background: #f8fafc; padding: 12px; border-radius: 6px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message || "No message provided"}</p>
</div>
        `.trim();
      } else {
        emailSubject = `${fullName} <${email.trim()}> - Website Inquiry: ${subject || "General"}`;
        emailText = `
New Contact Inquiry from Website:
--------------------------------------------------
Full Name:        ${fullName}
Email Address:    ${email}
Mobile Number:    ${contactPhone || "N/A"}
Location/Address: ${location || "N/A"}
Subject:          ${subject || "General Inquiry"}

Message:
${message || "No message provided"}
--------------------------------------------------
Sent to: info@efficacious.co.in
        `.trim();

        emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
  <h2 style="color: #0f172a; margin-top: 0;">New Contact Inquiry</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Full Name:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${fullName}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0; color: #0284c7;">${email}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${contactPhone || "N/A"}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Location:</td><td style="padding: 8px 0; color: #0f172a;">${location || "N/A"}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Subject:</td><td style="padding: 8px 0; font-weight: bold; color: #d97706;">${subject || "General"}</td></tr>
  </table>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
  <h4 style="margin: 0 0 8px 0; color: #0f172a;">Message:</h4>
  <p style="background: #f8fafc; padding: 12px; border-radius: 6px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message || "No message provided"}</p>
</div>
        `.trim();
      }

      const mailOptions = {
        from: `"Efficacious Website" <info@efficacious.co.in>`,
        to: "info@efficacious.co.in",
        replyTo: `${fullName} <${email}>`,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      };

      // If a resume base64 data url is supplied, attach it directly
      if (resumeDataUrl && resumeName) {
        const matches = resumeDataUrl.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
          mailOptions.attachments = [
            {
              filename: resumeName,
              content: matches[2],
              encoding: "base64",
              contentType: matches[1],
            },
          ];
        }
      }

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: "Email sent successfully via secure Google Cloud Function.",
      });
    } catch (error) {
      console.error("Cloud Function sendEmail error:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to send email via Cloud Function.",
      });
    }
  }
);
