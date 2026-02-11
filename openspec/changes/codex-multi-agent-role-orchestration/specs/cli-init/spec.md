## ADDED Requirements

### Requirement: Init emits Codex multi-agent orchestration protocol
`openspec init` SHALL emit managed skill/command content that includes Codex multi-agent role mapping protocol.

#### Scenario: Codex prompts include role mapping
- **WHEN** users initialize Codex tool outputs
- **THEN** generated managed commands/prompts include role mapping guidance for `product`, `architecture`, `worker`, and `algorithm`
- **AND** generated content preserves role boundary and main-agent authority language

#### Scenario: Cross-platform path-safe guidance retained
- **WHEN** `openspec init` generates orchestration-enhanced prompts
- **THEN** generated guidance remains compatible with Windows, macOS, and Linux execution contexts
- **AND** path-sensitive examples avoid hardcoded path separators

### Requirement: Init keeps semantic parity across integrations
The init generation path SHALL keep role-orchestration semantics equivalent across supported tools.

#### Scenario: Multiple tools initialized together
- **WHEN** users initialize multiple tools in one run
- **THEN** each tool receives semantically equivalent role mapping, boundary, and arbitration guidance
- **AND** adapter-specific formatting differences do not alter normative behavior
