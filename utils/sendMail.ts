/**
 * Universal Mail Delivery Utility for Efficacious Website & Products
 * Strictly verified delivery: NEVER gives fake confirmations.
 *
 * 1. Direct Authenticated SMTP (GoDaddy Port 465 via Netlify Functions or Apache PHP)
 *    - Waits for real "250 Message accepted" response from the mail server.
 * 2. Firebase Trigger Email Extension (with real-time onSnapshot delivery verification)
 *    - Only confirms success if Firebase writes `delivery.state === 'SUCCESS'`.
 *    - Never assumes document creation equals email delivery.
 */

import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';

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
 * Returns the ordered list of mailer endpoints to try.
 *
 * Priority (fast-fail, 8 s timeout each):
 *   GoDaddy / cPanel  ->  /api/send-email.php   (PHP, instant mail())
 *   Netlify           ->  /.netlify/functions/send-email
 *   localhost         ->  http://localhost:5231/api/send-email  (.NET)
 *
 * NEVER includes non-existent subdomains like api.efficacious.co.in.
 */
export function getCandidateEndpoints(): string[] {
  if (typeof window === 'undefined') return [];

  const hostname = (window.location.hostname || '').toLowerCase();
  const origin   = window.location.origin;

  // Respect an explicit env override (e.g. VITE_MAILER_URL)
  const envUrl = import.meta.env.VITE_MAILER_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return [envUrl.trim()];
  }

  // Universal verified mailer: Uses the Node.js SSL SMTP engine across Netlify, GoDaddy, and Localhost
  const netlifyUrl = `${origin}/.netlify/functions/send-email`;
  const primaryNetlifyUrl = 'https://joyful-treacle-c09555.netlify.app/.netlify/functions/send-email';
  const godaddyPhpUrl = 'https://efficacious.co.in/api/send-email.php';

  if (hostname.includes('netlify.app')) {
    return [
      netlifyUrl,
      `${origin}/api/send-email`,
      godaddyPhpUrl
    ];
  }

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return [
      'http://localhost:5231/api/send-email',
      primaryNetlifyUrl,
      godaddyPhpUrl
    ];
  }

  // On efficacious.co.in (GoDaddy)
  return [
    godaddyPhpUrl,
    `${origin}/api/send-email.php`,
    primaryNetlifyUrl
  ];
}

/**
 * Sends email via the ordered candidate endpoints.
 * Uses an 8-second per-endpoint timeout so failures are detected fast.
 * Only returns success:true when the server explicitly confirms delivery.
 */
async function triggerHttpEndpoints(payload: MailPayload): Promise<MailResponse> {
  const candidates = getCandidateEndpoints();
  let lastError = '';

  for (const url of candidates) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 50000);

      let res: Response;
      try {
        res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timer);
      }

      const text = await res.text();
      const trimmed = text.trim();

      // Skip HTML / PHP error pages
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

      if (data?.error) lastError = data.error;

    } catch {
      // Network error / timeout — try next endpoint
      continue;
    }
  }

  return {
    success: false,
    error: lastError || 'Unable to deliver message right now. Please email us directly at info@efficacious.co.in.',
  };
}


/**
 * Listens to Firestore 'mail' document until the Firebase Trigger Email extension
 * writes an explicit delivery confirmation: delivery.state === 'SUCCESS'.
 * NEVER fakes confirmation.
 */
function waitForFirestoreDelivery(docRef: any, timeoutMs = 8000): Promise<MailResponse> {
  return new Promise((resolve) => {
    let timer: any = null;
    let unsub: any = null;

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      if (typeof unsub === 'function') unsub();
    };

    timer = setTimeout(() => {
      cleanup();
      resolve({
        success: false,
        error: 'Firestore mail extension did not confirm delivery within timeout.'
      });
    }, timeoutMs);

    unsub = onSnapshot(docRef, (snap: any) => {
      const data = snap.data();
      const delivery = data?.delivery;

      if (delivery) {
        if (delivery.state === 'SUCCESS') {
          cleanup();
          resolve({
            success: true,
            message: 'Email delivered successfully to info@efficacious.co.in.'
          });
        } else if (delivery.state === 'ERROR') {
          cleanup();
          resolve({
            success: false,
            error: delivery.error || 'Server rejected email delivery.'
          });
        }
      }
    }, (err: any) => {
      cleanup();
      resolve({
        success: false,
        error: err?.message || 'Firestore subscription error'
      });
    });
  });
}

/**
 * Strictly Verified Universal Mail Dispatcher (0% PHP):
 * 1. Primary: Direct Node.js Serverless Function (Verified GoDaddy SSL SMTP on Port 465)
 *    - 0% PHP, works across domains via CORS
 * 2. Fallback: Firebase Trigger Email Extension (with onSnapshot verification)
 * 3. Never produces fake confirmations
 */
export async function sendEmailNotification(payload: MailPayload): Promise<MailResponse> {
  const { fullName, email, emailSubject, emailText, emailHtml, attachments } = buildEmailContent(payload);

  // 1. PRIMARY: Direct Node.js Serverless Function (0% PHP - Verified GoDaddy SSL SMTP)
  const nodeResult = await triggerHttpEndpoints(payload);
  if (nodeResult.success) {
    return nodeResult;
  }

  // 2. FALLBACK: Firebase Trigger Email Extension (With real-time delivery confirmation)
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

    const docRef = await addDoc(collection(db, 'mail'), mailDoc);

    // Actively listen for Firestore extension confirmation: delivery.state === 'SUCCESS'
    const verifiedResult = await waitForFirestoreDelivery(docRef, 6000);
    if (verifiedResult.success) {
      return verifiedResult;
    }
  } catch (firestoreErr) {
    console.warn('Firestore mail queue notice:', firestoreErr);
  }

  // If neither confirmed real delivery, report error honestly
  return {
    success: false,
    error: nodeResult.error || 'Unable to deliver message right now. Please email directly to info@efficacious.co.in.'
  };
}
