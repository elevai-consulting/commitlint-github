import { RuleResolverResult } from '../../../@types';
import githubIssueNumberFormatRuleResolver from '../githubIssueNumberFormatRuleResolver';
import runRule from './utils';

const parse = (rawCommitMessage: string, when?: string): RuleResolverResult =>
  runRule(githubIssueNumberFormatRuleResolver, rawCommitMessage, when);

describe('githubIssueNumberFormatRuleResolver.', () => {
  it('should return a success response if one issue number is specified', () => {
    expect(parse('(#1) my commit message')[0]).toEqual(true);
    expect(parse('(#1) chore: my commit message')[0]).toEqual(true);
    expect(parse('(#1) WIP: my commit message')[0]).toEqual(true);
  });

  it('should return a success response if multiple issue numbers are specified', () => {
    expect(parse('(#1, #2) my commit message')[0]).toEqual(true);
    expect(parse('(#1,#2) my commit message')[0]).toEqual(true);

    expect(parse('(#1, #2) chore: my commit message')[0]).toEqual(true);
    expect(parse('(#1,#2) chore: my commit message')[0]).toEqual(true);

    expect(parse('(#1, #2) WIP: my commit message')[0]).toEqual(true);
    expect(parse('(#1,#2) WIP: my commit message')[0]).toEqual(true);
  });

  it('should return a success response if no issue numbers are specified (as nothing to validate)', () => {
    expect(parse('my commit message')[0]).toEqual(true);
    expect(parse('chore: my commit message')[0]).toEqual(true);
    expect(parse('WIP: my commit message')[0]).toEqual(true);
  });

  it('should return an error response if not in correct format', () => {
    expect(parse('(1) my commit message')[0]).toEqual(false);
    expect(parse('(1) chore: my commit message')[0]).toEqual(false);
    expect(parse('(1) WIP: my commit message')[0]).toEqual(false);

    expect(parse('(bob) my commit message')[0]).toEqual(false);
    expect(parse('(bob) chore: my commit message')[0]).toEqual(false);
    expect(parse('(bob) WIP: my commit message')[0]).toEqual(false);

    expect(parse('(#bob) my commit message')[0]).toEqual(false);
    expect(parse('(#bob) chore: my commit message')[0]).toEqual(false);
    expect(parse('(#bob) WIP: my commit message')[0]).toEqual(false);

    expect(parse('(#1, #2bob) my commit message')[0]).toEqual(false);
    expect(parse('(#1, #2bob) chore: my commit message')[0]).toEqual(false);
    expect(parse('(#1, #2bob) WIP: my commit message')[0]).toEqual(false);

    expect(parse('(#1,#2bob) my commit message')[0]).toEqual(false);
    expect(parse('(#1,#2bob) chore: my commit message')[0]).toEqual(false);
    expect(parse('(#1,#2bob) WIP: my commit message')[0]).toEqual(false);

    expect(parse('(#1, #2 bob) my commit message')[0]).toEqual(false);
    expect(parse('(#1, #2 bob) chore: my commit message')[0]).toEqual(false);
    expect(parse('(#1, #2 bob) WIP: my commit message')[0]).toEqual(false);
  });
});
