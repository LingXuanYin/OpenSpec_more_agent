## 1. Shared Protocol and Mode Contracts

- [x] 1.1 Add shared mode-specific role responsibility contract guidance covering all OPSX modes.
- [x] 1.2 Keep complexity/domain assessment and activation rationale semantics in shared protocol.

## 2. Template Coverage

- [x] 2.1 Inject role orchestration protocol into `explore` skill and slash-command templates.
- [x] 2.2 Ensure all OPSX templates include mode-specific role responsibility guidance.

## 3. Documentation

- [x] 3.1 Update `docs/opsx.md` to describe all-mode orchestration coverage including `explore`.
- [x] 3.2 Add concise mode-specific role boundary guidance in docs (non-coding vs coding modes).

## 4. Tests

- [x] 4.1 Expand shared template-generation tests to cover all OPSX modes including `explore`.
- [x] 4.2 Expand init tests to verify all generated workflow files contain role protocol and mode-boundary markers.
- [x] 4.3 Expand update tests to verify refreshed workflow files contain role protocol and mode-boundary markers.

## 5. Validation

- [x] 5.1 Run targeted tests for shared/init/update.
- [x] 5.2 Validate this change in strict mode.
