import { When } from 'commitlint-github-utils/@types';
import utils from 'commitlint-github-utils';
import { RuleResolver } from '../../../@types';

const githubIssueNumberMissingRuleResolver: RuleResolver<boolean> = (parsed, when) => {
  const rawCommitMessage = parsed.raw;
  if (!rawCommitMessage) return [false, 'Commit message should not be empty'];

  const commitMessage = utils.parseCommitMessage(rawCommitMessage);

  // We short circuit and return true for WIP commits since we don't valdiate those
  if (commitMessage.isWip) {
    return [true];
  }

  const issueNumbersFound = commitMessage.rawIssueNumbers != null;

  // First check for the standard case where no issue numbers are found and it is required to never be missing
  if (!issueNumbersFound && when === When.NEVER) {
    return [
      false,
      'the commit message must start with the associated GitHub issue number in parentheses followed by space. For example: (#42) My git commit message.',
    ];
  }

  // Next check the odd case of when issue numbers are found but it was required to always be missing
  if (issueNumbersFound && when === When.ALWAYS) {
    return [false, 'the commit message must NOT start with the associated GitHub issue number in parentheses.'];
  }

  return [true];
};

export default githubIssueNumberMissingRuleResolver;
