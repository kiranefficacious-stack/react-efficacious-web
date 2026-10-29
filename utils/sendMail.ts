/**
 * Universal Mail Delivery Utility for Efficacious Website & Products
 * Resolves API endpoints dynamically across all deployment scenarios:
 * - Netlify Serverless Functions (`/.netlify/functions/send-email`)
 * - Netlify Forms automatic fallback for static deployments
 * - Local Vite dev server (`http://localhost:3000`)
 * - Apache / cPanel / LiteSpeed root domain (`https://efficacious.co.in`)
 * - Subdirectory / Custom Base URL hosting (`https://example.com/site/`)
 * - Deep product routes (`/products/esmart-school/contact`)
 */

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
 * Dynamically discovers candidate endpoints based on the current window location and base URL.
 */
export function getCandidateEndpoints(): string[] {
  const endpoints: string[] = [];

  // 1. Explicit override from environment if provided
  const explicitUrl = import.meta.env.VITE_MAILER_URL || import.meta.env.VITE_FIREBASE_FUNCTIONS_URL;
  if (explicitUrl && typeof explicitUrl === 'string' && explicitUrl.trim()) {
    endpoints.push(explicitUrl.trim());
  }

  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    const pathname = window.location.pathname || '/';

    // Primary Netlify Functions endpoint
    endpoints.push(`${origin}/.netlify/functions/send-email`);
    endpoints.push('/.netlify/functions/send-email');

    // Standard API proxy endpoint
    endpoints.push(`${origin}/api/send-email`);
    endpoints.push('/api/send-email');

    // Generate prefix candidates based on the current URL
    const prefixes: string[] = [];

    // Current folder
    let currentDir = pathname;
    if (!currentDir.endsWith('/')) {
      currentDir = currentDir.substring(0, currentDir.lastIndexOf('/') + 1);
    }
    if (currentDir) prefixes.push(currentDir);

    // Segment-by-segment prefixes (e.g., /sub/site/careers -> /sub/site/, /sub/, /)
    const segments = pathname.split('/').filter(Boolean);
    for (let i = segments.length - 1; i >= 1; i--) {
      prefixes.push('/' + segments.slice(0, i).join('/') + '/');
    }

    // import.meta.env.BASE_URL if set
    const envBase = import.meta.env.BASE_URL || '/';
    prefixes.push(envBase.endsWith('/') ? envBase : envBase + '/');

    // Always include root
    prefixes.push('/');

    const uniquePrefixes = Array.from(new Set(prefixes));

    // For each prefix, add file targets:
    // 1) api/send-email (Clean endpoint / Netlify / Dev middleware)
    // 2) api/send-email/index.php (direct PHP execution on Apache / cPanel)
    // 3) api/send-email.php (direct PHP execution)
    for (const p of uniquePrefixes) {
      const cleanP = p.endsWith('/') ? p : p + '/';
      endpoints.push(`${origin}${cleanP}api/send-email`);
      endpoints.push(`${origin}${cleanP}api/send-email/index.php`);
      endpoints.push(`${origin}${cleanP}api/send-email.php`);
      endpoints.push(`${cleanP}api/send-email`);
      endpoints.push(`${cleanP}api/send-email/index.php`);
      endpoints.push(`${cleanP}api/send-email.php`);
    }

    // Relative paths
    endpoints.push('./api/send-email');
    endpoints.push('./api/send-email/index.php');
    endpoints.push('./api/send-email.php');
    endpoints.push('../api/send-email');
    endpoints.push('../api/send-email/index.php');
    endpoints.push('../api/send-email.php');
    endpoints.push('../../api/send-email');
    endpoints.push('../../api/send-email/index.php');
    endpoints.push('../../api/send-email.php');
    endpoints.push('api/send-email');
    endpoints.push('api/send-email/index.php');
    endpoints.push('api/send-email.php');
  }

  // Fallbacks
  endpoints.push('/.netlify/functions/send-email');
  endpoints.push('/api/send-email');
  endpoints.push('/api/send-email/index.php');
  endpoints.push('/api/send-email.php');

  // Return deduplicated list
  return Array.from(new Set(endpoints));
}

/**
 * Sends email via candidate endpoints, gracefully trying alternatives until one succeeds.
 * Includes Netlify Forms fallback if running on Netlify without active functions.
 */
export async function sendEmailNotification(payload: MailPayload): Promise<MailResponse> {
  const candidates = getCandidateEndpoints();
  let lastError = '';

  for (const url of candidates) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 16000);

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

      // Check content-type to ensure we received JSON and not an HTML SPA fallback page
      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      // If the response is HTML (starts with <!DOCTYPE or <html), this is SPA fallback, not mailer API
      const trimmed = text.trim();
      if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html') || trimmed.startsWith('<!doctype')) {
        continue;
      }

      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        // Not valid JSON
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
      // Endpoint unreachable or timed out, proceed to next candidate
      continue;
    }
  }

  // Fallback: Netlify Forms submission (for static deployments on Netlify)
  if (typeof window !== 'undefined') {
    try {
      const formName = payload.type === 'career' ? 'career' : (payload.type === 'product_contact' ? 'product-inquiry' : 'contact');
      const formBody = new URLSearchParams();
      formBody.append('form-name', formName);
      if (payload.name) formBody.append('name', payload.name);
      if (payload.firstName || payload.lastName) formBody.append('name', `${payload.firstName || ''} ${payload.lastName || ''}`.trim());
      if (payload.email) formBody.append('email', payload.email);
      if (payload.mobile || payload.phone) formBody.append('mobile', payload.mobile || payload.phone || '');
      if (payload.address || payload.city) formBody.append('address', payload.address || payload.city || '');
      if (payload.subject) formBody.append('subject', payload.subject);
      if (payload.position) formBody.append('position', payload.position);
      if (payload.product) formBody.append('product', payload.product);
      if (payload.schoolName) formBody.append('schoolName', payload.schoolName);
      if (payload.studentCount) formBody.append('studentCount', payload.studentCount);
      if (payload.outlets) formBody.append('outlets', payload.outlets);
      if (payload.message) formBody.append('message', payload.message);
      if (payload.resumeName) formBody.append('resume_info', `${payload.resumeName} (${payload.resumeSize || ''})`);

      const netlifyRes = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (netlifyRes.ok || netlifyRes.status === 200 || netlifyRes.status === 302) {
        return {
          success: true,
          message: 'Application submitted successfully.',
        };
      }
    } catch (netErr) {
      console.warn('Netlify form submission fallback failed:', netErr);
    }
  }

  return {
    success: false,
    error: lastError || 'Unable to submit your request right now. Please email directly to info@efficacious.co.in.',
  };
}
