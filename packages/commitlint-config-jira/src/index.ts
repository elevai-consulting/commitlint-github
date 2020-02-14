import { commitlintGitHubConstants } from 'commitlint-github-utils'
import { CommitlintConfigGitHub } from '../@types'

export const commitlintConfigGitHub: CommitlintConfigGitHub = {
  rules: {
    [commitlintGitHubConstants.JIRA_RULES.taskIdEmpty]: [2, 'always'],
    [commitlintGitHubConstants.JIRA_RULES.taskIdMinLength]: [2, 'always', 3],
    [commitlintGitHubConstants.JIRA_RULES.taskIdMaxLength]: [2, 'always', 9],
    [commitlintGitHubConstants.JIRA_RULES.taskIdSeparator]: [
      2,
      'always',
      commitlintGitHubConstants.TASK_ID_SEPARATOR,
    ],
    [commitlintGitHubConstants.JIRA_RULES.taskIdCase]: [
      2,
      'always',
      commitlintGitHubConstants.UPPERCASE,
    ],
    [commitlintGitHubConstants.JIRA_RULES.commitStatusCase]: [
      2,
      'always',
      commitlintGitHubConstants.UPPERCASE,
    ],
    [commitlintGitHubConstants.JIRA_RULES.commitMessageSeparator]: [
      2,
      'always',
      commitlintGitHubConstants.COMMIT_MESSAGE_SEPARATOR,
    ],
  },
}

export default commitlintConfigGitHub
