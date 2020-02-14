export interface Rules {
  taskIdEmpty: string
  taskIdSeparator: string
  taskIdCase: string
  taskIdMaxLength: string
  taskIdMinLength: string
  commitMessageSeparator: string
}

export interface TCommitlintGitHubConstants {
  GITHUB_RULES: Rules
  COMMIT_MESSAGE_SEPARATOR: string
  COMMIT_TASK_IDS_SEPARATOR: string
  TASK_ID_SEPARATOR: string
  UPPERCASE: string
  LOWERCASE: string
  COMMIT_DESCRIPTION_SEPARATOR: string
}

export type TParseCommitMessage = (
  commitMessage: string,
) => {
  commitTaskIds: string[]
  commitHeader: string
  commitFooter: string
}

export interface CommitlintGitHubUtils {
  parseCommitMessage: TParseCommitMessage
  commitlintGitHubConstants: TCommitlintGitHubConstants
}

export const commitlintGitHubConstants: TCommitlintGitHubConstants
export const parseCommitMessage: TParseCommitMessage

declare const commitlintGitHubUtils: CommitlintGitHubUtils
export default commitlintGitHubUtils
