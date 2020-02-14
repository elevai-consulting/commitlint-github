import { commitlintGitHubConstants } from 'commitlint-github-utils'
import { CommitlintConfigGitHub } from '../@types'

export const commitlintConfigGitHub: CommitlintConfigGitHub = {
  rules: {
    [commitlintGitHubConstants.GITHUB_RULES.taskIdEmpty]: [2, 'always'],
    [commitlintGitHubConstants.GITHUB_RULES.taskIdMinLength]: [2, 'always', 3],
    [commitlintGitHubConstants.GITHUB_RULES.taskIdMaxLength]: [2, 'always', 9],
    [commitlintGitHubConstants.GITHUB_RULES.taskIdSeparator]: [
      2,
      'always',
      commitlintGitHubConstants.TASK_ID_SEPARATOR,
    ],
    [commitlintGitHubConstants.GITHUB_RULES.taskIdCase]: [
      2,
      'always',
      commitlintGitHubConstants.UPPERCASE,
    ],
    [commitlintGitHubConstants.GITHUB_RULES.commitStatusCase]: [
      2,
      'always',
      commitlintGitHubConstants.UPPERCASE,
    ],
    [commitlintGitHubConstants.GITHUB_RULES.commitMessageSeparator]: [
      2,
      'always',
      commitlintGitHubConstants.COMMIT_MESSAGE_SEPARATOR,
    ],
  },
}

export default commitlintConfigGitHub
