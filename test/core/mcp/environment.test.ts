import path from 'path';
import os from 'os';
import { promises as fs } from 'fs';
import { describe, it, expect } from 'vitest';
import { ensureMcpEnvironment } from '../../../src/mcp/environment.js';

describe('mcp environment', () => {
  it('creates isolated runtime and per-tool workspaces', async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'openspec-mcp-env-test-'));
    const runtimeRoot = path.join(tempRoot, 'runtime');

    const environment = await ensureMcpEnvironment({ rootDir: runtimeRoot });

    expect(environment.runtimeRoot).toBe(runtimeRoot);
    expect(environment.toolsRoot).toBe(path.join(runtimeRoot, 'tools'));
    expect(environment.toolWorkspaces.search_mcp_tools).toBe(
      path.join(runtimeRoot, 'tools', 'search_mcp_tools')
    );

    const metadata = JSON.parse(await fs.readFile(environment.metadataFile, 'utf-8'));
    expect(metadata.toolNames).toContain('search_mcp_tools');
    expect(metadata.dependencyPolicy.sdk['@fission-ai/openspec-mcp-runtime']).toBe('1.0.0');

    await fs.rm(tempRoot, { recursive: true, force: true });
  });
});
