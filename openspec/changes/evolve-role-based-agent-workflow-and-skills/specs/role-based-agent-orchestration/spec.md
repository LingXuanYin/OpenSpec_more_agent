## ADDED Requirements

### Requirement: Core role bootstrap before implementation
The workflow SHALL require a pre-implementation role bootstrap that declares the four core roles: `product`, `architecture`, `worker`, and `algorithm`.

#### Scenario: Core role bootstrap runs before coding
- **WHEN** a change enters planning or implementation preparation
- **THEN** the system instructs the agent to establish the four core roles before producing implementation edits
- **AND** each role declaration includes a responsibility statement

#### Scenario: Missing core role blocks implementation start
- **WHEN** one or more core roles are not declared
- **THEN** the workflow marks role bootstrap as incomplete
- **AND** the agent does not proceed to implementation actions until bootstrap is completed

### Requirement: Role boundary enforcement
Each role SHALL operate only within its declared responsibility boundary and SHALL NOT assume responsibilities owned by other roles.

#### Scenario: Role boundary violation is rejected
- **WHEN** a role attempts to produce outputs outside its declared responsibility boundary
- **THEN** the orchestrator identifies the violation
- **AND** reassigns the work to the correct role or requests clarification

#### Scenario: Output ownership remains attributable
- **WHEN** role outputs are generated during review, design, or discussion loops
- **THEN** each output is attributable to a single owning role
- **AND** the responsibility boundary for that output is explicit

### Requirement: Main-agent orchestration authority
The main agent SHALL own role sequencing, parallelization, and temporary role assignment decisions, and role order SHALL NOT be hardcoded.

#### Scenario: Main agent determines sequencing dynamically
- **WHEN** a task with varying complexity is planned
- **THEN** the main agent selects role execution order based on task needs
- **AND** the workflow does not require a fixed, hardcoded role order

#### Scenario: Main agent resolves cross-role conflicts
- **WHEN** role outputs conflict on scope, architecture, or implementation direction
- **THEN** the main agent performs arbitration
- **AND** publishes a consolidated decision before downstream execution continues

### Requirement: Extensible temporary roles with explicit contracts
The workflow SHALL allow temporary roles in addition to core roles, and every temporary role MUST include an explicit responsibility contract.

#### Scenario: Temporary role is added with contract
- **WHEN** a specialized concern requires additional expertise
- **THEN** the main agent may add a temporary role
- **AND** the role declaration includes a clear responsibility contract and decision boundaries

#### Scenario: Temporary role without contract is invalid
- **WHEN** a temporary role is introduced without explicit responsibility text
- **THEN** the workflow marks the role definition invalid
- **AND** requests a corrected role contract before that role participates

