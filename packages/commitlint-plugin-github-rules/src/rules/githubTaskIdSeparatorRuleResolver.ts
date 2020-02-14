import {
  parseCommitMessage,
  commitlintGitHubConstants,
} from 'commitlint-github-utils'

import { TRuleResolver } from '../../@types'

const githubTaskIdSeparatorRuleResolver: TRuleResolver = (
  parsed,
  _when,
  value = commitlintGitHubConstants.TASK_ID_SEPARATOR,
) => {
  const rawCommitMessage = parsed.raw
  if (!rawCommitMessage) return [false, 'Commit message should not be empty']

  const commitMessage = parseCommitMessage(rawCommitMessage)

  const nonValidTaskId = commitMessage.commitTaskIds.find(taskId => {
    return !new RegExp(commitlintGitHubConstants.TASK_ID_SEPARATOR).test(taskId)
  })

  const isRuleValid = !nonValidTaskId

  return [
    isRuleValid,
    `${nonValidTaskId} taskId header and footer must be separated with "${value}" e.g: IB-2121`,
  ]
}
export default githubTaskIdSeparatorRuleResolver
