import { When } from 'commitlint-github-utils/@types';
import { RuleResolverResult } from '../../../../@types';
import { typeEmptyRuleResolver } from '../index';
import runRule from '../../utils/tests/utils';

const parse = (when: When, rawCommitMessage: string): RuleResolverResult =>
  runRule(typeEmptyRuleResolver, [when], rawCommitMessage);

describe('typeEmptyRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse(When.ALWAYS, '')[0]).toEqual(false);
    expect(parse(When.NEVER, '')[0]).toEqual(false);
  });

  it('should return a success response when passed non-WIP commits with a non-empty type and never allowing empty type', () => {
    expect(parse(When.NEVER, '(#1) chore: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1, #2) fix: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2) arbitrary: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#123, #23) dummy: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#123,#23) chore: my commit message')[0]).toEqual(true);
  });

  it('should return an error response when passed non-WIP commits with a non-empty type and only allowing empty types', () => {
    expect(parse(When.ALWAYS, '(#1) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#1, #2) fix: my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1,#2) arbitrary: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#123, #23) dummy: my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#123,#23) chore: my commit message')[0]).toEqual(false);
  });

  it('should return an error response when passed non-WIP commits with an empty type and never allowing empty types', () => {
    expect(parse(When.NEVER, '(#1)')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1) Test message')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1): Test message')[0]).toEqual(false);

    expect(parse(When.NEVER, '(#12, #133)')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#12, #133) Test Message')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#12,#122) Test Message')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#12,#122): Test Message')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP and non-WIP commits with an empty type and only allowing empty types', () => {
    expect(parse(When.ALWAYS, '(#1)')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1) Test message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1): Test message')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#12, #133)')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#12, #133) Test Message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#12,#122) Test Message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#12,#122): Test Message')[0]).toEqual(true);
  });

  it('should return a success response when passed WIP commits as that is not treated as a regular type and so is not validated by this rule', () => {
    // ALWAYS
    expect(parse(When.ALWAYS, '(#1) WIP')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#1) WIP:my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1) WIP: my commit message')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1, #2, #3, #4) WIP:my commit message')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1,#2,#3,#4) WIP:my commit message')[0]).toEqual(true);

    expect(parse(When.ALWAYS, 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP 2 - My commit message')[0]).toEqual(true);

    // NEVER
    expect(parse(When.NEVER, '(#1) WIP')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1) WIP:my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1) WIP: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1, #2, #3, #4) WIP:my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2,#3,#4) WIP:my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP 2 - My commit message')[0]).toEqual(true);
  });
});
