import { When } from '@elevai/commitlint-github-utils/@types';

import { RuleResolverResult } from '../../../../@types';
import githubIssueNumberDuplicateRuleResolver from '../isDuplicate';
import runRule from '../../utils/tests/utils';

const parse = (when: When, rawCommitMessage: string): RuleResolverResult =>
  runRule(githubIssueNumberDuplicateRuleResolver, [when], rawCommitMessage);

describe('githubIssueNumberDuplicateRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse(When.ALWAYS, '')[0]).toEqual(false);
    expect(parse(When.NEVER, '')[0]).toEqual(false);
  });

  it('should return a success response if there are no duplicates', () => {
    expect(parse(When.NEVER, '(#1) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1) chore: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#123, #23) chore: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#123,#23) chore: my commit message')[0]).toEqual(true);
  });

  it('should return a success response if there are no issue numbers', () => {
    expect(parse(When.NEVER, 'my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '() chore: my commit message')[0]).toEqual(true);
  });

  it('should return an error response if there is at least one duplicate', () => {
    expect(parse(When.NEVER, '(#123, #2, #123) my commit message')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#1, #1) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.NEVER, '(#133, #133) my commit message')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#122,#122) my commit message')[0]).toEqual(false);

    expect(parse(When.NEVER, '(#123, #123) chore: my commit message')[0]).toEqual(false);
    expect(parse(When.NEVER, '(#123,#123) chore: my commit message')[0]).toEqual(false);
  });

  it('should always return a success response for any WIP commit as rules are disabled for WIPs', () => {
    expect(parse(When.NEVER, '(#1) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1, #2) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2) WIP: my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, 'WIP')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP2')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, 'WIP 2 - My commit message')[0]).toEqual(true);
  });
});
