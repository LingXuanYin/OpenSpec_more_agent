## ADDED Requirements

### Requirement: Init emits all-mode role orchestration protocol
`openspec init` SHALL generate managed workflow outputs where role orchestration protocol is present for all OPSX modes, including `explore`.

#### Scenario: Generated skill files include all-mode protocol
- **WHEN** `openspec init` generates workflow skill files
- **THEN** each OPSX mode skill SHALL include role orchestration protocol text
- **AND** protocol semantics SHALL remain consistent across modes

#### Scenario: Generated command files include all-mode protocol
- **WHEN** `openspec init` generates OPSX slash-command files
- **THEN** each OPSX command SHALL include role orchestration protocol text
- **AND** role protocol semantics SHALL match generated skill files

### Requirement: Init emits mode-specific role responsibility guidance
`openspec init` SHALL generate mode-specific role responsibility guidance for each OPSX mode.

#### Scenario: Explore guidance remains non-coding
- **WHEN** `openspec init` generates `explore` workflow outputs
- **THEN** generated role contracts SHALL explicitly disallow code implementation work in that mode
- **AND** generated guidance SHALL still support multi-role collaboration for analysis and decision support
