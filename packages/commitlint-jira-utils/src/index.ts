import * as commitlintJiraConstants from './commitlintJiraConstants'
import parseCommitMessage from './parseCommitMessage'
import { CommitlintJiraUtils } from '../@types'

const commitlintJiraUtils: CommitlintJiraUtils = {
  commitlintJiraConstants,
  parseCommitMessage,
}

export { commitlintJiraConstants, parseCommitMessage }
export default commitlintJiraUtils
