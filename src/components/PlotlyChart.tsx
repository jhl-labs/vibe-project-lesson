import React, { useMemo } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';

const Plot = createPlotlyComponent(Plotly);

type AxisLayout = Record<string, unknown>;
type LegendLayout = Record<string, unknown>;
type PlotlyLayout = Record<string, unknown> & {
  xaxis?: AxisLayout;
  yaxis?: AxisLayout;
  legend?: LegendLayout;
  height?: number;
};

interface PlotlyChartProps {
  data: Record<string, unknown>[];
  layout?: PlotlyLayout;
  title?: string;
  height?: number;
}

export const PlotlyChart: React.FC<PlotlyChartProps> = ({
  data,
  layout: userLayout,
  title,
  height = 400,
}) => {
  const mergedLayout = useMemo<PlotlyLayout>(() => {
    const xaxis = {
      gridcolor: '#e0d9cf',
      linecolor: '#d4cdc4',
      zerolinecolor: '#d4cdc4',
      ...(userLayout?.xaxis ?? {}),
    };

    const yaxis = {
      gridcolor: '#e0d9cf',
      linecolor: '#d4cdc4',
      zerolinecolor: '#d4cdc4',
      ...(userLayout?.yaxis ?? {}),
    };

    const legend = {
      font: { color: '#5c564e' },
      bgcolor: 'rgba(0,0,0,0)',
      ...(userLayout?.legend ?? {}),
    };

    return {
      paper_bgcolor: '#f0ece5',
      plot_bgcolor: '#faf9f7',
      font: {
        family: "'Pretendard Variable', sans-serif",
        color: '#5c564e',
        size: 12,
      },
      margin: { t: 40, r: 24, b: 48, l: 48 },
      height,
      ...(userLayout ?? {}),
      xaxis,
      yaxis,
      legend,
    };
  }, [userLayout, height]);

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
