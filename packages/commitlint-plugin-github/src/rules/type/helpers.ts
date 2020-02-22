import { ParsedCommitMessage } from 'commitlint-github-utils';

import { BaseParsedCommit, RuleResolverResult, RuleResolver } from '../../../@types';
import resolveRuleUsingBaseResolver from '../utils/wrappedRuleResolver';

export function typeAdapter(parsed: ParsedCommitMessage): BaseParsedCommit {
  return { type: parsed.type };
}

export function typeRuleResolver<T>(baseRuleResolver: RuleResolver<T>): RuleResolver<T> {
  return (parsed, when, value): RuleResolverResult =>
    resolveRuleUsingBaseResolver(baseRuleResolver, typeAdapter, parsed, when, value);
}
