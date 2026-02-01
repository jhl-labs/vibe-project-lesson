import React from 'react';
import { Circle } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  highlight?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
  title?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ events, title }) => {
  return (
    <div style={{
      margin: '16px 0',
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '20px 24px',
    }}>
      {title && (
        <div style={{
          color: '#e2e8f0',
          fontWeight: 600,
          fontSize: '15px',
          marginBottom: '20px',
        }}>
          {title}
        </div>
      )}
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: '7px',
          top: '8px',
          bottom: '8px',
          width: '2px',
          background: '#334155',
        }} />

        {events.map((event, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: i < events.length - 1 ? '24px' : 0,
              position: 'relative',
            }}
          >
            <div style={{
              flexShrink: 0,
              marginTop: '2px',
              zIndex: 1,
            }}>
              <Circle
                size={16}
                fill={event.highlight ? '#6366f1' : '#334155'}
                color={event.highlight ? '#818cf8' : '#475569'}
              />
            </div>
            <div>
              <div style={{
                fontSize: '12px',
                color: event.highlight ? '#818cf8' : '#64748b',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '4px',
              }}>
                {event.date}
              </div>
              <div style={{
                fontSize: '14px',
                color: event.highlight ? '#e2e8f0' : '#cbd5e1',
                fontWeight: event.highlight ? 600 : 500,
                marginBottom: '4px',
              }}>
                {event.title}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#94a3b8',
                lineHeight: '1.6',
              }}>
                {event.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
