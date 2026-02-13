import { describe, it, expect } from 'vitest';
import { createMcpToolRegistry } from '../../../src/mcp/registry.js';

function getSearchTool() {
  const tools = createMcpToolRegistry();
  const search = tools.find((tool) => tool.name === 'search_mcp_tools');
  if (!search) {
    throw new Error('search_mcp_tools not found');
  }
  return search;
}

describe('mcp registry', () => {
  it('includes search_mcp_tools in live registry', () => {
    const tools = createMcpToolRegistry();
    expect(tools.some((tool) => tool.name === 'search_mcp_tools')).toBe(true);
  });

  it('supports keyword search and self-discovery', async () => {
    const search = getSearchTool();
    const result = await search.execute({ query: 'search mcp tools' });
    expect(result.ok).toBe(true);
    const data = result.data as any;
    expect(data.mode).toBe('keyword');
    expect(data.returnedTools).toBeGreaterThanOrEqual(1);
    const selfTool = data.tools.find((tool: any) => tool.name === 'search_mcp_tools');
    expect(Boolean(selfTool)).toBe(true);
    expect(selfTool.sdkDependencies['@fission-ai/openspec-mcp-runtime']).toBe('1.0.0');
    expect(selfTool.thirdPartyDependencies).toEqual({});
  });

  it('supports regex search', async () => {
    const search = getSearchTool();
    const result = await search.execute({ query: '^search_mcp_tools$', useRegex: true });
    expect(result.ok).toBe(true);
    const data = result.data as any;
    expect(data.mode).toBe('regex');
    expect(data.returnedTools).toBe(1);
    expect(data.tools[0].name).toBe('search_mcp_tools');
  });

  it('returns explicit error for invalid regex', async () => {
    const search = getSearchTool();
    const result = await search.execute({ query: '[', useRegex: true });
    expect(result.ok).toBe(false);
    expect(result.error?.code).toBe('INVALID_REGEX');
  });
});
