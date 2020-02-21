// import { TargetSeparatorType } from '@commitlint/types'; // When it is published
import { When } from 'commitlint-github-utils/@types';
import { WhenAndValue, RuleResolverResult } from '../../../../@types';
import { subjectSeparatorRuleResolver } from '..';
import runRule from '../../utils/tests/utils';

const parse = (whenAndValue: WhenAndValue<string>, rawCommitMessage: string): RuleResolverResult =>
  runRule(subjectSeparatorRuleResolver, whenAndValue, rawCommitMessage);

describe('subjectSeparatorRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse([When.ALWAYS], '')[0]).toEqual(false);
    expect(parse([When.NEVER], '')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS], '')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER], '')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP and non-WIP commits with a space before the subject and always requiring it', () => {
    expect(parse([When.ALWAYS], '(#1) My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#1) chore: My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS], '(#1, #2) My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#1,#2) My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS], '(#123, #23) chore: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#123,#23) chore: My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS], '(#1) WIP: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#1, #2, #3, #4) WIP: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#1,#2,#3,#4) WIP: My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS], 'WIP2: My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], 'WIP 2: My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], 'WIP2 - My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], 'WIP 2 - My commit message.')[0]).toEqual(true);
  });

  it('should return an error response when passed WIP and non-WIP commits without a space before the subject and always requiring it', () => {
    expect(parse([When.ALWAYS], '(#1)My commit message')[0]).toEqual(false);
    expect(parse([When.ALWAYS], '(#1) chore:My commit message')[0]).toEqual(false);

    expect(parse([When.ALWAYS], '(#1, #2)My commit message')[0]).toEqual(false);
    expect(parse([When.ALWAYS], '(#1,#2)My commit message')[0]).toEqual(false);

    expect(parse([When.ALWAYS], '(#123, #23) chore:My commit message')[0]).toEqual(false);
    expect(parse([When.ALWAYS], '(#123,#23) chore:My commit message')[0]).toEqual(false);

    expect(parse([When.ALWAYS], '(#1) WIP:My commit message')[0]).toEqual(false);
    expect(parse([When.ALWAYS], '(#1, #2, #3, #4) WIP:My commit message')[0]).toEqual(false);
    expect(parse([When.ALWAYS], '(#1,#2,#3,#4) WIP:My commit message')[0]).toEqual(false);

    expect(parse([When.ALWAYS], 'WIP2:My commit message.')[0]).toEqual(false);
    expect(parse([When.ALWAYS], 'WIP 2:My commit message.')[0]).toEqual(false);
    expect(parse([When.ALWAYS], 'WIP2 -My commit message.')[0]).toEqual(false);
    expect(parse([When.ALWAYS], 'WIP 2 -My commit message.')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP and non-WIP commits without a space before the subject and never requiring it', () => {
    expect(parse([When.NEVER], '(#1)My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#1) chore:My commit message')[0]).toEqual(true);

    expect(parse([When.NEVER], '(#1, #2)My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#1,#2)My commit message')[0]).toEqual(true);

    expect(parse([When.NEVER], '(#123, #23) chore:My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#123,#23) chore:My commit message')[0]).toEqual(true);

    expect(parse([When.NEVER], '(#1) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#1, #2, #3, #4) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#1,#2,#3,#4) WIP:My commit message')[0]).toEqual(true);

    expect(parse([When.NEVER], 'WIP2:My commit message.')[0]).toEqual(true);
    expect(parse([When.NEVER], 'WIP 2:My commit message.')[0]).toEqual(true);
    expect(parse([When.NEVER], 'WIP2 -My commit message.')[0]).toEqual(true);
    expect(parse([When.NEVER], 'WIP 2 -My commit message.')[0]).toEqual(true);
  });

  it('should return an error response when passed WIP and non-WIP commits with a space before the subject and never requiring it', () => {
    expect(parse([When.NEVER], '(#1) My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER], '(#1) chore: My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER], '(#1, #2) My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER], '(#1,#2) My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER], '(#123, #23) chore: My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER], '(#123,#23) chore: My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER], '(#1) WIP: My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER], '(#1, #2, #3, #4) WIP: My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER], '(#1,#2,#3,#4) WIP: My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER], 'WIP2: My commit message.')[0]).toEqual(false);
    expect(parse([When.NEVER], 'WIP 2: My commit message.')[0]).toEqual(false);
    expect(parse([When.NEVER], 'WIP2 - My commit message.')[0]).toEqual(false);
    expect(parse([When.NEVER], 'WIP 2 - My commit message.')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP commits with no subject as nothing to verify', () => {
    expect(parse([When.ALWAYS], 'WIP2')[0]).toEqual(true);
    expect(parse([When.ALWAYS], 'WIP 2')[0]).toEqual(true);

    expect(parse([When.NEVER], 'WIP2')[0]).toEqual(true);
    expect(parse([When.NEVER], 'WIP 2')[0]).toEqual(true);
  });

  it('should return a success response when passed a WIP commit with no matching separator but not verifying wips', () => {
    expect(parse([When.NON_WIPS_ALWAYS], 'WIP')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], 'WIP  ')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], 'WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], '(#1) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], '(#1, #2, #3, #4) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], '(#12], #123) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], '(#1,#2,#3,#4) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], 'WIP2:My commit message.')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], 'WIP 2:My commit message.')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], 'WIP2 -My commit message.')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], 'WIP 2 -My commit message.')[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER], 'WIP')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], 'WIP  ')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], 'WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], 'WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], '(#1) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], '(#1, #2, #3, #4) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], '(#12], #123) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], '(#1,#2,#3,#4) WIP:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], 'WIP2:My commit message.')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], 'WIP 2:My commit message.')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], 'WIP2 -My commit message.')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], 'WIP 2 -My commit message.')[0]).toEqual(true);
  });

  it('should return a success response when passed a non-WIP commit with a matching separator and not verifying wips, but verifying "always" for non-wips', () => {
    expect(parse([When.NON_WIPS_ALWAYS], '(#1) My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], '(#1) chore: My commit message')[0]).toEqual(true);

    expect(parse([When.NON_WIPS_ALWAYS], '(#12], #133) My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], '(#12],#122) My commit message')[0]).toEqual(true);

    expect(parse([When.NON_WIPS_ALWAYS], '(#14], #123) chore: My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS], '(#14],#123) chore: My commit message')[0]).toEqual(true);
  });

  it('should return an error response when passed a non-WIP commit without a matching separator and not verifying wips, but verifying "always" for non-wips', () => {
    expect(parse([When.NON_WIPS_ALWAYS], '(#1)My commit message')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS], '(#1) chore:My commit message')[0]).toEqual(false);

    expect(parse([When.NON_WIPS_ALWAYS], '(#12], #133)My commit message')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS], '(#12],#122)My commit message')[0]).toEqual(false);

    expect(parse([When.NON_WIPS_ALWAYS], '(#14], #123) chore:My commit message')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS], '(#14],#123) chore:My commit message')[0]).toEqual(false);
  });

  it('should return a success response when passed a non-WIP commit without a matching separator and not verifying wips, but verifying "never" for non-wips', () => {
    expect(parse([When.NON_WIPS_NEVER], '(#1)My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], '(#1) chore:My commit message')[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER], '(#12], #133)My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], '(#12],#122)My commit message')[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER], '(#14], #123) chore:My commit message')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER], '(#14],#123) chore:My commit message')[0]).toEqual(true);
  });

  it('should return an error response when passed a non-WIP commit with a matching separator and not verifying wips, but verifying "never" for non-wips', () => {
    expect(parse([When.NON_WIPS_NEVER], '(#1) My commit message')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER], '(#1) chore: My commit message')[0]).toEqual(false);

    expect(parse([When.NON_WIPS_NEVER], '(#12], #133) My commit message')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER], '(#12],#122) My commit message')[0]).toEqual(false);

    expect(parse([When.NON_WIPS_NEVER], '(#14], #123) chore: My commit message')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER], '(#14],#123) chore: My commit message')[0]).toEqual(false);
  });
});
