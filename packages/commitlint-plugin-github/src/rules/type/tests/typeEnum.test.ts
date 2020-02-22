// import { TargetEnumType } from '@commitlint/types'; // When it is published
import { When } from '@elevai/commitlint-github-utils/@types';
import { WhenAndRequiredValue, RuleResolverResult } from '../../../../@types';
import { typeEnumRuleResolver } from '../index';
import runRule from '../../utils/tests/utils';

const parse = (whenAndValue: WhenAndRequiredValue<string[]>, rawCommitMessage: string): RuleResolverResult =>
  runRule(typeEnumRuleResolver, whenAndValue, rawCommitMessage);

const MATCHING_TYPE = 'match';
const NON_MATCHING_TYPE = 'nonmatch';
const MY_TYPES = ['dummy', MATCHING_TYPE, 'another'];

describe('typeEnumRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse([When.ALWAYS, MY_TYPES], '')[0]).toEqual(false);
    expect(parse([When.NEVER, MY_TYPES], '')[0]).toEqual(false);
  });

  it('should return a success response when passed non-WIP commits with no type at all, as nothing to validate', () => {
    expect(parse([When.ALWAYS, MY_TYPES], 'my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, MY_TYPES], '(#1) my commit message')[0]).toEqual(true);
  });

  it('should return a success response when passed non-WIP commits with a type matching the enum and required to match', () => {
    expect(parse([When.ALWAYS, MY_TYPES], `(#1) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(true);

    expect(parse([When.ALWAYS, MY_TYPES], `(#1, #2) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(true);
    expect(parse([When.ALWAYS, MY_TYPES], `(#1,#2) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(true);

    expect(parse([When.ALWAYS, MY_TYPES], `(#123, #23) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(true);
    expect(parse([When.ALWAYS, MY_TYPES], `(#123,#23) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(true);
  });

  it('should return a success response when passed non-WIP commits with a type not matching the enum and required to not match', () => {
    expect(parse([When.NEVER, MY_TYPES], `(#1) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(true);

    expect(parse([When.NEVER, MY_TYPES], `(#1, #2) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(true);
    expect(parse([When.NEVER, MY_TYPES], `(#1,#2) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(true);

    expect(parse([When.NEVER, MY_TYPES], `(#123, #23) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(true);
    expect(parse([When.NEVER, MY_TYPES], `(#123,#23) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(true);
  });

  it('should return an error response when passed non-WIP commits with a non-matching type and requiring it to match', () => {
    expect(parse([When.ALWAYS, MY_TYPES], `(#1) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(false);

    expect(parse([When.ALWAYS, MY_TYPES], `(#1, #2) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(false);
    expect(parse([When.ALWAYS, MY_TYPES], `(#1,#2) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(false);

    expect(parse([When.ALWAYS, MY_TYPES], `(#123, #23) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(false);
    expect(parse([When.ALWAYS, MY_TYPES], `(#123,#23) ${NON_MATCHING_TYPE}: my commit message`)[0]).toEqual(false);
  });

  it('should return an error response when passed non-WIP commits with a type matching the enum and required to not match', () => {
    expect(parse([When.NEVER, MY_TYPES], `(#1) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(false);

    expect(parse([When.NEVER, MY_TYPES], `(#1, #2) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(false);
    expect(parse([When.NEVER, MY_TYPES], `(#1,#2) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(false);

    expect(parse([When.NEVER, MY_TYPES], `(#123, #23) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(false);
    expect(parse([When.NEVER, MY_TYPES], `(#123,#23) ${MATCHING_TYPE}: my commit message`)[0]).toEqual(false);
  });

  it('should return a success response when passed WIP commits as that is not treated as a regular type and so is not validated by this rule', () => {
    // ALWAYS
    expect(parse([When.ALWAYS, MY_TYPES], '(#1) WIP')[0]).toEqual(true);

    expect(parse([When.ALWAYS, MY_TYPES], '(#1) WIP:my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, MY_TYPES], '(#1) WIP: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, MY_TYPES], '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, MY_TYPES], '(#1, #2, #3, #4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, MY_TYPES], '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, MY_TYPES], '(#1,#2,#3,#4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, MY_TYPES], 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, MY_TYPES], 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, MY_TYPES], 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, MY_TYPES], 'WIP 2 - My commit message')[0]).toEqual(true);

    // NEVER
    expect(parse([When.NEVER, MY_TYPES], '(#1) WIP')[0]).toEqual(true);

    expect(parse([When.NEVER, MY_TYPES], '(#1) WIP:my commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, MY_TYPES], '(#1) WIP: my commit message')[0]).toEqual(true);

    expect(parse([When.NEVER, MY_TYPES], '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, MY_TYPES], '(#1, #2, #3, #4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.NEVER, MY_TYPES], '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, MY_TYPES], '(#1,#2,#3,#4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.NEVER, MY_TYPES], 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, MY_TYPES], 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, MY_TYPES], 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, MY_TYPES], 'WIP 2 - My commit message')[0]).toEqual(true);
  });
});
