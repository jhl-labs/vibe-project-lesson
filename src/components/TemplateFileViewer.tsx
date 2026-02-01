import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileCode, MessageSquare, Copy, Check } from 'lucide-react';

interface Annotation {
  lineStart: number;
  lineEnd: number;
  text: string;
}

interface TemplateFileViewerProps {
  filename: string;
  content: string;
  language?: string;
  annotations?: Annotation[];
}

export const TemplateFileViewer: React.FC<TemplateFileViewerProps> = ({
  filename,
  content,
  language = 'markdown',
  annotations = [],
}) => {
  const [copied, setCopied] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedLines = activeAnnotation !== null
    ? annotations[activeAnnotation]
      ? Array.from(
          { length: annotations[activeAnnotation].lineEnd - annotations[activeAnnotation].lineStart + 1 },
          (_, i) => annotations[activeAnnotation].lineStart + i,
        )
      : []
    : [];

  return (
    <div style={{
      display: 'flex',
      gap: '0',
      border: '1px solid #334155',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '16px 0',
      background: '#0f172a',
    }}>
      {/* Code panel */}
      <div style={{ flex: '1 1 65%', minWidth: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: '#1e293b',
          borderBottom: '1px solid #334155',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#94a3b8',
            fontSize: '13px',
          }}>
            <FileCode size={14} />
            <span>{filename}</span>
          </div>
          <button
            onClick={handleCopy}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: copied ? '#34d399' : '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <div style={{ maxHeight: '600px', overflow: 'auto' }}>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers
            wrapLines
            lineProps={(lineNumber) => ({
              style: {
                background: highlightedLines.includes(lineNumber)
                  ? 'rgba(99, 102, 241, 0.15)'
                  : 'transparent',
                display: 'block',
                borderLeft: highlightedLines.includes(lineNumber)
                  ? '3px solid #6366f1'
                  : '3px solid transparent',
              },
            })}
            customStyle={{
              margin: 0,
              padding: '16px',
              background: '#0f172a',
              fontSize: '12px',
              lineHeight: '1.6',
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Annotations panel */}
      {annotations.length > 0 && (
        <div style={{
          flex: '0 0 35%',
          borderLeft: '1px solid #334155',
          background: '#1e293b',
          overflow: 'auto',
          maxHeight: '660px',
        }}>
          <div style={{
            padding: '8px 16px',
            borderBottom: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#94a3b8',
            fontSize: '13px',
            fontWeight: 600,
          }}>
            <MessageSquare size={14} />
            <span>해설</span>
          </div>
          <div style={{ padding: '8px' }}>
            {annotations.map((ann, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  margin: '4px 0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: activeAnnotation === idx
                    ? 'rgba(99, 102, 241, 0.15)'
                    : 'transparent',
                  border: activeAnnotation === idx
                    ? '1px solid rgba(99, 102, 241, 0.3)'
                    : '1px solid transparent',
                  transition: 'all 0.15s',
                }}
                onClick={() =>
                  setActiveAnnotation(activeAnnotation === idx ? null : idx)
                }
                onMouseOver={(e) => {
                  if (activeAnnotation !== idx) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeAnnotation !== idx) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div style={{
                  fontSize: '11px',
                  color: '#818cf8',
                  marginBottom: '4px',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  L{ann.lineStart}
                  {ann.lineEnd !== ann.lineStart && `–L${ann.lineEnd}`}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#cbd5e1',
                  lineHeight: '1.6',
                }}>
                  {ann.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
