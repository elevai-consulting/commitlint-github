import { When } from 'commitlint-github-utils/@types';
import { RuleResolverResult } from '../../../../@types';
import { subjectEmptyRuleResolver } from '..';
import runRule from '../../utils/tests/utils';

const parse = (when: When, rawCommitMessage: string): RuleResolverResult =>
  runRule(subjectEmptyRuleResolver, [when], rawCommitMessage);

describe('subjectEmptyRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse(When.ALWAYS, '')[0]).toEqual(false);
    expect(parse(When.NEVER, '')[0]).toEqual(false);
  });

  it('should return a success response when passed commits with a non-empty message and never allowing empty messages', () => {
    expect(parse(When.NEVER, '(#1) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1) chore: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#123, #23) chore: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#123,#23) chore: my commit message')[0]).toEqual(true);
  });

  it('should return an error response when passed commits with a non-empty message and only allowing empty messages', () => {
    expect(parse(When.ALWAYS, '(#1) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#1, #2) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1,#2) my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#123, #23) chore: my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#123,#23) chore: my commit message')[0]).toEqual(false);
  });

  it('should return an error response when passed commits with an empty message and never allowing empty messages', () => {
    expect(parse(When.NEVER, '(#1)')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1)  ')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1) chore:  ')[0]).toEqual(false);

    expect(parse(When.NEVER, '(#12, #133)')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#12, #133) ')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#12,#122) ')[0]).toEqual(false);

    expect(parse(When.NEVER, '(#14, #123) chore:')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#14, #123) chore: ')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#14,#123) chore: ')[0]).toEqual(false);
  });

  it('should return a success response when passed commits with an empty message and only allowing empty messages', () => {
    expect(parse(When.ALWAYS, '(#1)')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1)  ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1) chore:  ')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#12, #133)')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#12, #133) ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#12,#122) ')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#14, #123) chore:')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#14, #123) chore: ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#14,#123) chore: ')[0]).toEqual(true);
  });

  it('should always return a success response for any WIP commit as rules are disabled for WIPs', () => {
    expect(parse(When.ALWAYS, '(#1) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);

    expect(parse(When.ALWAYS, 'WIP')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP:')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP:  ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP2:  ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP 2:  ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP2 -  ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP 2 -  ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1) WIP:  ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1, #2, #3, #4) WIP:')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#12, #123) WIP: ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1,#2,#3,#4) WIP: ')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, 'WIP')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP:')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP:  ')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP2:  ')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP 2:  ')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP2 -  ')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP 2 -  ')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1) WIP:  ')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1, #2, #3, #4) WIP:')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#12, #123) WIP: ')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2,#3,#4) WIP: ')[0]).toEqual(true);
  });
});
