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
    paper_bgcolor: '#f0ece5',
    plot_bgcolor: '#faf9f7',
    font: {
      family: "'Pretendard Variable', sans-serif",
      color: '#5c564e',
      size: 12,
    },
    margin: { t: 40, r: 24, b: 48, l: 48 },
    height,
    xaxis: {
      gridcolor: '#e0d9cf',
      linecolor: '#d4cdc4',
      zerolinecolor: '#d4cdc4',
      ...userLayout?.xaxis,
    } as Partial<Plotly.LayoutAxis>,
    yaxis: {
      gridcolor: '#e0d9cf',
      linecolor: '#d4cdc4',
      zerolinecolor: '#d4cdc4',
      ...userLayout?.yaxis,
    } as Partial<Plotly.LayoutAxis>,
    legend: {
      font: { color: '#5c564e' },
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
      <div className="plotly-container" style={{ background: '#f0ece5' }}>
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
