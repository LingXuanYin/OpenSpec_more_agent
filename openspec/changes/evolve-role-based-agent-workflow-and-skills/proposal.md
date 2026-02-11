## Why

OpenSpec's current agent-facing workflow guidance is mostly single-threaded, which makes complex work inconsistent in planning quality, architectural coherence, and execution discipline. We need a first-class, role-based collaboration protocol so agents consistently start with explicit product, architecture, implementation, and algorithm responsibilities before writing code.

## What Changes

- Introduce a role-based pre-work orchestration pattern where agents assemble a core team before implementation begins.
- Define default core roles and responsibilities: `product`, `architecture`, `worker`, and `algorithm`.
- Require role-driven collaboration loops for review, design, and discussion, with clear handoff/ownership expectations.
- Allow dynamic/temporary roles as long as each role includes an explicit responsibility contract.
- Update OpenSpec-managed skill/prompt templates so `/opsx` workflows consistently enforce the role orchestration pattern.
- Update generated instruction content and related docs so teams can adopt this behavior through normal `init`/`update` flows.

## Capabilities

### New Capabilities
- `role-based-agent-orchestration`: Defines required team bootstrapping, role contracts, and collaboration loops before implementation starts.

### Modified Capabilities
- `docs-agent-instructions`: Add requirement-level guidance for mandatory role assembly and role+responsibility formatting in workflow instructions.
- `cli-init`: Ensure newly generated OpenSpec-managed prompts/commands include role-based orchestration guidance by default.
- `cli-update`: Ensure updates refresh existing OpenSpec-managed prompts/commands with the role-based orchestration guidance.

## Impact

- Affected code: prompt/skill template generation, instruction template sources, and relevant command wiring for `init`/`update`.
- Affected docs: OpenSpec agent workflow guidance and any role-related command documentation.
- Affected tests: template generation snapshots/assertions and workflow command integration tests that validate managed content.
- User-facing impact: stronger planning consistency for complex work; slight increase in upfront structure before implementation.
