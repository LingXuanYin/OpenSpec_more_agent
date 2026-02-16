type RoleContract = {
  role: string;
  responsibility: string;
};

type OpsxModeId =
  | 'explore'
  | 'deepresearch'
  | 'new'
  | 'continue'
  | 'ff'
  | 'apply'
  | 'verify'
  | 'sync'
  | 'archive'
  | 'bulk-archive'
  | 'onboard';

const CORE_ROLE_CONTRACTS: RoleContract[] = [
  {
    role: 'product',
    responsibility: 'Define user value, scope boundaries, and acceptance direction.',
  },
  {
    role: 'architecture',
    responsibility: 'Own system design, interfaces, constraints, and trade-offs.',
  },
  {
    role: 'worker',
    responsibility: 'Own implementation execution, integration, and delivery details.',
  },
  {
    role: 'algorithm',
    responsibility: 'Own algorithmic strategy, complexity, and performance reasoning.',
  },
];

function formatRoleContracts(contracts: RoleContract[]): string {
  return contracts
    .map(({ role, responsibility }) => `- \`${role}\`: ${responsibility}`)
    .join('\n');
}

export const ROLE_ORCHESTRATION_PROTOCOL = `**Role Orchestration Protocol (required before workflow execution actions)**

- Establish a role-based agent team before implementation work starts.
- Every active role MUST be declared in \`role + responsibility\` format.
- Undeclared roles MUST NOT participate in execution.
- Default core roles:
${formatRoleContracts(CORE_ROLE_CONTRACTS)}
- Main-agent authority:
  - Before role activation, the main agent MUST assess task complexity (for example: low, medium, high) and involved knowledge domains.
  - The main agent decides whether multi-agent collaboration is needed, which roles are active, and whether temporary roles are required; sub-agents MUST be created only when a concrete need is identified or when the user explicitly requests them.
  - The main agent decides single-agent vs multi-agent execution based on complexity and domain assessment results.
  - The main agent decides sequencing, parallelization, and temporary-role assignment.
  - Role execution order MUST NOT be hardcoded.
  - Cross-role conflicts are resolved by the main agent.
  - The main agent publishes consolidated decisions before downstream execution continues.
- Design-review pairing:
  - If a design role is active, the main agent MUST assign at least one corresponding review role.
  - Review mappings MAY be one-to-one or one-to-many, but every design scope MUST have review ownership.
- Boundary rules:
  - Each role MUST operate only within its declared responsibility boundary.
  - Roles MUST NOT execute work owned by another role.
  - Boundary violations MUST be flagged and reassigned to the owning role.
- Temporary roles:
  - Temporary roles (e.g., \`security\`, \`qa\`, \`docs\`) MAY be added when needed.
  - Every temporary role MUST include an explicit responsibility contract before participating.
  - If required domains are not covered by active roles, the main agent MUST create temporary roles to cover those domains.
  - Temporary roles without explicit responsibility contracts are invalid and MUST be blocked.
- Discussion groups:
  - When multiple roles discuss a decision, establish an agent discussion group with a shared context packet (problem frame, constraints, decision scope).
  - Role contributions in discussion groups MUST be role-tagged and reference the shared context packet.
  - The main agent publishes a consolidated decision summary with accepted direction and rejected alternatives before execution continues.
- Communication quality:
  - Inter-agent handoffs MUST include objective, recommendation or decision, blockers or assumptions, and next owner.
  - Agent exchanges MUST be concise, actionable, and unambiguous.
- Multi-agent runtimes:
  - If runtime multi-agent mode exists (for example, Codex sub-agents), use it only when the complexity/domain assessment confirms a concrete collaboration need or when the user explicitly requests sub-agents.
  - In Codex multi-agent mode, map core roles to explicit sub-agent owners and make mapping visible in output.
  - Include explicit owner mapping for \`product\`, \`architecture\`, \`worker\`, and \`algorithm\`.
  - When multi-agent mode is used, output MUST include concise activation rationale for active and inactive roles.
  - If multi-agent mode is unavailable, emulate the same protocol with explicit role sections.
`;

