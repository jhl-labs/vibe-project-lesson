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
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.08)',
    border: 'rgba(56, 189, 248, 0.3)',
    defaultTitle: '참고',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.08)',
    border: 'rgba(251, 191, 36, 0.3)',
    defaultTitle: '주의',
  },
  tip: {
    icon: <Lightbulb size={18} />,
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.08)',
    border: 'rgba(52, 211, 153, 0.3)',
    defaultTitle: '팁',
  },
  important: {
    icon: <AlertCircle size={18} />,
    color: '#f87171',
    bg: 'rgba(248, 113, 113, 0.08)',
    border: 'rgba(248, 113, 113, 0.3)',
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
        color: '#cbd5e1',
        fontSize: '14px',
        lineHeight: '1.7',
      }}>
        {children}
      </div>
    </div>
  );
};
