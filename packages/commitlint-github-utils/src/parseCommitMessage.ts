import { CommitParser, ParsedCommitMessage } from '../@types';
import { ISSUE_NUMBERS_PATTERN, COMMIT_DESCRIPTION_SEPARATOR } from './commitlintGitHubConstants';

const parseIssues = (issuesString: string): number[] => {
  // TODO: Implement
  return [0];
};

const parseCommitMessage: CommitParser = (rawCommitMessage: string): ParsedCommitMessage => {
  let issueNumbers: number[] = [];
  let type: string | undefined;
  let isWip = false;
  let subject: string | undefined;
  let body: string[] = [];

  const issueNumbersWithPossibleType = ISSUE_NUMBERS_PATTERN.exec(rawCommitMessage);
  const issueNumbersWithPossibleTypeGroups = issueNumbersWithPossibleType && issueNumbersWithPossibleType.groups;

  if (issueNumbersWithPossibleTypeGroups) {
    issueNumbers = parseIssues(issueNumbersWithPossibleTypeGroups.issue);

    // eslint-disable-next-line prefer-destructuring
    type = issueNumbersWithPossibleTypeGroups.type;
    isWip = type === 'WIP';

    const descriptionLines = issueNumbersWithPossibleTypeGroups.description.split(COMMIT_DESCRIPTION_SEPARATOR);

    const [description] = descriptionLines;
    [subject] = description;
    body = descriptionLines.slice(1);
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
