## Context

OpenSpec now defines a role-based orchestration protocol in shared OPSX templates, but Codex-native multi-agent execution still relies on generic wording. This causes two gaps for real multi-agent sessions: (1) role-to-sub-agent assignment is not explicit enough for consistent execution, and (2) orchestration authority boundaries between the main agent and role agents are not formalized in an implementation-oriented structure.

This change focuses on Codex runtime alignment while preserving cross-tool compatibility:
- In Codex multi-agent mode, roles should map to sub-agents directly.
- In non-multi-agent environments, behavior should degrade gracefully to a single-agent role-emulation format.
- Managed template generation (`init`/`update`) must keep semantics consistent and avoid overwriting unmanaged user content.

## Goals / Non-Goals

**Goals:**
- Define a concrete role-contract model that can be emitted into skills and command templates.
- Make main-agent orchestration authority explicit (sequencing, parallelization, temporary role assignment, arbitration).
- Enforce role boundaries in generated instructions (no cross-role ownership drift).
- Add Codex-specific multi-agent mapping guidance without splitting the template architecture into tool-fragmented copies.
- Keep generated output cross-platform safe and path-handling agnostic.

**Non-Goals:**
- Building a runtime sub-agent scheduler in OpenSpec CLI.
- Enforcing one fixed role execution order.
- Introducing new CLI flags for orchestration strategy selection in this change.
- Reworking unrelated OPSX commands or archive semantics.

## Decisions

### Decision 1: Centralized protocol constant in shared template source
- Choice: keep one shared role-orchestration protocol block in `src/core/templates/skill-templates.ts` and inject into workflow skills/commands.
- Rationale: ensures identical semantics across `new`, `continue`, `apply`, and `ff`, and naturally flows into both `init` and `update` generation.
- Alternatives considered:
  - Duplicate role text per template: rejected due to drift risk.
  - Tool-specific protocol forks: rejected due to maintainability overhead.

### Decision 2: Main-agent authority is mandatory, role order is dynamic
- Choice: encode hard requirements that main agent owns orchestration and role order must not be hardcoded.
- Rationale: preserves flexibility per task complexity while maintaining control and determinism.
- Alternatives considered:
  - Fixed role pipeline: rejected because it breaks adaptive planning.
  - Fully decentralized role negotiation: rejected because conflict resolution becomes inconsistent.

### Decision 3: Codex multi-agent direct mapping + single-agent fallback
- Choice: document that Codex sub-agents should be used when available; otherwise emulate roles in structured sections.
- Rationale: enables immediate value in Codex runtime while keeping portability to other tools.
- Alternatives considered:
  - Codex-only hard dependency: rejected because OPSX should remain tool-agnostic.
  - Ignore runtime capability differences: rejected because behavior quality becomes uneven.

### Decision 4: Preserve update safety model
- Choice: continue using managed-block refresh semantics during `openspec update`.
- Rationale: keeps user-authored content outside markers untouched while allowing protocol evolution.
- Alternatives considered:
  - Full-file replacement for command/prompt files: rejected as unsafe for user customizations.

## Risks / Trade-offs

- [Risk] Protocol text could become verbose in generated prompts → Mitigation: keep a compact, reusable contract block and avoid repeated duplications.
- [Risk] Different adapters may render formatting differently → Mitigation: assert semantic markers in tests instead of brittle full-text snapshots.
- [Risk] Users may assume OpenSpec itself schedules agents at runtime → Mitigation: document clearly that OpenSpec provides orchestration instructions, not runtime scheduling.
- [Risk] Cross-tool consistency vs Codex-specific clarity tension → Mitigation: keep core semantics shared and add Codex mapping guidance as capability-aware behavior.

## Migration Plan

1. Add or refine role-protocol source block in shared skill/command template module.
2. Ensure workflow templates include the shared protocol for `new`, `continue`, `apply`, and `ff`.
3. Extend tests for shared generation, `init`, and `update` to verify role semantics and Codex mapping language.
4. Update OPSX documentation with explicit role boundary/orchestration authority and Codex sub-agent mapping notes.
5. Validate change artifacts and run full project tests.

Rollback strategy:
- Revert template and test changes for this change set, then regenerate prompts/skills via existing `update` workflow.

## Open Questions

- Should we add an optional structured output envelope per role (e.g., constraints, decision, handoff) in the next change?
- Should Codex-specific role-to-agent naming conventions be standardized further (for example, deterministic worker IDs)?
- Do we need stricter lint-style validation for missing role contracts in generated command bodies?
