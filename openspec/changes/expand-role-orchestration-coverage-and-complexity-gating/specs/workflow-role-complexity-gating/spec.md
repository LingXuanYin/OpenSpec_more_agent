## ADDED Requirements

### Requirement: Main-agent complexity and domain assessment before role activation
Before execution-oriented workflow actions proceed, the main agent SHALL assess task complexity and involved knowledge domains, then decide whether single-agent execution is sufficient or multi-agent collaboration is required.

#### Scenario: Low-complexity single-domain task
- **WHEN** a workflow action is scoped to a low-complexity task in a single knowledge domain
- **THEN** the main agent MAY keep execution in single-agent mode
- **AND** the output MUST include a concise rationale for not activating additional roles

#### Scenario: Medium or high complexity multi-domain task
- **WHEN** a workflow action spans multiple domains or medium/high complexity concerns
- **THEN** the main agent SHALL activate role-specific collaboration
- **AND** the output MUST include the selected roles and their responsibility boundaries

### Requirement: Temporary role creation for uncovered domains
If core roles do not fully cover identified knowledge domains, the main agent SHALL create temporary roles with explicit responsibility contracts before those roles participate.

#### Scenario: Domain coverage gap detected
- **WHEN** the complexity/domain assessment identifies a domain not owned by active core roles
- **THEN** the main agent SHALL declare one or more temporary roles
- **AND** each temporary role declaration SHALL include role name, responsibility scope, and ownership boundary

#### Scenario: Temporary role missing contract
- **WHEN** a temporary role is introduced without explicit responsibility contract text
- **THEN** the role definition MUST be treated as invalid
- **AND** execution involving that role MUST be blocked until the contract is provided

### Requirement: Multi-agent owner mapping transparency
When multi-agent execution is selected, outputs SHALL include explicit role-to-owner mapping and activation rationale.

#### Scenario: Multi-agent mode selected
- **WHEN** the main agent chooses multi-agent collaboration
- **THEN** output SHALL include explicit owner mapping for active roles
- **AND** output SHALL include concise reasons for active and inactive roles

