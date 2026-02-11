## ADDED Requirements

### Requirement: Main agent dynamic role-team formation
The workflow SHALL require the main agent to decide, at `/opsx:new` execution time, whether role agents are needed, which roles are activated, and whether temporary roles are required.

#### Scenario: Complex change requires multi-agent team
- **WHEN** the requested change includes cross-cutting design, implementation, and validation concerns
- **THEN** the main agent SHALL activate an explicit role team with role and responsibility declarations
- **AND** the main agent SHALL publish the selected team and ownership boundaries before artifact work begins

#### Scenario: Small change uses minimal team
- **WHEN** the requested change is narrow and low-risk
- **THEN** the main agent MAY activate a minimal role subset
- **AND** any omitted core role ownership SHALL be explicitly absorbed by declared active roles without boundary violations

### Requirement: Non-hardcoded role sequencing under main-agent authority
Role execution order MUST NOT be hardcoded, and the main agent SHALL determine sequencing and parallelization dynamically based on task needs.

#### Scenario: Dynamic sequencing decision
- **WHEN** a change benefits from design-first execution
- **THEN** the main agent SHALL sequence design-oriented roles before implementation-oriented roles
- **AND** the workflow SHALL preserve the ability to choose a different sequence for other changes

### Requirement: Design-review pairing invariant
If any role owns design output, the workflow SHALL require at least one corresponding review role assignment, supporting one-to-one or one-to-many pairing.

#### Scenario: One-to-one design review pairing
- **WHEN** a single design role is assigned for architecture decisions
- **THEN** the main agent SHALL assign at least one review role to that design scope
- **AND** review ownership SHALL be visible in role mapping output

#### Scenario: One-to-many design review pairing
- **WHEN** multiple design surfaces are in scope (for example architecture and algorithms)
- **THEN** the main agent SHALL assign one or more review roles covering each design surface
- **AND** uncovered design ownership SHALL block progression until review mapping is complete

