import { When } from '@elevai/commitlint-github-utils/@types';
import { WhenAndRequiredValue, RuleResolverResult } from '../../../../@types';
import { typeMaxLengthRuleResolver } from '../index';
import runRule from '../../utils/tests/utils';

const MAX_LENGTH = 10;
const TYPE_1_CHAR_LONGER = 'a'.repeat(MAX_LENGTH + 1);
const TYPE_AT_MAX_LENGTH = 'a'.repeat(MAX_LENGTH);

const parse = (whenAndValue: WhenAndRequiredValue<number>, rawCommitMessage: string): RuleResolverResult =>
  runRule(typeMaxLengthRuleResolver, whenAndValue, rawCommitMessage);

describe('typeMaxLengthRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse([When.IGNORED, MAX_LENGTH], '')[0]).toEqual(false);
  });

  it('should return a success response when passed non-WIP commits with a type length exactly matching the requirement', () => {
    expect(parse([When.IGNORED, MAX_LENGTH], `(#1) ${TYPE_AT_MAX_LENGTH}: my commit message`)[0]).toEqual(true);

    expect(parse([When.IGNORED, MAX_LENGTH], `(#1, #2) ${TYPE_AT_MAX_LENGTH}: my commit message`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MAX_LENGTH], `(#1,#2) ${TYPE_AT_MAX_LENGTH}: my commit message`)[0]).toEqual(true);

    expect(parse([When.IGNORED, MAX_LENGTH], `(#123, #23) ${TYPE_AT_MAX_LENGTH}: my commit message`)[0]).toEqual(true);
    expect(parse([When.IGNORED, MAX_LENGTH], `(#123,#23) ${TYPE_AT_MAX_LENGTH}: my commit message`)[0]).toEqual(true);
  });

  it('should return an error response when passed non-WIP commits with a type length 1 more character than the requirement', () => {
    expect(parse([When.IGNORED, MAX_LENGTH], `(#1) ${TYPE_1_CHAR_LONGER}: my commit message`)[0]).toEqual(false);

    expect(parse([When.IGNORED, MAX_LENGTH], `(#1, #2) ${TYPE_1_CHAR_LONGER}: my commit message`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MAX_LENGTH], `(#1,#2) ${TYPE_1_CHAR_LONGER}: my commit message`)[0]).toEqual(false);

    expect(parse([When.IGNORED, MAX_LENGTH], `(#12, #23) ${TYPE_1_CHAR_LONGER}: my commit message`)[0]).toEqual(false);
    expect(parse([When.IGNORED, MAX_LENGTH], `(#123,#23) ${TYPE_1_CHAR_LONGER}: my commit message`)[0]).toEqual(false);
  });

  it('should return a success response when passed WIP commits as that is not treated as a regular type and so is not validated by this rule', () => {
    expect(parse([When.IGNORED, MAX_LENGTH], '(#1) WIP')[0]).toEqual(true);

    expect(parse([When.IGNORED, MAX_LENGTH], '(#1) WIP:my commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MAX_LENGTH], '(#1) WIP: my commit message')[0]).toEqual(true);

    expect(parse([When.IGNORED, MAX_LENGTH], '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MAX_LENGTH], '(#1, #2, #3, #4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.IGNORED, MAX_LENGTH], '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MAX_LENGTH], '(#1,#2,#3,#4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.IGNORED, MAX_LENGTH], 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MAX_LENGTH], 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MAX_LENGTH], 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse([When.IGNORED, MAX_LENGTH], 'WIP 2 - My commit message')[0]).toEqual(true);
  });
});
