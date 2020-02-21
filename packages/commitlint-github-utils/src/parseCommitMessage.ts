import { ParsedCommitMessage } from '../@types';
import {
  ISSUE_NUMBER_PATTERN,
  ISSUE_NUMBERS_PATTERN,
  WIP_WITHOUT_ISSUE_NUMBER_PATTERN,
  WIP_WITH_JUST_ISSUE_NUMBERS_PATTERN,
  SUBJECT_PATTERN,
  ISSUE_NUMBERS_SEPARATOR,
  WIP_TYPE,
  COMMIT_DESCRIPTION_SEPARATOR,
} from './commitlintGitHubConstants';

function parseRegex(stringToParse: string, regex: RegExp): { [key: string]: string } | undefined {
  return regex.exec(stringToParse)?.groups;
}

function parseIssue(issueString: string): number {
  const groupsMatched = ISSUE_NUMBER_PATTERN.exec(issueString.trim())?.groups;

  if (groupsMatched) {
    return parseInt(groupsMatched.issueNumber, 10);
  }

  return -1;
}

function parseIssues(issuesString: string): number[] {
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
}

function parseDescription(groups: { [key: string]: string }): [string, string, string[]] {
  const descriptionLines = groups.description.split(COMMIT_DESCRIPTION_SEPARATOR);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const subjectGroups = parseRegex(descriptionLines[0], SUBJECT_PATTERN)!;

  const { subjectSeparator } = subjectGroups;
  const subject = subjectGroups.subject.trim(); // trims any trailing whitespace
  const body = descriptionLines.slice(1);

  return [subjectSeparator, subject, body];
}

function parseCommitMessage(rawCommitMessage: string): ParsedCommitMessage {
  let issueNumbers: number[] = [];
  let rawIssueNumbers: string | undefined;
  let type: string | undefined;
  let isWip = false;
  let subjectSeparator: string | undefined;
  let subject: string | undefined;
  let body: string[] = [];

  const issueNumbersWithPossibleTypeGroups = parseRegex(rawCommitMessage, ISSUE_NUMBERS_PATTERN);

  if (issueNumbersWithPossibleTypeGroups) {
    rawIssueNumbers = issueNumbersWithPossibleTypeGroups.issues.trim();
    issueNumbers = parseIssues(rawIssueNumbers);

    // eslint-disable-next-line prefer-destructuring
    type = issueNumbersWithPossibleTypeGroups.type;
    isWip = type === WIP_TYPE;

    // Clear the type as WIP is not a valid type and can't easily be added since types are validated to be lowercase (WIP is the exception)
    if (isWip) {
      type = undefined;
    }

    [subjectSeparator, subject, body] = parseDescription(issueNumbersWithPossibleTypeGroups);
  } else {
    // As well as WIP commits with a description
    const wipCommitGroups = parseRegex(rawCommitMessage, WIP_WITHOUT_ISSUE_NUMBER_PATTERN);

    if (wipCommitGroups) {
      isWip = true;

      // WIP Commits may not have a description but may just be WIP placeholder commits such as 'WIP', 'WIP 2' etc., so guard the parsing
      if (wipCommitGroups.description) {
        [subjectSeparator, subject, body] = parseDescription(wipCommitGroups);
      }
    } else {
      const wipWithIssueNumbersGroups = parseRegex(rawCommitMessage, WIP_WITH_JUST_ISSUE_NUMBERS_PATTERN);

      if (wipWithIssueNumbersGroups) {
        isWip = true;

        rawIssueNumbers = wipWithIssueNumbersGroups.issues.trim();
        issueNumbers = parseIssues(rawIssueNumbers);
      }
    }
  }

  return {
    issueNumbers,
    rawIssueNumbers,
    isWip,
    type,
    subjectSeparator,
    subject,
    body,
  };
}

export default parseCommitMessage;
