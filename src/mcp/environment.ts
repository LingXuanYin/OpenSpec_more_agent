import path from 'path';
import os from 'os';
import { promises as fs } from 'fs';
import { getMcpToolManifests } from './registry.js';
import type { McpEnvironmentInfo, McpToolManifest } from './types.js';

type EnsureMcpEnvironmentOptions = {
  rootDir?: string;
};

const DEFAULT_RUNTIME_VERSION = '1';

function getDefaultMcpRoot(): string {
  const codexHome = process.env.CODEX_HOME?.trim();
  const baseHome = codexHome ? path.resolve(codexHome) : path.join(os.homedir(), '.codex');
  return path.join(baseHome, 'openspec-mcp');
}

function assertNoToolDependencies(manifests: McpToolManifest[]): void {
  const violating = manifests.filter((manifest) => manifest.dependsOnTools.length > 0);
  if (violating.length > 0) {
    const details = violating
      .map((manifest) => `${manifest.name} -> [${manifest.dependsOnTools.join(', ')}]`)
      .join('; ');
    throw new Error(`Tool-to-tool dependencies are not allowed: ${details}`);
  }
}

function assertDependencyCompatibility(manifests: McpToolManifest[]): {
  sdk: Record<string, string>;
  thirdParty: Record<string, string>;
} {
  const sdk = new Map<string, string>();
  const thirdParty = new Map<string, string>();

  const ensureCompatible = (
    target: Map<string, string>,
    deps: Record<string, string>,
    domain: 'sdk' | 'third-party',
    toolName: string
  ) => {
    for (const [pkgName, version] of Object.entries(deps)) {
      const existing = target.get(pkgName);
      if (!existing) {
        target.set(pkgName, version);
        continue;
      }
      if (existing !== version) {
        throw new Error(
          `Dependency version conflict for ${domain} package '${pkgName}': '${existing}' vs '${version}' (tool: ${toolName})`
        );
      }
    }
  };

  for (const manifest of manifests) {
    ensureCompatible(sdk, manifest.sdkDependencies, 'sdk', manifest.name);
    ensureCompatible(thirdParty, manifest.thirdPartyDependencies, 'third-party', manifest.name);
  }

  return {
    sdk: Object.fromEntries(sdk.entries()),
    thirdParty: Object.fromEntries(thirdParty.entries()),
  };
}

export async function ensureMcpEnvironment(
  options?: EnsureMcpEnvironmentOptions
): Promise<McpEnvironmentInfo> {
  const runtimeRoot = path.resolve(options?.rootDir ?? getDefaultMcpRoot());
  const toolsRoot = path.join(runtimeRoot, 'tools');
  const metadataFile = path.join(runtimeRoot, 'environment.json');

  const manifests = getMcpToolManifests();
  assertNoToolDependencies(manifests);
  const dependencyPolicy = assertDependencyCompatibility(manifests);

  await fs.mkdir(runtimeRoot, { recursive: true });
  await fs.mkdir(toolsRoot, { recursive: true });

  const toolWorkspaces: Record<string, string> = {};
  for (const manifest of manifests) {
    const workspacePath = path.join(toolsRoot, manifest.name);
    await fs.mkdir(workspacePath, { recursive: true });
    toolWorkspaces[manifest.name] = workspacePath;
  }

  const environmentInfo: McpEnvironmentInfo = {
    runtimeRoot,
    toolsRoot,
    metadataFile,
    toolWorkspaces,
    dependencyPolicy,
  };

  const metadataPayload = {
    runtimeVersion: DEFAULT_RUNTIME_VERSION,
    createdAt: new Date().toISOString(),
    toolNames: manifests.map((manifest) => manifest.name),
    dependencyPolicy,
    toolWorkspaces,
  };
  await fs.writeFile(metadataFile, `${JSON.stringify(metadataPayload, null, 2)}\n`, 'utf-8');

  return environmentInfo;
}
