import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import {
  type SkillTemplate,
  getApplyChangeSkillTemplate,
  getArchiveChangeSkillTemplate,
  getBulkArchiveChangeSkillTemplate,
  getContinueChangeSkillTemplate,
  getDeepResearchSkillTemplate,
  getExploreSkillTemplate,
  getFeedbackSkillTemplate,
  getFfChangeSkillTemplate,
  getNewChangeSkillTemplate,
  getOnboardSkillTemplate,
  getOpsxApplyCommandTemplate,
  getOpsxArchiveCommandTemplate,
  getOpsxBulkArchiveCommandTemplate,
  getOpsxContinueCommandTemplate,
  getOpsxDeepResearchCommandTemplate,
  getOpsxExploreCommandTemplate,
  getOpsxFfCommandTemplate,
  getOpsxNewCommandTemplate,
  getOpsxOnboardCommandTemplate,
  getOpsxSyncCommandTemplate,
  getOpsxProposeCommandTemplate,
  getOpsxProposeSkillTemplate,
  getOpsxVerifyCommandTemplate,
  getSyncSpecsSkillTemplate,
  getVerifyChangeSkillTemplate,
} from '../../../src/core/templates/skill-templates.js';
import { generateSkillContent } from '../../../src/core/shared/skill-generation.js';

const EXPECTED_FUNCTION_HASHES: Record<string, string> = {
  getExploreSkillTemplate: 'd2ec844343ab7770b51d8dd0d92fb2ca17e574a20450fe673cd153d323bf8dc8',
  getDeepResearchSkillTemplate: 'ad5260ff188c27f7ec7858bfe502d28ac909e63a70a5372a0bef8b10e143c282',
  getNewChangeSkillTemplate: '65fed12e0ec5d2fa201deeecfd10a313a88998659884217251d40aa0cc92d54c',
  getContinueChangeSkillTemplate: '168c2881b14b733b32b07beb7131d47625d2d7bacaf041de30d0259eaf73ac29',
  getApplyChangeSkillTemplate: 'f4c372dd44f415962ef0059f7ae2e486b4c901bc5eace92e95c97260d5f2a23b',
  getFfChangeSkillTemplate: '7307ef2279cbd44f719d9c614c663274f3529c7ddb777554d0a7be9ffc5566ad',
  getSyncSpecsSkillTemplate: 'e5c27d0f1308ada5a6d6050307b5720db4bb98aa6c718ee38bc81e0dc6a93b0f',
  getOnboardSkillTemplate: '983a257923de6f9cb3861cbb2f790d08f5f97f02b729621aca5c346164f459b1',
  getOpsxExploreCommandTemplate: 'c4f7cf2ffadcdc053f7612ebf94ed9f23901f935df4af35c03d899ce9ad6be62',
  getOpsxDeepResearchCommandTemplate: 'c9ac619d62317e1efa7f9eb4f78e01fc1c7f743b01dea253c5ae86307d7c1402',
  getOpsxNewCommandTemplate: 'b88a0c1a5408fe7bb4effeb2cc528f3b38dbc1071a4419da611e7baa41fd69fd',
  getOpsxContinueCommandTemplate: 'f5c1c194347911cc9838294a74e9466a8bce6e0b105e0c7d3138342f97187b60',
  getOpsxApplyCommandTemplate: 'd939f3fcd041afa887ca17299b81b0c795f59e4e2d0e42dc2a2527322768d7e9',
  getOpsxFfCommandTemplate: '7f1e92b7ea760a6208c7d10f71475bc52fcf9dee979c189ee2092e5fbc0d0451',
  getArchiveChangeSkillTemplate: 'bc2f199fab372de352cfdfcabff9ddb825ccfafa92dd2cfab383efa1a8e9b96c',
  getBulkArchiveChangeSkillTemplate: '78fce6d1cd6653706b264cd5ff29d1ab9f068d6743c2bd65d38a80d0ff287df6',
  getOpsxSyncCommandTemplate: '9c2294f72789f1a85d1c85220d77f335918e37ed83c059ec8aa3757e8be430bd',
  getVerifyChangeSkillTemplate: '6c42874b156204387c3ab5fe107420194ef18c71c5b311d1224928798be31abf',
  getOpsxArchiveCommandTemplate: 'd2f46eeb9e23da7a89b9750ec5f8914f55dc866dc0fd3a51302cf8e523d13f22',
  getOpsxOnboardCommandTemplate: 'c07842e4326d87c78e61adfc0be2da03db72ba406bfe9609b26a7592550a9836',
  getOpsxBulkArchiveCommandTemplate: 'c07b77907ef20281155a5d5f9c11ba3037cd02e481a5014ec850377f10c517b8',
  getOpsxVerifyCommandTemplate: '0f74a6d8ca1c6810bc6f61b0939d73cc6c9d6e43641324515cb64ac18ae76d41',
  getOpsxProposeSkillTemplate: 'd67f937d44650e9c61d2158c865309fbab23cb3f50a3d4868a640a97776e3999',
  getOpsxProposeCommandTemplate: '41ad59b37eafd7a161bab5c6e41997a37368f9c90b194451295ede5cd42e4d46',
  getFeedbackSkillTemplate: 'd7d83c5f7fc2b92fe8f4588a5bf2d9cb315e4c73ec19bcd5ef28270906319a0d',
};

