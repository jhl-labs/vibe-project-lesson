// Vite ?raw import로 실제 파일 내용을 가져옵니다.
// 빌드 시 파일 내용이 문자열로 인라인됩니다.

import contextMd from '../../docs/context.md?raw';
import conventionsMd from '../../.claude/rules/conventions.md?raw';
import architectureMd from '../../.claude/rules/architecture.md?raw';
import guidelinesMd from '../../.claude/rules/guidelines.md?raw';

import promptReadmeMd from '../../docs/prompts/README.md?raw';
import promptApiDesignMd from '../../docs/prompts/api-design.md?raw';
import promptApiDocsMd from '../../docs/prompts/api-docs.md?raw';
import promptArchDecisionMd from '../../docs/prompts/architecture-decision.md?raw';
import promptBugFixMd from '../../docs/prompts/bug-fix.md?raw';
import promptCodeReviewMd from '../../docs/prompts/code-review.md?raw';
import promptDbSchemaMd from '../../docs/prompts/database-schema.md?raw';
import promptFeatureImplMd from '../../docs/prompts/feature-implement.md?raw';
import promptMigrationMd from '../../docs/prompts/migration.md?raw';
import promptPerfReviewMd from '../../docs/prompts/performance-review.md?raw';
import promptReadmeGenMd from '../../docs/prompts/readme-gen.md?raw';
import promptRefactorMd from '../../docs/prompts/refactor.md?raw';
import promptSecurityReviewMd from '../../docs/prompts/security-review.md?raw';
import promptTestGenMd from '../../docs/prompts/test-generation.md?raw';
import promptUpgradeDependencyMd from '../../docs/prompts/upgrade-dependency.md?raw';

import skillCodeReviewMd from '../../.claude/skills/code-review/SKILL.md?raw';
import skillDocGenMd from '../../.claude/skills/doc-gen/SKILL.md?raw';
import skillRefactorMd from '../../.claude/skills/refactor/SKILL.md?raw';
import skillSecurityScanMd from '../../.claude/skills/security-scan/SKILL.md?raw';
import skillTestGenMd from '../../.claude/skills/test-gen/SKILL.md?raw';

import subagentArchitectMd from '../../.claude/agents/architect.md?raw';
import subagentDocumentationMd from '../../.claude/agents/documentation.md?raw';
import subagentSecurityMd from '../../.claude/agents/security.md?raw';
import subagentTestMd from '../../.claude/agents/test.md?raw';

import claudeMd from '../../CLAUDE.md?raw';
import mcpJsonExample from '../../.mcp.json.example?raw';

export const templateFiles = {
  // 메인 설정
  'CLAUDE.md': claudeMd,
  '.mcp.json.example': mcpJsonExample,

  // 프로젝트 규칙 (.claude/rules/)
  '.claude/rules/conventions.md': conventionsMd,
  '.claude/rules/architecture.md': architectureMd,
  '.claude/rules/guidelines.md': guidelinesMd,

  // 프로젝트 컨텍스트
  'docs/context.md': contextMd,

  // 프롬프트 라이브러리
  'docs/prompts/README.md': promptReadmeMd,
  'docs/prompts/api-design.md': promptApiDesignMd,
  'docs/prompts/api-docs.md': promptApiDocsMd,
  'docs/prompts/architecture-decision.md': promptArchDecisionMd,
  'docs/prompts/bug-fix.md': promptBugFixMd,
  'docs/prompts/code-review.md': promptCodeReviewMd,
  'docs/prompts/database-schema.md': promptDbSchemaMd,
  'docs/prompts/feature-implement.md': promptFeatureImplMd,
  'docs/prompts/migration.md': promptMigrationMd,
  'docs/prompts/performance-review.md': promptPerfReviewMd,
  'docs/prompts/readme-gen.md': promptReadmeGenMd,
  'docs/prompts/refactor.md': promptRefactorMd,
  'docs/prompts/security-review.md': promptSecurityReviewMd,
  'docs/prompts/test-generation.md': promptTestGenMd,
  'docs/prompts/upgrade-dependency.md': promptUpgradeDependencyMd,

  // 스킬 (.claude/skills/)
  '.claude/skills/code-review/SKILL.md': skillCodeReviewMd,
  '.claude/skills/doc-gen/SKILL.md': skillDocGenMd,
  '.claude/skills/refactor/SKILL.md': skillRefactorMd,
  '.claude/skills/security-scan/SKILL.md': skillSecurityScanMd,
  '.claude/skills/test-gen/SKILL.md': skillTestGenMd,

  // 서브에이전트 (.claude/agents/)
  '.claude/agents/architect.md': subagentArchitectMd,
  '.claude/agents/documentation.md': subagentDocumentationMd,
  '.claude/agents/security.md': subagentSecurityMd,
  '.claude/agents/test.md': subagentTestMd,
} as const;

export type TemplateFileKey = keyof typeof templateFiles;
