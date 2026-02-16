import { describe, it, expect } from 'vitest';
import {
  getSkillTemplates,
  getCommandTemplates,
  getCommandContents,
  generateSkillContent,
} from '../../../src/core/shared/skill-generation.js';

const roleProtocolAssertions = (text: string) => {
  expect(text).toContain('Role Orchestration Protocol');
  expect(text).toContain('Mode-Specific Role Responsibilities');
  expect(text).toContain('`product`');
  expect(text).toContain('`architecture`');
  expect(text).toContain('`worker`');
  expect(text).toContain('`algorithm`');
  expect(text).toContain('Undeclared roles MUST NOT participate in execution.');
  expect(text).toContain('The main agent decides whether multi-agent collaboration is needed, which roles are active, and whether temporary roles are required; sub-agents MUST be created only when a concrete need is identified or when the user explicitly requests them.');
  expect(text).toContain('Before role activation, the main agent MUST assess task complexity (for example: low, medium, high) and involved knowledge domains.');
  expect(text).toContain('The main agent decides single-agent vs multi-agent execution based on complexity and domain assessment results.');
  expect(text).toContain('Role execution order MUST NOT be hardcoded.');
  expect(text).toContain('If a design role is active, the main agent MUST assign at least one corresponding review role.');
  expect(text).toContain('Review mappings MAY be one-to-one or one-to-many, but every design scope MUST have review ownership.');
  expect(text).toContain('The main agent publishes consolidated decisions before downstream execution continues.');
  expect(text).toContain('MUST NOT execute work owned by another role.');
  expect(text).toContain('Boundary violations MUST be flagged and reassigned to the owning role.');
  expect(text).toContain('Temporary roles without explicit responsibility contracts are invalid and MUST be blocked.');
  expect(text).toContain('If required domains are not covered by active roles, the main agent MUST create temporary roles to cover those domains.');
  expect(text).toContain('When multiple roles discuss a decision, establish an agent discussion group with a shared context packet (problem frame, constraints, decision scope).');
  expect(text).toContain('Role contributions in discussion groups MUST be role-tagged and reference the shared context packet.');
  expect(text).toContain('The main agent publishes a consolidated decision summary with accepted direction and rejected alternatives before execution continues.');
  expect(text).toContain('Inter-agent handoffs MUST include objective, recommendation or decision, blockers or assumptions, and next owner.');
  expect(text).toContain('Agent exchanges MUST be concise, actionable, and unambiguous.');
  expect(text).toContain('If runtime multi-agent mode exists (for example, Codex sub-agents), use it only when the complexity/domain assessment confirms a concrete collaboration need or when the user explicitly requests sub-agents.');
  expect(text).toContain('In Codex multi-agent mode, map core roles to explicit sub-agent owners and make mapping visible in output.');
  expect(text).toContain('When multi-agent mode is used, output MUST include concise activation rationale for active and inactive roles.');
  expect(text).toContain('If multi-agent mode is unavailable, emulate the same protocol with explicit role sections.');
};

