import React from 'react';
import { Circle } from 'lucide-react';

interface TimelineEvent {
  date?: string;
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
      background: '#f0ece5',
      border: '1px solid #e0d9cf',
      borderRadius: '8px',
      padding: '20px 24px',
    }}>
      {title && (
        <div style={{
          color: '#2d2a26',
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
          background: '#d4cdc4',
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
                fill={event.highlight ? '#da7756' : '#d4cdc4'}
                color={event.highlight ? '#c4613e' : '#8c857c'}
              />
            </div>
            <div>
              {event.date && <div style={{
                fontSize: '12px',
                color: event.highlight ? '#c4613e' : '#8c857c',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '4px',
              }}>
                {event.date}
              </div>}
              <div style={{
                fontSize: '14px',
                color: event.highlight ? '#2d2a26' : '#5c564e',
                fontWeight: event.highlight ? 600 : 500,
                marginBottom: '4px',
              }}>
                {event.title}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#8c857c',
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
