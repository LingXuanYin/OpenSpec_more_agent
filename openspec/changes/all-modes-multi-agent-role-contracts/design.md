## Context

OpenSpec currently uses a shared role-orchestration protocol constant and injects it into most workflow templates. A previous change expanded coverage to many modes, but `explore` is intentionally still outside the shared protocol injection set. At the same time, role contracts are mostly global and do not explicitly differentiate responsibilities by workflow mode.

The product need is now to support role-based multi-agent collaboration in every OPSX mode while making role behavior mode-aware (for example: exploration modes should not perform coding work; implementation mode should).

## Goals / Non-Goals

**Goals:**
- Apply role orchestration protocol to all OPSX modes, including `explore`.
- Introduce mode-specific role responsibility guidance that differentiates planning, implementation, verification, sync, and archive behaviors.
- Keep complexity/domain assessment and temporary-role activation rules intact.
- Preserve shared-template maintainability and testability.

**Non-Goals:**
- Building a runtime scheduler or enforcement engine inside OpenSpec CLI.
- Adding new CLI flags for orchestration policy selection.
- Introducing tool-specific protocol forks.

## Decisions

### Decision 1: Keep one shared base protocol and add a shared mode-specific contract block
- Choice: retain `ROLE_ORCHESTRATION_PROTOCOL` as the base and add a second shared block describing mode-specific role responsibilities.
- Rationale: avoids duplication while supporting mode-specific behavior.
- Alternatives considered:
  - Fully duplicating protocol per mode: rejected due to drift risk.
  - Putting everything into one giant block: rejected for readability.

### Decision 2: Inject orchestration protocol into explore templates
- Choice: include the shared protocol in both explore skill and explore command templates.
- Rationale: fulfills all-mode support requirement and keeps behavior consistent.
- Alternatives considered:
  - Keep explore outside orchestration: rejected by requirement.

### Decision 3: Define explicit mode-role boundaries in text
- Choice: add explicit per-mode rules for `explore`, artifact-creation modes (`new`/`continue`/`ff`), `apply`, `verify`, `sync`, `archive`/`bulk-archive`, and `onboard`.
- Rationale: makes role boundaries auditable and reduces role misuse.

## Risks / Trade-offs

- [Risk] Prompt length increases across all modes -> Mitigation: keep mode-specific responsibilities concise and reusable.
- [Risk] Overly strict mode boundaries may reduce flexibility -> Mitigation: keep temporary-role extension path explicit.
- [Risk] Test brittleness due to text changes -> Mitigation: assert semantic markers instead of full snapshots.

## Migration Plan

1. Add shared mode-specific role responsibility contract text.
2. Inject shared orchestration protocol into explore templates.
3. Inject mode-specific contract text across all OPSX templates.
4. Update OPSX docs for all-mode coverage and mode boundaries.
5. Expand tests for shared generation/init/update to include explore and new mode-boundary markers.
6. Run targeted tests and strict change validation.

Rollback strategy:
- Revert template/doc/test changes and regenerate managed outputs via `openspec update`.

## Open Questions

- Should mode-specific role contract output follow a strict schema block (e.g., `mode`, `active_roles`, `forbidden_actions`) in a follow-up?
