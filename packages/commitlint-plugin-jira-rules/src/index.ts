import { commitlintGitHubConstants } from 'commitlint-github-utils'
import { CommitlintPluginGitHub } from '../@types'
import githubTaskIdMaxLengthRuleResolver from './rules/githubTaskIdMaxLengthRuleResolver'
import githubTaskIdMinLengthRuleResolver from './rules/githubTaskIdMinLengthRuleResolver'
import githubTaskIdEmptyRuleResolver from './rules/githubTaskIdEmptyRuleResolver'
import githubTaskIdSeparatorRuleResolver from './rules/githubTaskIdSeparatorRuleResolver'
import githubTaskIdCaseRuleResolver from './rules/githubTaskIdCaseRuleResolver'
import githubCommitStatusCaseRuleResolver from './rules/githubCommitStatusCaseRuleResolver'
import githubCommitMessageSeparatorRuleResolver from './rules/githubCommitMessageSeparatorRuleResolver'

export const commitlintPluginGitHub: CommitlintPluginGitHub = {
  rules: {
    [commitlintGitHubConstants.JIRA_RULES
      .taskIdEmpty]: githubTaskIdEmptyRuleResolver,
    [commitlintGitHubConstants.JIRA_RULES
      .taskIdMinLength]: githubTaskIdMinLengthRuleResolver,
    [commitlintGitHubConstants.JIRA_RULES
      .taskIdMaxLength]: githubTaskIdMaxLengthRuleResolver,
    [commitlintGitHubConstants.JIRA_RULES
      .taskIdSeparator]: githubTaskIdSeparatorRuleResolver,
    [commitlintGitHubConstants.JIRA_RULES.taskIdCase]: githubTaskIdCaseRuleResolver,
    [commitlintGitHubConstants.JIRA_RULES
      .commitStatusCase]: githubCommitStatusCaseRuleResolver,
    [commitlintGitHubConstants.JIRA_RULES
      .commitMessageSeparator]: githubCommitMessageSeparatorRuleResolver,
  },
}

export default commitlintPluginGitHub