const MODE_SPECIFIC_ROLE_RESPONSIBILITIES: Record<OpsxModeId, string> = {
  explore: `- \`product\`: Frame problem boundaries, assumptions, user impact, and exploration objectives.
- \`architecture\`: Map architecture options, constraints, and trade-offs.
- \`worker\`: Gather implementation context from codebase and operational signals; MUST NOT implement feature code in explore mode.
- \`algorithm\`: Analyze complexity, performance implications, and edge-case behaviors of candidate approaches.
- \`temporary roles\`: MAY be created for domain analysis support (for example \`security\`, \`data\`), but MUST remain non-implementation in explore mode.`,
  deepresearch: `- \`product\`: Frame research goals, impact hypotheses, and decision criteria for academic/industry outcomes.
- \`architecture\`: Map solution spaces, evidence structures, constraints, and trade-offs across candidate approaches.
- \`worker\`: Collect literature/context/system signals and synthesize findings; MUST NOT produce feature implementation code in deepresearch mode.
- \`algorithm\`: Evaluate method choices, complexity/performance implications, and edge-case behavior in proposed research directions.
- \`temporary roles\`: MAY be added for domain depth (for example \`security\`, \`data\`, \`compliance\`), and MUST remain analysis-only in deepresearch mode.`,
  new: `- \`product\`: Define change intent, scope boundaries, and acceptance direction.
- \`architecture\`: Validate schema/workflow fit and early design constraints.
- \`worker\`: Translate decisions into change setup and artifact framing; MUST NOT implement feature code in this mode.
- \`algorithm\`: Assess feasibility and algorithmic risk to influence proposal quality.`,
  continue: `- \`product\`: Keep artifact progression aligned with intended scope and outcomes.
- \`architecture\`: Ensure dependency order and artifact coherence.
- \`worker\`: Draft the next artifact using dependencies/context; MUST NOT implement feature code in this mode.
- \`algorithm\`: Validate technical assumptions as artifacts evolve.`,
  ff: `- \`product\`: Keep fast-forward artifact generation aligned with user value and scope.
- \`architecture\`: Preserve cross-artifact consistency and decision quality under speed.
- \`worker\`: Generate required artifacts end-to-end; MUST NOT implement feature code in this mode.
- \`algorithm\`: Highlight complexity and performance concerns that should appear in design/tasks.`,
  apply: `- \`product\`: Guard acceptance criteria and user-value alignment during implementation.
- \`architecture\`: Enforce architecture constraints, interface integrity, and design compliance.
- \`worker\`: Own code implementation, integration, and task-by-task execution updates.
- \`algorithm\`: Review algorithmic correctness, complexity, and performance-sensitive decisions.`,
  verify: `- \`product\`: Validate requirement and scenario coverage against intended outcomes.
- \`architecture\`: Validate design adherence and structural coherence.
- \`worker\`: Collect implementation evidence and test gaps; MUST NOT introduce new feature scope during verification.
- \`algorithm\`: Validate edge cases, complexity risks, and performance correctness.`,
  sync: `- \`product\`: Ensure synced specs still represent intended behavior and scope.
- \`architecture\`: Keep spec structure and capability boundaries coherent.
- \`worker\`: Apply delta-to-main spec merges accurately; MUST NOT implement application feature code in sync mode.
- \`algorithm\`: Validate that complexity/performance requirements remain semantically correct after merge.`,
  archive: `- \`product\`: Confirm archival intent and operational readiness context.
- \`architecture\`: Validate archive-time integrity checks and dependency implications.
- \`worker\`: Execute archival/sync procedures and report outcomes; MUST NOT implement new feature code in archive mode.
- \`algorithm\`: Review conflict-resolution and ordering logic when spec updates are involved.`,
  'bulk-archive': `- \`product\`: Confirm batch archival scope and risk awareness.
- \`architecture\`: Validate cross-change conflict handling and ordering strategy.
- \`worker\`: Execute batch archival and spec-sync operations with per-change traceability; MUST NOT implement new feature code in this mode.
- \`algorithm\`: Evaluate conflict resolution ordering and deterministic merge behavior.`,
  onboard: `- \`product\`: Keep onboarding narrative aligned with user learning goals and task scope.
- \`architecture\`: Explain why artifacts and design decisions are sequenced as they are.
- \`worker\`: During teaching phases, follow phase boundaries: non-implementation phases MUST NOT code; apply phase MAY implement tasks.
- \`algorithm\`: Explain trade-offs and complexity reasoning as part of teaching outcomes.`,
};

export function getModeSpecificRoleResponsibilities(mode: OpsxModeId): string {
  return `**Mode-Specific Role Responsibilities (\`/opsx:${mode}\`)**

${MODE_SPECIFIC_ROLE_RESPONSIBILITIES[mode]}`;
}
