# OPSX Workflow

> Feedback welcome on [Discord](https://discord.gg/YctCnvvshC).

## What Is It?

OPSX is now the standard workflow for OpenSpec.

It's a **fluid, iterative workflow** for OpenSpec changes. No more rigid phases 鈥?just actions you can take anytime.

## Why This Exists

The legacy OpenSpec workflow works, but it's **locked down**:

- **Instructions are hardcoded** 鈥?buried in TypeScript, you can't change them
- **All-or-nothing** 鈥?one big command creates everything, can't test individual pieces
- **Fixed structure** 鈥?same workflow for everyone, no customization
- **Black box** 鈥?when AI output is bad, you can't tweak the prompts

**OPSX opens it up.** Now anyone can:

1. **Experiment with instructions** 鈥?edit a template, see if the AI does better
2. **Test granularly** 鈥?validate each artifact's instructions independently
3. **Customize workflows** 鈥?define your own artifacts and dependencies
4. **Iterate quickly** 鈥?change a template, test immediately, no rebuild

```
Legacy workflow:                      OPSX:
鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?          鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
鈹? Hardcoded in package  鈹?          鈹? schema.yaml           鈹傗梽鈹€鈹€ You edit this
鈹? (can't change)        鈹?          鈹? templates/*.md        鈹傗梽鈹€鈹€ Or this
鈹?       鈫?              鈹?          鈹?       鈫?              鈹?
鈹? Wait for new release  鈹?          鈹? Instant effect        鈹?
鈹?       鈫?              鈹?          鈹?       鈫?              鈹?
鈹? Hope it's better      鈹?          鈹? Test it yourself      鈹?
鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?          鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
```

**This is for everyone:**
- **Teams** 鈥?create workflows that match how you actually work
- **Power users** 鈥?tweak prompts to get better AI outputs for your codebase
- **OpenSpec contributors** 鈥?experiment with new approaches without releases

We're all still learning what works best. OPSX lets us learn together.

## The User Experience

**The problem with linear workflows:**
You're "in planning phase", then "in implementation phase", then "done". But real work doesn't work that way. You implement something, realize your design was wrong, need to update specs, continue implementing. Linear phases fight against how work actually happens.

**OPSX approach:**
- **Actions, not phases** 鈥?create, implement, update, archive 鈥?do any of them anytime
- **Dependencies are enablers** 鈥?they show what's possible, not what's required next

```
  proposal 鈹€鈹€鈫?specs 鈹€鈹€鈫?design 鈹€鈹€鈫?tasks 鈹€鈹€鈫?implement
```

## Setup

```bash
# Make sure you have openspec installed 鈥?skills are automatically generated
openspec init
```

This creates skills in `.claude/skills/` (or equivalent) that AI coding assistants auto-detect.

During setup, you'll be prompted to create a **project config** (`openspec/config.yaml`). This is optional but recommended.

## Project Configuration

Project config lets you set defaults and inject project-specific context into all artifacts.

### Creating Config

Config is created during `openspec init`, or manually:

```yaml
# openspec/config.yaml
schema: spec-tdd

context: |
  Tech stack: TypeScript, React, Node.js
  API conventions: RESTful, JSON responses
  Testing: Vitest for unit tests, Playwright for e2e
  Style: ESLint with Prettier, strict TypeScript

rules:
  proposal:
    - Include rollback plan
    - Identify affected teams
  specs:
    - Use Given/When/Then format for scenarios
  design:
    - Include sequence diagrams for complex flows
```

### Config Fields

| Field | Type | Description |
|-------|------|-------------|
| `schema` | string | Default schema for new changes (e.g., `spec-tdd`) |
| `context` | string | Project context injected into all artifact instructions |
| `rules` | object | Per-artifact rules, keyed by artifact ID |

### How It Works

**Schema precedence** (highest to lowest):
1. CLI flag (`--schema <name>`)
2. Change metadata (`.openspec.yaml` in change directory)
3. Project config (`openspec/config.yaml`)
4. Default (`spec-tdd`)

**Context injection:**
- Context is prepended to every artifact's instructions
- Wrapped in `<context>...</context>` tags
- Helps AI understand your project's conventions

**Rules injection:**
- Rules are only injected for matching artifacts
- Wrapped in `<rules>...</rules>` tags
- Appear after context, before the template

### Artifact IDs by Schema

**spec-tdd** (default):
- `proposal` - Change proposal
- `specs` - Specifications
- `tdd-plan` - Test strategy and RED-GREEN-REFACTOR plan
- `design` - Technical design
- `tasks` - Implementation tasks

### Config Validation

- Unknown artifact IDs in `rules` generate warnings
- Schema names are validated against available schemas
- Context has a 50KB size limit
- Invalid YAML is reported with line numbers

### Troubleshooting

**"Unknown artifact ID in rules: X"**
- Check artifact IDs match your schema (see list above)
- Run `openspec schemas --json` to see artifact IDs for each schema

**Config not being applied:**
- Ensure file is at `openspec/config.yaml` (not `.yml`)
- Check YAML syntax with a validator
- Config changes take effect immediately (no restart needed)

**Context too large:**
- Context is limited to 50KB
- Summarize or link to external docs instead

## Commands

| Command | What it does |
|---------|--------------|
| `/opsx:explore` | Think through ideas, investigate problems, clarify requirements |
| `/opsx:deepresearch` | Run rigorous research/analysis for academic outcomes and solution options (no code implementation) |
| `/opsx:new` | Start a new change |
| `/opsx:continue` | Create the next artifact (based on what's ready) |
| `/opsx:ff` | Fast-forward 鈥?create all planning artifacts at once |
| `/opsx:apply` | Implement tasks, updating artifacts as needed |
| `/opsx:sync` | Sync delta specs to main (optional鈥攁rchive prompts if needed) |
| `/opsx:archive` | Archive when done |

## Role-Based Agent Orchestration

OPSX workflow commands now support a role-based protocol for complex work.

- Default core roles: `product`, `architecture`, `worker`, `algorithm`
- Every role is declared as `role + responsibility`
- Roles must stay within their responsibility boundaries
- Protocol coverage includes: `/opsx:explore`, `/opsx:deepresearch`, `/opsx:new`, `/opsx:continue`, `/opsx:apply`, `/opsx:ff`, `/opsx:verify`, `/opsx:sync`, `/opsx:archive`, `/opsx:bulk-archive`, and `/opsx:onboard`
- Before role activation, the main agent assesses task complexity and involved knowledge domains
- The main agent dynamically decides whether to use multi-agent collaboration, which roles to activate, and whether temporary roles are needed; sub-agents are created only when there is a concrete need or an explicit user request
- The main agent decides single-agent vs multi-agent execution from the complexity/domain assessment
- The main agent owns sequencing, parallelization, temporary-role assignment, and conflict arbitration
- Role order is not hardcoded; it is decided dynamically per task
- If a design role is active, at least one corresponding review role is required (one-to-one or one-to-many)
- Temporary roles (for example, `security`, `qa`, `docs`) are allowed with explicit responsibility contracts
- If required domains are not covered by active roles, temporary roles are created to cover those domains
- Undeclared roles do not participate; temporary roles without contracts are treated as invalid
- Boundary violations are reassigned to the owning role by the main agent
- For multi-role discussions, use an agent discussion group with a shared context packet (problem frame, constraints, decision scope)
- Discussion messages are role-tagged and handoffs include objective, recommendation/decision, blockers/assumptions, and next owner
- The main agent publishes a consolidated decision summary before downstream execution continues
- In multi-agent mode, outputs include explicit role-to-owner mapping and concise reasons for active/inactive roles
- Mode boundary: `/opsx:explore` is role-based analysis only; it must not produce feature-code implementation work
- Mode boundary: `/opsx:deepresearch` is research/analysis only; it must not produce feature-code implementation work
- Mode boundary: `/opsx:new`, `/opsx:continue`, and `/opsx:ff` are artifact/planning-oriented; they must not perform feature-code implementation
- Mode boundary: `/opsx:apply` is implementation-oriented; worker owns code changes while other roles review and constrain
- Mode boundary: `/opsx:verify` is validation-oriented; it must not introduce new feature scope
- Mode boundary: `/opsx:sync` is spec-merge-oriented; it must not implement application feature code
- Mode boundary: `/opsx:archive` and `/opsx:bulk-archive` are operational; they must not implement new feature code
- Mode boundary: `/opsx:onboard` is phase-driven; non-implementation phases must not code, apply phase may implement

For agent runtimes with built-in multi-agent support (including Codex sub-agent mode), OPSX prompts map these roles to explicit sub-agent owners only when complexity/domain analysis confirms a concrete need or the user explicitly asks for sub-agents, while keeping orchestration authority with the main agent. If sub-agent mode is unavailable, OPSX falls back to explicit single-agent role sections with equivalent role contracts.

## Usage

### Explore an idea
```
/opsx:explore
```
Think through ideas, investigate problems, compare options. No structure required - just a thinking partner. When insights crystallize, transition to `/opsx:new` or `/opsx:ff`.

### Deep research
```
/opsx:deepresearch
```
Run research-first analysis for academic/industry outcomes and option trade-offs. This mode is analysis-only and does not permit code implementation output.

### Start a new change
```
/opsx:new
```
You'll be asked what you want to build and which workflow schema to use.

### Create artifacts
```
/opsx:continue
```
Shows what's ready to create based on dependencies, then creates one artifact. Use repeatedly to build up your change incrementally.

```
/opsx:ff add-dark-mode
```
Creates all planning artifacts at once. Use when you have a clear picture of what you're building.

### Implement (the fluid part)
```
/opsx:apply
```
Works through tasks, checking them off as you go. If you're juggling multiple changes, you can run `/opsx:apply <name>`; otherwise it should infer from the conversation and prompt you to choose if it can't tell.

### Finish up
```
/opsx:archive   # Move to archive when done (prompts to sync specs if needed)
```

## When to Update vs. Start Fresh

You can always edit your proposal or specs before implementation. But when does refining become "this is different work"?

### What a Proposal Captures

A proposal defines three things:
1. **Intent** 鈥?What problem are you solving?
2. **Scope** 鈥?What's in/out of bounds?
3. **Approach** 鈥?How will you solve it?

The question is: which changed, and by how much?

### Update the Existing Change When:

**Same intent, refined execution**
- You discover edge cases you didn't consider
- The approach needs tweaking but the goal is unchanged
- Implementation reveals the design was slightly off

**Scope narrows**
- You realize full scope is too big, want to ship MVP first
- "Add dark mode" 鈫?"Add dark mode toggle (system preference in v2)"

**Learning-driven corrections**
- Codebase isn't structured how you thought
- A dependency doesn't work as expected
- "Use CSS variables" 鈫?"Use Tailwind's dark: prefix instead"

### Start a New Change When:

**Intent fundamentally changed**
- The problem itself is different now
- "Add dark mode" 鈫?"Add comprehensive theme system with custom colors, fonts, spacing"

**Scope exploded**
- Change grew so much it's essentially different work
- Original proposal would be unrecognizable after updates
- "Fix login bug" 鈫?"Rewrite auth system"

**Original is completable**
- The original change can be marked "done"
- New work stands alone, not a refinement
- Complete "Add dark mode MVP" 鈫?Archive 鈫?New change "Enhance dark mode"

### The Heuristics

```
                        鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
                        鈹?    Is this the same work?          鈹?
                        鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
                                       鈹?
                    鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹尖攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
                    鈹?                 鈹?                 鈹?
                    鈻?                 鈻?                 鈻?
             Same intent?      >50% overlap?      Can original
             Same problem?     Same scope?        be "done" without
                    鈹?                 鈹?         these changes?
                    鈹?                 鈹?                 鈹?
          鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹粹攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹? 鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹粹攢鈹€鈹€鈹€鈹€鈹€鈹?  鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹粹攢鈹€鈹€鈹€鈹€鈹€鈹€鈹?
          鈹?                鈹? 鈹?            鈹?  鈹?              鈹?
         YES               NO YES           NO  NO              YES
          鈹?                鈹? 鈹?            鈹?  鈹?              鈹?
          鈻?                鈻? 鈻?            鈻?  鈻?              鈻?
       UPDATE            NEW  UPDATE       NEW  UPDATE          NEW
```

| Test | Update | New Change |
|------|--------|------------|
| **Identity** | "Same thing, refined" | "Different work" |
| **Scope overlap** | >50% overlaps | <50% overlaps |
| **Completion** | Can't be "done" without changes | Can finish original, new work stands alone |
| **Story** | Update chain tells coherent story | Patches would confuse more than clarify |

### The Principle

> **Update preserves context. New change provides clarity.**
>
> Choose update when the history of your thinking is valuable.
> Choose new when starting fresh would be clearer than patching.

Think of it like git branches:
- Keep committing while working on the same feature
- Start a new branch when it's genuinely new work
- Sometimes merge a partial feature and start fresh for phase 2

## What's Different?

| | Legacy (`/openspec:proposal`) | OPSX (`/opsx:*`) |
|---|---|---|
| **Structure** | One big proposal document | Discrete artifacts with dependencies |
| **Workflow** | Linear phases: plan 鈫?implement 鈫?archive | Fluid actions 鈥?do anything anytime |
| **Iteration** | Awkward to go back | Update artifacts as you learn |
| **Customization** | Fixed structure | Schema-driven (define your own artifacts) |

**The key insight:** work isn't linear. OPSX stops pretending it is.

## Architecture Deep Dive

This section explains how OPSX works under the hood and how it compares to the legacy workflow.

### Philosophy: Phases vs Actions

```
鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
鈹?                        LEGACY WORKFLOW                                      鈹?
鈹?                   (Phase-Locked, All-or-Nothing)                           鈹?
鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
鈹?                                                                            鈹?
鈹?  鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?     鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?     鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?            鈹?
鈹?  鈹?  PLANNING   鈹?鈹€鈹€鈹€鈻?鈹?IMPLEMENTING 鈹?鈹€鈹€鈹€鈻?鈹?  ARCHIVING  鈹?            鈹?
鈹?  鈹?   PHASE     鈹?     鈹?   PHASE     鈹?     鈹?   PHASE     鈹?            鈹?
鈹?  鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?     鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?     鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?            鈹?
鈹?        鈹?                    鈹?                    鈹?                      鈹?
鈹?        鈻?                    鈻?                    鈻?                      鈹?
鈹?  /openspec:proposal   /openspec:apply      /openspec:archive              鈹?
鈹?                                                                            鈹?
鈹?  鈥?Creates ALL artifacts at once                                          鈹?
鈹?  鈥?Can't go back to update specs during implementation                    鈹?
鈹?  鈥?Phase gates enforce linear progression                                  鈹?
鈹?                                                                            鈹?
鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?


鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
鈹?                           OPSX WORKFLOW                                     鈹?
鈹?                     (Fluid Actions, Iterative)                             鈹?
鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
鈹?                                                                            鈹?
鈹?             鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?                鈹?
鈹?             鈹?          ACTIONS (not phases)             鈹?                鈹?
鈹?             鈹?                                           鈹?                鈹?
鈹?             鈹?  new 鈼勨攢鈹€鈻?continue 鈼勨攢鈹€鈻?apply 鈼勨攢鈹€鈻?archive 鈹?                鈹?
鈹?             鈹?   鈹?         鈹?          鈹?          鈹?   鈹?                鈹?
鈹?             鈹?   鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹粹攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹粹攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?   鈹?                鈹?
鈹?             鈹?             any order                     鈹?                鈹?
鈹?             鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?                鈹?
鈹?                                                                            鈹?
鈹?  鈥?Create artifacts one at a time OR fast-forward                         鈹?
鈹?  鈥?Update specs/design/tasks during implementation                        鈹?
鈹?  鈥?Dependencies enable progress, phases don't exist                       鈹?
鈹?                                                                            鈹?
鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
```

### Component Architecture

**Legacy workflow** uses hardcoded templates in TypeScript:

```
鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
鈹?                     LEGACY WORKFLOW COMPONENTS                              鈹?
鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
鈹?                                                                            鈹?
鈹?  Hardcoded Templates (TypeScript strings)                                  鈹?
鈹?                   鈹?                                                       鈹?
鈹?                   鈻?                                                       鈹?
鈹?  Configurators (18+ classes, one per editor)                               鈹?
鈹?                   鈹?                                                       鈹?
鈹?                   鈻?                                                       鈹?
鈹?  Generated Command Files (.claude/commands/openspec/*.md)                  鈹?
鈹?                                                                            鈹?
鈹?  鈥?Fixed structure, no artifact awareness                                  鈹?
鈹?  鈥?Change requires code modification + rebuild                             鈹?
鈹?                                                                            鈹?
鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
```

**OPSX** uses external schemas and a dependency graph engine:

```
鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
鈹?                        OPSX COMPONENTS                                      鈹?
鈹溾攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
鈹?                                                                            鈹?
鈹?  Schema Definitions (YAML)                                                 鈹?
鈹?  鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?  鈹?
鈹?  鈹? name: spec-driven                                                  鈹?  鈹?
鈹?  鈹? artifacts:                                                         鈹?  鈹?
鈹?  鈹?   - id: proposal                                                   鈹?  鈹?
鈹?  鈹?     generates: proposal.md                                         鈹?  鈹?
鈹?  鈹?     requires: []              鈼勨攢鈹€ Dependencies                     鈹?  鈹?
鈹?  鈹?   - id: specs                                                      鈹?  鈹?
鈹?  鈹?     generates: specs/**/*.md  鈼勨攢鈹€ Glob patterns                    鈹?  鈹?
鈹?  鈹?     requires: [proposal]      鈼勨攢鈹€ Enables after proposal           鈹?  鈹?
鈹?  鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?  鈹?
鈹?                   鈹?                                                       鈹?
鈹?                   鈻?                                                       鈹?
鈹?  Artifact Graph Engine                                                     鈹?
鈹?  鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?  鈹?
鈹?  鈹? 鈥?Topological sort (dependency ordering)                           鈹?  鈹?
鈹?  鈹? 鈥?State detection (filesystem existence)                           鈹?  鈹?
鈹?  鈹? 鈥?Rich instruction generation (templates + context)                鈹?  鈹?
鈹?  鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?  鈹?
鈹?                   鈹?                                                       鈹?
鈹?                   鈻?                                                       鈹?
鈹?  Skill Files (.claude/skills/openspec-*/SKILL.md)                          鈹?
鈹?                                                                            鈹?
鈹?  鈥?Cross-editor compatible (Claude Code, Cursor, Windsurf)                 鈹?
鈹?  鈥?Skills query CLI for structured data                                    鈹?
鈹?  鈥?Fully customizable via schema files                                     鈹?
鈹?                                                                            鈹?
鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
```

### Dependency Graph Model

Artifacts form a directed acyclic graph (DAG). Dependencies are **enablers**, not gates:

```
                              proposal
                             (root node)
                                  鈹?
                    鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹粹攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
                    鈹?                          鈹?
                    鈻?                          鈻?
                 specs                       design
              (requires:                  (requires:
               proposal)                   proposal)
                    鈹?                          鈹?
                    鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
                                  鈹?
                                  鈻?
                               tasks
                           (requires:
                           specs, design)
                                  鈹?
                                  鈻?
                          鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
                          鈹?APPLY PHASE  鈹?
                          鈹?(requires:   鈹?
                          鈹? tasks)      鈹?
                          鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
```

**State transitions:**

```
   BLOCKED 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈻?READY 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈻?DONE
      鈹?                       鈹?                      鈹?
   Missing                  All deps               File exists
   dependencies             are DONE               on filesystem
```

### Information Flow

**Legacy workflow** 鈥?agent receives static instructions:

```
  User: "/openspec:proposal"
           鈹?
           鈻?
  鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
  鈹? Static instructions:                   鈹?
  鈹? 鈥?Create proposal.md                   鈹?
  鈹? 鈥?Create tasks.md                      鈹?
  鈹? 鈥?Create design.md                     鈹?
  鈹? 鈥?Create specs/<capability>/spec.md    鈹?
  鈹?                                        鈹?
  鈹? No awareness of what exists or         鈹?
  鈹? dependencies between artifacts         鈹?
  鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
           鈹?
           鈻?
  Agent creates ALL artifacts in one go
```

**OPSX** 鈥?agent queries for rich context:

```
  User: "/opsx:continue"
           鈹?
           鈻?
  鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
  鈹? Step 1: Query current state                                             鈹?
  鈹? 鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹? 鈹?
  鈹? 鈹? $ openspec status --change "add-auth" --json                      鈹? 鈹?
  鈹? 鈹?                                                                   鈹? 鈹?
  鈹? 鈹? {                                                                 鈹? 鈹?
  鈹? 鈹?   "artifacts": [                                                  鈹? 鈹?
  鈹? 鈹?     {"id": "proposal", "status": "done"},                         鈹? 鈹?
  鈹? 鈹?     {"id": "specs", "status": "ready"},      鈼勨攢鈹€ First ready      鈹? 鈹?
  鈹? 鈹?     {"id": "design", "status": "ready"},                          鈹? 鈹?
  鈹? 鈹?     {"id": "tasks", "status": "blocked", "missingDeps": ["specs"]}鈹? 鈹?
  鈹? 鈹?   ]                                                               鈹? 鈹?
  鈹? 鈹? }                                                                 鈹? 鈹?
  鈹? 鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹? 鈹?
  鈹?                                                                         鈹?
  鈹? Step 2: Get rich instructions for ready artifact                        鈹?
  鈹? 鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹? 鈹?
  鈹? 鈹? $ openspec instructions specs --change "add-auth" --json          鈹? 鈹?
  鈹? 鈹?                                                                   鈹? 鈹?
  鈹? 鈹? {                                                                 鈹? 鈹?
  鈹? 鈹?   "template": "# Specification\n\n## ADDED Requirements...",      鈹? 鈹?
  鈹? 鈹?   "dependencies": [{"id": "proposal", "path": "...", "done": true}鈹? 鈹?
  鈹? 鈹?   "unlocks": ["tasks"]                                            鈹? 鈹?
  鈹? 鈹? }                                                                 鈹? 鈹?
  鈹? 鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹? 鈹?
  鈹?                                                                         鈹?
  鈹? Step 3: Read dependencies 鈫?Create ONE artifact 鈫?Show what's unlocked  鈹?
  鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
```

### Iteration Model

**Legacy workflow** 鈥?awkward to iterate:

```
  鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?    鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?    鈹屸攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
  鈹?proposal鈹?鈹€鈹€鈻?鈹?/apply  鈹?鈹€鈹€鈻?鈹?archive 鈹?
  鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?    鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?    鈹斺攢鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹?
       鈹?              鈹?
       鈹?              鈹溾攢鈹€ "Wait, the design is wrong"
       鈹?              鈹?
       鈹?              鈹溾攢鈹€ Options:
       鈹?              鈹?  鈥?Edit files manually (breaks context)
       鈹?              鈹?  鈥?Abandon and start over
       鈹?              鈹?  鈥?Push through and fix later
       鈹?              鈹?
       鈹?              鈹斺攢鈹€ No official "go back" mechanism
       鈹?
       鈹斺攢鈹€ Creates ALL artifacts at once
```

**OPSX** 鈥?natural iteration:

```
  /opsx:new 鈹€鈹€鈹€鈻?/opsx:continue 鈹€鈹€鈹€鈻?/opsx:apply 鈹€鈹€鈹€鈻?/opsx:archive
      鈹?               鈹?                 鈹?
      鈹?               鈹?                 鈹溾攢鈹€ "The design is wrong"
      鈹?               鈹?                 鈹?
      鈹?               鈹?                 鈻?
      鈹?               鈹?           Just edit design.md
      鈹?               鈹?           and continue!
      鈹?               鈹?                 鈹?
      鈹?               鈹?                 鈻?
      鈹?               鈹?        /opsx:apply picks up
      鈹?               鈹?        where you left off
      鈹?               鈹?
      鈹?               鈹斺攢鈹€ Creates ONE artifact, shows what's unlocked
      鈹?
      鈹斺攢鈹€ Scaffolds change, waits for direction
```

### Custom Schemas

Create custom workflows using the schema management commands:

```bash
# Create a new schema from scratch (interactive)
openspec schema init my-workflow

# Or fork an existing schema as a starting point
openspec schema fork spec-driven my-workflow

# Validate your schema structure
openspec schema validate my-workflow

# See where a schema resolves from (useful for debugging)
openspec schema which my-workflow
```

Schemas are stored in `openspec/schemas/` (project-local, version controlled) or `~/.local/share/openspec/schemas/` (user global).

**Schema structure:**
```
openspec/schemas/research-first/
鈹溾攢鈹€ schema.yaml
鈹斺攢鈹€ templates/
    鈹溾攢鈹€ research.md
    鈹溾攢鈹€ proposal.md
    鈹斺攢鈹€ tasks.md
```

**Example schema.yaml:**
```yaml
name: research-first
artifacts:
  - id: research        # Added before proposal
    generates: research.md
    requires: []

  - id: proposal
    generates: proposal.md
    requires: [research]  # Now depends on research

  - id: tasks
    generates: tasks.md
    requires: [proposal]
```

**Dependency Graph:**
```
   research 鈹€鈹€鈻?proposal 鈹€鈹€鈻?tasks
```

### Summary

| Aspect | Legacy | OPSX |
|--------|----------|------|
| **Templates** | Hardcoded TypeScript | External YAML + Markdown |
| **Dependencies** | None (all at once) | DAG with topological sort |
| **State** | Phase-based mental model | Filesystem existence |
| **Customization** | Edit source, rebuild | Create schema.yaml |
| **Iteration** | Phase-locked | Fluid, edit anything |
| **Editor Support** | 18+ configurator classes | Single skills directory |

## Schemas

Schemas define what artifacts exist and their dependencies. Currently available:

- **spec-tdd** (default): proposal -> specs + tdd-plan -> design -> tasks
- **spec-driven**: proposal -> specs -> design -> tasks
- **tdd**: tests -> implementation -> docs

```bash
# List available schemas
openspec schemas

# See all schemas with their resolution sources
openspec schema which --all

# Create a new schema interactively
openspec schema init my-workflow

# Fork an existing schema for customization
openspec schema fork spec-driven my-workflow

# Validate schema structure before use
openspec schema validate my-workflow
```

## Tips

- Use `/opsx:explore` to think through an idea before committing to a change
- `/opsx:ff` when you know what you want, `/opsx:continue` when exploring
- During `/opsx:apply`, if something's wrong 鈥?fix the artifact, then continue
- Tasks track progress via checkboxes in `tasks.md`
- Check status anytime: `openspec status --change "name"`

## Feedback

This is rough. That's intentional 鈥?we're learning what works.

Found a bug? Have ideas? Join us on [Discord](https://discord.gg/YctCnvvshC) or open an issue on [GitHub](https://github.com/Fission-AI/openspec/issues).

