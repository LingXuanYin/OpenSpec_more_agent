## ADDED Requirements

### Requirement: OPSX docs describe all-mode orchestration coverage
OPSX documentation SHALL describe that role-based orchestration applies to all OPSX modes, including `explore`.

#### Scenario: Coverage list is explicit
- **WHEN** a user reads role orchestration docs
- **THEN** the documentation SHALL list all supported OPSX modes for orchestration coverage
- **AND** the documentation SHALL preserve fallback semantics for runtimes without sub-agent support

### Requirement: OPSX docs describe mode-specific role boundaries
OPSX documentation SHALL provide mode-specific role boundary guidance, including non-coding boundaries for non-implementation modes.

#### Scenario: Non-coding mode boundary guidance is visible
- **WHEN** users read mode-specific role guidance
- **THEN** docs SHALL state that `explore` and operational modes do not perform feature-code implementation work
- **AND** docs SHALL distinguish implementation ownership for `/opsx:apply`
