import {
  parseCommitMessage,
  commitlintGitHubConstants,
} from 'commitlint-github-utils'
import { TRuleResolver } from '../../@types'

const githubCommitStatusCaseRuleResolver: TRuleResolver = (
  parsed,
  _when,
  value = commitlintGitHubConstants.UPPERCASE,
) => {
  const rawCommitMessage = parsed.raw
  if (!rawCommitMessage) return [false, 'Commit message should not be empty']

  const commitMessage = parseCommitMessage(rawCommitMessage)

  if (!commitMessage.commitStatus) return [true]

  let isRuleValid = false

  if (
    value === commitlintGitHubConstants.UPPERCASE &&
    commitMessage.commitStatus === commitMessage.commitStatus.toUpperCase()
  )
    isRuleValid = true
  if (
    value === commitlintGitHubConstants.LOWERCASE &&
    commitMessage.commitStatus === commitMessage.commitStatus.toLowerCase()
  )
    isRuleValid = true

  return [
    isRuleValid,
    `${commitMessage.commitStatus} commitStatus must be ${value} case`,
  ]
}
export default githubCommitStatusCaseRuleResolver
