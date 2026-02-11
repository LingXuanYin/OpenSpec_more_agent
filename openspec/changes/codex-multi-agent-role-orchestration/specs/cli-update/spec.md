## ADDED Requirements

### Requirement: Update refreshes Codex multi-agent protocol in managed blocks
`openspec update` SHALL refresh existing managed prompts/commands with the latest Codex multi-agent role orchestration protocol.

#### Scenario: Existing managed files receive protocol refresh
- **WHEN** users run `openspec update` in projects with existing managed workflow files
- **THEN** refreshed managed blocks include core role mapping and main-agent authority guidance
- **AND** refreshed blocks include role boundary and temporary-role contract requirements

#### Scenario: Missing files are not force-created
- **WHEN** a managed prompt/command target file does not exist
- **THEN** update does not create the file solely for protocol refresh
- **AND** update continues for other existing managed files

### Requirement: Update preserves unmanaged user-authored content
The update path SHALL preserve user-authored content outside OpenSpec managed markers while applying role-protocol updates.

#### Scenario: Marker-aware refresh behavior
- **WHEN** update writes orchestration protocol changes
- **THEN** only OpenSpec-managed sections are replaced
- **AND** unmanaged content before/after markers remains unchanged

### Requirement: Codex refresh preserves runtime fallback semantics
Updated Codex-managed content SHALL retain fallback instructions for runtimes without sub-agent support.

#### Scenario: Fallback semantics retained after update
- **WHEN** update refreshes Codex-managed command or skill content
- **THEN** content still includes single-agent role-emulation fallback guidance
- **AND** fallback semantics remain equivalent to multi-agent role contracts
