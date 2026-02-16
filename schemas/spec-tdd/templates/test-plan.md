## TDD Strategy

## Test Matrix

| Capability / Scenario | Test Level | RED (Failing Test) | GREEN (Minimal Code) | Notes |
|---|---|---|---|---|
| [capability-scenario] | [unit/integration/e2e] | [test path + test name] | [component/module touched] | [notes] |

## RED-GREEN-REFACTOR Cadence

1. RED: add one failing test for the next smallest behavior slice.
2. GREEN: implement only enough code to pass the new test.
3. REFACTOR: clean duplication/naming while keeping tests green.
4. Repeat per slice.

## Quality Gates

- Every new behavior has at least one failing-to-passing test transition.
- No unchecked implementation work outside test-covered slices.
- Regression tests added for bugs and edge cases.

## Tooling and Commands

- Test command(s): `[exact command]`
- Focused run command(s): `[exact command]`
- Full suite gate command: `[exact command]`
