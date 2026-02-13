## ADDED Requirements

### Requirement: Update refreshes expanded role-orchestration protocol coverage
`openspec update` SHALL refresh managed workflow skill and command outputs so role orchestration protocol applies to `new`, `continue`, `apply`, `ff`, `verify`, `sync`, `archive`, `bulk-archive`, and `onboard`.

#### Scenario: Existing managed workflow files refreshed
- **WHEN** `openspec update` runs in a project with existing managed workflow files
- **THEN** existing managed files in the expanded workflow set SHALL be refreshed with latest protocol semantics
- **AND** unmanaged user content outside managed refresh scope SHALL remain unchanged

### Requirement: Update refreshes complexity/domain decision guidance
`openspec update` SHALL refresh managed role-orchestration content so it requires complexity and knowledge-domain assessment before role activation decisions.

#### Scenario: Refreshed protocol includes decision gate
- **WHEN** `openspec update` refreshes workflow files containing orchestration protocol
- **THEN** refreshed protocol SHALL require complexity/domain assessment before role activation
- **AND** refreshed protocol SHALL require explicit owner mapping output for multi-agent execution

