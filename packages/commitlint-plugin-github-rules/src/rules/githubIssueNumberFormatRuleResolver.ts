import { parseCommitMessage } from 'commitlint-github-utils';
import { RuleResolver } from '../../@types';

const githubIssueNumberFormatRuleResolver: RuleResolver<void> = parsed => {
  const rawCommitMessage = parsed.raw;
  if (!rawCommitMessage) return [false, 'Commit message should not be empty'];

  const commitMessage = parseCommitMessage(rawCommitMessage);

  const issueNumbersValid = commitMessage.rawIssueNumbers == null || commitMessage.issueNumbers.length > 0;

  return [
    issueNumbersValid,
    'the commit message has an invalid issue number prefix. It must start with the issue number (or numbers if comma-separated) wrapped in parentheses. For example: (#42) My git commit message.',
  ];
};

export default githubIssueNumberFormatRuleResolver;
