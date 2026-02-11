type RoleContract = {
  role: string;
  responsibility: string;
};

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

export const ROLE_ORCHESTRATION_PROTOCOL = `**Role Orchestration Protocol (required before implementation actions)**

- Establish a role-based agent team before implementation work starts.
- Every active role MUST be declared in \`role + responsibility\` format.
- Undeclared roles MUST NOT participate in execution.
- Default core roles:
${formatRoleContracts(CORE_ROLE_CONTRACTS)}
- Main-agent authority:
  - Before role activation, the main agent MUST assess task complexity (for example: low, medium, high) and involved knowledge domains.
  - The main agent decides whether multi-agent collaboration is needed, which roles are active, and whether temporary roles are required.
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
  - If runtime multi-agent mode exists (for example, Codex sub-agents), use it to assign role ownership.
  - In Codex multi-agent mode, map core roles to explicit sub-agent owners and make mapping visible in output.
  - Include explicit owner mapping for \`product\`, \`architecture\`, \`worker\`, and \`algorithm\`.
  - When multi-agent mode is used, output MUST include concise activation rationale for active and inactive roles.
  - If multi-agent mode is unavailable, emulate the same protocol with explicit role sections.
`;
