import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
}

export const Quiz: React.FC<QuizProps> = ({
  questions,
  title = '퀴즈',
}) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];
  const isCorrect = selected === q?.correctIndex;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '8px',
        padding: '32px',
        margin: '16px 0',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: 700,
          color: pct >= 80 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#f87171',
          marginBottom: '8px',
        }}>
          {pct}%
        </div>
        <div style={{
          color: '#e2e8f0',
          fontSize: '16px',
          marginBottom: '4px',
        }}>
          {score}/{questions.length} 정답
        </div>
        <div style={{
          color: '#94a3b8',
          fontSize: '14px',
          marginBottom: '24px',
        }}>
          {pct >= 80
            ? '훌륭합니다! 내용을 잘 이해하고 있습니다.'
            : pct >= 50
              ? '좋습니다! 몇 가지 더 복습해보세요.'
              : '다시 한번 내용을 검토해보세요.'
          }
        </div>
        <button
          onClick={handleReset}
          style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <RotateCcw size={16} />
          다시 풀기
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '16px 0',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        background: '#334155',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#e2e8f0',
          fontWeight: 600,
          fontSize: '14px',
        }}>
          <HelpCircle size={16} color="#818cf8" />
          {title}
        </div>
        <div style={{
          color: '#94a3b8',
          fontSize: '12px',
        }}>
          {currentQ + 1} / {questions.length}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '3px',
        background: '#0f172a',
      }}>
        <div style={{
          height: '100%',
          width: `${((currentQ + (showResult ? 1 : 0)) / questions.length) * 100}%`,
          background: '#6366f1',
          transition: 'width 0.3s',
        }} />
      </div>

      {/* Question */}
      <div style={{ padding: '24px 20px' }}>
        <div style={{
          color: '#f1f5f9',
          fontSize: '15px',
          fontWeight: 500,
          marginBottom: '20px',
          lineHeight: '1.6',
        }}>
          {q.question}
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            const isAnswer = i === q.correctIndex;
            let borderColor = '#334155';
            let bg = 'transparent';

            if (showResult) {
              if (isAnswer) {
                borderColor = '#34d399';
                bg = 'rgba(52, 211, 153, 0.1)';
              } else if (isSelected && !isAnswer) {
                borderColor = '#f87171';
                bg = 'rgba(248, 113, 113, 0.1)';
              }
            } else if (isSelected) {
              borderColor = '#6366f1';
              bg = 'rgba(99, 102, 241, 0.1)';
            }

            return (
              <div
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  padding: '12px 16px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '6px',
                  cursor: showResult ? 'default' : 'pointer',
                  background: bg,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.15s',
                }}
                onMouseOver={(e) => {
                  if (!showResult) {
                    e.currentTarget.style.borderColor = '#6366f1';
                  }
                }}
                onMouseOut={(e) => {
                  if (!showResult && !isSelected) {
                    e.currentTarget.style.borderColor = '#334155';
                  }
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#94a3b8',
                }}>
                  {showResult && isAnswer
                    ? <CheckCircle size={18} color="#34d399" />
                    : showResult && isSelected && !isAnswer
                      ? <XCircle size={18} color="#f87171" />
                      : String.fromCharCode(65 + i)
                  }
                </div>
                <span style={{
                  color: '#e2e8f0',
                  fontSize: '14px',
                }}>
                  {opt}
                </span>
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: isCorrect
              ? 'rgba(52, 211, 153, 0.08)'
              : 'rgba(248, 113, 113, 0.08)',
            border: `1px solid ${isCorrect
              ? 'rgba(52, 211, 153, 0.3)'
              : 'rgba(248, 113, 113, 0.3)'}`,
            borderRadius: '6px',
          }}>
            <div style={{
              color: isCorrect ? '#34d399' : '#f87171',
              fontWeight: 600,
              fontSize: '13px',
              marginBottom: '6px',
            }}>
              {isCorrect ? '정답입니다!' : '틀렸습니다'}
            </div>
            <div style={{
              color: '#cbd5e1',
              fontSize: '13px',
              lineHeight: '1.6',
            }}>
              {q.explanation}
            </div>
          </div>
        )}

        {/* Next button */}
        {showResult && (
          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <button
              onClick={handleNext}
              style={{
                background: '#6366f1',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {currentQ < questions.length - 1 ? '다음 문제' : '결과 보기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
