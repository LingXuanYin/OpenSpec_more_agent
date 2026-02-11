## 1. Role Orchestration Contract Definition

- [x] 1.1 Add a shared role-contract model for core roles (`product`, `architecture`, `worker`, `algorithm`) in workflow template generation code
- [x] 1.2 Add validation rules requiring `role + responsibility` declarations for all core roles before implementation guidance
- [x] 1.3 Add support for temporary roles with explicit responsibility contracts and ownership boundaries

## 2. Main-Agent Orchestration Behavior

- [x] 2.1 Update generated workflow instructions to state main-agent ownership of sequencing, parallelization, and arbitration
- [x] 2.2 Remove/replace any template wording that implies fixed hardcoded role execution order
- [x] 2.3 Add explicit boundary language: roles MUST NOT execute work outside their declared responsibilities

## 3. Skills and Prompt Template Updates

- [x] 3.1 Update OPSX skill templates in `src/core/templates/skill-templates.ts` to include role bootstrap and boundary guidance for planning/implementation flows
- [x] 3.2 Update shared OpenSpec-managed instruction template content so role orchestration appears in generated `openspec/AGENTS.md` guidance
- [x] 3.3 Ensure role protocol language remains semantically equivalent across tool-specific prompt/command adapters

## 4. Init and Update Integration

- [x] 4.1 Update `openspec init` generation path to emit role orchestration guidance in newly generated managed files
- [x] 4.2 Update `openspec update` refresh path to inject role orchestration guidance into existing managed blocks only
- [x] 4.3 Verify update behavior preserves unmanaged user content outside OpenSpec markers while refreshing role protocol text

## 5. Tests and Cross-Platform Verification

- [x] 5.1 Add/extend unit tests for generated managed content to assert core roles, non-hardcoded ordering, and boundary rules
- [x] 5.2 Add regression tests for `init` + `update` to confirm role protocol appears across representative integrations
- [x] 5.3 Add path-related tests using `path.join()` expectations for generated file targets on Windows and POSIX
- [x] 5.4 Add Windows CI verification task for role-protocol generation and update flows when commands/prompts are path-sensitive

## 6. Documentation and Final Validation

- [x] 6.1 Update relevant docs to describe role boundaries, main-agent orchestration authority, and temporary-role contracts
- [x] 6.2 Run targeted validation (`openspec validate --change evolve-role-based-agent-workflow-and-skills --strict`)
- [x] 6.3 Run project checks (`pnpm test` and focused template-generation tests) and resolve regressions
