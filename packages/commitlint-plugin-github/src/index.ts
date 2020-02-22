import utils from 'commitlint-github-utils';
import { CommitlintPluginGitHub } from '../@types';

import githubIssueNumberMissingRuleResolver from './rules/githubIssueNumbers/isMissing';
import githubIssueNumberFormatRuleResolver from './rules/githubIssueNumbers/isCorrectFormat';
import githubIssueNumberDuplicateRuleResolver from './rules/githubIssueNumbers/isDuplicate';

import wipAllowedRuleResolver from './rules/wip/isWipAllowed';

import {
  subjectEmptyRuleResolver,
  subjectCaseRuleResolver,
  subjectFullStopRuleResolver,
  subjectMinLengthRuleResolver,
  subjectMaxLengthRuleResolver,
  subjectSeparatorRuleResolver,
} from './rules/subject';

import {
  typeEmptyRuleResolver,
  typeCaseRuleResolver,
  typeEnumRuleResolver,
  typeMinLengthRuleResolver,
  typeMaxLengthRuleResolver,
} from './rules/type';

const commitlintGitHubRules = utils.commitlintGitHubConstants.GITHUB_RULES;

export const commitlintPluginGitHub: CommitlintPluginGitHub = {
  rules: {
    [commitlintGitHubRules.issueNumberMissing]: githubIssueNumberMissingRuleResolver,
    [commitlintGitHubRules.issueNumberFormat]: githubIssueNumberFormatRuleResolver,
    [commitlintGitHubRules.issueNumberDuplicate]: githubIssueNumberDuplicateRuleResolver,

    [commitlintGitHubRules.wipAllowed]: wipAllowedRuleResolver,

    [commitlintGitHubRules.subjectEmpty]: subjectEmptyRuleResolver,
    [commitlintGitHubRules.subjectCase]: subjectCaseRuleResolver,
    [commitlintGitHubRules.subjectFullStop]: subjectFullStopRuleResolver,
    [commitlintGitHubRules.subjectMinLength]: subjectMinLengthRuleResolver,
    [commitlintGitHubRules.subjectMinLength]: subjectMaxLengthRuleResolver,
    [commitlintGitHubRules.subjectSeparator]: subjectSeparatorRuleResolver,

    [commitlintGitHubRules.typeEmpty]: typeEmptyRuleResolver,
    [commitlintGitHubRules.typeCase]: typeCaseRuleResolver,
    [commitlintGitHubRules.typeEnum]: typeEnumRuleResolver,
    [commitlintGitHubRules.typeMinLength]: typeMinLengthRuleResolver,
    [commitlintGitHubRules.typeMinLength]: typeMaxLengthRuleResolver,
  },
};

export default commitlintPluginGitHub;
