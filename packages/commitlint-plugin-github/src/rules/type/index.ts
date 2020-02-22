// FIXME: Temporarily disabling TypeScript checking on importing base rules
// until @commitlint/rules exports index.d.ts which should be soon:
// See: https://github.com/conventional-changelog/commitlint/issues/659

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import baseRules from '@commitlint/rules';
import utils from '@elevai/commitlint-github-utils';

import { RuleResolver } from '../../../@types';
import { typeRuleResolver } from './helpers';

const commitlintGitHubRules = utils.commitlintGitHubConstants.GITHUB_RULES;

// Type Rules

export const typeEmptyRuleResolver: RuleResolver<unknown> = typeRuleResolver(
  baseRules[commitlintGitHubRules.typeEmpty],
);

export const typeCaseRuleResolver: RuleResolver<unknown> = typeRuleResolver(baseRules[commitlintGitHubRules.typeCase]);

export const typeEnumRuleResolver: RuleResolver<unknown> = typeRuleResolver(baseRules[commitlintGitHubRules.typeEnum]);

export const typeMinLengthRuleResolver: RuleResolver<unknown> = typeRuleResolver(
  baseRules[commitlintGitHubRules.typeMinLength],
);

export const typeMaxLengthRuleResolver: RuleResolver<unknown> = typeRuleResolver(
  baseRules[commitlintGitHubRules.typeMaxLength],
);
