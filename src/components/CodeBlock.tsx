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
      border: '1px solid #3d3d3d',
      overflow: 'hidden',
      margin: '16px 0',
      background: '#1e1e1e',
    }}>
      {filename && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: '#2d2d2d',
          borderBottom: '1px solid #3d3d3d',
          fontSize: '13px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#858585',
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
              color: copied ? '#16a34a' : '#858585',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              if (!copied) e.currentTarget.style.color = '#d4d4d4';
            }}
            onMouseOut={(e) => {
              if (!copied) e.currentTarget.style.color = '#858585';
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
              color: copied ? '#16a34a' : '#858585',
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
              ? 'rgba(218, 119, 86, 0.15)'
              : 'transparent',
            display: 'block',
            borderLeft: highlightLines.includes(lineNumber)
              ? '3px solid #da7756'
              : '3px solid transparent',
          },
        })}
        customStyle={{
          margin: 0,
          padding: '16px',
          background: '#1e1e1e',
          fontSize: '13px',
          lineHeight: '1.6',
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};
