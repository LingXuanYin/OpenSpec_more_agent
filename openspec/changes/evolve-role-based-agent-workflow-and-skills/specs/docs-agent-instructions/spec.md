## ADDED Requirements

### Requirement: Role-based orchestration in agent instructions
OpenSpec-managed agent instructions SHALL define a mandatory role bootstrap protocol before implementation work begins.

#### Scenario: Quick-reference includes mandatory core roles
- **WHEN** OpenSpec agent instructions are generated or refreshed
- **THEN** the quick-reference guidance includes the core roles `product`, `architecture`, `worker`, and `algorithm`
- **AND** each role is presented with a `role + responsibility` declaration format

#### Scenario: Main-agent orchestration authority is explicit
- **WHEN** workflow guidance describes how roles collaborate
- **THEN** instructions state that sequencing, parallelization, and temporary-role assignment are decided by the main agent
- **AND** instructions do not prescribe one hardcoded role execution order

### Requirement: Role boundary and arbitration guidance
OpenSpec-managed instructions SHALL enforce role boundaries and define conflict resolution via main-agent arbitration.

#### Scenario: Boundary rule is documented
- **WHEN** instructions describe role responsibilities
- **THEN** they explicitly state that a role MUST NOT perform work outside its declared responsibility boundary
- **AND** they direct reassignment to the owning role when boundary violations occur

#### Scenario: Temporary roles require contracts
- **WHEN** a temporary role is introduced for a specialized concern
- **THEN** instructions require an explicit responsibility contract before the role participates
- **AND** the contract identifies ownership boundaries for that role
