## Context

OpenSpec currently provides strong artifact workflow scaffolding (`new`, `continue`, `ff`, `apply`, `archive`) but does not consistently require a role-based collaboration protocol before implementation. As a result, different agent sessions may vary in planning rigor and decision quality, especially for multi-step or high-impact changes.

This change introduces a default multi-agent pre-work pattern centered on four core roles:
- `product`: problem framing, scope boundaries, acceptance alignment
- `architecture`: system design, interfaces, dependency and constraint analysis
- `worker`: implementation execution and delivery ownership
- `algorithm`: solution strategy, complexity/performance trade-off evaluation

The protocol also allows temporary roles (for example, `security`, `qa`, `docs`) as long as each role is declared with an explicit responsibility contract.

Constraints:
- Must integrate through existing OpenSpec-managed instruction/prompt generation so `openspec init` and `openspec update` keep behavior consistent.
- Must remain cross-platform (Windows/macOS/Linux) and avoid any path assumptions in implementation/test guidance.
- Must preserve OpenSpec managed-marker update behavior so user-authored content outside managed blocks is not overwritten.

## Goals / Non-Goals

**Goals:**
- Make role-based team assembly a first-class default in OpenSpec-generated workflows.
- Ensure prompts/skills explicitly require review, design, and discussion loops before coding.
- Standardize a `role + responsibility` declaration format for both default and temporary roles.
- Keep compatibility with current artifact-driven schema flow and command behavior.

**Non-Goals:**
- Building a runtime agent scheduler/orchestrator inside OpenSpec CLI.
- Enforcing one fixed number of agents for every task regardless of complexity.
- Rewriting unrelated workflow semantics or changing archive/apply data models.

## Decisions

### Decision 1: Capability-first modeling
- Choice: introduce a new capability (`role-based-agent-orchestration`) and wire existing capabilities (`docs-agent-instructions`, `cli-init`, `cli-update`) to it.
- Rationale: keeps requirements traceable in specs and limits scope creep into unrelated subsystems.
- Alternatives considered:
  - Only modify docs without capability changes: rejected because behavior would be hard to validate and easier to regress.
  - Add ad-hoc prompt tweaks in one tool integration only: rejected because it fragments behavior across tools.

### Decision 2: Template-layer enforcement over command branching
- Choice: enforce role protocol through shared instruction templates and managed prompt/skill content.
- Rationale: central template updates propagate through `init`/`update` consistently, minimizing command-specific branching.
- Alternatives considered:
  - Add CLI flags to opt into role protocol per command: rejected due to UX complexity and inconsistent default behavior.
  - Hardcode role logic in each command handler: rejected due to duplication and maintenance burden.

### Decision 3: Mandatory core roles, extensible temporary roles
- Choice: require four default roles (`product`, `architecture`, `worker`, `algorithm`) and permit optional temporary roles with explicit responsibility declarations.
- Rationale: provides predictable baseline quality while preserving adaptability for task-specific expertise.
- Alternatives considered:
  - Fully free-form role selection: rejected because sessions become inconsistent and hard to review.
  - Fully rigid role list with no extensions: rejected because it limits applicability to specialized tasks.

### Decision 4: Workflow phase gates as collaboration checkpoints
- Choice: before implementation, require explicit outputs from review/design/discussion phases in instructions.
- Rationale: aligns with proposal intent and reduces premature coding.
- Alternatives considered:
  - Soft recommendation language only: rejected because compliance is too variable.

## Risks / Trade-offs

- [Risk] More upfront process may slow trivial tasks → Mitigation: allow concise role outputs for low-complexity changes while keeping structure mandatory.
- [Risk] Prompt verbosity can increase token usage → Mitigation: keep role contracts short and template-driven; avoid redundant repeated guidance.
- [Risk] Inconsistent behavior across tool integrations if templates diverge → Mitigation: centralize shared content and add regression tests for generated managed blocks.
- [Risk] User confusion during migration from prior workflow habits → Mitigation: include clear upgrade notes in docs and refreshed command templates.

## Migration Plan

1. Add/modify specs to define role-based orchestration requirements and acceptance scenarios.
2. Update shared template sources used by `init` and `update` generation paths.
3. Regenerate/update managed instruction outputs and relevant skill/prompt assets.
4. Add or update tests verifying role instructions exist in generated managed sections for supported integrations.
5. Validate with targeted CLI flows (`openspec init`, `openspec update`, and representative `/opsx:*` command templates).

Rollback:
- Revert template/spec changes and regenerate managed outputs to previous baseline if regressions are detected.

## Open Questions

- Should role orchestration be always-on for all `/opsx:*` commands, or mandatory only for planning-heavy stages?
- Do we need a standardized minimal output format for each role (for example, 2-3 bullet constraints) to improve consistency?
- Should additional default roles (for example, `security`) be introduced now or deferred to optional temporary roles?
