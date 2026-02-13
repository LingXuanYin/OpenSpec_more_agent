export type JsonRpcId = string | number | null;

export type McpToolInputSchema = {
  type: 'object';
  properties?: Record<string, unknown>;
  required?: string[];
  additionalProperties?: boolean;
};

export type McpToolCallResult = {
  ok: boolean;
  data?: unknown;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type McpToolDefinition = {
  name: string;
  description: string;
  keywords: string[];
  workspacePath?: string;
  sdkDependencies: Record<string, string>;
  thirdPartyDependencies: Record<string, string>;
  inputSchema: McpToolInputSchema;
  execute: (args: unknown) => Promise<McpToolCallResult>;
};

export type McpToolManifest = {
  name: string;
  description: string;
  keywords: string[];
  sdkDependencies: Record<string, string>;
  thirdPartyDependencies: Record<string, string>;
  dependsOnTools: string[];
};

export type McpEnvironmentInfo = {
  runtimeRoot: string;
  toolsRoot: string;
  metadataFile: string;
  toolWorkspaces: Record<string, string>;
  dependencyPolicy: {
    sdk: Record<string, string>;
    thirdParty: Record<string, string>;
  };
};

export type SearchMcpToolsArgs = {
  query: string;
  useRegex?: boolean;
};
