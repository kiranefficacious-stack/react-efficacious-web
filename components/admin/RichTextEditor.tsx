import React, { useRef, useEffect, useState } from 'react';
import {
  Bold,
  Italic,
  Type,
  List,
  ListOrdered,
  RemoveFormatting,
  Code,
  Eye,
  Heading2,
  Heading3
} from 'lucide-react';
import { extractPlainText } from '../../utils/sanitizeHtml';

interface RichTextEditorProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
}

const FONT_SIZES = [
  { label: 'Normal (15px)', value: '15px' },
  { label: 'Small (13px)', value: '13px' },
  { label: 'Medium (18px)', value: '18px' },
  { label: 'Large (22px)', value: '22px' },
  { label: 'Extra Large (26px)', value: '26px' },
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder = 'Enter job description...',
  maxLength = 5000,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastHtmlRef = useRef<string>('');
  const savedRangeRef = useRef<Range | null>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [selectedFontSize, setSelectedFontSize] = useState('15px');

  // Convert plain text newlines to paragraphs/breaks on initial load if no HTML tags
  const normalizeInitialContent = (content: string) => {
    if (!content) return '';
    const hasHtml = /<[a-z][\s\S]*>/i.test(content);
    if (!hasHtml) {
      return content.replace(/\n/g, '<br />');
    }
    return content;
  };

  // Sync external value changes when not actively typing in editor
  useEffect(() => {
    if (editorRef.current && !isHtmlMode) {
      const normalized = normalizeInitialContent(value || '');
      if (editorRef.current.innerHTML !== normalized && (editorRef.current.innerHTML === '' || value !== lastHtmlRef.current)) {
        editorRef.current.innerHTML = normalized;
        lastHtmlRef.current = normalized;
      }
    }
  }, [value, isHtmlMode]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current) {
      const range = sel.getRangeAt(0);
      if (editorRef.current.contains(range.commonAncestorContainer)) {
        savedRangeRef.current = range.cloneRange();
      }
    }
  };

  const restoreSelection = () => {
    if (savedRangeRef.current && editorRef.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastHtmlRef.current = html;
      onChange(html);
    }
  };

  // Execute standard formatting commands
  const execCmd = (command: string, arg: string | undefined = undefined) => {
    if (isHtmlMode) return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, arg);
    handleContentChange();
    saveSelection();
  };

  // Apply Font Size to selected text or cursor
  const applyFontSize = (size: string) => {
    setSelectedFontSize(size);
    if (isHtmlMode || !editorRef.current) return;
    
    editorRef.current.focus();
    restoreSelection();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);

    if (range.collapsed) {
      // No text selected: insert a styled span with zero-width space
      const span = document.createElement('span');
      span.style.fontSize = size;
      span.appendChild(document.createTextNode('\u200B'));
      range.insertNode(span);
      const newRange = document.createRange();
      newRange.setStart(span.firstChild!, 1);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
      savedRangeRef.current = newRange.cloneRange();
    } else {
      // Use execCommand to handle complex multi-node selections, then replace font tag with styled span
      document.execCommand('fontSize', false, '7');
      const fontElements = editorRef.current.querySelectorAll('font[size="7"]');
      if (fontElements.length > 0) {
        fontElements.forEach((fontEl) => {
          const span = document.createElement('span');
          span.style.fontSize = size;
          span.innerHTML = fontEl.innerHTML;
          fontEl.parentNode?.replaceChild(span, fontEl);
        });
      } else {
        // Fallback: wrap range contents
        const span = document.createElement('span');
        span.style.fontSize = size;
        span.appendChild(range.extractContents());
        range.insertNode(span);
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(newRange);
        savedRangeRef.current = newRange.cloneRange();
      }
    }

    handleContentChange();
  };

  // Reset selected text to Normal formatting
  const handleResetToNormal = () => {
    if (isHtmlMode || !editorRef.current) return;
    editorRef.current.focus();
    restoreSelection();

    document.execCommand('removeFormat', false);
    document.execCommand('formatBlock', false, 'p');

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const el = (container.nodeType === Node.TEXT_NODE ? container.parentElement : container) as HTMLElement;
      if (el && el !== editorRef.current) {
        if (el.style) {
          el.style.fontSize = '';
          el.style.fontWeight = '';
          el.style.fontStyle = '';
        }
        el.querySelectorAll?.('span[style]').forEach((s: any) => {
          s.removeAttribute('style');
        });
      }
    }
    setSelectedFontSize('15px');
    handleContentChange();
    saveSelection();
  };

  const plainText = extractPlainText(value);
  const charCount = plainText.length;
  const isOverLimit = charCount > maxLength;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setIsHtmlMode(!isHtmlMode)}
          className="text-xs font-medium text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 flex items-center gap-1 transition-colors px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700"
          title={isHtmlMode ? "Switch to Visual Editor" : "View / Edit HTML Source"}
        >
          {isHtmlMode ? (
            <>
              <Eye size={13} /> Visual Editor
            </>
          ) : (
            <>
              <Code size={13} /> HTML Source
            </>
          )}
        </button>
      </div>

      {/* Editor Container */}
      <div
        className={`rounded-xl border transition-colors bg-white dark:bg-slate-900 overflow-hidden shadow-sm ${
          error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20'
        }`}
      >
        {/* Toolbar */}
        {!isHtmlMode && (
          <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 select-none">
            {/* Bold */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => execCmd('bold')}
              title="Bold (Ctrl+B)"
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-bold flex items-center justify-center"
            >
              <Bold size={16} />
            </button>

            {/* Italic */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => execCmd('italic')}
              title="Italic (Ctrl+I)"
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center justify-center"
            >
              <Italic size={16} />
            </button>

            {/* Normal / Plain */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleResetToNormal}
              title="Normal Text (Reset bold, italic & size)"
              className="px-2 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1"
            >
              <Type size={14} /> Normal
            </button>

            <span className="w-[1px] h-5 bg-slate-300 dark:bg-slate-600 mx-1" />

            {/* Font Size Selector */}
            <div className="flex items-center gap-1">
              <label htmlFor="fontSizeSelect" className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                Font Size:
              </label>
              <select
                id="fontSizeSelect"
                value={selectedFontSize}
                onMouseDown={() => saveSelection()}
                onChange={(e) => applyFontSize(e.target.value)}
                className="text-xs py-1 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                title="Change font size of selected text"
              >
                {FONT_SIZES.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            <span className="w-[1px] h-5 bg-slate-300 dark:bg-slate-600 mx-1" />

            {/* Headings */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => execCmd('formatBlock', 'h3')}
              title="Heading 2"
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Heading2 size={16} />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => execCmd('formatBlock', 'h4')}
              title="Heading 3"
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Heading3 size={16} />
            </button>

            {/* Lists */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => execCmd('insertUnorderedList')}
              title="Bullet List"
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => execCmd('insertOrderedList')}
              title="Numbered List"
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <ListOrdered size={16} />
            </button>

            {/* Clear Formatting */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => execCmd('removeFormat')}
              title="Clear all formatting"
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors ml-auto"
            >
              <RemoveFormatting size={16} />
            </button>
          </div>
        )}

        {/* Editor Body */}
        {isHtmlMode ? (
          <textarea
            value={value}
            onChange={(e) => {
              lastHtmlRef.current = e.target.value;
              onChange(e.target.value);
            }}
            rows={10}
            className="w-full p-4 font-mono text-xs bg-slate-900 text-slate-100 outline-none resize-y"
            placeholder="<p>Enter HTML markup...</p>"
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleContentChange}
            onBlur={handleContentChange}
            onMouseUp={saveSelection}
            onKeyUp={saveSelection}
            onSelect={saveSelection}
            className="p-4 min-h-[180px] max-h-[360px] overflow-y-auto outline-none text-slate-900 dark:text-slate-100 text-[15px] leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none prose dark:prose-invert max-w-none [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
            data-placeholder={placeholder}
            style={{ minHeight: '180px' }}
          />
        )}
      </div>

      {/* Footer / Helper Text */}
      <div className="flex items-center justify-between text-xs px-1">
        {error ? (
          <p className="text-red-500 font-medium">{error}</p>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">
            Format with <strong>Bold</strong>, <em>Italic</em>, <span>Normal</span> or custom font sizes.
          </p>
        )}
        <p className={`font-medium ${isOverLimit ? 'text-red-600' : 'text-slate-500 dark:text-slate-400'}`}>
          {charCount}/{maxLength} characters
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;
