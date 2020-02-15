export interface Rules {
  issueNumberMissing: string;
  issueNumberFormat: string;
  typeOrWip: string;
  subjectCase: string;
}

export interface TCommitlintGitHubConstants {
  GITHUB_RULES: Rules;
  ISSUE_NUMBER_PREFIX: string;
  ISSUE_NUMBERS_SEPARATOR: string;
  ISSUE_NUMBERS_PATTERN: RegExp;
  TYPE_SEPARATOR: string;
  COMMIT_DESCRIPTION_SEPARATOR: string;
}

export type ParsedCommitMessage = {
  issueNumbers: number[];
  isWip: boolean;
  type?: string;
  subject?: string;
  body: string[];
};

export type CommitParser = (
  unparsedCommitMessage: string,
) => ParsedCommitMessage;

export interface CommitlintGitHubUtils {
  parseCommitMessage: CommitParser;
  commitlintGitHubConstants: TCommitlintGitHubConstants;
}

export const commitlintGitHubConstants: TCommitlintGitHubConstants;
export const parseCommitMessage: CommitParser;

declare const commitlintGitHubUtils: CommitlintGitHubUtils;
export default commitlintGitHubUtils;
