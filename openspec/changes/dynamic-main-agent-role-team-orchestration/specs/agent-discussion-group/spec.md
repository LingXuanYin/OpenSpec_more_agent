## ADDED Requirements

### Requirement: Shared-context discussion group contract
When multiple roles need collaborative discussion, the workflow SHALL establish an agent discussion group with a shared context packet before role exchanges begin.

#### Scenario: Discussion group starts with context packet
- **WHEN** the main agent triggers a multi-role discussion
- **THEN** the discussion SHALL include a shared context packet containing problem frame, constraints, and decision scope
- **AND** all role contributions SHALL reference that shared packet

### Requirement: Structured role communication in discussion groups
Discussion-group exchanges SHALL be concise, actionable, and explicit, with role-tagged statements and clear ownership for next actions.

#### Scenario: Role handoff message
- **WHEN** one role hands work to another role in the discussion group
- **THEN** the message SHALL include objective, recommendation or decision, assumptions or blockers, and next owner
- **AND** ambiguous or ownerless handoffs SHALL be treated as incomplete

### Requirement: Main-agent discussion closure
The main agent SHALL consolidate discussion outputs into a single decision summary before execution proceeds.

#### Scenario: Closing a discussion thread
- **WHEN** discussion reaches a converged direction
- **THEN** the main agent SHALL publish a consolidated decision summary with accepted direction and rejected alternatives
- **AND** downstream execution SHALL follow the published summary unless explicitly superseded

