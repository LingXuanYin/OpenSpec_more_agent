## ADDED Requirements

### Requirement: All OPSX modes support role-based multi-agent orchestration
The workflow SHALL support role-based multi-agent orchestration contracts across all OPSX modes, including `explore`, `new`, `continue`, `ff`, `apply`, `verify`, `sync`, `archive`, `bulk-archive`, and `onboard`.

#### Scenario: Explore mode participates in orchestration contract
- **WHEN** the user runs `/opsx:explore`
- **THEN** the guidance SHALL include role-based orchestration semantics
- **AND** the guidance SHALL preserve explore-mode non-implementation guardrails

#### Scenario: Existing workflow modes keep orchestration contract
- **WHEN** the user runs any non-explore OPSX mode
- **THEN** the mode SHALL include role-orchestration guidance
- **AND** orchestration semantics SHALL remain consistent with main-agent authority rules

### Requirement: Mode-specific role responsibilities are explicit
Each OPSX mode SHALL define mode-specific role responsibilities and boundaries for core roles (`product`, `architecture`, `worker`, `algorithm`), plus temporary roles when activated.

#### Scenario: Explore mode blocks coding responsibilities
- **WHEN** role responsibilities are presented for `/opsx:explore`
- **THEN** `worker` and temporary roles SHALL be constrained to analysis and context gathering
- **AND** coding or feature implementation responsibilities SHALL be explicitly disallowed

#### Scenario: Apply mode allows implementation ownership
- **WHEN** role responsibilities are presented for `/opsx:apply`
- **THEN** `worker` SHALL own code implementation execution
- **AND** review-oriented roles SHALL remain scoped to review/decision responsibilities

#### Scenario: Archive and sync modes remain operational
- **WHEN** role responsibilities are presented for `/opsx:archive`, `/opsx:bulk-archive`, or `/opsx:sync`
- **THEN** responsibilities SHALL focus on validation, reconciliation, and archival operations
- **AND** creating new feature code SHALL be explicitly out of scope
