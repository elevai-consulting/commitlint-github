import { ParsedCommitMessage } from '@elevai/commitlint-github-utils';

import { BaseParsedCommit, RuleResolverResult, RuleResolver } from '../../../@types';
import resolveRuleUsingBaseResolver from '../utils/wrappedRuleResolver';

// TODO Get rewire to work or some other solution to avoid exporting subjectAdapter and subjectRuleResolver for testing

export function subjectAdapter(parsed: ParsedCommitMessage): BaseParsedCommit {
  return { subject: parsed.subject };
}

export function subjectRuleResolver<T>(baseRuleResolver: RuleResolver<T>, defaultValue?: T): RuleResolver<T> {
  return (parsed, when, valuePassedIn): RuleResolverResult => {
    let value = valuePassedIn;
    if (value == null) {
      value = defaultValue;
    }

    return resolveRuleUsingBaseResolver(baseRuleResolver, subjectAdapter, parsed, when, value);
  };
}
