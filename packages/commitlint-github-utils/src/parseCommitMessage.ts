import { CommitParser, ParsedCommitMessage } from '../@types';
import {
  ISSUE_NUMBER_PATTERN,
  ISSUE_NUMBERS_PATTERN,
  WIP_WITHOUT_ISSUE_NUMBER_PATTERN,
  ISSUE_NUMBERS_SEPARATOR,
  WIP_TYPE,
  COMMIT_DESCRIPTION_SEPARATOR,
} from './commitlintGitHubConstants';

const parseRegex = (stringToParse: string, regex: RegExp): { [key: string]: string } | undefined => {
  return regex.exec(stringToParse)?.groups;
};

const parseIssue = (issueString: string): number => {
  const groupsMatched = ISSUE_NUMBER_PATTERN.exec(issueString.trim())?.groups;

  if (groupsMatched) {
    return parseInt(groupsMatched.issueNumber, 10);
  }

  return -1;
};

const parseIssues = (issuesString: string): number[] => {
  if (!issuesString) {
    return [];
  }

  const issueStrings = issuesString.trim().split(ISSUE_NUMBERS_SEPARATOR);
  const parsedIssues = issueStrings.map(str => parseIssue(str)).filter(issueNumber => issueNumber !== -1); // filter unparsed

  // Only return the parsed result is ALL issue strings are valid
  if (parsedIssues.length === issueStrings.length) {
    return parsedIssues;
  }

  // Otherwise return an empty array
  return [];
};

const parseDescription = (groups: { [key: string]: string }): [string, string[]] => {
  const descriptionLines = groups.description.split(COMMIT_DESCRIPTION_SEPARATOR);

  const subject = descriptionLines[0].trim();
  const body = descriptionLines.slice(1);

  return [subject, body];
};

const parseCommitMessage: CommitParser = (rawCommitMessage: string): ParsedCommitMessage => {
  let issueNumbers: number[] = [];
  let rawIssueNumbers: string | undefined;
  let type: string | undefined;
  let isWip = false;
  let subject: string | undefined;
  let body: string[] = [];

  const issueNumbersWithPossibleTypeGroups = parseRegex(rawCommitMessage, ISSUE_NUMBERS_PATTERN);

  if (issueNumbersWithPossibleTypeGroups) {
    // console.log(`description: '${issueNumbersWithPossibleTypeGroups.description}'; raw: ${rawCommitMessage}`);
    rawIssueNumbers = issueNumbersWithPossibleTypeGroups.issues.trim();
    issueNumbers = parseIssues(rawIssueNumbers);

    // eslint-disable-next-line prefer-destructuring
    type = issueNumbersWithPossibleTypeGroups.type;
    isWip = type === WIP_TYPE;

    [subject, body] = parseDescription(issueNumbersWithPossibleTypeGroups);
  } else {
    const wipCommitGroups = parseRegex(rawCommitMessage, WIP_WITHOUT_ISSUE_NUMBER_PATTERN);
    if (wipCommitGroups) {
      isWip = true;
      type = WIP_TYPE;

      [subject, body] = parseDescription(wipCommitGroups);
    }
  }

  return {
    issueNumbers,
    rawIssueNumbers,
    isWip,
    type,
    subject,
    body,
  };
};

export default parseCommitMessage;
