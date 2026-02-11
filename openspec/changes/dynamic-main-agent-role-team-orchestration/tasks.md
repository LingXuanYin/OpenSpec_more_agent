## 1. Shared Orchestration Protocol Enhancements

- [x] 1.1 Extend shared role protocol text to require main-agent dynamic team formation decisions (`whether/which roles/temporary roles`).
- [x] 1.2 Add design-review pairing rule in protocol (`design role` requires at least one mapped `review role`, supporting 1:1 and 1:N).
- [x] 1.3 Add discussion-group contract markers (shared context packet, role-tagged contributions, consolidated decision handoff).
- [x] 1.4 Add communication-quality contract markers for inter-agent handoffs (objective, recommendation/decision, blockers/assumptions, next owner).

## 2. Workflow Template Propagation and Fallback Consistency

- [x] 2.1 Ensure updated protocol semantics are injected into workflow skill templates (`new`, `continue`, `apply`, `ff`).
- [x] 2.2 Ensure updated protocol semantics are injected into workflow command templates (`new`, `continue`, `apply`, `ff`).
- [x] 2.3 Verify non-hardcoded role sequencing language remains explicit while preserving main-agent arbitration authority.
- [x] 2.4 Verify single-agent fallback guidance preserves identical ownership and boundary semantics when sub-agent mode is unavailable.

## 3. Documentation Updates

- [x] 3.1 Update OPSX role orchestration docs with dynamic team-formation behavior and temporary-role decision rules.
- [x] 3.2 Document design-review pairing expectations and supported reviewer mapping topologies.
- [x] 3.3 Document agent discussion-group protocol and efficient communication contract for professional multi-agent collaboration.

## 4. Test and Regression Coverage

- [x] 4.1 Extend shared template-generation tests to assert new protocol markers for dynamic formation, pairing, discussion-group, and communication contract.
- [x] 4.2 Extend init regression tests to verify generated managed outputs include the new protocol semantics.
- [x] 4.3 Extend update regression tests to verify managed blocks refresh to latest semantics without modifying unmanaged user content.
- [x] 4.4 Keep path-sensitive assertions cross-platform (`path.join()`/`path.resolve()`) for generated targets.
- [x] 4.5 Add Windows CI verification task for protocol generation and refresh behavior touching workflow files.

## 5. Validation and Completion

- [x] 5.1 Run strict artifact validation for this change (`openspec validate "dynamic-main-agent-role-team-orchestration" --type change --strict`).
- [x] 5.2 Run focused tests for template generation and init/update coverage changes.
- [x] 5.3 Run project checks (`pnpm test`) and resolve regressions related to this change.
