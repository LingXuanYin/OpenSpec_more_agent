import { describe, it, expect } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { runCLI } from '../helpers/run-cli.js';

describe('openspec mcp command', () => {
  it('shows mcp start command in help', async () => {
    const result = await runCLI(['mcp', '--help']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Standalone MCP server commands');
    expect(result.stdout).toContain('start');
    expect(result.stdout).toContain('Start the standalone OpenSpec MCP server');

    const startHelp = await runCLI(['mcp', 'start', '--help']);
    expect(startHelp.exitCode).toBe(0);
    expect(startHelp.stdout).toContain('--dry-run');
  });

  it('starts server and prints startup message (dry-run)', async () => {
    const result = await runCLI(['mcp', 'start', '--dry-run']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Starting OpenSpec standalone MCP server...');
    expect(result.stderr).toContain('[openspec-mcp] server started with');
    expect(result.stderr).toContain('[openspec-mcp] dry-run mode: startup verification complete');
  });

  it('initializes isolated environment and supports custom root', async () => {
    const tempRoot = await fs.mkdtemp(path.join(tmpdir(), 'openspec-mcp-cli-test-'));
    const runtimeRoot = path.join(tempRoot, 'runtime');

    const initResult = await runCLI(['mcp', 'init', '--root', runtimeRoot]);
    expect(initResult.exitCode).toBe(0);
    expect(initResult.stdout).toContain('OpenSpec MCP environment initialized.');

    const metadataPath = path.join(runtimeRoot, 'environment.json');
    const metadataRaw = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(metadataRaw);
    expect(metadata.toolNames).toContain('search_mcp_tools');

    const startResult = await runCLI(['mcp', 'start', '--dry-run', '--root', runtimeRoot]);
    expect(startResult.exitCode).toBe(0);
    expect(startResult.stderr).toContain('[openspec-mcp] dry-run mode: startup verification complete');

    await fs.rm(tempRoot, { recursive: true, force: true });
  });
});