const EXPECTED_GENERATED_SKILL_CONTENT_HASHES: Record<string, string> = {
  'openspec-explore': 'cce0f2da83f62d2b9821e39f1e4b65bca4bfbd7cf1ae8f734649af977607927b',
  'openspec-deepresearch': '6384e6e2006881d8cfa0f847e3caa6f3dd87f19aa22563948daa4e56b88f4999',
  'openspec-new-change': 'b008e103592e8e9aca94c931686ea21b1a57f0316299fe5ddec903b52cfc4686',
  'openspec-continue-change': 'a9574b6a3812aae017574dd5703a0a6f6189c4a9bdf7054cb958cd273cb97614',
  'openspec-apply-change': 'ea9b9b150af85c6377ff1d72ca70180af409698ab379bd553b52ed003f2cc67c',
  'openspec-ff-change': 'b710b1bb06423af475f65746575f530f306b4254e0a70f01dfa1d8a7fd372668',
  'openspec-sync-specs': 'a18853608021bddad504e59875c1358a2393a1e4d3c98ba669859a06650bfb05',
  'openspec-archive-change': '2ffcbc9fac31720f5a285e9b50d2114b86b4c780b6836a4eaa11d70e1bbc2e83',
  'openspec-bulk-archive-change': '1e21425b85146b375256ce9a32eb6f7f103782a9ee6c1b40be88a5fa05bbdeac',
  'openspec-verify-change': 'd9ae60f0dcedd149a9074a3b9db49bea3aa888a045412cedc40ca2c65c204b8c',
  'openspec-onboard': 'a7ef6c1f379b29c6b40265ec115ec6e41aa2dabc09d5f077230778bba3ae7489',
  'openspec-propose': '20e36dabefb90e232bad0667292bd5007ec280f8fc4fc995dbc4282bf45a22e7',
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
      getDeepResearchSkillTemplate,
      getNewChangeSkillTemplate,
      getContinueChangeSkillTemplate,
      getApplyChangeSkillTemplate,
      getFfChangeSkillTemplate,
      getSyncSpecsSkillTemplate,
      getOnboardSkillTemplate,
      getOpsxExploreCommandTemplate,
      getOpsxDeepResearchCommandTemplate,
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
      getOpsxProposeSkillTemplate,
      getOpsxProposeCommandTemplate,
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
      ['openspec-deepresearch', getDeepResearchSkillTemplate],
      ['openspec-new-change', getNewChangeSkillTemplate],
      ['openspec-continue-change', getContinueChangeSkillTemplate],
      ['openspec-apply-change', getApplyChangeSkillTemplate],
      ['openspec-ff-change', getFfChangeSkillTemplate],
      ['openspec-sync-specs', getSyncSpecsSkillTemplate],
      ['openspec-archive-change', getArchiveChangeSkillTemplate],
      ['openspec-bulk-archive-change', getBulkArchiveChangeSkillTemplate],
      ['openspec-verify-change', getVerifyChangeSkillTemplate],
      ['openspec-onboard', getOnboardSkillTemplate],
      ['openspec-propose', getOpsxProposeSkillTemplate],
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
