/**
 * Universal Mail Delivery Utility for Efficacious Website & Products
 * Supports Option 2: Firebase Trigger Email (firestore-send-email) extension
 * with automatic fallback across all deployment scenarios:
 * - Firebase Firestore 'mail' collection (Extension-driven, 100% serverless)
 * - Netlify Serverless Functions (`/.netlify/functions/send-email`)
 * - Apache / cPanel / LiteSpeed direct endpoints (`https://efficacious.co.in/api/send-email`)
 * - Local Vite dev server (`http://localhost:3000`)
 */

import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface MailPayload {
  type?: 'career' | 'contact' | 'product_contact';
  product?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  mobile?: string;
  phone?: string;
  address?: string;
  city?: string;
  schoolName?: string;
  restaurant?: string;
  company?: string;
  outlets?: string;
  studentCount?: string;
  time?: string;
  details?: string;
  subject?: string;
  position?: string;
  message?: string;
  resumeName?: string;
  resumeSize?: string;
  resumeDataUrl?: string;
}

export interface MailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Builds structured email subject, plain text, and HTML formatted bodies.
 */
function buildEmailContent(payload: MailPayload) {
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
  } = payload;

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
        Sent from Efficacious Website Career Application to info@efficacious.co.in
      </div>
    </div>`;
  } else if (isProduct) {
    emailSubject = `${fullName} <${email.trim()}> - Demo Request: ${product || 'Smart ERP'}`;
    emailText = `Product Demo & Inquiry Request:\n--------------------------------------------------\nName:             ${fullName}\nEmail Address:    ${email}\nMobile Number:    ${contactPhone || 'N/A'}\nOrganization:     ${orgName || 'N/A'}\nProduct:          ${product || 'General Product'}\nLocation:         ${location || 'N/A'}\nOutlets/Students: ${outlets || (studentCount || 'N/A')}\nPreferred Time:   ${time || 'N/A'}\n\nSpecific Requirements:\n${details || (message || 'No additional details')}\n--------------------------------------------------\nTo: info@efficacious.co.in\nFrom: info@efficacious.co.in`;
    emailHtml = `<div style="font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <div style="border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="color: #0f172a; margin: 0; font-size: 20px;">Product Demo & Inquiry</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Product: <strong>${product || 'Smart ERP'}</strong> | Received at: info@efficacious.co.in</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Contact Person:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${fullName}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0284c7;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${contactPhone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Organization:</td><td style="padding: 8px 0; color: #0f172a;">${orgName || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Location:</td><td style="padding: 8px 0; color: #0f172a;">${location || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Preferred Time:</td><td style="padding: 8px 0; color: #0f172a;">${time || 'Anytime'}</td></tr>
      </table>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Requirements & Details:</h4>
      <div style="background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;">${details || (message || 'No additional details provided')}</div>
      <div style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
        Sent from Efficacious Website Product Demo Request to info@efficacious.co.in
      </div>
    </div>`;
  } else {
    emailSubject = `${fullName} <${email.trim()}> - Website Contact: ${subject || 'New Inquiry'}`;
    emailText = `New Website Contact Form Submission:\n--------------------------------------------------\nName:          ${fullName}\nEmail Address: ${email}\nMobile Number: ${contactPhone || 'N/A'}\nLocation/City: ${location || 'N/A'}\nSubject:       ${subject || 'General Inquiry'}\n\nMessage:\n${message || 'No message provided'}\n--------------------------------------------------\nTo: info@efficacious.co.in\nFrom: info@efficacious.co.in`;
    emailHtml = `<div style="font-family: Arial, sans-serif; max-width: 620px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
      <div style="border-bottom: 2px solid #E48100; padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="color: #0f172a; margin: 0; font-size: 20px;">New Website Contact Message</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Received at: info@efficacious.co.in</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${fullName}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0284c7;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${contactPhone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Location:</td><td style="padding: 8px 0; color: #0f172a;">${location || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td><td style="padding: 8px 0; color: #0f172a;">${subject || 'General Inquiry'}</td></tr>
      </table>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Message Content:</h4>
      <div style="background: #f8fafc; padding: 14px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;">${message || 'No message provided'}</div>
      <div style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
        Sent from Efficacious Website Contact Form to info@efficacious.co.in
      </div>
    </div>`;
  }

  const attachments: any[] = [];
  if (resumeDataUrl && resumeName) {
    const matches = resumeDataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      attachments.push({
        filename: resumeName,
        content: matches[2],
        encoding: 'base64'
      });
    }
  }

  return { fullName, email, emailSubject, emailText, emailHtml, attachments };
}

/**
 * Dynamically discovers candidate endpoints based on the current window location and base URL.
 */
export function getCandidateEndpoints(): string[] {
  const endpoints: string[] = [];

  const explicitUrl = import.meta.env.VITE_MAILER_URL || import.meta.env.VITE_FIREBASE_FUNCTIONS_URL;
  if (explicitUrl && typeof explicitUrl === 'string' && explicitUrl.trim()) {
    endpoints.push(explicitUrl.trim());
  }

  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    const pathname = window.location.pathname || '/';
    const isNetlify = window.location.hostname.includes('netlify.app') || window.location.hostname.includes('netlify.live');

    if (isNetlify) {
      endpoints.push(`${origin}/.netlify/functions/send-email`);
      endpoints.push('/.netlify/functions/send-email');
      endpoints.push(`${origin}/api/send-email`);
      endpoints.push('/api/send-email');
    } else {
      endpoints.push(`${origin}/api/send-email/index.php`);
      endpoints.push('/api/send-email/index.php');
      endpoints.push(`${origin}/api/send-email.php`);
      endpoints.push('/api/send-email.php');
      endpoints.push(`${origin}/api/send-email`);
      endpoints.push('/api/send-email');
    }

    const prefixes: string[] = [];
    let currentDir = pathname;
    if (!currentDir.endsWith('/')) {
      currentDir = currentDir.substring(0, currentDir.lastIndexOf('/') + 1);
    }
    if (currentDir) prefixes.push(currentDir);

    const segments = pathname.split('/').filter(Boolean);
    for (let i = segments.length - 1; i >= 1; i--) {
      prefixes.push('/' + segments.slice(0, i).join('/') + '/');
    }

    const envBase = import.meta.env.BASE_URL || '/';
    prefixes.push(envBase.endsWith('/') ? envBase : envBase + '/');
    prefixes.push('/');

    const uniquePrefixes = Array.from(new Set(prefixes));
    for (const p of uniquePrefixes) {
      const cleanP = p.endsWith('/') ? p : p + '/';
      endpoints.push(`${origin}${cleanP}api/send-email`);
      endpoints.push(`${origin}${cleanP}api/send-email/index.php`);
      endpoints.push(`${origin}${cleanP}api/send-email.php`);
      endpoints.push(`${cleanP}api/send-email`);
      endpoints.push(`${cleanP}api/send-email/index.php`);
      endpoints.push(`${cleanP}api/send-email.php`);
    }

    endpoints.push('./api/send-email');
    endpoints.push('./api/send-email/index.php');
    endpoints.push('./api/send-email.php');
    endpoints.push('../api/send-email');
    endpoints.push('../api/send-email/index.php');
    endpoints.push('../api/send-email.php');
    endpoints.push('api/send-email');
    endpoints.push('api/send-email/index.php');
    endpoints.push('api/send-email.php');
  }

  endpoints.push('/.netlify/functions/send-email');
  endpoints.push('https://efficacious-official.netlify.app/.netlify/functions/send-email');
  endpoints.push('/api/send-email');
  endpoints.push('/api/send-email/index.php');
  endpoints.push('/api/send-email.php');

  return Array.from(new Set(endpoints));
}

/**
 * Sends email via candidate HTTP endpoints (Netlify Functions or PHP mailer).
 */
async function triggerHttpEndpoints(payload: MailPayload): Promise<MailResponse> {
  const candidates = getCandidateEndpoints();
  let lastError = '';

  for (const url of candidates) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timer);

      const text = await res.text();
      const trimmed = text.trim();
      if (
        trimmed.startsWith('<!DOCTYPE') ||
        trimmed.startsWith('<html') ||
        trimmed.startsWith('<!doctype') ||
        trimmed.startsWith('<?php') ||
        trimmed.startsWith('<?')
      ) {
        continue;
      }

      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        continue;
      }

      if (res.ok && (data?.success === true || data?.success === 'true')) {
        return {
          success: true,
          message: data?.message || 'Email delivered successfully.',
        };
      }

      if (data?.error) {
        lastError = data.error;
      }
    } catch {
      continue;
    }
  }

  return {
    success: false,
    error: lastError || 'Unable to submit your request right now. Please email directly to info@efficacious.co.in.',
  };
}

/**
 * Universal Mail Dispatcher:
 * 1. Primary: Writes directly to Firestore 'mail' collection (Firebase Trigger Email Extension)
 *    - Works on ANY live domain (Netlify, GoDaddy, localhost)
 *    - Bypasses PHP and serverless limitations completely
 * 2. Fallback: Directly triggers HTTP endpoints
 */
export async function sendEmailNotification(payload: MailPayload): Promise<MailResponse> {
  const { fullName, email, emailSubject, emailText, emailHtml, attachments } = buildEmailContent(payload);

  // 1. PRIMARY: Firebase "Trigger Email" extension (Collection: 'mail')
  try {
    const mailDoc: any = {
      to: 'info@efficacious.co.in',
      replyTo: `${fullName} <${email}>`,
      message: {
        subject: emailSubject,
        text: emailText,
        html: emailHtml
      },
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString(),
      metadata: {
        type: payload.type || 'contact',
        senderName: fullName,
        senderEmail: email,
        product: payload.product || null,
        position: payload.position || null
      }
    };

    if (attachments.length > 0) {
      mailDoc.message.attachments = attachments;
    }

    await addDoc(collection(db, 'mail'), mailDoc);

    // Also fire HTTP endpoints in background as a secondary delivery guarantee
    triggerHttpEndpoints(payload).catch(() => {});

    return {
      success: true,
      message: 'Email delivered successfully.'
    };
  } catch (firestoreErr) {
    console.warn('Firestore mail collection write notice, attempting HTTP endpoints:', firestoreErr);
  }

  // 2. FALLBACK: HTTP endpoints (PHP / Netlify functions)
  return await triggerHttpEndpoints(payload);
}
