// import { TargetCaseType } from '@commitlint/types'; // When it is published
import { When, TargetCaseType } from '@elevai/commitlint-github-utils/@types';
import { WhenAndRequiredValue, RuleResolverResult } from '../../../../@types';
import { typeCaseRuleResolver } from '../index';
import runRule from '../../utils/tests/utils';

const parse = (
  whenAndValue: WhenAndRequiredValue<TargetCaseType | TargetCaseType[]>,
  rawCommitMessage: string,
): RuleResolverResult => runRule(typeCaseRuleResolver, whenAndValue, rawCommitMessage);

describe('typeCaseRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse([When.ALWAYS, 'lower-case'], '')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '')[0]).toEqual(false);
  });

  it('should return a success response when passed non-WIP commits with no type at all, as nothing to validate', () => {
    expect(parse([When.ALWAYS, 'lower-case'], 'my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1) my commit message')[0]).toEqual(true);
  });

  it('should return a success response when passed non-WIP commits with a lowercased type matching the requirement', () => {
    expect(parse([When.ALWAYS, 'lower-case'], '(#1) chore: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#1, #2) fix: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1,#2) arbitrary: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#123, #23) dummy: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#123,#23) chore: my commit message')[0]).toEqual(true);
  });

  it('should return a success response when passed non-WIP commits with a uppercased type matching the requirement', () => {
    expect(parse([When.ALWAYS, 'upper-case'], '(#1) CHORE: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'upper-case'], '(#1, #2) FIX: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'upper-case'], '(#1,#2) ARBITRARY: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'upper-case'], '(#123, #23) DUMMY: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'upper-case'], '(#123,#23) CHORE: my commit message')[0]).toEqual(true);
  });

  it('should return an error response when passed non-WIP commits with a lowercased type and never requiring it', () => {
    expect(parse([When.NEVER, 'lower-case'], '(#1) chore: my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'lower-case'], '(#1, #2) fix: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#1,#2) arbitrary: my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'lower-case'], '(#123, #23) dummy: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#123,#23) chore: my commit message')[0]).toEqual(false);
  });

  it('should return an error response when passed non-WIP commits with a uppercased type and never requiring it', () => {
    expect(parse([When.NEVER, 'upper-case'], '(#1) CHORE: my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'upper-case'], '(#1, #2) FIX: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'upper-case'], '(#1,#2) ARBITRARY: my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'upper-case'], '(#123, #23) DUMMY: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'upper-case'], '(#123,#23) CHORE: my commit message')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP commits as that is not treated as a regular type and so is not validated by this rule', () => {
    // ALWAYS
    expect(parse([When.ALWAYS, 'lower-case'], '(#1) WIP')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#1) WIP:my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1) WIP: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1, #2, #3, #4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1,#2,#3,#4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP 2 - My commit message')[0]).toEqual(true);

    // NEVER
    expect(parse([When.NEVER, 'lower-case'], '(#1) WIP')[0]).toEqual(true);

    expect(parse([When.NEVER, 'lower-case'], '(#1) WIP:my commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'lower-case'], '(#1) WIP: my commit message')[0]).toEqual(true);

    expect(parse([When.NEVER, 'lower-case'], '(#1, #2, #3, #4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'lower-case'], '(#1, #2, #3, #4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.NEVER, 'lower-case'], '(#1,#2,#3,#4) WIP: my commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'lower-case'], '(#1,#2,#3,#4) WIP:my commit message')[0]).toEqual(true);

    expect(parse([When.NEVER, 'lower-case'], 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'lower-case'], 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'lower-case'], 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'lower-case'], 'WIP 2 - My commit message')[0]).toEqual(true);
  });
});
