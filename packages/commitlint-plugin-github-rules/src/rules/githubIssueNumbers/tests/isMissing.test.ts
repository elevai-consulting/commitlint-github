import { When } from 'commitlint-github-utils/@types';

import { RuleResolverResult } from '../../../../@types';
import githubIssueNumberMissingRuleResolver from '../isMissing';
import runRule from '../../utils/tests/utils';

const parse = (when: When, rawCommitMessage: string): RuleResolverResult =>
  runRule(githubIssueNumberMissingRuleResolver, [when], rawCommitMessage);

describe('githubIssueNumberMissingRuleResolver', () => {
  it('should always return an error response if an empty commit message is provided', () => {
    expect(parse(When.ALWAYS, '')[0]).toEqual(false);
    expect(parse(When.NEVER, '')[0]).toEqual(false);
  });

  it('should return a success response if one issue number is specified', () => {
    expect(parse(When.NEVER, '(#1) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1) chore: my commit message')[0]).toEqual(true);
  });

  it('should return a success response if multiple issue numbers are specified', () => {
    expect(parse(When.NEVER, '(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse(When.NEVER, '(#1, #2) chore: my commit message')[0]).toEqual(true);
    expect(parse(When.NEVER, '(#1,#2) chore: my commit message')[0]).toEqual(true);
  });

  it('should return a success response even if no separator before commit message', () => {
    expect(parse(When.NEVER, '(#1)my commit message')[0]).toEqual(true);
  });

  it('should return an error response for a non-WIP commit if no issue numbers are specified', () => {
    expect(parse(When.NEVER, 'my commit message')[0]).toEqual(false);
  });

  // Tests for the odd case of specifying ALWAYS to require issue numbers to be missing
  // Note the parser doesn't support this flow since it's not an initial requirement, but the rule resolver under test does

  it('should return a success response for non-WIP commit if no issue numbers are specified and always required to be missing', () => {
    expect(parse(When.ALWAYS, 'my commit message')[0]).toEqual(true);
  });

  it('should return an error response for non-WIP commit if issue numbers are specified and always required to be missing', () => {
    expect(parse(When.ALWAYS, '(#1) my commit message')[0]).toEqual(false);
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
