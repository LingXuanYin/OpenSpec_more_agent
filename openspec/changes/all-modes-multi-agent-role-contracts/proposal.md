## Why

Current OPSX role-orchestration guidance is still inconsistent by mode: most execution-oriented modes are covered, but `explore` does not explicitly participate in the same multi-role contract model. This leaves teams without a uniform multi-agent collaboration strategy across the full OPSX surface.

We also need explicit per-mode role boundaries so role teams stay useful without overreaching (for example, `explore` should not produce code edits).

## What Changes

- Expand role-orchestration coverage to all OPSX modes, including `explore`.
- Add mode-specific role responsibility contracts so the same role names behave differently by workflow mode.
- Explicitly define non-coding boundaries for thinking/operations modes and coding boundaries for implementation mode.
- Keep complexity/domain-driven activation and temporary role creation requirements.
- Update generated skills and slash-command prompts from `openspec init` and `openspec update`.
- Add tests to verify all modes carry role protocol and mode-specific responsibility guidance.

## Capabilities

### New Capabilities
- `mode-specific-role-contracts`: Defines role responsibility boundaries per OPSX mode under a unified multi-agent protocol.

### Modified Capabilities
- `docs-agent-instructions`: Extend OPSX docs to describe all-mode coverage and per-mode role boundaries.
- `cli-init`: Ensure generated managed outputs include all-mode role protocol plus mode-specific role contracts.
- `cli-update`: Ensure refresh behavior updates managed outputs with all-mode role protocol plus mode-specific role contracts.

## Impact

- Affected code:
  - `src/core/templates/skill-templates.ts`
  - `docs/opsx.md`
  - tests in `test/core/shared/skill-generation.test.ts`, `test/core/init.test.ts`, and `test/core/update.test.ts`
- User impact:
  - Consistent multi-role/sub-agent guidance across every OPSX mode
  - Clearer boundaries preventing role misuse in non-coding modes
