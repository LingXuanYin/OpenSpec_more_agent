## ADDED Requirements

### Requirement: Init emits expanded role-orchestration protocol coverage
`openspec init` SHALL generate managed workflow skill and command outputs where role orchestration protocol is included for `new`, `continue`, `apply`, `ff`, `verify`, `sync`, `archive`, `bulk-archive`, and `onboard`.

#### Scenario: Generated workflow outputs include expanded coverage
- **WHEN** `openspec init` generates workflow files for a configured tool
- **THEN** generated files for the expanded workflow set SHALL include role orchestration protocol markers
- **AND** coverage SHALL be consistent between skill outputs and slash-command outputs

### Requirement: Init emits complexity/domain decision guidance
`openspec init` SHALL generate managed outputs that require complexity and knowledge-domain assessment before deciding whether to activate or create role-specific sub-agents.

#### Scenario: Generated protocol includes decision gate
- **WHEN** `openspec init` generates role-orchestration-enabled workflow outputs
- **THEN** generated protocol text SHALL require complexity and domain assessment before role activation
- **AND** generated protocol text SHALL require explicit owner mapping output for multi-agent execution

