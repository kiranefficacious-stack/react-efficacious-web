import nodemailer from 'nodemailer';
import crypto from 'crypto';

const MASTER_SECRET = process.env.EMAIL_ENCRYPTION_SECRET || 'Efficacious@Secure2026!Key#9876';
const FALLBACK_PASS = 'enc:v1:663f01195bfc68e71a9d9719:2f23ccc527e680935b8e862bedc861b2:53eb399d182ae65d1b320b8c41fc5b2e';
const FALLBACK_USER = 'info@efficacious.co.in';

function decryptPassword(cipherText, secret = MASTER_SECRET) {
  if (!cipherText || !cipherText.startsWith('enc:v1:')) return cipherText;
  try {
    const parts = cipherText.split(':');
    const iv = Buffer.from(parts[2], 'hex');
    const authTag = Buffer.from(parts[3], 'hex');
    const encrypted = parts[4];
    const key = crypto.createHash('sha256').update(secret).digest();
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.warn('Could not decrypt password:', err.message);
    return cipherText;
  }
}

async function sendEmailCore(body) {
  const {
    type = 'contact',
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
    resumeDataUrl
  } = body || {};

  const fullName = (name || (firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName || '')) || 'Prospective Client').trim();
  const contactPhone = (mobile || phone || '').trim();
  const orgName = (schoolName || restaurant || company || '').trim();
  const location = (city || address || '').trim();

  if (!fullName || !email) {
    return { status: 400, data: { success: false, error: 'Name and Email are required.' } };
  }

  const isCareer = type === 'career';
  const isProduct = Boolean(product) || type === 'product_contact';

  let emailSubject = '';
  let emailText = '';
  let emailHtml = '';

  if (isCareer) {
    emailSubject = `${fullName} <${email.trim()}> - Application: ${position || 'Open Role'}${resumeName ? ' [CV Attached]' : ''}`;
    emailText = `New Job Application Received:\n--------------------------------------------------\nCandidate Name:   ${fullName}\nEmail Address:    ${email}\nMobile Number:    ${contactPhone || 'N/A'}\nLocation / City:  ${location || 'N/A'}\nApplied Position: ${position || 'N/A'}\nResume:           ${resumeName || 'None'}\n\nCover Letter / Notes:\n${message || 'No notes provided'}\n--------------------------------------------------\nTo: info@efficacious.co.in\nFrom: info@efficacious.co.in`;
    emailHtml = `<div style="font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <div style="border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="color: #0f172a; margin: 0; font-size: 20px;">New Job Application</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Received at: info@efficacious.co.in</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Candidate:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${fullName}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0284c7;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${contactPhone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Location:</td><td style="padding: 8px 0; color: #0f172a;">${location || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Position:</td><td style="padding: 8px 0; color: #d97706; font-weight: bold;">${position || 'Open Role'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Resume Attached:</td><td style="padding: 8px 0; color: #0f172a;">${resumeName ? `<strong>${resumeName}</strong> (${resumeSize || ''})` : 'No file attached'}</td></tr>
      </table>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Cover Letter / Candidate Notes:</h4>
      <div style="background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;">${message || 'No notes provided'}</div>
      <div style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
        Sent from Efficacious Careers Application Form to info@efficacious.co.in
      </div>
    </div>`;
  } else if (isProduct) {
    const prodName = product || 'Product';
    emailSubject = `${fullName} <${email.trim()}> - [${prodName}] ${orgName ? `${orgName} - ` : ''}${subject || 'Demo / Inquiry'}`;
    emailText = `New ${prodName} Inquiry Received:\n--------------------------------------------------\nProduct:          ${prodName}\nFull Name:        ${fullName}\nEmail Address:    ${email}\nPhone Number:     ${contactPhone || 'N/A'}\nOrganization:     ${orgName || 'N/A'}\nCity/Location:    ${location || 'N/A'}\nScale / Details:  ${studentCount ? `${studentCount} Students` : ''}${outlets ? `${outlets} Outlets` : ''}${details ? `${details}` : ''}${time ? ` (Preferred: ${time})` : ''}\n\nMessage / Notes:\n${message || 'No message provided'}\n--------------------------------------------------\nTo: info@efficacious.co.in\nFrom: info@efficacious.co.in`;
    emailHtml = `<div style="font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <div style="border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;">
        <div style="display: inline-block; padding: 3px 10px; border-radius: 20px; background: #fff7ed; color: #c2410c; font-size: 12px; font-weight: bold; margin-bottom: 6px;">${prodName}</div>
        <h2 style="color: #0f172a; margin: 0; font-size: 20px;">New Product Inquiry / Demo Request</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Received at: info@efficacious.co.in</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Product:</td><td style="padding: 8px 0; color: #E48100; font-weight: bold;">${prodName}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Contact Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${fullName}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0284c7;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${contactPhone || 'Not provided'}</td></tr>
        ${orgName ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Organization:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${orgName}</td></tr>` : ''}
        ${location ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">City/Location:</td><td style="padding: 8px 0; color: #0f172a;">${location}</td></tr>` : ''}
        ${studentCount ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Students:</td><td style="padding: 8px 0; color: #0f172a;">${studentCount}</td></tr>` : ''}
        ${outlets ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Outlets:</td><td style="padding: 8px 0; color: #0f172a;">${outlets}</td></tr>` : ''}
        ${details ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Details:</td><td style="padding: 8px 0; color: #0f172a;">${details}</td></tr>` : ''}
      </table>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Message / Inquiry Details:</h4>
      <div style="background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;">${message || 'No additional message provided'}</div>
      <div style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
        Sent from ${prodName} Contact Form to info@efficacious.co.in
      </div>
    </div>`;
  } else {
    emailSubject = `${fullName} <${email.trim()}> - Website Inquiry: ${subject || 'General'}`;
    emailText = `New Contact Inquiry Received:\n--------------------------------------------------\nFull Name:        ${fullName}\nEmail Address:    ${email}\nMobile Number:    ${contactPhone || 'N/A'}\nLocation/Address: ${location || 'N/A'}\nSubject:          ${subject || 'General Inquiry'}\n\nMessage:\n${message || 'No message provided'}\n--------------------------------------------------\nTo: info@efficacious.co.in\nFrom: info@efficacious.co.in`;
    emailHtml = `<div style="font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <div style="border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="color: #0f172a; margin: 0; font-size: 20px;">New Website Contact Inquiry</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Received at: info@efficacious.co.in</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Full Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${fullName}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0284c7;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Mobile:</td><td style="padding: 8px 0; color: #0f172a;">${contactPhone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Location:</td><td style="padding: 8px 0; color: #0f172a;">${location || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td><td style="padding: 8px 0; color: #d97706; font-weight: bold;">${subject || 'General Inquiry'}</td></tr>
      </table>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Message Content:</h4>
      <div style="background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;">${message || 'No message provided'}</div>
      <div style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
        Sent from Efficacious Website Contact Form to info@efficacious.co.in
      </div>
    </div>`;
  }

  const mailOptions = {
    from: '"Efficacious Website" <info@efficacious.co.in>',
    to: 'info@efficacious.co.in',
    replyTo: `${fullName} <${email}>`,
    subject: emailSubject,
    text: emailText,
    html: emailHtml
  };

  if (resumeDataUrl && resumeName) {
    const matches = resumeDataUrl.match(/^data:(.+);base64,(.+)$/);
    if (matches) {
      mailOptions.attachments = [{
        filename: resumeName,
        content: matches[2],
        encoding: 'base64',
        contentType: matches[1]
      }];
    }
  }

  const smtpUser = process.env.EMAIL_USER || FALLBACK_USER;
  const smtpPass = decryptPassword(process.env.EMAIL_PASS || FALLBACK_PASS);

  // Try port 465 (SSL) first, fallback to port 587 (STARTTLS)
  try {
    const transporter465 = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
    await transporter465.sendMail(mailOptions);
    return { status: 200, data: { success: true, message: 'Email sent successfully via GoDaddy SSL SMTP to info@efficacious.co.in.' } };
  } catch (err465) {
    console.warn('Port 465 SMTP error, attempting fallback port 587:', err465.message);
    try {
      const transporter587 = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: { user: smtpUser, pass: smtpPass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });
      await transporter587.sendMail(mailOptions);
      return { status: 200, data: { success: true, message: 'Email sent successfully via GoDaddy TLS SMTP to info@efficacious.co.in.' } };
    } catch (err587) {
      console.error('SMTP sending failed on both ports:', err587.message);
      return { status: 500, data: { success: false, error: err587.message || 'SMTP delivery failed' } };
    }
  }
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

// Netlify Functions v1 handler
export async function handler(event, context) {
  const method = (event?.httpMethod || event?.method || '').toUpperCase();
  if (method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ status: 'ok' })
    };
  }
  if (method !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' })
    };
  }

  let body = {};
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : (event.body || {});
  } catch (e) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Invalid JSON payload' })
    };
  }

  const result = await sendEmailCore(body);
  return {
    statusCode: result.status,
    headers: CORS_HEADERS,
    body: JSON.stringify(result.data)
  };
}
