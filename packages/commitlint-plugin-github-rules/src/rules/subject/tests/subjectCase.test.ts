// import { TargetCaseType } from '@commitlint/types'; // When it is published
import { When, TargetCaseType } from 'commitlint-github-utils/@types';
import { WhenAndRequiredValue, RuleResolverResult } from '../../../../@types';
import { subjectCaseRuleResolver } from '..';
import runRule from '../../utils/tests/utils';

const parse = (
  whenAndValue: WhenAndRequiredValue<TargetCaseType | TargetCaseType[]>,
  rawCommitMessage: string,
): RuleResolverResult => runRule(subjectCaseRuleResolver, whenAndValue, rawCommitMessage);

describe('subjectCaseRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse([When.ALWAYS, 'sentence-case'], '')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], '')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, 'sentence-case'], '')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER, 'sentence-case'], '')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP and non-WIP commits with a sentence-cased subject and matching requirement', () => {
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1) My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1) chore: My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'sentence-case'], '(#1, #2) My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1,#2) My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'sentence-case'], '(#123, #23) chore: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#123,#23) chore: My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'sentence-case'], '(#1) WIP: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1, #2, #3, #4) WIP: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1,#2,#3,#4) WIP: My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'sentence-case'], 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], 'WIP 2 - My commit message')[0]).toEqual(true);
  });

  it('should return a success response when passed WIP and non-WIP commits with a lowercased subject and matching requirement', () => {
    expect(parse([When.ALWAYS, 'lower-case'], '(#1) my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1) chore: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#123, #23) chore: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#123,#23) chore: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#1) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], 'WIP2: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP 2: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP2 - my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP 2 - my commit message')[0]).toEqual(true);
  });

  it('should return an error response when passed WIP and non-WIP commits with a sentence-cased subject and never requiring it', () => {
    expect(parse([When.NEVER, 'sentence-case'], '(#1) My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], '(#1) chore: My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'sentence-case'], '(#1, #2) My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], '(#1,#2) My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'sentence-case'], '(#123, #23) chore: My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], '(#123,#23) chore: My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'sentence-case'], '(#1) WIP: My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], '(#1, #2, #3, #4) WIP: My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], '(#1,#2,#3,#4) WIP: My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'sentence-case'], 'WIP2: My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], 'WIP 2: My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], 'WIP2 - My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], 'WIP 2 - My commit message')[0]).toEqual(false);
  });

  it('should return an error response when passed WIP and non-WIP commits with a lowercased subject and never requiring it', () => {
    expect(parse([When.NEVER, 'lower-case'], '(#1) my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#1) chore: my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'lower-case'], '(#1, #2) my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#1,#2) my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'lower-case'], '(#123, #23) chore: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#123,#23) chore: my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'lower-case'], '(#1) WIP: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'lower-case'], 'WIP2: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], 'WIP 2: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], 'WIP2 - my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], 'WIP 2 - my commit message')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP commits with no subject as nothing to verify', () => {
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP2')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP 2')[0]).toEqual(true);

    expect(parse([When.NEVER, 'lower-case'], 'WIP2')[0]).toEqual(true);
    expect(parse([When.NEVER, 'lower-case'], 'WIP 2')[0]).toEqual(true);
  });

  it('should return a success response when passed a WIP commit with a non-lowercase subject and not verifying wips', () => {
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], 'WIP')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], 'WIP  ')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], 'WIP2: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], 'WIP 2: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], 'WIP2 - Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], 'WIP 2 - Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], 'WIP: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#1) WIP: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#1, #2, #3, #4) WIP:Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#12], #123) WIP: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#1,#2,#3,#4) WIP: Non-lowercase subject')[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], 'WIP')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], 'WIP  ')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], 'WIP2: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], 'WIP 2: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], 'WIP2 - Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], 'WIP 2 - Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], 'WIP: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], 'WIP: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#1) WIP: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#1, #2, #3, #4) WIP:Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#12], #123) WIP: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#1,#2,#3,#4) WIP: Non-lowercase subject')[0]).toEqual(true);
  });

  it('should return a success response when passed a non-WIP commit with a non-lowercase subject and not verifying wips, but verifying "never" for non-wips', () => {
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#1)Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#1) Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#1) chore: Non-lowercase subject')[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#12], #133)Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#12], #133) Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#12],#122) Non-lowercase subject')[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#14], #123) chore:Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#14], #123) chore: Non-lowercase subject')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, 'lower-case'], '(#14],#123) chore: Non-lowercase subject')[0]).toEqual(true);
  });

  it('should return an error response when passed a non-WIP commit with a non-lowercase subject and not verifying wips, but verifying "always" for non-wips', () => {
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#1)Non-lowercase subject')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#1) Non-lowercase subject')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#1) chore: Non-lowercase subject')[0]).toEqual(false);

    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#12], #133)Non-lowercase subject')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#12], #133) Non-lowercase subject')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#12],#122) Non-lowercase subject')[0]).toEqual(false);

    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#14], #123) chore:Non-lowercase subject')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#14], #123) chore: Non-lowercase subject')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, 'lower-case'], '(#14],#123) chore: Non-lowercase subject')[0]).toEqual(false);
  });
});
