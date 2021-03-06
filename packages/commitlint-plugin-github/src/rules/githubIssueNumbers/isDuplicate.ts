import utils from '@elevai/commitlint-github-utils';
import { RuleResolver } from '../../../@types';

const isNoDuplicates = (issueNumbers: number[]): boolean => new Set(issueNumbers).size === issueNumbers.length;

const githubIssueNumberDuplicateRuleResolver: RuleResolver<void> = parsed => {
  const rawCommitMessage = parsed.raw;
  if (!rawCommitMessage) return [false, 'Commit message should not be empty'];

  const commitMessage = utils.parseCommitMessage(rawCommitMessage);

  // We short circuit and return true for WIP commits since we don't valdiate those
  if (commitMessage.isWip) {
    return [true];
  }

  const issueNumbersValid = commitMessage.rawIssueNumbers == null || isNoDuplicates(commitMessage.issueNumbers);

  return [issueNumbersValid, 'the commit message duplicate issue numbers referenced in the commit message prefix.'];
};

export default githubIssueNumberDuplicateRuleResolver;
