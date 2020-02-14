import { commitlintGitHubConstants } from 'commitlint-github-utils'
import { CommitlintPluginGitHub } from '../@types'
import githubTaskIdMaxLengthRuleResolver from './rules/githubTaskIdMaxLengthRuleResolver'
import githubTaskIdMinLengthRuleResolver from './rules/githubTaskIdMinLengthRuleResolver'
import githubTaskIdEmptyRuleResolver from './rules/githubTaskIdEmptyRuleResolver'
import githubTaskIdSeparatorRuleResolver from './rules/githubTaskIdSeparatorRuleResolver'
import githubTaskIdCaseRuleResolver from './rules/githubTaskIdCaseRuleResolver'
import githubCommitMessageSeparatorRuleResolver from './rules/githubCommitMessageSeparatorRuleResolver'

export const commitlintPluginGitHub: CommitlintPluginGitHub = {
  rules: {
    [commitlintGitHubConstants.GITHUB_RULES
      .taskIdEmpty]: githubTaskIdEmptyRuleResolver,
    [commitlintGitHubConstants.GITHUB_RULES
      .taskIdMinLength]: githubTaskIdMinLengthRuleResolver,
    [commitlintGitHubConstants.GITHUB_RULES
      .taskIdMaxLength]: githubTaskIdMaxLengthRuleResolver,
    [commitlintGitHubConstants.GITHUB_RULES
      .taskIdSeparator]: githubTaskIdSeparatorRuleResolver,
    [commitlintGitHubConstants.GITHUB_RULES
      .taskIdCase]: githubTaskIdCaseRuleResolver,
    [commitlintGitHubConstants.GITHUB_RULES
      .commitMessageSeparator]: githubCommitMessageSeparatorRuleResolver,
  },
}

export default commitlintPluginGitHub
