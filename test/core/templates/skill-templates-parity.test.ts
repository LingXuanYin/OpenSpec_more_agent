import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import {
  type SkillTemplate,
  getApplyChangeSkillTemplate,
  getArchiveChangeSkillTemplate,
  getBulkArchiveChangeSkillTemplate,
  getContinueChangeSkillTemplate,
  getExploreSkillTemplate,
  getFeedbackSkillTemplate,
  getFfChangeSkillTemplate,
  getNewChangeSkillTemplate,
  getOnboardSkillTemplate,
  getOpsxApplyCommandTemplate,
  getOpsxArchiveCommandTemplate,
  getOpsxBulkArchiveCommandTemplate,
  getOpsxContinueCommandTemplate,
  getOpsxExploreCommandTemplate,
  getOpsxFfCommandTemplate,
  getOpsxNewCommandTemplate,
  getOpsxOnboardCommandTemplate,
  getOpsxSyncCommandTemplate,
  getOpsxVerifyCommandTemplate,
  getSyncSpecsSkillTemplate,
  getVerifyChangeSkillTemplate,
} from '../../../src/core/templates/skill-templates.js';
import { generateSkillContent } from '../../../src/core/shared/skill-generation.js';

const EXPECTED_FUNCTION_HASHES: Record<string, string> = {
  getExploreSkillTemplate: '7def9bd11ed689a2cde73dea2bab7dbc72336589f8bc9b74f91ab00b3ea3e108',
  getNewChangeSkillTemplate: '65fed12e0ec5d2fa201deeecfd10a313a88998659884217251d40aa0cc92d54c',
  getContinueChangeSkillTemplate: '168c2881b14b733b32b07beb7131d47625d2d7bacaf041de30d0259eaf73ac29',
  getApplyChangeSkillTemplate: 'f4c372dd44f415962ef0059f7ae2e486b4c901bc5eace92e95c97260d5f2a23b',
  getFfChangeSkillTemplate: '7307ef2279cbd44f719d9c614c663274f3529c7ddb777554d0a7be9ffc5566ad',
  getSyncSpecsSkillTemplate: 'e5c27d0f1308ada5a6d6050307b5720db4bb98aa6c718ee38bc81e0dc6a93b0f',
  getOnboardSkillTemplate: '6f6a41c7ad53fff5753ad629018bd3a073528ae3807586c335932a3164a2eebb',
  getOpsxExploreCommandTemplate: 'c1ea6dee398d9d8b64a05f235e9b8e87bc4d91d49d8a33da72da7b0fe30edd18',
  getOpsxNewCommandTemplate: 'b88a0c1a5408fe7bb4effeb2cc528f3b38dbc1071a4419da611e7baa41fd69fd',
  getOpsxContinueCommandTemplate: 'f5c1c194347911cc9838294a74e9466a8bce6e0b105e0c7d3138342f97187b60',
  getOpsxApplyCommandTemplate: 'd939f3fcd041afa887ca17299b81b0c795f59e4e2d0e42dc2a2527322768d7e9',
  getOpsxFfCommandTemplate: '7f1e92b7ea760a6208c7d10f71475bc52fcf9dee979c189ee2092e5fbc0d0451',
  getArchiveChangeSkillTemplate: 'bc2f199fab372de352cfdfcabff9ddb825ccfafa92dd2cfab383efa1a8e9b96c',
  getBulkArchiveChangeSkillTemplate: '3068c8cc5cf33fe6417893674e6e012f7ccd9f592112e01727bee55665fc005a',
  getOpsxSyncCommandTemplate: '9c2294f72789f1a85d1c85220d77f335918e37ed83c059ec8aa3757e8be430bd',
  getVerifyChangeSkillTemplate: '6c42874b156204387c3ab5fe107420194ef18c71c5b311d1224928798be31abf',
  getOpsxArchiveCommandTemplate: 'd2f46eeb9e23da7a89b9750ec5f8914f55dc866dc0fd3a51302cf8e523d13f22',
  getOpsxOnboardCommandTemplate: '885928caae5cc6a69719b395622ab930f437a3f88a2d9386856720d457e0e2e8',
  getOpsxBulkArchiveCommandTemplate: '69f8070ab355d90ddf17ec601930e913dcbe32b578b057b253da2fd09560c710',
  getOpsxVerifyCommandTemplate: '0f74a6d8ca1c6810bc6f61b0939d73cc6c9d6e43641324515cb64ac18ae76d41',
  getFeedbackSkillTemplate: 'd7d83c5f7fc2b92fe8f4588a5bf2d9cb315e4c73ec19bcd5ef28270906319a0d',
};

