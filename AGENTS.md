# AGENTS.md

> Cross-tool standard for AI coding agents (OpenAI Codex, Cursor, Google Jules, GitHub Copilot, etc.)

## Project Overview

TypeScript + Express.js REST API with Clean Architecture (4-layer).

## Coding Standards

- Use camelCase for variables/functions, PascalCase for classes
- File naming: kebab-case.ts
- Max function length: 30 lines, max parameters: 3
- Always handle errors explicitly
- Conventional Commits for git messages

## Architecture

4-layer Clean Architecture: Presentation -> Application -> Domain <- Infrastructure

- **Domain**: Pure business logic, no external dependencies
- **Application**: Use cases, orchestration, transaction boundaries
- **Infrastructure**: Database, external APIs, message queues
- **Presentation**: HTTP controllers, input validation, DTO conversion

Dependencies always point inward (Dependency Inversion Principle).

## Security

**NEVER:**
- Hardcode secrets or credentials
- Use eval() or dynamic code execution
- Trust user input without validation
- Expose sensitive data in logs or error messages

**ALWAYS:**
- Validate and sanitize all inputs
- Use parameterized queries
- Use environment variables for configuration

## Testing

- Unit tests required for all domain logic
- Integration tests for API endpoints
- AAA pattern: Arrange-Act-Assert
- Test coverage: min 70% lines, 90% for critical business logic
