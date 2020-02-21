import utils from 'commitlint-github-utils';
import { CommitlintPluginGitHub } from '../@types';

import githubIssueNumberMissingRuleResolver from './rules/githubIssueNumbers/isMissing';
import githubIssueNumberFormatRuleResolver from './rules/githubIssueNumbers/isCorrectFormat';
import githubIssueNumberDuplicateRuleResolver from './rules/githubIssueNumbers/isDuplicate';

import {
  subjectEmptyRuleResolver,
  subjectCaseRuleResolver,
  subjectFullStopRuleResolver,
  subjectMinLengthRuleResolver,
  subjectMaxLengthRuleResolver,
  subjectSeparatorRuleResolver,
} from './rules/subject';

const commitlintGitHubRules = utils.commitlintGitHubConstants.GITHUB_RULES;

export const commitlintPluginGitHub: CommitlintPluginGitHub = {
  rules: {
    [commitlintGitHubRules.issueNumberMissing]: githubIssueNumberMissingRuleResolver,
    [commitlintGitHubRules.issueNumberFormat]: githubIssueNumberFormatRuleResolver,
    [commitlintGitHubRules.issueNumberDuplicate]: githubIssueNumberDuplicateRuleResolver,

    [commitlintGitHubRules.subjectEmpty]: subjectEmptyRuleResolver,
    [commitlintGitHubRules.subjectCase]: subjectCaseRuleResolver,
    [commitlintGitHubRules.subjectFullStop]: subjectFullStopRuleResolver,
    [commitlintGitHubRules.subjectMinLength]: subjectMinLengthRuleResolver,
    [commitlintGitHubRules.subjectMinLength]: subjectMaxLengthRuleResolver,
    [commitlintGitHubRules.subjectSeparator]: subjectSeparatorRuleResolver,
  },
};

export default commitlintPluginGitHub;
