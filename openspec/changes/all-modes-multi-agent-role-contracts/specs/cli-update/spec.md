## ADDED Requirements

### Requirement: Update refreshes all-mode role orchestration protocol
`openspec update` SHALL refresh managed workflow outputs so role orchestration protocol is present for all OPSX modes, including `explore`.

#### Scenario: Managed workflow files are refreshed with all-mode protocol
- **WHEN** `openspec update` runs in a project with managed workflow files
- **THEN** each managed OPSX mode file SHALL be refreshed with orchestration protocol text
- **AND** unmanaged content outside managed refresh scope SHALL remain unchanged

### Requirement: Update refreshes mode-specific role responsibility guidance
`openspec update` SHALL refresh managed workflow outputs with mode-specific role responsibility boundaries.

#### Scenario: Refreshed explore outputs preserve non-coding boundary
- **WHEN** `openspec update` refreshes `explore` workflow files
- **THEN** refreshed role contracts SHALL explicitly disallow implementation coding work in explore mode
- **AND** refreshed guidance SHALL support role-based analysis collaboration