const EXPECTED_GENERATED_SKILL_CONTENT_HASHES: Record<string, string> = {
  'openspec-explore': '7a716d82d74f34074e6ef84bee9e205070e0a3f9d2d687c11c503737c41c0eb3',
  'openspec-new-change': 'b008e103592e8e9aca94c931686ea21b1a57f0316299fe5ddec903b52cfc4686',
  'openspec-continue-change': 'a9574b6a3812aae017574dd5703a0a6f6189c4a9bdf7054cb958cd273cb97614',
  'openspec-apply-change': 'ea9b9b150af85c6377ff1d72ca70180af409698ab379bd553b52ed003f2cc67c',
  'openspec-ff-change': 'b710b1bb06423af475f65746575f530f306b4254e0a70f01dfa1d8a7fd372668',
  'openspec-sync-specs': 'a18853608021bddad504e59875c1358a2393a1e4d3c98ba669859a06650bfb05',
  'openspec-archive-change': '2ffcbc9fac31720f5a285e9b50d2114b86b4c780b6836a4eaa11d70e1bbc2e83',
  'openspec-bulk-archive-change': '064d3f5769302db9242fc1f3dfe5bda2e84be14beb70a243a9d28ab69c00b452',
  'openspec-verify-change': 'd9ae60f0dcedd149a9074a3b9db49bea3aa888a045412cedc40ca2c65c204b8c',
  'openspec-onboard': '4def94ddb6842026a24e3d74141ae053533b922089ceef4a3f2cffa8561dced5',
};

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`);

    return `{${entries.join(',')}}`;
  }

  return JSON.stringify(value);
}

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

describe('skill templates split parity', () => {
  it('preserves all template function payloads exactly', () => {
    const functionFactories: Record<string, () => unknown> = {
      getExploreSkillTemplate,
      getNewChangeSkillTemplate,
      getContinueChangeSkillTemplate,
      getApplyChangeSkillTemplate,
      getFfChangeSkillTemplate,
      getSyncSpecsSkillTemplate,
      getOnboardSkillTemplate,
      getOpsxExploreCommandTemplate,
      getOpsxNewCommandTemplate,
      getOpsxContinueCommandTemplate,
      getOpsxApplyCommandTemplate,
      getOpsxFfCommandTemplate,
      getArchiveChangeSkillTemplate,
      getBulkArchiveChangeSkillTemplate,
      getOpsxSyncCommandTemplate,
      getVerifyChangeSkillTemplate,
      getOpsxArchiveCommandTemplate,
      getOpsxOnboardCommandTemplate,
      getOpsxBulkArchiveCommandTemplate,
      getOpsxVerifyCommandTemplate,
      getFeedbackSkillTemplate,
    };

    const actualHashes = Object.fromEntries(
      Object.entries(functionFactories).map(([name, fn]) => [name, hash(stableStringify(fn()))])
    );

    expect(actualHashes).toEqual(EXPECTED_FUNCTION_HASHES);
  });

  it('preserves generated skill file content exactly', () => {
    // Intentionally excludes getFeedbackSkillTemplate: skillFactories only models templates
    // deployed via generateSkillContent, while feedback is covered in function payload parity.
    const skillFactories: Array<[string, () => SkillTemplate]> = [
      ['openspec-explore', getExploreSkillTemplate],
      ['openspec-new-change', getNewChangeSkillTemplate],
      ['openspec-continue-change', getContinueChangeSkillTemplate],
      ['openspec-apply-change', getApplyChangeSkillTemplate],
      ['openspec-ff-change', getFfChangeSkillTemplate],
      ['openspec-sync-specs', getSyncSpecsSkillTemplate],
      ['openspec-archive-change', getArchiveChangeSkillTemplate],
      ['openspec-bulk-archive-change', getBulkArchiveChangeSkillTemplate],
      ['openspec-verify-change', getVerifyChangeSkillTemplate],
      ['openspec-onboard', getOnboardSkillTemplate],
    ];

    const actualHashes = Object.fromEntries(
      skillFactories.map(([dirName, createTemplate]) => [
        dirName,
        hash(generateSkillContent(createTemplate(), 'PARITY-BASELINE')),
      ])
    );

    expect(actualHashes).toEqual(EXPECTED_GENERATED_SKILL_CONTENT_HASHES);
  });
});
