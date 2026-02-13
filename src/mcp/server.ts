import process from 'process';
import { createInterface } from 'readline';
import { createMcpToolRegistry } from './registry.js';
import { ensureMcpEnvironment } from './environment.js';
import type { JsonRpcId, McpToolDefinition } from './types.js';

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: unknown;
};

type JsonRpcResponse = {
  jsonrpc: '2.0';
  id: JsonRpcId;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
};

function writeResponse(response: JsonRpcResponse): void {
  process.stdout.write(`${JSON.stringify(response)}\n`);
}

function withToolMetadata(tool: McpToolDefinition) {
  return {
    name: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    inputSchema: tool.inputSchema,
  };
}

export async function startMcpServer(options?: { dryRun?: boolean; rootDir?: string }): Promise<void> {
  const environment = await ensureMcpEnvironment({ rootDir: options?.rootDir });
  const tools = createMcpToolRegistry(environment);
  const toolsByName = new Map(tools.map((tool) => [tool.name, tool]));

  console.error(`[openspec-mcp] server started with ${tools.length} tool(s)`);

  if (options?.dryRun === true) {
    console.error('[openspec-mcp] dry-run mode: startup verification complete');
    console.error(`[openspec-mcp] runtime root: ${environment.runtimeRoot}`);
    return;
  }

  const rl = createInterface({
    input: process.stdin,
    crlfDelay: Infinity,
  });

  rl.on('line', async (line) => {
    const text = line.trim();
    if (!text) {
      return;
    }

    let request: JsonRpcRequest;
    try {
      request = JSON.parse(text) as JsonRpcRequest;
    } catch (error) {
      writeResponse({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32700,
          message: 'Parse error',
          data: (error as Error).message,
        },
      });
      return;
    }

    const id: JsonRpcId = request.id ?? null;
    if (request.jsonrpc !== '2.0' || typeof request.method !== 'string') {
      writeResponse({
        jsonrpc: '2.0',
        id,
        error: {
          code: -32600,
          message: 'Invalid Request',
        },
      });
      return;
    }

    if (request.method === 'tools/list') {
      writeResponse({
        jsonrpc: '2.0',
        id,
        result: {
          tools: tools.map(withToolMetadata),
          totalTools: tools.length,
        },
      });
      return;
    }

    if (request.method === 'tools/call') {
      const params = (request.params ?? {}) as Record<string, unknown>;
      const toolName = typeof params.name === 'string' ? params.name : '';
      const args = params.arguments;
      const tool = toolsByName.get(toolName);

      if (!tool) {
        writeResponse({
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `Tool not found: ${toolName}`,
          },
        });
        return;
      }

      const toolResult = await tool.execute(args);
      writeResponse({
        jsonrpc: '2.0',
        id,
        result: {
          tool: tool.name,
          ...toolResult,
        },
      });
      return;
    }

    writeResponse({
      jsonrpc: '2.0',
      id,
      error: {
        code: -32601,
        message: `Method not found: ${request.method}`,
      },
    });
  });

  await new Promise<void>((resolve) => {
    rl.on('close', () => resolve());
  });
}
