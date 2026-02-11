## Context

OpenSpec already includes role-based orchestration language, but `/opsx:new` still lacks explicit, enforceable guidance for dynamic team assembly and high-efficiency cross-agent collaboration. The current protocol defines core roles and boundaries, yet does not fully specify how the main agent decides whether to use multi-agent collaboration, how design work must be paired with review ownership, and how multiple roles should exchange shared context during discussion.

This change targets generated workflow instructions (skills and slash commands) so behavior is consistent across `new`, `continue`, `apply`, and `ff` while remaining runtime-capability-aware:
- If multi-agent runtime exists, main agent maps roles to sub-agents.
- If not, the same contracts are emulated via explicit role sections in a single-agent flow.

## Goals / Non-Goals

**Goals:**
- Make `/opsx:new` explicitly require the main agent to decide dynamically: whether to use agents, which roles to activate, and whether temporary roles are needed.
- Preserve non-hardcoded execution sequencing under main-agent orchestration authority.
- Introduce design-review pairing semantics: any active design role requires at least one corresponding review role (1:1 or 1:N).
- Define an "agent discussion group" mechanism with shared context packets and explicit decision handoff format.
- Define communication quality constraints for inter-agent exchanges: effective, fast, and unambiguous.
- Keep generated outputs consistent across tool adapters and cross-platform safe.

**Non-Goals:**
- Building a runtime message bus or scheduler in OpenSpec CLI.
- Enforcing a fixed role execution order.
- Introducing tool-specific protocol forks for each adapter.
- Modifying unrelated OPSX workflows outside orchestration semantics.

## Decisions

### Decision 1: Dynamic team-formation clause in shared orchestration protocol
- Choice: Extend the shared `ROLE_ORCHESTRATION_PROTOCOL` to require main-agent dynamic role selection before execution.
- Rationale: Keeps one canonical contract source and guarantees propagation to all generated workflow outputs.
- Alternatives considered:
  - Add behavior only to `/opsx:new` template: rejected due to drift and partial coverage.
  - Implement as tool-specific overlays: rejected due to maintenance overhead.

### Decision 2: Design-review pairing as a required collaboration invariant
- Choice: Add rule stating if a design role is active, at least one review role must be assigned, with 1:1 or 1:N flexibility.
- Rationale: Forces review accountability without constraining topology.
- Alternatives considered:
  - Hardcoded one reviewer only: rejected as too rigid.
  - Optional review pairing: rejected due to quality variance.

### Decision 3: Agent discussion group contract
- Choice: Define a discussion-group pattern requiring:
  - shared context packet (problem frame, constraints, decision scope),
  - role-tagged contributions,
  - concise resolution summary by main agent.
- Rationale: Enables multi-role collaboration while keeping communication fast and explicit.
- Alternatives considered:
  - Free-form role chat: rejected as ambiguous and difficult to reconcile.
  - Main-agent-only synthesis without shared packet: rejected due to context drift risk.

### Decision 4: Efficiency-first communication protocol
- Choice: Add explicit communication requirements for agent handoff messages:
  - objective,
  - decision or recommendation,
  - blockers/assumptions,
  - next owner.
- Rationale: Improves speed and clarity under multi-agent coordination.
- Alternatives considered:
  - Leave communication style unconstrained: rejected due to inconsistent quality.

### Decision 5: Keep capability-aware fallback unchanged
- Choice: Preserve current fallback semantics (single-agent role sections) while applying the same new rules.
- Rationale: Maintains portability and avoids runtime-coupled behavior gaps.

## Risks / Trade-offs

- [Risk] Protocol text becomes too verbose → Mitigation: keep requirements structured and reusable in a single shared block.
- [Risk] Discussion-group rules are interpreted differently by adapters → Mitigation: assert semantic markers in shared-generation, init, and update tests.
- [Risk] Users may mistake protocol for runtime orchestration engine → Mitigation: document that OpenSpec defines instruction contracts, not scheduling internals.
- [Risk] Added strictness may reduce flexibility in simple tasks → Mitigation: dynamic team-formation allows main agent to choose minimal role set when appropriate.

## Migration Plan

1. Extend shared orchestration protocol text in `src/core/templates/skill-templates.ts`.
2. Ensure `new/continue/apply/ff` skill and command templates receive updated protocol via shared injection path.
3. Update tests to assert dynamic team-formation, design-review pairing, discussion-group, and communication contract markers.
4. Update OPSX docs to describe new collaboration semantics and fallback behavior.
5. Validate change artifacts and run focused/full test checks.

Rollback strategy:
- Revert protocol additions and related test/doc changes; regenerate managed outputs via `openspec update`.

## Open Questions

- Should review roles be standardized as named roles (e.g., `review-architecture`) or remain temporary-role contracts?
- Should discussion-group context packet format be strictly schema-defined for machine validation in a future change?
- Should communication-quality checks become lint-style static validations for generated templates?
