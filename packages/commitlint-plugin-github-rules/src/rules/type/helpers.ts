import { ParsedCommitMessage, When } from 'commitlint-github-utils';

import { BaseParsedCommit, RuleResolverResult, RuleResolver } from '../../../@types';
import resolveRuleUsingBaseResolver from '../utils/wrappedRuleResolver';

// TODO Get rewire to work or some other solution to avoid exporting typeAdapter and typeRuleResolver for testing

export function typeAdapter(parsed: ParsedCommitMessage): BaseParsedCommit {
  return { type: parsed.type };
}

export function typeRuleResolver<T>(baseRuleResolver: RuleResolver<T>): RuleResolver<T> {
  return (parsed, whenPassedIn, value): RuleResolverResult => {
    // Type rules only validate non-WIPs since WIP commits by definition do not have a type since 'WIP' is the pseudo-type
    // Therefore it doesn't make sense to pass NON_WIPS_ALWAYS or NON_WIPS_NEVER as the when value,
    // however resolveRuleUsingBaseResolver() only has WIP short-circuiting to return true for NON_WIPS_ALWAYS or NON_WIPS_NEVER
    // Therefore we convert ALWAYS, IGNORED, and NEVER to the corresponding NON_WIP values to reenable WIP short-circuiting.

    let when = whenPassedIn;
    if (when === When.ALWAYS || when === When.IGNORED) {
      when = When.NON_WIPS_ALWAYS;
    } else if (when === When.NEVER) {
      when = When.NON_WIPS_NEVER;
    }

    return resolveRuleUsingBaseResolver(baseRuleResolver, typeAdapter, parsed, when, value);
  };
}
