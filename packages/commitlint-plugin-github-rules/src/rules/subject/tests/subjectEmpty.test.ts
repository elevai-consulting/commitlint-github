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
    expect(parse(When.NON_WIPS_ALWAYS, '')[0]).toEqual(false);
    expect(parse(When.NON_WIPS_NEVER, '')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP and non-WIP commits with a non-empty message and never allowing empty messages', () => {
    expect(parse(When.NEVER, '(#1) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1) chore: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#123, #23) chore: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#123,#23) chore: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
  });

  it('should return an error response when passed WIP and non-WIP commits with a non-empty message and only allowing empty messages', () => {
    expect(parse(When.ALWAYS, '(#1) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#1, #2) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1,#2) my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#123, #23) chore: my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#123,#23) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#1) WIP: my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(false);
  });

  it('should return an error response when passed WIP and non-WIP commits with an empty message and never allowing empty messages', () => {
    expect(parse(When.NEVER, '(#1)')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1)  ')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1) chore:  ')[0]).toEqual(false);

    expect(parse(When.NEVER, '(#12, #133)')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#12, #133) ')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#12,#122) ')[0]).toEqual(false);

    expect(parse(When.NEVER, '(#14, #123) chore:')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#14, #123) chore: ')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#14,#123) chore: ')[0]).toEqual(false);

    expect(parse(When.NEVER, 'WIP')[0]).toEqual(false);
    expect(parse(When.NEVER, 'WIP:')[0]).toEqual(false);
    expect(parse(When.NEVER, 'WIP:  ')[0]).toEqual(false);
    expect(parse(When.NEVER, 'WIP2:  ')[0]).toEqual(false);
    expect(parse(When.NEVER, 'WIP 2:  ')[0]).toEqual(false);
    expect(parse(When.NEVER, 'WIP2 -  ')[0]).toEqual(false);
    expect(parse(When.NEVER, 'WIP 2 -  ')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1) WIP:  ')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1, #2, #3, #4) WIP:')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#12, #123) WIP: ')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1,#2,#3,#4) WIP: ')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP and non-WIP commits with an empty message and only allowing empty messages', () => {
    expect(parse(When.ALWAYS, '(#1)')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1)  ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1) chore:  ')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#12, #133)')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#12, #133) ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#12,#122) ')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#14, #123) chore:')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#14, #123) chore: ')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#14,#123) chore: ')[0]).toEqual(true);

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
  });

  it('should return a success response when passed a WIP commit with an empty message and not verifying wips', () => {
    expect(parse(When.NON_WIPS_ALWAYS, 'WIP')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, 'WIP:')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, 'WIP:  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, 'WIP2:  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, 'WIP 2:  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, 'WIP2 -  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, 'WIP 2 -  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#1) WIP:  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#1, #2, #3, #4) WIP:')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#12, #123) WIP: ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#1,#2,#3,#4) WIP: ')[0]).toEqual(true);

    expect(parse(When.NON_WIPS_NEVER, 'WIP')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, 'WIP:')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, 'WIP:  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, 'WIP2:  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, 'WIP 2:  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, 'WIP2 -  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, 'WIP 2 -  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, '(#1) WIP:  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, '(#1, #2, #3, #4) WIP:')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, '(#12, #123) WIP: ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_NEVER, '(#1,#2,#3,#4) WIP: ')[0]).toEqual(true);
  });

  it('should return an error response when passed a non-WIP commit with an empty message and not verifying wips, but verifying "never" for non-wips', () => {
    expect(parse(When.NON_WIPS_NEVER, '(#1)')[0]).toEqual(false);
    expect(parse(When.NON_WIPS_NEVER, '(#1)  ')[0]).toEqual(false);
    expect(parse(When.NON_WIPS_NEVER, '(#1) chore:  ')[0]).toEqual(false);

    expect(parse(When.NON_WIPS_NEVER, '(#12, #133)')[0]).toEqual(false);
    expect(parse(When.NON_WIPS_NEVER, '(#12, #133) ')[0]).toEqual(false);
    expect(parse(When.NON_WIPS_NEVER, '(#12,#122) ')[0]).toEqual(false);

    expect(parse(When.NON_WIPS_NEVER, '(#14, #123) chore:')[0]).toEqual(false);
    expect(parse(When.NON_WIPS_NEVER, '(#14, #123) chore: ')[0]).toEqual(false);
    expect(parse(When.NON_WIPS_NEVER, '(#14,#123) chore: ')[0]).toEqual(false);
  });

  it('should return an success response when passed a non-WIP commit with an empty message and not verifying wips, but verifying "always" for non-wips', () => {
    expect(parse(When.NON_WIPS_ALWAYS, '(#1)')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#1)  ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#1) chore:  ')[0]).toEqual(true);

    expect(parse(When.NON_WIPS_ALWAYS, '(#12, #133)')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#12, #133) ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#12,#122) ')[0]).toEqual(true);

    expect(parse(When.NON_WIPS_ALWAYS, '(#14, #123) chore:')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#14, #123) chore: ')[0]).toEqual(true);
    expect(parse(When.NON_WIPS_ALWAYS, '(#14,#123) chore: ')[0]).toEqual(true);
  });
});
