// import { TargetCaseType } from '@commitlint/types'; // When it is published
import { When, TargetCaseType } from '@elevai/commitlint-github-utils/@types';
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
  });

  it('should return a success response when passed commits with a sentence-cased subject and matching requirement', () => {
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1) My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1) chore: My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'sentence-case'], '(#1, #2) My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1,#2) My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'sentence-case'], '(#123, #23) chore: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#123,#23) chore: My commit message')[0]).toEqual(true);
  });

  it('should return a success response when passed commits with a lowercased subject and matching requirement', () => {
    expect(parse([When.ALWAYS, 'lower-case'], '(#1) my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1) chore: my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'lower-case'], '(#123, #23) chore: my commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], '(#123,#23) chore: my commit message')[0]).toEqual(true);
  });

  it('should return an error response when passed commits with a sentence-cased subject and never requiring it', () => {
    expect(parse([When.NEVER, 'sentence-case'], '(#1) My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], '(#1) chore: My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'sentence-case'], '(#1, #2) My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], '(#1,#2) My commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'sentence-case'], '(#123, #23) chore: My commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'sentence-case'], '(#123,#23) chore: My commit message')[0]).toEqual(false);
  });

  it('should return an error response when passed commits with a lowercased subject and never requiring it', () => {
    expect(parse([When.NEVER, 'lower-case'], '(#1) my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#1) chore: my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'lower-case'], '(#1, #2) my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#1,#2) my commit message')[0]).toEqual(false);

    expect(parse([When.NEVER, 'lower-case'], '(#123, #23) chore: my commit message')[0]).toEqual(false);
    expect(parse([When.NEVER, 'lower-case'], '(#123,#23) chore: my commit message')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP commits with no subject as nothing to verify', () => {
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP2')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'lower-case'], 'WIP 2')[0]).toEqual(true);

    expect(parse([When.NEVER, 'lower-case'], 'WIP2')[0]).toEqual(true);
    expect(parse([When.NEVER, 'lower-case'], 'WIP 2')[0]).toEqual(true);
  });

  it('should always return a success response for any WIP commit as rules are disabled for WIPs', () => {
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1) WIP: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1, #2, #3, #4) WIP: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], '(#1,#2,#3,#4) WIP: My commit message')[0]).toEqual(true);

    expect(parse([When.ALWAYS, 'sentence-case'], 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse([When.ALWAYS, 'sentence-case'], 'WIP 2 - My commit message')[0]).toEqual(true);

    expect(parse([When.NEVER, 'sentence-case'], '(#1) WIP: My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'sentence-case'], '(#1, #2, #3, #4) WIP: My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'sentence-case'], '(#1,#2,#3,#4) WIP: My commit message')[0]).toEqual(true);

    expect(parse([When.NEVER, 'sentence-case'], 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'sentence-case'], 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'sentence-case'], 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER, 'sentence-case'], 'WIP 2 - My commit message')[0]).toEqual(true);
  });
});
