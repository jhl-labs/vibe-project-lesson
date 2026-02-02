import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChapterNavProps {
  prev?: { title: string; path: string };
  next?: { title: string; path: string };
}

const toStoryId = (path: string): string => {
  let storyId = path.replace(/^\/docs\//, '');
  storyId = storyId.replace(/--/g, '-');
  return `${storyId}--docs`;
};

const NavButton: React.FC<{
  direction: 'prev' | 'next';
  title: string;
  path: string;
}> = ({ direction, title, path }) => {
  const isPrev = direction === 'prev';

  const handleClick = () => {
    const storyId = toStoryId(path);

    // Storybook 내부 채널 API로 네비게이션 (iframe/inline 모두 지원)
    const channel =
      (window as any).__STORYBOOK_ADDONS_CHANNEL__ ||
      (window as any).parent?.__STORYBOOK_ADDONS_CHANNEL__ ||
      (window as any).top?.__STORYBOOK_ADDONS_CHANNEL__;

    if (channel) {
      channel.emit('selectStory', { storyId });
      return;
    }

    // 채널 없을 경우 URL 기반 fallback
    const top = window.top || window;
    const base = top.location.href.split('?')[0];
    top.location.href = `${base}?path=/docs/${storyId}`;
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
