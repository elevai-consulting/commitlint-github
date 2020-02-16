import { commitlintGitHubConstants } from 'commitlint-github-utils';
import { CommitlintPluginGitHub } from '../@types';
import githubIssueNumberMissingRuleResolver from './rules/githubIssueNumberMissingRuleResolver';
import githubIssueNumberFormatRuleResolver from './rules/githubIssueNumberFormatRuleResolver';

export const commitlintPluginGitHub: CommitlintPluginGitHub = {
  rules: {
    [commitlintGitHubConstants.GITHUB_RULES.issueNumberMissing]: githubIssueNumberMissingRuleResolver,
    [commitlintGitHubConstants.GITHUB_RULES.issueNumberFormat]: githubIssueNumberFormatRuleResolver,
  },
};

export default commitlintPluginGitHub;
