import {
  parseCommitMessage,
  commitlintGitHubConstants,
} from 'commitlint-github-utils'
import { TRuleResolver } from '../../@types'

const githubTaskIdCaseRuleResolver: TRuleResolver = (
  parsed,
  _when,
  value = 'uppercase',
) => {
  const rawCommitMessage = parsed.raw
  if (!rawCommitMessage) return [false, 'Commit message should not be empty']

  const commitMessage = parseCommitMessage(rawCommitMessage)

  let nonValidTaskId = ''

  if (value === commitlintGitHubConstants.UPPERCASE)
    nonValidTaskId =
      commitMessage.commitTaskIds.find(taskId => {
        return taskId !== taskId.toUpperCase()
      }) || ''

  if (value === commitlintGitHubConstants.LOWERCASE)
    nonValidTaskId =
      commitMessage.commitTaskIds.find(taskId => {
        return taskId !== taskId.toLowerCase()
      }) || ''

  const isRuleValid = !nonValidTaskId

  return [isRuleValid, `${nonValidTaskId} taskId must be ${value} case`]
}
export default githubTaskIdCaseRuleResolver
