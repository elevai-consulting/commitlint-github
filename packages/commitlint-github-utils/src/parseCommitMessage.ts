import { CommitParser, ParserOptions, ParsedCommitMessage } from '../@types';
import {
  ISSUE_NUMBERS_PATTERN,
  WIP_WITHOUT_ISSUE_NUMBER_PATTERN,
  WIP_TYPE,
  COMMIT_DESCRIPTION_SEPARATOR,
} from './commitlintGitHubConstants';

const parseCommit = (rawCommitMessage: string, regex: RegExp): { [key: string]: string } | undefined => {
  return regex.exec(rawCommitMessage)?.groups;
};

const parseIssues = (issuesString: string): number[] => {
  // TODO: Implement
  return [0];
};

const parseDescription = (groups: { [key: string]: string }): [string, string[]] => {
  const descriptionLines = groups.description.split(COMMIT_DESCRIPTION_SEPARATOR);

  const [description] = descriptionLines;
  const [subject] = description;
  const body = descriptionLines.slice(1);

  return [subject, body];
};

const parseCommitMessage: CommitParser = (rawCommitMessage: string): ParsedCommitMessage => {
  let issueNumbers: number[] = [];
  let type: string | undefined;
  let isWip = false;
  let subject: string | undefined;
  let body: string[] = [];

  const issueNumbersWithPossibleTypeGroups = parseCommit(rawCommitMessage, ISSUE_NUMBERS_PATTERN);
  if (issueNumbersWithPossibleTypeGroups) {
    issueNumbers = parseIssues(issueNumbersWithPossibleTypeGroups.issue);

    // eslint-disable-next-line prefer-destructuring
    type = issueNumbersWithPossibleTypeGroups.type;
    isWip = type === WIP_TYPE;

    [subject, body] = parseDescription(issueNumbersWithPossibleTypeGroups);
  } else {
    const wipCommitGroups = parseCommit(rawCommitMessage, WIP_WITHOUT_ISSUE_NUMBER_PATTERN);
    if (wipCommitGroups) {
      isWip = true;
      type = WIP_TYPE;

      [subject, body] = parseDescription(wipCommitGroups);
    }
  }

  return {
    issueNumbers,
    isWip,
    type,
    subject,
    body,
  };
};

export default parseCommitMessage;
