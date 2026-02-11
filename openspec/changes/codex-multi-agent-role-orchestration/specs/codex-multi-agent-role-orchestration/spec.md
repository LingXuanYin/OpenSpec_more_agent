## ADDED Requirements

### Requirement: Codex role-to-agent mapping
When Codex multi-agent runtime is available, the workflow SHALL map core roles (`product`, `architecture`, `worker`, `algorithm`) to explicit agent ownership.

#### Scenario: Runtime supports sub-agents
- **WHEN** the active runtime supports Codex sub-agent execution
- **THEN** the workflow emits explicit role-to-agent mapping instructions for all core roles
- **AND** each mapped role includes a responsibility contract

#### Scenario: Runtime does not support sub-agents
- **WHEN** the active runtime does not support sub-agent execution
- **THEN** the workflow falls back to single-agent role sections
- **AND** the fallback preserves the same role boundaries and ownership semantics

### Requirement: Main-agent orchestration authority
The main agent SHALL own sequencing, parallelization, temporary role assignment, and conflict arbitration across all role outputs.

#### Scenario: Dynamic sequencing
- **WHEN** task complexity requires adjusting collaboration order
- **THEN** the main agent determines the role execution sequence dynamically
- **AND** role order is not hardcoded in execution behavior

#### Scenario: Conflict arbitration
- **WHEN** role outputs conflict on scope, design, or implementation direction
- **THEN** the main agent resolves the conflict
- **AND** publishes a consolidated decision before execution continues

### Requirement: Role boundary enforcement
Each role MUST operate within its declared responsibility boundary and MUST NOT execute work owned by another role.

#### Scenario: Boundary violation handling
- **WHEN** a role attempts to execute work outside its declared ownership
- **THEN** the workflow flags the boundary violation
- **AND** reassigns execution responsibility to the owning role

### Requirement: Temporary roles require explicit contracts
The workflow SHALL allow temporary roles only when explicit responsibility contracts and ownership boundaries are declared.

#### Scenario: Temporary role with contract
- **WHEN** a temporary role is introduced for specialized work
- **THEN** the role declaration includes explicit responsibility and boundary statements
- **AND** the main agent includes the role in orchestration decisions

#### Scenario: Temporary role without contract
- **WHEN** a temporary role is introduced without explicit responsibility text
- **THEN** the role definition is treated as invalid
- **AND** execution involving that role is blocked until corrected
