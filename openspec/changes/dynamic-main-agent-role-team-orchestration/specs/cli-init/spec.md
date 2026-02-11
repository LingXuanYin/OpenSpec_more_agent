## ADDED Requirements

### Requirement: Init-generated managed outputs include dynamic orchestration protocol
`openspec init` SHALL generate managed skill and command outputs that include the dynamic role-team formation, design-review pairing, and discussion-group protocol markers.

#### Scenario: Generated workflow files include protocol markers
- **WHEN** `openspec init` creates workflow skill and command files
- **THEN** generated `new`, `continue`, `apply`, and `ff` outputs SHALL include dynamic team-formation and non-hardcoded sequencing guidance
- **AND** generated outputs SHALL include design-review pairing and discussion-group communication contract guidance

#### Scenario: Cross-platform path behavior remains consistent
- **WHEN** `openspec init` generates files on Windows, macOS, or Linux
- **THEN** path-sensitive behavior in generation and tests SHALL remain cross-platform compatible
- **AND** expected paths in tests SHALL use `path.join()` or `path.resolve()` semantics

