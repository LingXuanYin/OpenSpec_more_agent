## Why

OpenSpec currently applies role orchestration guidance to only a subset of OPSX workflows (`new`, `continue`, `apply`, `ff`). This creates uneven behavior across modes and weakens multi-agent execution consistency.

We also need explicit guidance requiring the main agent to evaluate task complexity and involved knowledge domains before deciding whether to activate or create role-specific sub-agents.

## What Changes

- Extend role orchestration protocol coverage from current workflow subset to additional OPSX modes that can involve planning, review, or implementation-adjacent decisions.
- Add a mandatory pre-execution decision gate in workflow guidance:
  - assess task complexity,
  - identify knowledge domains,
  - decide single-agent vs multi-agent execution,
  - create temporary/domain roles when core roles are insufficient.
- Require explicit owner mapping output when multi-agent mode is used, with a concise rationale for activated and non-activated roles.
- Keep single-agent fallback semantics equivalent when runtime sub-agent capability is unavailable.
- Update generated skill and command outputs produced by `openspec init` and `openspec update`.
- Add/extend tests to verify protocol presence and complexity/domain decision semantics in generated workflow templates.

## Capabilities

### New Capabilities
- `workflow-role-complexity-gating`: Defines mandatory complexity/domain assessment and dynamic role activation or creation rules before execution.

### Modified Capabilities
- `docs-agent-instructions`: Expand documented role orchestration semantics to cover additional workflow modes and complexity/domain-based activation logic.
- `cli-init`: Ensure generated managed workflow files include expanded role protocol coverage and complexity/domain decision guidance.
- `cli-update`: Ensure update refreshes managed workflow files with the expanded protocol and complexity/domain decision guidance.

## Impact

- Affected code:
  - `src/core/templates/skill-templates.ts`
  - workflow skill/command template generation paths consuming the shared protocol
  - related tests under `test/core/shared`, `test/core/init.test.ts`, and `test/core/update.test.ts`
- Behavioral impact:
  - More consistent orchestration instructions across OPSX workflow modes
  - Stronger decision quality for when and how sub-agents are activated
  - Clearer role ownership visibility in multi-agent runs
