## 1. Shared Protocol Expansion

- [x] 1.1 Extend `ROLE_ORCHESTRATION_PROTOCOL` with complexity assessment and knowledge-domain identification requirements before role activation.
- [x] 1.2 Add protocol clauses requiring explicit activation rationale and role-to-owner mapping visibility when multi-agent mode is selected.

## 2. Workflow Template Coverage Expansion

- [x] 2.1 Inject shared role protocol into additional skill templates: `verify`, `sync`, `archive`, `bulk-archive`, and `onboard`.
- [x] 2.2 Inject shared role protocol into additional slash-command templates: `verify`, `sync`, `archive`, `bulk-archive`, and `onboard`.

## 3. Tests

- [x] 3.1 Expand shared template generation tests to assert protocol presence for the expanded workflow set.
- [x] 3.2 Expand init generation tests to verify expanded workflow files include protocol markers and complexity/domain semantics.
- [x] 3.3 Expand update refresh tests to verify expanded workflow files include protocol markers and complexity/domain semantics.

## 4. Documentation Alignment

- [x] 4.1 Update OPSX documentation role-orchestration section to reflect expanded workflow coverage and complexity/domain decision gate behavior.

## 5. Validation

- [x] 5.1 Run targeted tests for shared/init/update coverage.
- [x] 5.2 Validate change artifacts in strict mode.
