## ADDED Requirements

### Requirement: Codex multi-agent guidance in managed instructions
OpenSpec-managed instructions SHALL include Codex multi-agent mapping guidance while preserving cross-tool semantics.

#### Scenario: Codex runtime mapping guidance is present
- **WHEN** managed instructions are generated or refreshed
- **THEN** instruction content includes Codex sub-agent mapping guidance for `product`, `architecture`, `worker`, and `algorithm`
- **AND** the content also defines fallback behavior for runtimes without sub-agent support

### Requirement: Role declaration format is explicit
Managed instructions SHALL require `role + responsibility` declarations for every active role.

#### Scenario: Core roles require declaration contracts
- **WHEN** instructions define pre-implementation orchestration
- **THEN** each core role includes explicit responsibility text
- **AND** instructions state that undeclared roles cannot participate

#### Scenario: Temporary roles require explicit contracts
- **WHEN** instructions allow temporary roles
- **THEN** they require explicit ownership boundaries for each temporary role
- **AND** they state that temporary roles without contracts are invalid

### Requirement: Main-agent authority and boundary rules are explicit
Managed instructions SHALL explicitly define main-agent authority and role boundary constraints.

#### Scenario: Main-agent authority in instructions
- **WHEN** instructions describe orchestration
- **THEN** they state the main agent owns sequencing, parallelization, and arbitration decisions
- **AND** they prohibit hardcoded role execution order

#### Scenario: Boundary constraints in instructions
- **WHEN** instructions describe role execution
- **THEN** they state roles MUST NOT execute work owned by other roles
- **AND** they provide reassignment guidance when boundary violations occur
