## 1. Role Protocol Model and Template Integration

- [x] 1.1 Add/extend a shared role-orchestration contract model for Codex multi-agent mapping (`product`, `architecture`, `worker`, `algorithm`)
- [x] 1.2 Ensure workflow templates emit explicit `role + responsibility` declarations for all active roles
- [x] 1.3 Add temporary-role contract requirements and invalid-role handling language in generated instructions

## 2. Main-Agent Authority and Boundary Rules

- [x] 2.1 Update workflow prompt/skill templates to state main-agent ownership of sequencing, parallelization, temporary-role assignment, and arbitration
- [x] 2.2 Remove any wording that implies fixed hardcoded role execution order
- [x] 2.3 Add explicit boundary constraints: roles MUST NOT execute work owned by other roles

## 3. Codex Multi-Agent Runtime Mapping

- [x] 3.1 Add Codex-specific guidance to map core roles to sub-agents when runtime multi-agent mode is available
- [x] 3.2 Add fallback guidance to emulate identical role contracts when sub-agent mode is unavailable
- [x] 3.3 Ensure generated content keeps equivalent orchestration semantics across all workflow stages (`new`, `continue`, `apply`, `ff`)

## 4. Init/Update Generation and Refresh Paths

- [x] 4.1 Verify `openspec init` generation includes the Codex multi-agent role protocol in managed outputs
- [x] 4.2 Verify `openspec update` refreshes managed blocks with latest role protocol content
- [x] 4.3 Confirm unmanaged user content outside OpenSpec markers remains untouched during updates

## 5. Tests and Cross-Platform Verification

- [x] 5.1 Add/extend shared template tests to assert role mapping markers, boundary rules, and non-hardcoded sequencing semantics
- [x] 5.2 Add init/update regression tests ensuring workflow files include Codex multi-agent protocol text
- [x] 5.3 Keep path-sensitive test expectations cross-platform (`path.join()`/`path.resolve()`) for generated targets
- [x] 5.4 Add Windows CI verification task for role-protocol generation and refresh behavior in command/prompt outputs

## 6. Documentation and Final Validation

- [x] 6.1 Update OPSX docs with Codex multi-agent mapping behavior, main-agent authority, and single-agent fallback semantics
- [x] 6.2 Validate change artifacts in strict mode (`openspec validate "codex-multi-agent-role-orchestration" --type change --strict`)
- [x] 6.3 Run project checks (`pnpm test` and focused template-generation tests) and resolve regressions
