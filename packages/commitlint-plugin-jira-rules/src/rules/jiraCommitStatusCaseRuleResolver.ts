import {
  parseCommitMessage,
  commitlintJiraConstants,
} from 'commitlint-jira-utils'
import { TRuleResolver } from '../../@types'

const jiraCommitStatusCaseRuleResolver: TRuleResolver = (
  parsed,
  _when,
  value = commitlintJiraConstants.UPPERCASE,
) => {
  const rawCommitMessage = parsed.raw
  if (!rawCommitMessage) return [false, 'Commit message should not be empty']

  const commitMessage = parseCommitMessage(rawCommitMessage)

  if (!commitMessage.commitStatus) return [true]

  let isRuleValid = false

  if (
    value === commitlintJiraConstants.UPPERCASE &&
    commitMessage.commitStatus === commitMessage.commitStatus.toUpperCase()
  )
    isRuleValid = true
  if (
    value === commitlintJiraConstants.LOWERCASE &&
    commitMessage.commitStatus === commitMessage.commitStatus.toLowerCase()
  )
    isRuleValid = true

  return [
    isRuleValid,
    `${commitMessage.commitStatus} commitStatus must be ${value} case`,
  ]
}
export default jiraCommitStatusCaseRuleResolver
