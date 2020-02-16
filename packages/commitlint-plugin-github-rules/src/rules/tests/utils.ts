import { RuleResolver, RuleResolverResult } from '../../../@types';

function parse<T>(
  ruleResolver: RuleResolver<T>,
  rawCommitMessage: string,
  when?: string,
  value?: T,
): RuleResolverResult {
  return ruleResolver({ raw: rawCommitMessage }, when, value);
}

export default parse;
