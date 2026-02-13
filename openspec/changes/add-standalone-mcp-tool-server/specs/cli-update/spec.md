## ADDED Requirements

### Requirement: CLI exposes MCP start command
OpenSpec CLI SHALL expose a dedicated command to start the standalone MCP server runtime.

#### Scenario: Command discoverability
- **WHEN** user runs OpenSpec help for top-level commands
- **THEN** MCP command group and start subcommand are visible
- **AND** command description explains standalone MCP startup purpose

#### Scenario: Command execution
- **WHEN** user executes MCP start command
- **THEN** command invokes standalone MCP runtime bootstrap
- **AND** command returns non-zero exit code on startup failure

