## Context

This change introduces a runtime MCP server as a separate concern from OpenSpec's prompt/template workflows. The server should expose a minimal tool library with one introspection-oriented tool and be launchable from OpenSpec CLI. The design must be cross-platform and maintain clear separation from skill generation logic.

## Goals / Non-Goals

**Goals:**
- Provide a standalone MCP server module with a live tool registry.
- Provide one tool, `search_mcp_tools`, that returns real-time and honest tool metadata from the live registry.
- Support regex search when requested and keyword matching otherwise.
- Allow CLI startup via a dedicated `openspec mcp start` command.

**Non-Goals:**
- Integrating with external MCP tool sources or remote registries.
- Building a full multi-tool ecosystem in this change.
- Coupling MCP server behavior to OPSX prompt templates or skills.

## Decisions

### Decision 1: Keep MCP runtime isolated under dedicated module path
- Choice: create a dedicated `src/mcp/` module for server and registry logic.
- Rationale: avoids entanglement with existing prompt/template code paths.

### Decision 2: Use explicit in-memory tool definitions as source of truth
- Choice: maintain tool list in a registry object and always query that live structure per request.
- Rationale: guarantees "real-time" reflection of currently loaded tools and allows search tool to discover itself.

### Decision 3: Search semantics with safe regex fallback
- Choice: accept `useRegex` flag; when true, compile regex and match across `name`, `description`, and `keywords`; otherwise do case-insensitive keyword/token matching.
- Rationale: predictable behavior with optional expressive matching.

### Decision 4: CLI start command
- Choice: add `openspec mcp start` subcommand in main CLI entrypoint.
- Rationale: aligns with OpenSpec command UX while keeping runtime separate.

## Risks / Trade-offs

- [Risk] Ambiguity in "honest" output expectations → Mitigation: always return exact current registry entries and include total/returned counts.
- [Risk] Regex misuse causing errors → Mitigation: validate regex and return explicit error payload.
- [Risk] Future MCP protocol evolution → Mitigation: encapsulate server adapter behind local module boundary.

## Migration Plan

1. Add MCP runtime module and minimal server bootstrap.
2. Add `search_mcp_tools` implementation against live registry.
3. Wire `openspec mcp start` command.
4. Add tests for matching behavior and CLI start path.
5. Validate and run tests.

Rollback strategy:
- Remove `src/mcp/*` module and CLI command wiring, leaving existing OpenSpec workflows unchanged.

## Open Questions

- Should tool results include argument schema now or in a follow-up change?
- Should we add JSON-RPC transport compatibility tests in a separate change?
