import { When } from 'commitlint-github-utils/@types';
import { WhenAndRequiredValue, RuleResolverResult } from '../../../../@types';
import { typeMinLengthRuleResolver } from '../index';
import runRule from '../../utils/tests/utils';

const MIN_LENGTH = 10;
const TYPE_1_CHAR_SHORTER = 'a'.repeat(MIN_LENGTH - 1);
const TYPE_AT_MIN_LENGTH = 'a'.repeat(MIN_LENGTH);

const parse = (whenAndValue: WhenAndRequiredValue<number>, rawCommitMessage: string): RuleResolverResult =>
  runRule(typeMinLengthRuleResolver, whenAndValue, rawCommitMessage);

describe('typeMinLengthRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse([When.IGNORED, MIN_LENGTH], '')[0]).toEqual(false);
  });

  it('should return a success response when passed non-WIP commits with a type length exactly matching the requirement', () => {
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) ${TYPE_AT_MIN_LENGTH}: my commit message`)[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#1, #2) ${TYPE_AT_MIN_LENGTH}: my commit message`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1,#2) ${TYPE_AT_MIN_LENGTH}: my commit message`)[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#123, #23) ${TYPE_AT_MIN_LENGTH}: my commit message`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#123,#23) ${TYPE_AT_MIN_LENGTH}: my commit message`)[0]).toEqual(true);
  });

  it('should return an error response when passed non-WIP commits with a type length 1 less character than the requirement', () => {
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1) ${TYPE_1_CHAR_SHORTER}: my commit message`)[0]).toEqual(false);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#1, #2) ${TYPE_1_CHAR_SHORTER}: my commit message`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#1,#2) ${TYPE_1_CHAR_SHORTER}: my commit message`)[0]).toEqual(false);

    expect(parse([When.IGNORED, MIN_LENGTH], `(#12, #23) ${TYPE_1_CHAR_SHORTER}: my commit message`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MIN_LENGTH], `(#123,#23) ${TYPE_1_CHAR_SHORTER}: my commit message`)[0]).toEqual(false);
  });

  it('should return a success response when passed WIP commits as that is not treated as a regular type and so is not validated by this rule', () => {
    expect(parse([When.IGNORED, MIN_LENGTH], '(#1) WIP')[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], '(#1) WIP:my commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], '(#1) WIP: my commit message')[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], '(#1, #2, #3, #4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], '(#1,#2,#3,#4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.IGNORED, MIN_LENGTH], 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MIN_LENGTH], 'WIP 2 - My commit message')[0]).toEqual(true);
  });
});
