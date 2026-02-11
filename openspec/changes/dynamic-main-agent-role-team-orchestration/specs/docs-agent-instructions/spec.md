## ADDED Requirements

### Requirement: Documentation includes dynamic team-formation guidance
OPSX documentation SHALL describe that the main agent dynamically decides whether agent collaboration is required, which roles are activated, and when temporary roles are introduced.

#### Scenario: Role-team activation guidance is documented
- **WHEN** users read role orchestration guidance in OPSX docs
- **THEN** the docs SHALL state that role activation and temporary-role assignment are task-dependent main-agent decisions
- **AND** the docs SHALL state that role execution order is not fixed

### Requirement: Documentation includes design-review pairing and discussion-group protocol
OPSX documentation SHALL define design-review pairing requirements and discussion-group collaboration behavior.

#### Scenario: Design-review pairing is documented
- **WHEN** documentation explains role collaboration contracts
- **THEN** it SHALL state that active design roles require corresponding review-role coverage
- **AND** it SHALL allow one-to-one and one-to-many review mappings

#### Scenario: Discussion-group protocol is documented
- **WHEN** documentation explains multi-role discussion behavior
- **THEN** it SHALL require shared context packets and structured handoff messages
- **AND** it SHALL require main-agent consolidated decision publication before execution continues

