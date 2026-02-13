import type {
  McpEnvironmentInfo,
  McpToolDefinition,
  McpToolManifest,
  McpToolCallResult,
  SearchMcpToolsArgs,
} from './types.js';

const MCP_TOOL_MANIFESTS: McpToolManifest[] = [
  {
    name: 'search_mcp_tools',
    description:
      'Search the current live MCP tool registry using regex matching (optional) or keyword matching.',
    keywords: ['mcp', 'tools', 'search', 'registry', 'regex', 'keyword', 'realtime', 'honest'],
    sdkDependencies: {
      '@fission-ai/openspec-mcp-runtime': '1.0.0',
    },
    thirdPartyDependencies: {},
    dependsOnTools: [],
  },
];

function normalizeText(text: string): string {
  return text.trim().toLowerCase();
}

function tokenizeQuery(query: string): string[] {
  return normalizeText(query)
    .split(/\s+/)
    .filter((token) => token.length > 0);
}

function createSearchMcpToolsTool(
  getTools: () => McpToolDefinition[],
  manifest: McpToolManifest,
  environment?: McpEnvironmentInfo
): McpToolDefinition {
  return {
    name: manifest.name,
    description: manifest.description,
    keywords: [...manifest.keywords],
    workspacePath: environment?.toolWorkspaces[manifest.name],
    sdkDependencies: { ...manifest.sdkDependencies },
    thirdPartyDependencies: { ...manifest.thirdPartyDependencies },
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', minLength: 1 },
        useRegex: { type: 'boolean' },
      },
      required: ['query'],
      additionalProperties: false,
    },
    async execute(args: unknown): Promise<McpToolCallResult> {
      const payload = (args ?? {}) as Partial<SearchMcpToolsArgs>;
      const query = typeof payload.query === 'string' ? payload.query.trim() : '';
      const useRegex = payload.useRegex === true;

      if (!query) {
        return {
          ok: false,
          error: {
            code: 'INVALID_ARGUMENT',
            message: 'query is required and must be a non-empty string',
          },
        };
      }

      const currentTools = getTools();
      const fieldsForTool = (tool: McpToolDefinition): string[] => [
        tool.name,
        tool.description,
        ...tool.keywords,
      ];

      if (useRegex) {
        let regex: RegExp;
        try {
          regex = new RegExp(query, 'i');
        } catch (error) {
          return {
            ok: false,
            error: {
              code: 'INVALID_REGEX',
              message: 'Invalid regex pattern provided',
              details: { pattern: query, reason: (error as Error).message },
            },
          };
        }

        const matches = currentTools.filter((tool) =>
          fieldsForTool(tool).some((field) => regex.test(field))
        );

        return {
          ok: true,
          data: {
            mode: 'regex',
            query,
            totalTools: currentTools.length,
            returnedTools: matches.length,
            tools: matches.map((tool) => ({
              name: tool.name,
              description: tool.description,
              keywords: tool.keywords,
              workspacePath: tool.workspacePath,
              sdkDependencies: tool.sdkDependencies,
              thirdPartyDependencies: tool.thirdPartyDependencies,
            })),
          },
        };
      }

      const tokens = tokenizeQuery(query);
      const matches = currentTools.filter((tool) => {
        const searchable = fieldsForTool(tool).map(normalizeText).join(' ');
        return tokens.every((token) => searchable.includes(token));
      });

      return {
        ok: true,
        data: {
          mode: 'keyword',
          query,
          tokens,
          totalTools: currentTools.length,
          returnedTools: matches.length,
          tools: matches.map((tool) => ({
            name: tool.name,
            description: tool.description,
            keywords: tool.keywords,
            workspacePath: tool.workspacePath,
            sdkDependencies: tool.sdkDependencies,
            thirdPartyDependencies: tool.thirdPartyDependencies,
          })),
        },
      };
    },
  };
}

export function getMcpToolManifests(): McpToolManifest[] {
  return MCP_TOOL_MANIFESTS.map((manifest) => ({
    ...manifest,
    keywords: [...manifest.keywords],
    sdkDependencies: { ...manifest.sdkDependencies },
    thirdPartyDependencies: { ...manifest.thirdPartyDependencies },
    dependsOnTools: [...manifest.dependsOnTools],
  }));
}

export function createMcpToolRegistry(environment?: McpEnvironmentInfo): McpToolDefinition[] {
  const tools: McpToolDefinition[] = [];
  const manifests = getMcpToolManifests();
  const searchManifest = manifests.find((manifest) => manifest.name === 'search_mcp_tools');
  if (!searchManifest) {
    throw new Error('Missing required MCP tool manifest: search_mcp_tools');
  }
  const searchTool = createSearchMcpToolsTool(() => tools, searchManifest, environment);
  tools.push(searchTool);
  return tools;
}
