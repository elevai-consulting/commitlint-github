// FIXME: Temporarily disabling TypeScript checking on importing base rules
// until @commitlint/rules exports index.d.ts which should be soon:
// See: https://github.com/conventional-changelog/commitlint/issues/659

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import baseRules from '@commitlint/rules';
// import { TargetCaseType } from '@commitlint/types'; // When it is published
import { TargetCaseType } from 'commitlint-github-utils/@types';
import utils from 'commitlint-github-utils';

import { RuleResolver } from '../../../@types';
import { subjectRuleResolver } from './helpers';

import subjectSeparatorRuleResolver from './subjectSeparator';

const commitlintGitHubRules = utils.commitlintGitHubConstants.GITHUB_RULES;

// Delegate Subject Rules

export const subjectEmptyRuleResolver: RuleResolver<unknown> = subjectRuleResolver(
  baseRules[commitlintGitHubRules.subjectEmpty],
);

export const subjectCaseRuleResolver: RuleResolver<TargetCaseType | TargetCaseType[]> = subjectRuleResolver(
  baseRules[commitlintGitHubRules.subjectCase],
);

export const subjectFullStopRuleResolver: RuleResolver<string> = subjectRuleResolver(
  baseRules[commitlintGitHubRules.subjectFullStop],
  '.',
);

export const subjectMinLengthRuleResolver: RuleResolver<number> = subjectRuleResolver(
  baseRules[commitlintGitHubRules.subjectMinLength],
);

export const subjectMaxLengthRuleResolver: RuleResolver<number> = subjectRuleResolver(
  baseRules[commitlintGitHubRules.subjectMaxLength],
);

// Custom Subject Rules

export { subjectSeparatorRuleResolver };
