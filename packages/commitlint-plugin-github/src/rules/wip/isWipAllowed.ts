import utils from '@elevai/commitlint-github-utils';
import { RuleResolver } from '../../../@types';

const wipAllowedRuleResolver: RuleResolver<void> = (parsed, when?: string) => {
  const rawCommitMessage = parsed.raw;
  if (!rawCommitMessage) return [false, 'Commit message should not be empty'];

  const commitMessage = utils.parseCommitMessage(rawCommitMessage);

  const result = !commitMessage.isWip || !utils.isNegated(when);

  return [result, 'WIP commits are not permitted'];
};

export default wipAllowedRuleResolver;
