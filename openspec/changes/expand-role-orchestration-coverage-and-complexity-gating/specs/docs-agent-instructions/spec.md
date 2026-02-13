## ADDED Requirements

### Requirement: OPSX docs cover expanded role-orchestration mode set
OPSX documentation SHALL describe that role orchestration protocol applies not only to `new`, `continue`, `apply`, and `ff`, but also to additional workflow modes that can involve planning, review, or implementation-adjacent decisions.

#### Scenario: User reads role-orchestration section
- **WHEN** a user reads OPSX role orchestration guidance
- **THEN** the guidance SHALL explicitly mention expanded workflow coverage including `verify`, `sync`, `archive`, `bulk-archive`, and `onboard`
- **AND** the guidance SHALL preserve single-agent fallback semantics

### Requirement: OPSX docs define complexity/domain decision gate
OPSX documentation SHALL state that the main agent performs complexity and knowledge-domain assessment before deciding whether to activate or create role-specific sub-agents.

#### Scenario: Guidance for activation decisions
- **WHEN** users read operational guidance for multi-agent behavior
- **THEN** docs SHALL require the main agent to assess complexity and domains before role activation
- **AND** docs SHALL require explicit role-to-owner mapping when multi-agent mode is selected

