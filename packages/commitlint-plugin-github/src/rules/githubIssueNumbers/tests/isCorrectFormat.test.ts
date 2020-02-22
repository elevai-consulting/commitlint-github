import { When } from '@elevai/commitlint-github-utils/@types';

import { RuleResolverResult } from '../../../../@types';
import githubIssueNumberFormatRuleResolver from '../isCorrectFormat';
import runRule from '../../utils/tests/utils';

const parse = (when: When, rawCommitMessage: string): RuleResolverResult =>
  runRule(githubIssueNumberFormatRuleResolver, [when], rawCommitMessage);

describe('githubIssueNumberFormatRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse(When.ALWAYS, '')[0]).toEqual(false);
    expect(parse(When.NEVER, '')[0]).toEqual(false);
  });

  it('should return a success response if one issue number is specified', () => {
    expect(parse(When.ALWAYS, '(#1) my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1) chore: my commit message')[0]).toEqual(true);
  });

  it('should return a success response if multiple issue numbers are specified', () => {
    expect(parse(When.ALWAYS, '(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse(When.ALWAYS, '(#1, #2) chore: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1,#2) chore: my commit message')[0]).toEqual(true);
  });

  it('should return a success response if no issue numbers are specified (as nothing to validate)', () => {
    expect(parse(When.ALWAYS, 'my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'chore: my commit message')[0]).toEqual(true);
  });

  it('should return an error response if not in correct format', () => {
    expect(parse(When.ALWAYS, '(1) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(1) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(bob) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(bob) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#bob) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#bob) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#1, #2bob) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1, #2bob) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#1,#2bob) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1,#2bob) chore: my commit message')[0]).toEqual(false);

    expect(parse(When.ALWAYS, '(#1, #2 bob) my commit message')[0]).toEqual(false);
    expect(parse(When.ALWAYS, '(#1, #2 bob) chore: my commit message')[0]).toEqual(false);
  });

  it('should always return a success response for any WIP commit as rules are disabled for WIPs', () => {
    expect(parse(When.ALWAYS, '(#1) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1, #2) WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, '(#1,#2) WIP: my commit message')[0]).toEqual(true);

    expect(parse(When.ALWAYS, 'WIP')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP2')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP: my commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP2: My commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP 2: My commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP2 - My commit message')[0]).toEqual(true);
    expect(parse(When.ALWAYS, 'WIP 2 - My commit message')[0]).toEqual(true);
  });
});
