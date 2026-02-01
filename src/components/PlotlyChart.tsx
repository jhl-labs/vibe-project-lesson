import React, { useMemo } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';

const Plot = createPlotlyComponent(Plotly);

interface PlotlyChartProps {
  data: Plotly.Data[];
  layout?: Partial<Plotly.Layout>;
  title?: string;
  height?: number;
}

export const PlotlyChart: React.FC<PlotlyChartProps> = ({
  data,
  layout: userLayout,
  title,
  height = 400,
}) => {
  const mergedLayout = useMemo<Partial<Plotly.Layout>>(() => ({
    paper_bgcolor: '#1e293b',
    plot_bgcolor: '#0f172a',
    font: {
      family: "'Pretendard Variable', sans-serif",
      color: '#cbd5e1',
      size: 12,
    },
    margin: { t: 40, r: 24, b: 48, l: 48 },
    height,
    xaxis: {
      gridcolor: '#334155',
      linecolor: '#475569',
      zerolinecolor: '#475569',
      ...userLayout?.xaxis,
    } as Partial<Plotly.LayoutAxis>,
    yaxis: {
      gridcolor: '#334155',
      linecolor: '#475569',
      zerolinecolor: '#475569',
      ...userLayout?.yaxis,
    } as Partial<Plotly.LayoutAxis>,
    legend: {
      font: { color: '#cbd5e1' },
      bgcolor: 'rgba(0,0,0,0)',
      ...userLayout?.legend,
    },
    ...userLayout,
    // xaxis/yaxis는 위에서 이미 머지했으므로 다시 덮어쓰기
    ...(userLayout?.xaxis ? {} : {}),
  }), [userLayout, height]);

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
      <div className="plotly-container" style={{ background: '#1e293b' }}>
        <Plot
          data={data}
          layout={mergedLayout}
          config={{
            displayModeBar: false,
            responsive: true,
          }}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};
