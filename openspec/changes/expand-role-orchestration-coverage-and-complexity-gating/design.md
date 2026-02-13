## Context

OpenSpec already defines a shared role-orchestration protocol and injects it into selected workflow templates. Current coverage is intentionally limited to `new`, `continue`, `apply`, and `ff`, which leaves other OPSX modes (`verify`, `sync`, `archive`, `bulk-archive`, `onboard`) without the same orchestration contract.

This causes inconsistent agent behavior across workflows and misses an explicit decision gate for when to use multi-agent collaboration. We need deterministic guidance requiring the main agent to assess complexity and knowledge domains before activating or creating role-specific sub-agents.

## Goals / Non-Goals

**Goals:**
- Expand role-orchestration protocol coverage to more OPSX workflow modes.
- Add mandatory complexity/domain assessment semantics to the shared protocol.
- Preserve shared-template architecture so semantics stay consistent across skills and commands.
- Keep test coverage aligned with expanded workflow coverage and new protocol markers.

**Non-Goals:**
- Building a runtime sub-agent scheduler in OpenSpec CLI.
- Enforcing a fixed role execution order.
- Introducing tool-specific protocol forks that diverge in semantics.

## Decisions

### Decision 1: Keep a single shared protocol constant and enrich it
- Choice: extend `ROLE_ORCHESTRATION_PROTOCOL` with complexity/domain decision-gate rules and output transparency requirements.
- Rationale: one source of truth avoids drift and automatically propagates to both skill and slash-command templates.
- Alternatives considered:
  - Add per-template custom text: rejected due to drift risk and maintenance overhead.
  - Add tool-specific variants: rejected because cross-tool consistency is more important than adapter-level specialization.

### Decision 2: Expand protocol injection to additional workflow templates
- Choice: inject shared protocol into `verify`, `sync`, `archive`, `bulk-archive`, and `onboard` templates (skills + commands), in addition to existing `new`, `continue`, `apply`, and `ff`.
- Rationale: these modes still involve planning, verification, and coordination decisions where role boundaries and orchestration authority matter.
- Alternatives considered:
  - Keep protocol only in implementation-oriented modes: rejected because verification/archive/sync/onboarding can still trigger cross-role decisions.

### Decision 3: Require visible decision outputs for orchestration choices
- Choice: protocol text requires concise rationale for activation decisions and explicit owner mapping in multi-agent mode.
- Rationale: visibility improves operator trust and makes orchestration behavior auditable in transcripts.
- Alternatives considered:
  - Require implicit behavior only: rejected because hidden decisions are hard to validate and debug.

### Decision 4: Preserve existing runtime boundary
- Choice: keep orchestration as instruction contract; do not add runtime scheduling behavior in CLI.
- Rationale: aligns with existing OpenSpec architecture and previous change boundaries.

## Risks / Trade-offs

- [Risk] More templates with protocol text increase prompt verbosity -> Mitigation: keep added decision-gate language concise and reusable.
- [Risk] Broader coverage may feel heavy for trivial cases -> Mitigation: protocol explicitly allows single-agent mode for low-complexity single-domain work.
- [Risk] Test brittleness from full-string assertions -> Mitigation: assert semantic markers for required clauses rather than exact full template snapshots.

## Migration Plan

1. Extend shared protocol constant with complexity/domain decision-gate rules.
2. Inject shared protocol into additional workflow templates for both skills and slash commands.
3. Expand shared generation tests to include the new workflow coverage set.
4. Expand init/update tests to assert refreshed/generated files include new protocol semantics.
5. Run targeted tests and adjust any adapter-specific formatting expectations.

Rollback strategy:
- Revert template changes and test updates, then regenerate outputs via `openspec update`.

## Open Questions

- Should role-activation rationale follow a standardized mini-schema (for example: complexity, domains, active roles, inactive roles)?
- Should we add lint-style validation to detect missing role-protocol markers in generated workflow templates?
