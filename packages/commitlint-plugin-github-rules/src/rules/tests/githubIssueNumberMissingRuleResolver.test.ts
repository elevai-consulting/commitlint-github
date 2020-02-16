import { RuleResolverResult } from '../../../@types';
import githubIssueNumberMissingRuleResolver from '../githubIssueNumberMissingRuleResolver';
import runRule from './utils';

const parse = (rawCommitMessage: string, when?: string, value?: boolean): RuleResolverResult =>
  runRule(githubIssueNumberMissingRuleResolver, rawCommitMessage, when, value);

describe('githubIssueNumberMissingRuleResolver.', () => {
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

  it('should return a error response if no issue numbers are specified', () => {
    expect(parse('my commit message')[0]).toEqual(false);
  });

  it('should return a error response if no space before commit message', () => {
    expect(parse('(#1)my commit message')[0]).toEqual(false);
  });

  it('should return an error response for a non-WIP type if no issue numbers are specified', () => {
    expect(parse('chore: my commit message')[0]).toEqual(false);
  });

  it('should return a success response for WIP commit if no issue numbers are specified and not required for WIPs', () => {
    expect(parse('WIP: my commit message', undefined, true)[0]).toEqual(true);
  });

  it('should return an error response for WIP commit if no issue numbers are specified and required for WIPs', () => {
    expect(parse('WIP: my commit message', undefined, false)[0]).toEqual(false);
  });
});
