import {
  parseCommitMessage,
  commitlintGitHubConstants,
} from 'commitlint-github-utils'
import { TRuleResolver } from '../../@types'

const githubTaskIdEmptyRuleResolver: TRuleResolver = parsed => {
  const rawCommitMessage = parsed.raw
  if (!rawCommitMessage) return [false, 'Commit message should not be empty']

  const commitMessage = parseCommitMessage(rawCommitMessage)

  const isRuleValid = commitMessage.commitTaskIds.length > 0
  return [
    isRuleValid,
    `the commit message must provide minimum one task id followed by (${commitlintGitHubConstants.COMMIT_MESSAGE_SEPARATOR}) symbol, if task not have an id use a conventional task id e.g: "IB-0000${commitlintGitHubConstants.COMMIT_MESSAGE_SEPARATOR} My commit message"`,
  ]
}
export default githubTaskIdEmptyRuleResolver
