import { When } from '@elevai/commitlint-github-utils/@types';
import utils from '@elevai/commitlint-github-utils';

import { BaseParsedCommit, BaseParsedCommitAdapter, RuleResolver, RuleResolverResult } from '../../../@types';

function resolveRuleUsingBaseResolver<T>(
  baseResolver: RuleResolver<T>,
  adapter: BaseParsedCommitAdapter,
  parsed: BaseParsedCommit,
  whenPassedIn?: When,
  value?: T,
): RuleResolverResult {
  const rawCommitMessage = parsed.raw;
  if (!rawCommitMessage) return [false, 'Commit message should not be empty'];

  const commitMessage = utils.parseCommitMessage(rawCommitMessage);

  // We short circuit if the When requested is only for non-WIPs and the commit is a WIP
  const wipHandledResult = utils.handleWipCommits(commitMessage, whenPassedIn);
  if (wipHandledResult.isWipValidated) {
    // In that case we just return true immediately
    return [true];
  }

  // Otherwise we call the base resolver with the When returned as if it was passed a NON-WIPs one
  // it has been converted to a standard ALWAYS or NEVER which is suitable for passing to the base resolver
  // See the docs on handleWipCommits() for more info

  return baseResolver(adapter(commitMessage), wipHandledResult.when, value);
}

export default resolveRuleUsingBaseResolver;
