import { parseCommitMessage } from 'commitlint-github-utils';
import { RuleResolver } from '../../@types';

const githubIssueNumberMissingRuleResolver: RuleResolver<boolean> = (
  parsed,
  _when,
  allowMissingIssueNumbersInWipCommits = true,
) => {
  const rawCommitMessage = parsed.raw;
  if (!rawCommitMessage) return [false, 'Commit message should not be empty'];

  const commitMessage = parseCommitMessage(rawCommitMessage);

  const issueNumbersFound = commitMessage.rawIssueNumbers != null;

  if (!issueNumbersFound) {
    if (commitMessage.isWip) {
      if (!allowMissingIssueNumbersInWipCommits) {
        return [
          false,
          'the WIP commit message must start with the associated GitHub issue number in parentheses. For example: (#42) WIP: My git commit message.',
        ];
      }
    } else {
      return [
        false,
        'the commit message must start with the associated GitHub issue number in parentheses. For example: (#42) My git commit message.',
      ];
    }
  }

  return [true];
};
export default githubIssueNumberMissingRuleResolver;
