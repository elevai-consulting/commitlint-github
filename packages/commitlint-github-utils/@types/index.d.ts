export interface Rules {
  issueNumberMissing: string;
  issueNumberFormat: string;
  issueNumberDuplicate: string;

  wipAllowed: string;

  subjectEmpty: string;
  subjectCase: string;
  subjectFullStop: string;
  subjectMinLength: string;
  subjectMaxLength: string;
  subjectSeparator: string;

  typeCase: string;
  typeEmpty: string;
  typeEnum: string;
  typeMaxLength: string;
  typeMinLength: string;
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
  subjectSeparator?: string;
  subject?: string;
  body: string[];
};

export const enum When {
  ALWAYS = 'always',
  NEVER = 'never',
  IGNORED = 'ignored', // For when the rule doesn't vary based on the 'when' value passed in
}

// TODO: Remove once @commitlint/types is published
export type TargetCaseType =
  | 'camel-case'
  | 'kebab-case'
  | 'snake-case'
  | 'pascal-case'
  | 'start-case'
  | 'upper-case'
  | 'uppercase'
  | 'sentence-case'
  | 'sentencecase'
  | 'lower-case'
  | 'lowercase'
  | 'lowerCase';

export type WipHandledResult = {
  isWipValidated: boolean;
  when?: When;
};

export interface CommitlintGitHubUtils {
  commitlintGitHubConstants: CommitlintGitHubConstants;

  parseCommitMessage(unparsedCommitMessage: string, parserOptions?: ParserOptions): ParsedCommitMessage;
  isNegated(when?: string): boolean;
  handleWipCommits(commitMessage: ParsedCommitMessage, whenPassedIn?: When): WipHandledResult;
}

declare const commitlintGitHubUtils: CommitlintGitHubUtils;
export default commitlintGitHubUtils;
