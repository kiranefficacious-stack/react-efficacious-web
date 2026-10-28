/**
 * Utility to sanitize and format job descriptions or rich text content.
 * Supports bold, italic, font sizes, headings, lists, and preserves legacy plain-text newlines.
 */

export function sanitizeDescriptionHtml(content: string | undefined | null): string {
  if (!content) return '';

  const str = String(content);

  // If plain text with no HTML tags, preserve newlines as line breaks
  const hasHtml = /<[a-z][\s\S]*>/i.test(str);
  if (!hasHtml) {
    return str.replace(/\n/g, '<br />');
  }

  // Strip dangerous tags and attributes
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\son\w+\s*=\s*[^>\s]+/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Extracts plain text from an HTML or text string for character counting and card previews
 */
export function extractPlainText(content: string | undefined | null): string {
  if (!content) return '';
  return String(content)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