describe('skill-generation', () => {
  describe('getSkillTemplates', () => {
    it('should return all 11 skill templates', () => {
      const templates = getSkillTemplates();
      expect(templates).toHaveLength(11);
    });

    it('should have unique directory names', () => {
      const templates = getSkillTemplates();
      const dirNames = templates.map(t => t.dirName);
      const uniqueDirNames = new Set(dirNames);
      expect(uniqueDirNames.size).toBe(templates.length);
    });

    it('should include all expected skills', () => {
      const templates = getSkillTemplates();
      const dirNames = templates.map(t => t.dirName);

      expect(dirNames).toContain('openspec-explore');
      expect(dirNames).toContain('openspec-deepresearch');
      expect(dirNames).toContain('openspec-new-change');
      expect(dirNames).toContain('openspec-continue-change');
      expect(dirNames).toContain('openspec-apply-change');
      expect(dirNames).toContain('openspec-ff-change');
      expect(dirNames).toContain('openspec-sync-specs');
      expect(dirNames).toContain('openspec-archive-change');
      expect(dirNames).toContain('openspec-bulk-archive-change');
      expect(dirNames).toContain('openspec-verify-change');
      expect(dirNames).toContain('openspec-onboard');
    });

    it('should have valid template structure', () => {
      const templates = getSkillTemplates();

      for (const { template, dirName } of templates) {
        expect(template.name).toBeTruthy();
        expect(template.description).toBeTruthy();
        expect(template.instructions).toBeTruthy();
        expect(dirName).toBeTruthy();
      }
    });

    it('should include role orchestration protocol in workflow skills', () => {
      const templates = getSkillTemplates();
      const workflowSkills = [
        'openspec-explore',
        'openspec-deepresearch',
        'openspec-new-change',
        'openspec-continue-change',
        'openspec-apply-change',
        'openspec-ff-change',
        'openspec-sync-specs',
        'openspec-archive-change',
        'openspec-bulk-archive-change',
        'openspec-verify-change',
        'openspec-onboard',
      ];
      const expectedModeMarkerBySkill: Record<string, string> = {
        'openspec-explore': '/opsx:explore',
        'openspec-deepresearch': '/opsx:deepresearch',
        'openspec-new-change': '/opsx:new',
        'openspec-continue-change': '/opsx:continue',
        'openspec-apply-change': '/opsx:apply',
        'openspec-ff-change': '/opsx:ff',
        'openspec-sync-specs': '/opsx:sync',
        'openspec-archive-change': '/opsx:archive',
        'openspec-bulk-archive-change': '/opsx:bulk-archive',
        'openspec-verify-change': '/opsx:verify',
        'openspec-onboard': '/opsx:onboard',
      };

      for (const skillName of workflowSkills) {
        const entry = templates.find((template) => template.dirName === skillName);
        expect(entry).toBeDefined();
        roleProtocolAssertions(entry!.template.instructions);
        expect(entry!.template.instructions).toContain(expectedModeMarkerBySkill[skillName]);
      }
    });
  });

  describe('getCommandTemplates', () => {
    it('should return all 11 command templates', () => {
      const templates = getCommandTemplates();
      expect(templates).toHaveLength(11);
    });

    it('should have unique IDs', () => {
      const templates = getCommandTemplates();
      const ids = templates.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(templates.length);
    });

    it('should include all expected commands', () => {
      const templates = getCommandTemplates();
      const ids = templates.map(t => t.id);

      expect(ids).toContain('explore');
      expect(ids).toContain('deepresearch');
      expect(ids).toContain('new');
      expect(ids).toContain('continue');
      expect(ids).toContain('apply');
      expect(ids).toContain('ff');
      expect(ids).toContain('sync');
      expect(ids).toContain('archive');
      expect(ids).toContain('bulk-archive');
      expect(ids).toContain('verify');
      expect(ids).toContain('onboard');
    });
  });

  describe('getCommandContents', () => {
    it('should return all 11 command contents', () => {
      const contents = getCommandContents();
      expect(contents).toHaveLength(11);
    });

    it('should have valid content structure', () => {
      const contents = getCommandContents();

      for (const content of contents) {
        expect(content.id).toBeTruthy();
        expect(content.name).toBeTruthy();
        expect(content.description).toBeTruthy();
        expect(content.body).toBeTruthy();
      }
    });

    it('should have matching IDs with command templates', () => {
      const templates = getCommandTemplates();
      const contents = getCommandContents();

      const templateIds = templates.map(t => t.id).sort();
      const contentIds = contents.map(c => c.id).sort();

      expect(contentIds).toEqual(templateIds);
    });

    it('should include role orchestration protocol in workflow commands', () => {
      const contents = getCommandContents();
      const workflowCommands = ['explore', 'deepresearch', 'new', 'continue', 'apply', 'ff', 'sync', 'archive', 'bulk-archive', 'verify', 'onboard'];

      for (const commandId of workflowCommands) {
        const entry = contents.find((content) => content.id === commandId);
        expect(entry).toBeDefined();
        roleProtocolAssertions(entry!.body);
        expect(entry!.body).toContain(`/opsx:${commandId}`);
      }
    });
  });

  describe('generateSkillContent', () => {
    it('should generate valid YAML frontmatter', () => {
      const template = {
        name: 'test-skill',
        description: 'Test description',
        instructions: 'Test instructions',
        license: 'MIT',
        compatibility: 'Test compatibility',
        metadata: {
          author: 'test-author',
          version: '2.0',
        },
      };

      const content = generateSkillContent(template, '0.23.0');

      expect(content).toMatch(/^---\n/);
      expect(content).toContain('name: test-skill');
      expect(content).toContain('description: Test description');
      expect(content).toContain('license: MIT');
      expect(content).toContain('compatibility: Test compatibility');
      expect(content).toContain('author: test-author');
      expect(content).toContain('version: "2.0"');
      expect(content).toContain('generatedBy: "0.23.0"');
      expect(content).toContain('Test instructions');
    });

    it('should use default values for optional fields', () => {
      const template = {
        name: 'minimal-skill',
        description: 'Minimal description',
        instructions: 'Minimal instructions',
      };

      const content = generateSkillContent(template, '0.24.0');

      expect(content).toContain('license: MIT');
      expect(content).toContain('compatibility: Requires openspec CLI.');
      expect(content).toContain('author: openspec');
      expect(content).toContain('version: "1.0"');
      expect(content).toContain('generatedBy: "0.24.0"');
    });

    it('should embed the provided version in generatedBy field', () => {
      const template = {
        name: 'version-test',
        description: 'Test version embedding',
        instructions: 'Instructions',
      };

      const content1 = generateSkillContent(template, '0.23.0');
      expect(content1).toContain('generatedBy: "0.23.0"');

      const content2 = generateSkillContent(template, '1.0.0');
      expect(content2).toContain('generatedBy: "1.0.0"');

      const content3 = generateSkillContent(template, '0.24.0-beta.1');
      expect(content3).toContain('generatedBy: "0.24.0-beta.1"');
    });

    it('should end frontmatter with separator and blank line', () => {
      const template = {
        name: 'test',
        description: 'Test',
        instructions: 'Body content',
      };

      const content = generateSkillContent(template, '0.23.0');

      expect(content).toMatch(/---\n\nBody content\n$/);
    });

    it('should apply transformInstructions callback when provided', () => {
      const template = {
        name: 'transform-test',
        description: 'Test transform callback',
        instructions: 'Use /opsx:new to start and /opsx:apply to implement.',
      };

      const transformer = (text: string) => text.replace(/\/opsx:/g, '/opsx-');
      const content = generateSkillContent(template, '0.23.0', transformer);

      expect(content).toContain('/opsx-new');
      expect(content).toContain('/opsx-apply');
      expect(content).not.toContain('/opsx:new');
      expect(content).not.toContain('/opsx:apply');
    });

    it('should not transform instructions when callback is undefined', () => {
      const template = {
        name: 'no-transform-test',
        description: 'Test without transform',
        instructions: 'Use /opsx:new to start.',
      };

      const content = generateSkillContent(template, '0.23.0', undefined);

      expect(content).toContain('/opsx:new');
    });

    it('should support custom transformInstructions logic', () => {
      const template = {
        name: 'custom-transform',
        description: 'Test custom transform',
        instructions: 'Some PLACEHOLDER text here.',
      };

      const customTransformer = (text: string) => text.replace('PLACEHOLDER', 'REPLACED');
      const content = generateSkillContent(template, '0.23.0', customTransformer);

      expect(content).toContain('Some REPLACED text here.');
      expect(content).not.toContain('PLACEHOLDER');
    });
  });
});
