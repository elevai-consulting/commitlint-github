export interface Rules {
  issueNumberMissing: string;
  issueNumberFormat: string;
}

export interface CommitlintGitHubConstants {
  GITHUB_RULES: Rules;
  ISSUE_NUMBER_PREFIX: string;
  ISSUE_NUMBERS_SEPARATOR: string;
  ISSUE_NUMBERS_PATTERN: RegExp;
  TYPE_SEPARATOR: string;
  COMMIT_DESCRIPTION_SEPARATOR: string;
}

export enum BracketType {
  PARENTHESES,
  SQUARE_BRACKETS,
  ANGLE_BRACKETS,
}

export type ParserOptions = {
  issueBrackets: BracketType;
};

export type ParsedCommitMessage = {
  issueNumbers: number[];
  rawIssueNumbers?: string;
  isWip: boolean;
  type?: string;
  subject?: string;
  body: string[];
};

export type CommitParser = (unparsedCommitMessage: string, parserOptions?: ParserOptions) => ParsedCommitMessage;

export interface CommitlintGitHubUtils {
  parseCommitMessage: CommitParser;
  commitlintGitHubConstants: CommitlintGitHubConstants;
}

export const commitlintGitHubConstants: CommitlintGitHubConstants;
export const parseCommitMessage: CommitParser;

declare const commitlintGitHubUtils: CommitlintGitHubUtils;
export default commitlintGitHubUtils;
