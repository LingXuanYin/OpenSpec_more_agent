## ADDED Requirements

### Requirement: Standalone MCP runtime separation
OpenSpec SHALL provide an MCP server runtime that is isolated from skill/template injection logic.

#### Scenario: MCP runtime is started independently
- **WHEN** user starts MCP server via OpenSpec CLI
- **THEN** the server starts without requiring OPSX skill/template generation
- **AND** runtime tool behavior is sourced from MCP runtime modules only

### Requirement: Real-time and honest tool registry search
The MCP tool library SHALL include `search_mcp_tools`, which returns the current live registry contents and matching results without synthetic or stale entries.

#### Scenario: Keyword search
- **WHEN** `search_mcp_tools` is called with a plain keyword query
- **THEN** it performs case-insensitive keyword matching
- **AND** it returns only currently registered tools matching the query

#### Scenario: Regex search
- **WHEN** `search_mcp_tools` is called with `useRegex=true`
- **THEN** it applies regex matching to current tool metadata fields
- **AND** invalid regex input MUST produce an explicit error response

#### Scenario: Tool discovers itself
- **WHEN** search query matches `search_mcp_tools`
- **THEN** response includes `search_mcp_tools` in results
- **AND** metadata reflects the current live registry entry

### Requirement: CLI startup for MCP server
OpenSpec CLI SHALL provide a command to start the standalone MCP server directly.

#### Scenario: CLI starts MCP server
- **WHEN** user runs the MCP start CLI command
- **THEN** OpenSpec launches the standalone MCP server process in foreground mode
- **AND** startup output indicates server launch state

