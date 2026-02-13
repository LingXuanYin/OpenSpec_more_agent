## Why

OpenSpec currently focuses on prompt-template and workflow generation, but we need an isolated runtime MCP tool layer that does not depend on prompt injection semantics. A standalone MCP server gives a clear, executable interface for tool discovery and future expansion.

## What Changes

- Add a standalone MCP server runtime in OpenSpec codebase, separated from skill/template generation paths.
- Add one MCP tool named `search_mcp_tools` to query the server's current tool registry.
- Support both regex matching and fallback keyword matching for tool search.
- Ensure tool discovery is fully honest and real-time by reading the live in-memory tool registry at call time.
- Ensure the search tool can find itself when query conditions match.
- Add a CLI command to start the MCP server directly from `openspec`.

## Capabilities

### New Capabilities
- `standalone-mcp-tool-server`: Independent MCP server runtime and tool registry with real-time introspection.

### Modified Capabilities
- `cli-update`: Add/extend CLI behavior so OpenSpec can directly start the standalone MCP server.

## Impact

- Affected code: new MCP runtime module(s), tool registry/search logic, and CLI command wiring.
- Affected tests: new tests for search semantics and command availability/behavior.
- User impact: developers can run a standalone OpenSpec MCP server via CLI, independent of skill/template injection workflows.
