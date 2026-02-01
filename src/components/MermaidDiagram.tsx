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
      theme: 'default',
      themeVariables: {
        primaryColor: '#fdf2ee',
        primaryTextColor: '#2d2a26',
        primaryBorderColor: '#da7756',
        lineColor: '#8c857c',
        secondaryColor: '#f0ece5',
        tertiaryColor: '#faf9f7',
        background: '#faf9f7',
        mainBkg: '#fdf2ee',
        nodeBorder: '#da7756',
        clusterBkg: '#f0ece5',
        clusterBorder: '#d4cdc4',
        titleColor: '#2d2a26',
        edgeLabelBackground: '#faf9f7',
        noteTextColor: '#2d2a26',
        noteBkgColor: '#f0ece5',
        noteBorderColor: '#d4cdc4',
      },
      fontFamily: "'Pretendard Variable', sans-serif",
      flowchart: { curve: 'basis', padding: 16 },
      sequence: { actorMargin: 80, mirrorActors: false, useMaxWidth: true },
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
      border: '1px solid #e0d9cf',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {title && (
        <div style={{
          padding: '12px 16px',
          background: '#f0ece5',
          borderBottom: '1px solid #e0d9cf',
          color: '#2d2a26',
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
          background: '#faf9f7',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'auto',
          minHeight: '200px',
        }}
      >
        {error ? (
          <div style={{ color: '#dc2626', fontSize: '13px', fontFamily: 'monospace' }}>
            Mermaid Error: {error}
          </div>
        ) : (
          <div style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: svg }} />
        )}
      </div>
      {caption && (
        <div style={{
          padding: '8px 16px',
          background: '#f0ece5',
          borderTop: '1px solid #e0d9cf',
          color: '#8c857c',
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
