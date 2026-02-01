import React from 'react';
import { Check, X, Minus } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  values: ('yes' | 'no' | 'partial' | string)[];
}

interface ComparisonTableProps {
  headers: string[];
  rows: ComparisonRow[];
  title?: string;
}

const renderValue = (value: string) => {
  if (value === 'yes') {
    return <Check size={16} color="#16a34a" />;
  }
  if (value === 'no') {
    return <X size={16} color="#dc2626" />;
  }
  if (value === 'partial') {
    return <Minus size={16} color="#d97706" />;
  }
  return <span style={{ color: '#5c564e', fontSize: '13px' }}>{value}</span>;
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  headers,
  rows,
  title,
}) => {
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
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '13px',
        }}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={{
                  padding: '10px 16px',
                  background: '#f0ece5',
                  color: '#c4613e',
                  fontWeight: 600,
                  textAlign: i === 0 ? 'left' : 'center',
                  borderBottom: '1px solid #e0d9cf',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                <td style={{
                  padding: '10px 16px',
                  color: '#2d2a26',
                  borderBottom: '1px solid #f0ece5',
                  fontWeight: 500,
                }}>
                  {row.feature}
                </td>
                {row.values.map((v, vi) => (
                  <td key={vi} style={{
                    padding: '10px 16px',
                    textAlign: 'center',
                    borderBottom: '1px solid #f0ece5',
                  }}>
                    {renderValue(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
