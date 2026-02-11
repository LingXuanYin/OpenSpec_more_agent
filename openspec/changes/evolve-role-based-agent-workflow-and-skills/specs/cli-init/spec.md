## ADDED Requirements

### Requirement: Init-generated instructions include role orchestration protocol
The `openspec init` command SHALL generate OpenSpec-managed instruction content that includes the default role orchestration protocol.

#### Scenario: Core role protocol appears in generated instructions
- **WHEN** a user runs `openspec init`
- **THEN** generated OpenSpec-managed instruction content includes required core roles `product`, `architecture`, `worker`, and `algorithm`
- **AND** each role entry includes explicit responsibility guidance

#### Scenario: Main-agent orchestration guidance is included
- **WHEN** `openspec init` generates slash command or prompt templates
- **THEN** the generated managed content states that role sequencing and temporary-role assignment are decided by the main agent
- **AND** the content avoids hardcoded role execution order

### Requirement: Role protocol parity across generated integrations
The init command SHALL keep role orchestration guidance semantically consistent across supported tool integrations.

#### Scenario: Multiple selected tools receive equivalent role rules
- **WHEN** a user selects multiple AI tools during initialization
- **THEN** each generated OpenSpec-managed prompt/command includes equivalent role-boundary and orchestration requirements
- **AND** wording differences do not change normative meaning

#### Scenario: Root AGENTS handoff preserves orchestration discoverability
- **WHEN** `openspec init` creates or refreshes the root `AGENTS.md` stub
- **THEN** the stub continues directing users to `openspec/AGENTS.md`
- **AND** the target managed instructions include the role orchestration protocol
