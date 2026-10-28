import path from 'path';
import fs from 'fs';
import os from 'os';
import https from 'https';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import nodemailer from 'nodemailer';

import crypto from 'crypto';

const MASTER_SECRET = process.env.EMAIL_ENCRYPTION_SECRET || 'Efficacious@Secure2026!Key#9876';

function decryptPassword(cipherText: string, secret = MASTER_SECRET): string {
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
  } catch (decErr) {
    console.warn('Could not decrypt password:', decErr);
    return cipherText;
  }
}

async function getEmailCredentials(envPass = '', envUser = ''): Promise<{ user: string; pass: string }> {
  const fallbackUser = envUser || process.env.EMAIL_USER || 'info@efficacious.co.in';
  const fallbackPass = envPass || process.env.EMAIL_PASS || 'enc:v1:663f01195bfc68e71a9d9719:2f23ccc527e680935b8e862bedc861b2:53eb399d182ae65d1b320b8c41fc5b2e';

  try {
    const tokenPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
    if (fs.existsSync(tokenPath)) {
      const data = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
      const token = data.tokens?.access_token;
      if (token) {
        const secretRes = await new Promise<any>((resolve) => {
          const req = https.request(
            {
              hostname: 'firestore.googleapis.com',
              path: '/v1/projects/efficacious-website-live/databases/(default)/documents/system_secrets/email_credentials',
              method: 'GET',
              headers: { Authorization: `Bearer ${token}` }
            },
            (res) => {
              let body = '';
              res.on('data', (c) => (body += c));
              res.on('end', () => {
                try {
                  resolve(JSON.parse(body));
                } catch {
                  resolve(null);
                }
              });
            }
          );
          req.on('error', () => resolve(null));
          req.end();
        });

        if (secretRes?.fields?.pass?.stringValue) {
          return {
            user: secretRes.fields.user?.stringValue || fallbackUser,
            pass: decryptPassword(secretRes.fields.pass.stringValue)
          };
        }
      }
    }
  } catch (err) {
    console.warn('Could not read credentials from Firestore:', err);
  }

  return {
    user: fallbackUser,
    pass: decryptPassword(fallbackPass)
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        tailwindcss(),
        {
          name: 'multi-spa-fallback',
          configureServer(server) {
            // Local dev mailer endpoint (/api/send-email)
            server.middlewares.use(async (req, res, next) => {
              if (req.url === '/api/send-email' && req.method === 'POST') {
                let bodyStr = '';
                req.on('data', chunk => { bodyStr += chunk; });
                req.on('end', async () => {
                  try {
                    const body = JSON.parse(bodyStr || '{}');
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
                    } = body;

                    const creds = await getEmailCredentials(env.EMAIL_PASS, env.EMAIL_USER);
                    if (!creds.pass) {
                      res.statusCode = 400;
                      res.setHeader('Content-Type', 'application/json');
                      return res.end(JSON.stringify({ success: false, error: 'Email password not found in Firestore system_secrets/email_credentials' }));
                    }

                    const fullName = (name || (firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName || '')) || 'Prospective Client').trim();
                    const contactPhone = (mobile || phone || '').trim();
                    const orgName = (schoolName || restaurant || company || '').trim();
                    const location = (city || address || '').trim();

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

                    const mailOptions: any = {
                      from: `"Efficacious Website" <info@efficacious.co.in>`,
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

                    // Official GoDaddy SMTP for info@efficacious.co.in
                    const transporter = nodemailer.createTransport({
                      host: 'smtpout.secureserver.net',
                      port: 465,
                      secure: true,
                      auth: {
                        user: creds.user,
                        pass: creds.pass
                      }
                    });

                    await transporter.sendMail(mailOptions);

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ success: true, message: 'Email sent successfully with full body content to info@efficacious.co.in.' }));
                  } catch (err: any) {
                    console.error('API /api/send-email error:', err);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ success: false, error: err.message || 'Failed to send email' }));
                  }
                });
                return;
              }

              if (req.url && !req.url.includes('.')) {
                const urlPath = req.url.split('?')[0];
                const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';

                if (urlPath === '/products/esmart-restaurant') {
                  res.statusCode = 301;
                  res.setHeader('Location', '/products/esmart-restaurant/' + query);
                  return res.end();
                }
                if (urlPath === '/products/esmart-school') {
                  res.statusCode = 301;
                  res.setHeader('Location', '/products/esmart-school/' + query);
                  return res.end();
                }
                if (urlPath === '/products/emart-queue' || urlPath === '/products/esmart-queue') {
                  res.statusCode = 301;
                  res.setHeader('Location', '/products/emart-queue/' + query);
                  return res.end();
                }

                if (urlPath.startsWith('/products/esmart-restaurant')) {
                  req.url = '/products/esmart-restaurant/index.html';
                } else if (urlPath.startsWith('/products/esmart-school')) {
                  req.url = '/products/esmart-school/index.html';
                } else if (urlPath.startsWith('/products/emart-queue') || urlPath.startsWith('/products/esmart-queue')) {
                  req.url = '/products/emart-queue/index.html';
                }
              }
              next();
            });
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        },
        dedupe: ['react', 'react-dom']
      },
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            esmart: path.resolve(__dirname, 'products/esmart-school/index.html'),
            restaurant: path.resolve(__dirname, 'products/esmart-restaurant/index.html'),
            queue: path.resolve(__dirname, 'products/emart-queue/index.html'),
          }
        }
      }
    };
});
