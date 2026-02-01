import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, FileCode } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
  highlightLines = [],
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      borderRadius: '8px',
      border: '1px solid #334155',
      overflow: 'hidden',
      margin: '16px 0',
      background: '#0f172a',
    }}>
      {filename && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: '#1e293b',
          borderBottom: '1px solid #334155',
          fontSize: '13px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#94a3b8',
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
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              if (!copied) e.currentTarget.style.color = '#e2e8f0';
            }}
            onMouseOut={(e) => {
              if (!copied) e.currentTarget.style.color = '#94a3b8';
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? '복사됨' : '복사'}
          </button>
        </div>
      )}
      {!filename && (
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '4px 8px',
          position: 'relative',
        }}>
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
              padding: '4px 8px',
              borderRadius: '4px',
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 1,
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        wrapLines
        lineProps={(lineNumber) => ({
          style: {
            background: highlightLines.includes(lineNumber)
              ? 'rgba(99, 102, 241, 0.15)'
              : 'transparent',
            display: 'block',
            borderLeft: highlightLines.includes(lineNumber)
              ? '3px solid #6366f1'
              : '3px solid transparent',
          },
        })}
        customStyle={{
          margin: 0,
          padding: '16px',
          background: '#0f172a',
          fontSize: '13px',
          lineHeight: '1.6',
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};
