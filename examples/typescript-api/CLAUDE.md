# CLAUDE.md - TypeScript API Example

> 이 프로젝트의 AI Agent 지시사항

## 상위 템플릿 참조

이 프로젝트는 Vibe Project Template을 기반으로 합니다.
공통 규칙은 `../../CLAUDE.md`를 참조하세요.

---

## 프로젝트 개요

Express + Prisma + Jest 기반 Clean Architecture API

## 기술 스택

- Runtime: Node.js 20, TypeScript 5
- Framework: Express.js
- ORM: Prisma (PostgreSQL)
- Test: Jest + ts-jest + supertest

## 아키텍처 규칙

- src/domain/: 순수 비즈니스 로직 (외부 의존성 금지)
- src/application/: 유스케이스 (Domain 인터페이스만 의존)
- src/infrastructure/: DB, 외부 API 구현체
- src/presentation/: HTTP 컨트롤러

### 디렉토리별 파일 구조

```
domain/user/
  entity.ts         # User 엔터티
  value-objects.ts   # 값 객체 (Email)
  repository.ts      # IUserRepository 인터페이스

application/user/
  create-user.ts     # 사용자 생성 유스케이스
  get-user.ts        # 사용자 조회 유스케이스
  dtos.ts            # DTO 정의

infrastructure/persistence/
  prisma-user-repository.ts  # Prisma 구현체

presentation/http/
  user-controller.ts  # REST API 컨트롤러
```

## 코딩 컨벤션

- 파일명: kebab-case.ts
- 클래스: PascalCase, 함수/변수: camelCase
- Conventional Commits (feat:, fix:, refactor:)
- 함수 최대 30줄

## 테스트 규칙

- 단위 테스트: Repository를 jest.Mocked로 mock
- 통합 테스트: supertest + 테스트 DB
- 테스트 파일: tests/*.test.ts

## 주요 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 빌드
npm test            # 테스트
npm run lint        # 린트
npm run db:migrate  # DB 마이그레이션
```
