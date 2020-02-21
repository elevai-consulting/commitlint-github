import utils from 'commitlint-github-utils';
import { CommitlintPluginGitHub } from '../@types';

import githubIssueNumberMissingRuleResolver from './rules/githubIssueNumbers/isMissing';
import githubIssueNumberFormatRuleResolver from './rules/githubIssueNumbers/isCorrectFormat';
import githubIssueNumberDuplicateRuleResolver from './rules/githubIssueNumbers/isDuplicate';

const commitlintGitHubRules = utils.commitlintGitHubConstants.GITHUB_RULES;

export const commitlintPluginGitHub: CommitlintPluginGitHub = {
  rules: {
    [commitlintGitHubRules.issueNumberMissing]: githubIssueNumberMissingRuleResolver,
    [commitlintGitHubRules.issueNumberFormat]: githubIssueNumberFormatRuleResolver,
    [commitlintGitHubRules.issueNumberDuplicate]: githubIssueNumberDuplicateRuleResolver,
  },
};

export default commitlintPluginGitHub;
