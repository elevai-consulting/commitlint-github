import { When } from 'commitlint-github-utils/@types';
import { WhenAndValue, RuleResolverResult } from '../../../../@types';
import { subjectFullStopRuleResolver } from '..';
import runRule from '../../utils/tests/utils';

const parse = (whenAndValue: WhenAndValue<string>, rawCommitMessage: string): RuleResolverResult =>
  runRule(subjectFullStopRuleResolver, whenAndValue, rawCommitMessage);

describe('subjectCaseRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse([When.ALWAYS], '')[0]).toEqual(false);
    expect(parse([When.NEVER], '')[0]).toEqual(false);
  });

  it('should return a success response when passed commits with a full stop at the end of the subject and always requiring it', () => {
    expect(parse([When.ALWAYS], '(#1) My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#1) chore: My commit message.')[0]).toEqual(true);

    expect(parse([When.ALWAYS], '(#1, #2) My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#1,#2) My commit message.')[0]).toEqual(true);

    expect(parse([When.ALWAYS], '(#123, #23) chore: My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#123,#23) chore: My commit message.')[0]).toEqual(true);
  });

  it('should return a success response when passed commits without a full stop at the end of the subject and never requiring it', () => {
    expect(parse([When.NEVER], '(#1) My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#1) chore: My commit message')[0]).toEqual(true);

    expect(parse([When.NEVER], '(#1, #2) My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#1,#2) My commit message')[0]).toEqual(true);

    expect(parse([When.NEVER], '(#123, #23) chore: My commit message')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#123,#23) chore: My commit message')[0]).toEqual(true);
  });

  it('should return an error response when passed commits without a full stop at the end of the subject and always requiring it', () => {
    expect(parse([When.ALWAYS], '(#1) My commit message')[0]).toEqual(false);
    expect(parse([When.ALWAYS], '(#1) chore: My commit message')[0]).toEqual(false);

    expect(parse([When.ALWAYS], '(#1, #2) My commit message')[0]).toEqual(false);
    expect(parse([When.ALWAYS], '(#1,#2) My commit message')[0]).toEqual(false);

    expect(parse([When.ALWAYS], '(#123, #23) chore: My commit message')[0]).toEqual(false);
    expect(parse([When.ALWAYS], '(#123,#23) chore: My commit message')[0]).toEqual(false);
  });

  it('should return an error response when passed commits with a full stop at the end of the subject and never requiring it', () => {
    expect(parse([When.NEVER], '(#1) My commit message.')[0]).toEqual(false);
    expect(parse([When.NEVER], '(#1) chore: My commit message.')[0]).toEqual(false);

    expect(parse([When.NEVER], '(#1, #2) My commit message.')[0]).toEqual(false);
    expect(parse([When.NEVER], '(#1,#2) My commit message.')[0]).toEqual(false);

    expect(parse([When.NEVER], '(#123, #23) chore: My commit message.')[0]).toEqual(false);
    expect(parse([When.NEVER], '(#123,#23) chore: My commit message.')[0]).toEqual(false);
  });

  it('should return a success response when passed WIP commits with no subject as nothing to verify', () => {
    expect(parse([When.ALWAYS], 'WIP2')[0]).toEqual(true);
    expect(parse([When.ALWAYS], 'WIP 2')[0]).toEqual(true);

    expect(parse([When.NEVER], 'WIP2')[0]).toEqual(true);
    expect(parse([When.NEVER], 'WIP 2')[0]).toEqual(true);
  });

  it('should always return a success response for any WIP commit as rules are disabled for WIPs', () => {
    expect(parse([When.ALWAYS], '(#1) WIP: My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#1, #2, #3, #4) WIP: My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], '(#1,#2,#3,#4) WIP: My commit message.')[0]).toEqual(true);

    expect(parse([When.ALWAYS], 'WIP2: My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], 'WIP 2: My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], 'WIP2 - My commit message.')[0]).toEqual(true);
    expect(parse([When.ALWAYS], 'WIP 2 - My commit message.')[0]).toEqual(true);

    expect(parse([When.NEVER], '(#1) WIP: My commit message.')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#1, #2, #3, #4) WIP: My commit message.')[0]).toEqual(true);
    expect(parse([When.NEVER], '(#1,#2,#3,#4) WIP: My commit message.')[0]).toEqual(true);

    expect(parse([When.NEVER], 'WIP2: My commit message.')[0]).toEqual(true);
    expect(parse([When.NEVER], 'WIP 2: My commit message.')[0]).toEqual(true);
    expect(parse([When.NEVER], 'WIP2 - My commit message.')[0]).toEqual(true);
    expect(parse([When.NEVER], 'WIP 2 - My commit message.')[0]).toEqual(true);
  });
});
