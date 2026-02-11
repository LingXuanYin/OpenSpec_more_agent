## ADDED Requirements

### Requirement: Update refreshes role orchestration guidance
The `openspec update` command SHALL refresh OpenSpec-managed instruction blocks so they include the latest role orchestration protocol.

#### Scenario: Managed blocks receive role protocol updates
- **WHEN** a user runs `openspec update` in a project with existing OpenSpec-managed command/prompt files
- **THEN** each refreshed managed block includes core roles `product`, `architecture`, `worker`, and `algorithm`
- **AND** each refreshed block includes role-boundary and main-agent orchestration guidance

#### Scenario: Unmanaged content remains untouched during role updates
- **WHEN** `openspec update` writes role orchestration changes into managed sections
- **THEN** user-authored content outside OpenSpec managed markers is preserved
- **AND** only OpenSpec-managed sections are replaced

### Requirement: Update does not force-create missing files for role protocol
Role orchestration updates SHALL follow existing update behavior for file creation.

#### Scenario: Missing integration files are skipped
- **WHEN** a supported tool's command/prompt file does not exist
- **THEN** `openspec update` does not create the missing file solely to deliver role protocol changes
- **AND** update proceeds for other existing OpenSpec-managed files

#### Scenario: Root AGENTS stub keeps role protocol entrypoint
- **WHEN** `openspec update` refreshes or creates the root `AGENTS.md` managed stub
- **THEN** the stub points to `openspec/AGENTS.md`
- **AND** the referenced managed instructions include the updated role orchestration protocol
