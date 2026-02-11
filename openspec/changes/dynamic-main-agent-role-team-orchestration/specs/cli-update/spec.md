## ADDED Requirements

### Requirement: Update refreshes managed protocol blocks with dynamic collaboration semantics
`openspec update` SHALL refresh managed workflow instruction blocks so they include dynamic role-team formation, design-review pairing, and discussion-group protocol semantics.

#### Scenario: Managed blocks refreshed with latest protocol
- **WHEN** `openspec update` runs on a project with existing managed workflow files
- **THEN** managed `new`, `continue`, `apply`, and `ff` blocks SHALL be updated to include the latest orchestration semantics
- **AND** unmanaged content outside OpenSpec markers SHALL remain unchanged

#### Scenario: Existing tool files are updated without forced creation
- **WHEN** a configured tool already contains workflow instruction files
- **THEN** `openspec update` SHALL refresh existing managed files with the updated protocol
- **AND** missing files SHALL not be created unless existing update behavior explicitly supports their creation

