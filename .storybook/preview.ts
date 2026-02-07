import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          '소개',
          'Part 1: 시작하기',
          [
            '바이브 코딩이란?',
            'Claude Code란?',
            '개발 환경 설정',
            '모델 선택 가이드',
          ],
          'Part 2: 프로젝트 설정',
          [
            'CLAUDE.md 딥다이브',
            '프로젝트 지식 구조',
            '아키텍처',
            '가이드라인',
            '문서 템플릿',
          ],
          'Part 3: 핵심 기능',
          [
            '커맨드와 스킬',
            '프롬프트 엔지니어링',
            '프롬프트 라이브러리',
            '에이전트',
            'Hooks',
            'Plugins',
          ],
          'Part 4: 확장과 자동화',
          [
            'MCP 개요',
            'MCP 서버 활용',
            'CI/CD 통합',
            'Agent SDK와 자동화',
          ],
          'Part 5: 실전 예제',
          [
            'TypeScript API',
            'Python API',
            '프론트엔드 프로젝트',
            'E2E 워크플로우',
          ],
          'Part 6: 거버넌스',
          [
            '보안',
            '법적 윤리적 고려사항',
            '팀 협업',
            '효과 측정',
          ],
        ],
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
