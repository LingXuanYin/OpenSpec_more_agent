## 1. MCP Runtime Skeleton

- [x] 1.1 Add isolated MCP runtime module under `src/mcp/`.
- [x] 1.2 Define live tool registry structure and registration flow.
- [x] 1.3 Implement server bootstrap entrypoint for foreground startup.

## 2. `search_mcp_tools` Tool

- [x] 2.1 Implement keyword-based search across tool metadata.
- [x] 2.2 Implement optional regex matching with explicit invalid-regex error handling.
- [x] 2.3 Ensure tool results are sourced from current live registry and include `search_mcp_tools` self-discovery behavior.
- [x] 2.4 Ensure response payload includes enough metadata for "honest" results (e.g., total tools, matches, match mode).

## 3. CLI Integration

- [x] 3.1 Add `openspec mcp start` command group/subcommand wiring in CLI.
- [x] 3.2 Add clear startup/failure messaging and exit behavior.

## 4. Tests and Validation

- [x] 4.1 Add unit tests for keyword and regex matching behavior.
- [x] 4.2 Add unit test for self-discovery (`search_mcp_tools` can find itself).
- [x] 4.3 Add CLI-level test(s) for MCP command discoverability/start-path wiring.
- [x] 4.4 Keep path-sensitive assertions cross-platform where relevant.

## 5. Completion Checks

- [x] 5.1 Validate change artifacts in strict mode.
- [x] 5.2 Run focused tests for new MCP modules and CLI wiring.
- [x] 5.3 Run full test suite and resolve regressions.
