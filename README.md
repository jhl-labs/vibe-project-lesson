# Vibe Project Lesson

> **Storybook 기반 Claude Code 교육 플랫폼** — Vibe Coding을 체계적으로 배우는 인터랙티브 학습 환경

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 이 프로젝트는?

AI Agent(Claude Code, Cursor, Copilot 등)와 협업하는 **Vibe Coding** 방법론을 **Storybook + MDX**로 구성한 교육 콘텐츠입니다. 브라우저에서 바로 학습할 수 있는 28개의 인터랙티브 레슨을 제공합니다.

```
기초 개념 → 프로젝트 구조 → AI 워크플로우 → MCP 통합 → 실전 예제 → 모범 사례
```

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 18, TypeScript 5.9 |
| 문서 플랫폼 | Storybook 10, MDX |
| 빌드 | Vite 6 |
| 시각화 | Mermaid, Plotly.js |
| 데이터 테이블 | TanStack React Table |
| 패키지 매니저 | pnpm |

---

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:6006)
pnpm dev
```

---

## 커리큘럼

6개 Part, 28개 모듈로 구성된 학습 과정입니다.

### Part 0: 소개
- 프로젝트 소개 및 학습 안내

### Part 1: 기초 (8개 모듈)
- Vibe Coding이란 무엇인가
- Claude Code 소개
- CLAUDE.md 심층 가이드
- 엔터프라이즈 보안
- 프롬프트 엔지니어링
- 모델 선택 가이드
- 개발 환경 설정
- 법적/윤리적 고려사항

### Part 2: 프로젝트 템플릿 구조 (4개 모듈)
- .agent 디렉토리 개요
- 컨텍스트와 컨벤션
- 아키텍처
- 가이드라인

### Part 3: AI Agent 워크플로우 (5개 모듈)
- 슬래시 커맨드
- 프롬프트 라이브러리
- 스킬(Skills)
- 서브에이전트(Sub-agents)
- 훅(Hooks)

### Part 4: MCP와 통합 (3개 모듈)
- MCP 개요
- GitHub Actions 통합
- MCP 서버 구성

### Part 5: 실전 예제 (4개 모듈)
- TypeScript API 프로젝트
- Python API 프로젝트
- 프론트엔드 프로젝트
- 엔드-투-엔드 워크플로우

### Part 6: 모범 사례 (3개 모듈)
- 보안
- 팀 협업
- 효과 측정

---

## 프로젝트 구조

```
vibe-project-lesson/
├── .storybook/                # Storybook 설정
│   ├── main.ts               #   MDX 로더, 애드온 설정
│   ├── preview.ts             #   한국어 네비게이션, 글로벌 스타일
│   └── manager.ts             #   Claude 브랜드 테마
│
├── src/
│   ├── chapters/              # 교육 콘텐츠 (28개 MDX)
│   │   ├── 00-intro/
│   │   ├── 01-foundations/          # Part 1: 기초
│   │   ├── 02-template-structure/   # Part 2: 템플릿 구조
│   │   ├── 03-ai-workflows/         # Part 3: AI 워크플로우
│   │   ├── 04-mcp-integration/      # Part 4: MCP 통합
│   │   ├── 05-examples/             # Part 5: 실전 예제
│   │   └── 06-best-practices/       # Part 6: 모범 사례
│   │
│   ├── components/            # React 컴포넌트 (11개)
│   │   ├── Callout.tsx        #   알림 박스 (info, warning, tip)
│   │   ├── CodeBlock.tsx      #   코드 블록 (라인번호, 복사, 하이라이트)
│   │   ├── ComparisonTable.tsx
│   │   ├── DataTable.tsx      #   TanStack 기반 데이터 테이블
│   │   ├── FileTree.tsx       #   파일 트리 시각화
│   │   ├── MermaidDiagram.tsx #   Mermaid 다이어그램
│   │   ├── PlotlyChart.tsx    #   Plotly 인터랙티브 차트
│   │   ├── Quiz.tsx           #   퀴즈
│   │   ├── TemplateFileViewer.tsx
│   │   ├── Timeline.tsx
│   │   └── ChapterNav.tsx     #   챕터 네비게이션
│   │
│   ├── data/
│   │   └── template-files.ts  # 템플릿 파일 매핑 (42개 raw import)
│   │
│   ├── styles/
│   │   └── global.css         # Claude 테마 글로벌 스타일
│   │
│   └── assets/images/         # 이미지 리소스
│
├── .claude/                   # Claude Code 설정 (교육 참고용)
│   ├── commands/              #   커스텀 슬래시 커맨드
│   ├── rules/                 #   프로젝트 규칙
│   ├── agents/                #   서브에이전트 정의
│   └── skills/                #   스킬 정의
│
├── docs/                      # 참고 문서
│   ├── guides/                #   가이드 (8개)
│   └── prompts/               #   프롬프트 템플릿 (15개)
│
└── examples/                  # 예제 프로젝트
    ├── typescript-api/
    └── python-api/
```

---

## 주요 컴포넌트

교육 콘텐츠에서 사용하는 인터랙티브 컴포넌트들입니다.

| 컴포넌트 | 용도 |
|----------|------|
| `Callout` | info, warning, tip, important 알림 박스 |
| `CodeBlock` | 코드 블록 (라인 번호, 복사, 하이라이트) |
| `FileTree` | 디렉토리 구조 시각화 |
| `MermaidDiagram` | 아키텍처/플로우 다이어그램 |
| `PlotlyChart` | 데이터 시각화 차트 |
| `DataTable` | 정렬/필터 가능한 데이터 테이블 |
| `Quiz` | 학습 확인 퀴즈 |
| `ComparisonTable` | 좌우 비교 테이블 |
| `Timeline` | 타임라인 표현 |
| `TemplateFileViewer` | 템플릿 파일 내용 뷰어 |

---

## 빌드

```bash
# 정적 사이트 빌드
pnpm build-storybook

# 빌드 결과: storybook-static/
```

---

## 라이선스

[MIT](LICENSE)
