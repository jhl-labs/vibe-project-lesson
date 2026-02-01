import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChapterNavProps {
  prev?: { title: string; path: string };
  next?: { title: string; path: string };
}

const NavButton: React.FC<{
  direction: 'prev' | 'next';
  title: string;
}> = ({ direction, title }) => {
  const isPrev = direction === 'prev';

  return (
    <div style={{
      flex: 1,
      padding: '16px 20px',
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '8px',
      cursor: 'default',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexDirection: isPrev ? 'row' : 'row-reverse',
      textAlign: isPrev ? 'left' : 'right',
      transition: 'border-color 0.2s',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.borderColor = '#6366f1';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.borderColor = '#334155';
    }}
    >
      {isPrev
        ? <ChevronLeft size={18} color="#818cf8" />
        : <ChevronRight size={18} color="#818cf8" />
      }
      <div>
        <div style={{
          fontSize: '11px',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '4px',
        }}>
          {isPrev ? '이전 챕터' : '다음 챕터'}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#e2e8f0',
          fontWeight: 500,
        }}>
          {title}
        </div>
      </div>
    </div>
  );
};

export const ChapterNav: React.FC<ChapterNavProps> = ({ prev, next }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      marginTop: '48px',
      paddingTop: '24px',
      borderTop: '1px solid #334155',
    }}>
      {prev ? (
        <NavButton direction="prev" title={prev.title} />
      ) : (
        <div style={{ flex: 1 }} />
      )}
      {next ? (
        <NavButton direction="next" title={next.title} />
      ) : (
        <div style={{ flex: 1 }} />
      )}
    </div>
  );
};
