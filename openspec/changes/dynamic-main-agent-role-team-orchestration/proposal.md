## Why

Current OPSX role orchestration defines boundaries and ownership, but it does not yet make `/opsx:new` explicitly adaptive in team formation and collaboration topology. We need the main agent to dynamically decide whether multi-agent collaboration is needed, which roles are needed, when temporary roles are required, and how role discussions share context efficiently.

## What Changes

- Require `/opsx:new` workflows to state that the main agent dynamically selects whether to use agents, which agents to activate, and whether temporary role agents are needed.
- Require non-hardcoded role execution order while preserving strict role-responsibility boundaries.
- Add a design-review pairing rule: if a design role participates, at least one review role must be assigned (one-to-one or one-to-many).
- Define an "agent discussion group" collaboration pattern for cross-role discussion with shared context packets and explicit decision handoff.
- Add explicit communication standards for agent exchanges: concise, actionable, unambiguous, and latency-aware.
- Update generated workflow skills/commands and docs so the above behavior is consistently emitted across `new`, `continue`, `apply`, and `ff`.

## Capabilities

### New Capabilities
- `dynamic-role-team-orchestration`: Defines adaptive role-team formation under main-agent authority, including dynamic activation and temporary role creation contracts.
- `agent-discussion-group`: Defines shared-context discussion groups, message contracts, and decision handoff rules for efficient multi-agent collaboration.

### Modified Capabilities
- `docs-agent-instructions`: Update documentation requirements to include adaptive team formation, design-review pairing, and discussion-group communication protocol.
- `cli-init`: Ensure initialized managed prompts/skills include the updated dynamic orchestration and discussion-group rules.
- `cli-update`: Ensure refresh behavior injects the latest protocol into managed blocks without touching unmanaged content.

## Impact

- Affected code: shared workflow template generation in `src/core/templates/skill-templates.ts` and related generation paths.
- Affected tests: template-generation tests plus init/update regression coverage for protocol markers and semantics.
- Affected docs: OPSX workflow documentation and role-orchestration guidance.
- Runtime behavior impact: stronger and clearer collaboration contracts for Codex multi-agent mode with consistent fallback behavior for single-agent environments.
