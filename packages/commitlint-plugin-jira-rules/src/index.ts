import { commitlintJiraConstants } from 'commitlint-github-utils'
import { CommitlintPluginJira } from '../@types'
import githubTaskIdMaxLengthRuleResolver from './rules/githubTaskIdMaxLengthRuleResolver'
import githubTaskIdMinLengthRuleResolver from './rules/githubTaskIdMinLengthRuleResolver'
import githubTaskIdEmptyRuleResolver from './rules/githubTaskIdEmptyRuleResolver'
import githubTaskIdSeparatorRuleResolver from './rules/githubTaskIdSeparatorRuleResolver'
import githubTaskIdCaseRuleResolver from './rules/githubTaskIdCaseRuleResolver'
import githubCommitStatusCaseRuleResolver from './rules/githubCommitStatusCaseRuleResolver'
import githubCommitMessageSeparatorRuleResolver from './rules/githubCommitMessageSeparatorRuleResolver'

export const commitlintPluginJira: CommitlintPluginJira = {
  rules: {
    [commitlintJiraConstants.JIRA_RULES
      .taskIdEmpty]: githubTaskIdEmptyRuleResolver,
    [commitlintJiraConstants.JIRA_RULES
      .taskIdMinLength]: githubTaskIdMinLengthRuleResolver,
    [commitlintJiraConstants.JIRA_RULES
      .taskIdMaxLength]: githubTaskIdMaxLengthRuleResolver,
    [commitlintJiraConstants.JIRA_RULES
      .taskIdSeparator]: githubTaskIdSeparatorRuleResolver,
    [commitlintJiraConstants.JIRA_RULES.taskIdCase]: githubTaskIdCaseRuleResolver,
    [commitlintJiraConstants.JIRA_RULES
      .commitStatusCase]: githubCommitStatusCaseRuleResolver,
    [commitlintJiraConstants.JIRA_RULES
      .commitMessageSeparator]: githubCommitMessageSeparatorRuleResolver,
  },
}

export default commitlintPluginJira
