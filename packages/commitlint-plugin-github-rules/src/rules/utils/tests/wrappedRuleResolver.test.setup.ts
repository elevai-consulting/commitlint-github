import { When } from 'commitlint-github-utils/@types';
import utils, { ParsedCommitMessage } from 'commitlint-github-utils';
import { BaseParsedCommitAdapter, RuleResolver, RuleResolverResult } from '../../../../@types';
import wrappedRuleResolver from '../wrappedRuleResolver';
import { createBaseParsedCommit } from './utils';

// Mock the parseCommitMessage() method so we can isolate our test to just wrappedRuleResolver
// (though note we aren't mocking utils.handleWipResult() currently which is called by wrappedRuleResolver)
const mockedParseCommitMessage: jest.Mock<ParsedCommitMessage> = jest.fn() as jest.Mock<ParsedCommitMessage>;
utils.parseCommitMessage = mockedParseCommitMessage;

export const EXPECTED_WHEN = When.NEVER;
export const EXPECTED_VALUE = 'dummy-value';
export const COMMIT_FROM_ADAPTER = createBaseParsedCommit('DUMMY_COMMIT');
export const RESULT_FROM_BASE_RESOLVER: RuleResolverResult = [true, 'DUMMY_RESULT'];

export type WrappedRuleResolverResult = {
  result: RuleResolverResult;
  baseResolver: RuleResolver<string>;
  adapter: BaseParsedCommitAdapter;
};

export const executeFunctionUnderTest = (
  rawCommitMessage: string,
  when: When,
  value: string,
): WrappedRuleResolverResult => {
  const baseParsedCommit = createBaseParsedCommit(rawCommitMessage);

  const parsedCommitMessage: ParsedCommitMessage = {
    issueNumbers: [],
    isWip: rawCommitMessage === 'WIP',
    body: [],
  };

  mockedParseCommitMessage.mockReturnValue(parsedCommitMessage);

  const baseResolver: RuleResolver<string> = jest.fn(() => RESULT_FROM_BASE_RESOLVER);
  const adapter: BaseParsedCommitAdapter = jest.fn(() => COMMIT_FROM_ADAPTER);

  const result = wrappedRuleResolver(baseResolver, adapter, baseParsedCommit, when, value);

  return { result, baseResolver, adapter };
};
