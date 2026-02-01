import React from 'react';
import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'important';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, {
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  defaultTitle: string;
}> = {
  info: {
    icon: <Info size={18} />,
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.06)',
    border: 'rgba(59, 130, 246, 0.2)',
    defaultTitle: '참고',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    color: '#d97706',
    bg: 'rgba(217, 119, 6, 0.06)',
    border: 'rgba(217, 119, 6, 0.2)',
    defaultTitle: '주의',
  },
  tip: {
    icon: <Lightbulb size={18} />,
    color: '#16a34a',
    bg: 'rgba(22, 163, 74, 0.06)',
    border: 'rgba(22, 163, 74, 0.2)',
    defaultTitle: '팁',
  },
  important: {
    icon: <AlertCircle size={18} />,
    color: '#dc2626',
    bg: 'rgba(220, 38, 38, 0.06)',
    border: 'rgba(220, 38, 38, 0.2)',
    defaultTitle: '중요',
  },
};

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
}) => {
  const c = config[type];

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.color}`,
      borderRadius: '0 8px 8px 0',
      padding: '16px 20px',
      margin: '16px 0',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
        color: c.color,
        fontWeight: 600,
        fontSize: '14px',
      }}>
        {c.icon}
        <span>{title || c.defaultTitle}</span>
      </div>
      <div style={{
        color: '#5c564e',
        fontSize: '14px',
        lineHeight: '1.7',
      }}>
        {children}
      </div>
    </div>
  );
};
