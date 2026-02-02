import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          '소개',
          'Part 1: 기초',
          [
            '바이브 코딩이란?',
            'Claude Code란?',
            '개발 환경 설정',
            'CLAUDE.md 딥다이브',
            '프롬프트 엔지니어링',
            '모델 선택 가이드',
            '엔터프라이즈 보안',
            '법적 윤리적 고려사항',
          ],
          'Part 2: 프로젝트 템플릿 구조',
          [
            '프로젝트 지식 구조',
            '컨텍스트와 컨벤션',
            '아키텍처',
            '가이드라인',
          ],
          'Part 3: AI Agent 워크플로우',
          [
            '슬래시 커맨드',
            '프롬프트 라이브러리',
            '스킬',
            '서브에이전트',
            'Hooks',
          ],
          'Part 4: MCP와 통합',
          [
            'MCP 개요',
            'MCP 서버 활용',
            'GitHub Actions',
          ],
          'Part 5: 실전 예제',
          [
            'TypeScript API',
            'Python API',
            '프론트엔드 프로젝트',
            'End-to-End 워크플로우',
          ],
          'Part 6: 모범 사례',
          ['보안', '팀 협업', '효과 측정'],
        ],
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
