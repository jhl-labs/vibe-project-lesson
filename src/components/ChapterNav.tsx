import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChapterNavProps {
  prev?: { title: string; path: string };
  next?: { title: string; path: string };
}

const NavButton: React.FC<{
  direction: 'prev' | 'next';
  title: string;
  path: string;
}> = ({ direction, title, path }) => {
  const isPrev = direction === 'prev';

  const handleClick = () => {
    // path를 Storybook story ID로 변환
    // MDX path 예: "/docs/part-1--기초-바이브-코딩이란"
    // Storybook ID: "part-1-기초-바이브-코딩이란--docs"
    let storyId = path.replace(/^\/docs\//, '');
    // "part-1--기초" → "part-1-기초" (더블 하이픈을 싱글로)
    storyId = storyId.replace(/--/g, '-');
    // 끝에 --docs 붙이기
    storyId = `${storyId}--docs`;

    const targetUrl = `${window.location.origin}/?path=/docs/${storyId}`;
    if (window.top) {
      window.top.location.href = targetUrl;
    } else {
      window.location.href = targetUrl;
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      style={{
        flex: 1,
        padding: '16px 20px',
        background: '#f0ece5',
        border: '1px solid #e0d9cf',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexDirection: isPrev ? 'row' : 'row-reverse',
        textAlign: isPrev ? 'left' : 'right',
        transition: 'border-color 0.2s',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = '#da7756';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = '#e0d9cf';
      }}
    >
      {isPrev
        ? <ChevronLeft size={18} color="#da7756" />
        : <ChevronRight size={18} color="#da7756" />
      }
      <div>
        <div style={{
          fontSize: '11px',
          color: '#8c857c',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '4px',
        }}>
          {isPrev ? '이전 챕터' : '다음 챕터'}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#2d2a26',
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
      borderTop: '1px solid #e0d9cf',
    }}>
      {prev ? (
        <NavButton direction="prev" title={prev.title} path={prev.path} />
      ) : (
        <div style={{ flex: 1 }} />
      )}
      {next ? (
        <NavButton direction="next" title={next.title} path={next.path} />
      ) : (
        <div style={{ flex: 1 }} />
      )}
    </div>
  );
};
