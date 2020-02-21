import { When } from 'commitlint-github-utils/@types';
import utils from 'commitlint-github-utils';
import { RuleResolver } from '../../../@types';

const githubIssueNumberMissingRuleResolver: RuleResolver<boolean> = (parsed, when) => {
  const rawCommitMessage = parsed.raw;
  if (!rawCommitMessage) return [false, 'Commit message should not be empty'];

  const commitMessage = utils.parseCommitMessage(rawCommitMessage);

  const issueNumbersFound = commitMessage.rawIssueNumbers != null;

  // If we're only required to validate non-WIPs and the commit is a WIP then just return true
  if (commitMessage.isWip && (when === When.NON_WIPS_ALWAYS || when === When.NON_WIPS_NEVER)) {
    return [true];
  }

  // First check for the standard case where no issue numbers are found and it is required to never be missing
  if (!issueNumbersFound && (when === When.NEVER || when === When.NON_WIPS_NEVER)) {
    if (commitMessage.isWip) {
      return [
        false,
        'the WIP commit message must start with the associated GitHub issue number in parentheses followed by space. For example: (#42) WIP: My git commit message.',
      ];
    }

    return [
      false,
      'the commit message must start with the associated GitHub issue number in parentheses followed by space. For example: (#42) My git commit message.',
    ];
  }

  // Next check the odd case of when issue numbers are found but it was required to always be missing
  if (issueNumbersFound && (when === When.ALWAYS || when === When.NON_WIPS_ALWAYS)) {
    if (commitMessage.isWip) {
      return [false, 'the WIP commit message must NOT start with the associated GitHub issue number in parentheses.'];
    }

    return [false, 'the commit message must NOT start with the associated GitHub issue number in parentheses.'];
  }

  return [true];
};

export default githubIssueNumberMissingRuleResolver;
