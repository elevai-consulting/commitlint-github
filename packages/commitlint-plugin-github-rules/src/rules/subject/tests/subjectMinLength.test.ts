import { When } from 'commitlint-github-utils/@types';
import { WhenAndRequiredValue, RuleResolverResult } from '../../../../@types';
import { subjectMinLengthRuleResolver } from '..';
import runRule from '../../utils/tests/utils';

const MIN_LENGTH = 10;
const SUBJECT_1_CHAR_SHORTER = '-'.repeat(MIN_LENGTH - 1);
const SUBJECT_AT_MIN_LENGTH = '-'.repeat(MIN_LENGTH);

const parse = (whenAndValue: WhenAndRequiredValue<number>, rawCommitMessage: string): RuleResolverResult =>
  runRule(subjectMinLengthRuleResolver, whenAndValue, rawCommitMessage);

describe('subjectMinLengthRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse([When.IGNORED, MIN_LENGTH], '')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], '')[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], '')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP and non-WIP commits with a trimmed subject length exactly matching the requirement', () => {
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) ${SUBJECT_AT_MIN_LENGTH}   `)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) chore: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#1, #2) ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1,#2) ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#123, #23) chore: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#123,#23) chore: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) WIP: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1, #2, #3, #4) WIP: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1,#2,#3,#4) WIP: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], `WIP2: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `WIP 2: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `WIP2 - ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `WIP 2 - ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
  });

  it('should return an error response when passed WIP and non-WIP commits with a trimmed subject length 1 less character than the requirement', () => {
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) ${SUBJECT_1_CHAR_SHORTER}   `)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) chore: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#1, #2) ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1,#2) ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#123, #23) chore: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#123,#23) chore: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1, #2, #3, #4) WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1,#2,#3,#4) WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);

    expect(parse([When.IGNORED, MIN_LENGTH], `WIP2: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `WIP 2: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `WIP2 - ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `WIP 2 - ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
  });

  it('should return a success response when passed a WIP commit with a trimmed subject length 1 less character than the requirement and not verifying wips', () => {
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], 'WIP')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], 'WIP  ')[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `WIP: ${SUBJECT_1_CHAR_SHORTER}   `)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1) WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1, #2, #3) WIP:${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#12], #123) WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1,#2,#3,#4) WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `WIP2: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `WIP 2: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `WIP2 - ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `WIP 2 - ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `WIP`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `WIP  `)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `WIP: ${SUBJECT_1_CHAR_SHORTER}   `)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#1) WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#1, #2, #3, #4) WIP:${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#12], #123) WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#1,#2,#3,#4) WIP: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `WIP2: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `WIP 2: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `WIP2 - ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `WIP 2 - ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(true);
  });

  it('should return a success response when passed a non-WIP commit with a trimmed subject length exactly matching and not verifying wips', () => {
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1)${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1)${SUBJECT_AT_MIN_LENGTH}   `)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1) ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1) chore: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);

    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#12], #133)${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#12], #133) ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#12],#122) ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);

    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#14], #123) chore:${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#14], #123) chore: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#14],#123) chore: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#1)${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#1) ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#1) chore: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#12], #133)${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#12], #133) ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#12],#122) ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);

    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#14], #123) chore:${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#14], #123) chore: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#14],#123) chore: ${SUBJECT_AT_MIN_LENGTH}`)[0]).toEqual(true);
  });

  it(`should return an error response when passed a non-WIP commit with a trimmed subject length 1 less character than the requirement and not verifying wips`, () => {
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1)${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1)${SUBJECT_1_CHAR_SHORTER}   `)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1) ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#1) chore: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);

    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#12], #133)${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#12], #133) ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#12],#122) ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);

    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#14], #123) chore:${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#14], #12) chore: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_ALWAYS, MIN_LENGTH], `(#14],#123) chore: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);

    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#1)${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#1) ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#1) chore: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);

    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#12], #133)${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#12], #133) ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#12],#122) ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);

    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#14], #123) chore:${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#14], #123) chore: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
    expect(parse([When.NON_WIPS_NEVER, MIN_LENGTH], `(#14],#123) chore: ${SUBJECT_1_CHAR_SHORTER}`)[0]).toEqual(false);
  });
});
