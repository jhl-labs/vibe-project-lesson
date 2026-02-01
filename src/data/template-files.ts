// Vite ?raw import로 실제 .agent/ 파일 내용을 가져옵니다.
// 빌드 시 파일 내용이 문자열로 인라인됩니다.

import contextMd from '../../.agent/context.md?raw';
import conventionsMd from '../../.agent/conventions.md?raw';
import architectureMd from '../../.agent/architecture.md?raw';
import guidelinesMd from '../../.agent/guidelines.md?raw';
import commandsMd from '../../.agent/commands.md?raw';

import promptReadmeMd from '../../.agent/prompts/README.md?raw';
import promptApiDesignMd from '../../.agent/prompts/api-design.md?raw';
import promptApiDocsMd from '../../.agent/prompts/api-docs.md?raw';
import promptArchDecisionMd from '../../.agent/prompts/architecture-decision.md?raw';
import promptBugFixMd from '../../.agent/prompts/bug-fix.md?raw';
import promptCodeReviewMd from '../../.agent/prompts/code-review.md?raw';
import promptDbSchemaMd from '../../.agent/prompts/database-schema.md?raw';
import promptFeatureImplMd from '../../.agent/prompts/feature-implement.md?raw';
import promptMigrationMd from '../../.agent/prompts/migration.md?raw';
import promptPerfReviewMd from '../../.agent/prompts/performance-review.md?raw';
import promptReadmeGenMd from '../../.agent/prompts/readme-gen.md?raw';
import promptRefactorMd from '../../.agent/prompts/refactor.md?raw';
import promptSecurityReviewMd from '../../.agent/prompts/security-review.md?raw';
import promptTestGenMd from '../../.agent/prompts/test-generation.md?raw';
import promptUpgradeDependencyMd from '../../.agent/prompts/upgrade-dependency.md?raw';

import skillCodeReviewMd from '../../.agent/skills/code-review.md?raw';
import skillDocGenMd from '../../.agent/skills/doc-gen.md?raw';
import skillRefactorMd from '../../.agent/skills/refactor.md?raw';
import skillSecurityScanMd from '../../.agent/skills/security-scan.md?raw';
import skillTestGenMd from '../../.agent/skills/test-gen.md?raw';

import subagentArchitectMd from '../../.agent/subagents/architect.md?raw';
import subagentDocumentationMd from '../../.agent/subagents/documentation.md?raw';
import subagentSecurityMd from '../../.agent/subagents/security.md?raw';
import subagentTestMd from '../../.agent/subagents/test.md?raw';

import claudeMd from '../../CLAUDE.md?raw';
import mcpJsonExample from '../../.mcp.json.example?raw';

export const templateFiles = {
  // 메인 설정
  'CLAUDE.md': claudeMd,
  '.mcp.json.example': mcpJsonExample,

  // .agent/ 메인 파일
  '.agent/context.md': contextMd,
  '.agent/conventions.md': conventionsMd,
  '.agent/architecture.md': architectureMd,
  '.agent/guidelines.md': guidelinesMd,
  '.agent/commands.md': commandsMd,

  // 프롬프트 라이브러리
  '.agent/prompts/README.md': promptReadmeMd,
  '.agent/prompts/api-design.md': promptApiDesignMd,
  '.agent/prompts/api-docs.md': promptApiDocsMd,
  '.agent/prompts/architecture-decision.md': promptArchDecisionMd,
  '.agent/prompts/bug-fix.md': promptBugFixMd,
  '.agent/prompts/code-review.md': promptCodeReviewMd,
  '.agent/prompts/database-schema.md': promptDbSchemaMd,
  '.agent/prompts/feature-implement.md': promptFeatureImplMd,
  '.agent/prompts/migration.md': promptMigrationMd,
  '.agent/prompts/performance-review.md': promptPerfReviewMd,
  '.agent/prompts/readme-gen.md': promptReadmeGenMd,
  '.agent/prompts/refactor.md': promptRefactorMd,
  '.agent/prompts/security-review.md': promptSecurityReviewMd,
  '.agent/prompts/test-generation.md': promptTestGenMd,
  '.agent/prompts/upgrade-dependency.md': promptUpgradeDependencyMd,

  // 스킬
  '.agent/skills/code-review.md': skillCodeReviewMd,
  '.agent/skills/doc-gen.md': skillDocGenMd,
  '.agent/skills/refactor.md': skillRefactorMd,
  '.agent/skills/security-scan.md': skillSecurityScanMd,
  '.agent/skills/test-gen.md': skillTestGenMd,

  // 서브에이전트
  '.agent/subagents/architect.md': subagentArchitectMd,
  '.agent/subagents/documentation.md': subagentDocumentationMd,
  '.agent/subagents/security.md': subagentSecurityMd,
  '.agent/subagents/test.md': subagentTestMd,
} as const;

export type TemplateFileKey = keyof typeof templateFiles;
