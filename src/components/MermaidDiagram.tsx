import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  title?: string;
  caption?: string;
}

let mermaidInitialized = false;

const initMermaid = () => {
  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#6366f1',
        primaryTextColor: '#f1f5f9',
        primaryBorderColor: '#818cf8',
        lineColor: '#94a3b8',
        secondaryColor: '#334155',
        tertiaryColor: '#1e293b',
        background: '#0f172a',
        mainBkg: '#1e293b',
        nodeBorder: '#818cf8',
        clusterBkg: '#1e293b',
        clusterBorder: '#475569',
        titleColor: '#f1f5f9',
        edgeLabelBackground: '#1e293b',
        noteTextColor: '#f1f5f9',
        noteBkgColor: '#334155',
        noteBorderColor: '#475569',
      },
      fontFamily: "'Pretendard Variable', sans-serif",
      flowchart: { curve: 'basis', padding: 16 },
      sequence: { actorMargin: 80, mirrorActors: false },
    });
    mermaidInitialized = true;
  }
};

let idCounter = 0;

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  title,
  caption,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const idRef = useRef(`mermaid-${Date.now()}-${idCounter++}`);

  useEffect(() => {
    initMermaid();

    const render = async () => {
      try {
        const { svg: rendered } = await mermaid.render(
          idRef.current,
          chart.trim(),
        );
        setSvg(rendered);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Mermaid render error');
        // mermaid render 실패 시 생성된 잘못된 DOM 요소 제거
        const badEl = document.getElementById(idRef.current);
        if (badEl) badEl.remove();
      }
    };

    render();
  }, [chart]);

  return (
    <div style={{
      margin: '16px 0',
      border: '1px solid #334155',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {title && (
        <div style={{
          padding: '12px 16px',
          background: '#1e293b',
          borderBottom: '1px solid #334155',
          color: '#e2e8f0',
          fontWeight: 600,
          fontSize: '14px',
        }}>
          {title}
        </div>
      )}
      <div
        ref={containerRef}
        className="mermaid-container"
        style={{
          padding: '24px',
          background: '#0f172a',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'auto',
        }}
      >
        {error ? (
          <div style={{ color: '#f87171', fontSize: '13px', fontFamily: 'monospace' }}>
            Mermaid Error: {error}
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        )}
      </div>
      {caption && (
        <div style={{
          padding: '8px 16px',
          background: '#1e293b',
          borderTop: '1px solid #334155',
          color: '#94a3b8',
          fontSize: '12px',
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
          {caption}
        </div>
      )}
    </div>
  );
};
