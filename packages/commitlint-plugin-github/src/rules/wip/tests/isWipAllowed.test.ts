import { When } from '@elevai/commitlint-github-utils/@types';

import { RuleResolverResult } from '../../../../@types';
import wipAllowedRuleResolver from '../isWipAllowed';
import runRule from '../../utils/tests/utils';

const parse = (when: When, rawCommitMessage: string): RuleResolverResult =>
  runRule(wipAllowedRuleResolver, [when], rawCommitMessage);

describe('wipAllowedRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse(When.ALWAYS, '')[0]).toEqual(false);
    expect(parse(When.NEVER, '')[0]).toEqual(false);
  });

  it('should return a success response if the commit is not a WIP', () => {
    expect(parse(When.ALWAYS, '(#1) my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1) chore: my commit message')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#123, #23) chore: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#123,#23) chore: my commit message')[0]).toEqual(true);
  });

  it('should return a success response if the commit is WIP and not disallowed', () => {
    expect(parse(When.ALWAYS, '(#1) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
  });

  it('should return a success response if the commit is not a WIP even if disallowed', () => {
    expect(parse(When.NEVER, '(#1) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1) chore: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#123, #23) chore: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#123,#23) chore: my commit message')[0]).toEqual(true);
  });

  it('should return an error response if the commit is WIP and disallowed', () => {
    expect(parse(When.NEVER, '(#1) WIP: my commit message')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(false);
  });
});
