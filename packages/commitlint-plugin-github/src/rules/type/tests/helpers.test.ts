import { ParsedCommitMessage, When } from '@elevai/commitlint-github-utils/@types';
import { RuleResolver, RuleResolverResult, BaseParsedCommit } from '../../../../@types';
import { typeAdapter, typeRuleResolver } from '../helpers';

import resolveRuleUsingBaseResolver from '../../utils/wrappedRuleResolver';

// Mock the resolveRuleUsingBaseResolver so we can isolate our test to just the function-under-test: typeRuleResolver
jest.mock('../../utils/wrappedRuleResolver');

const mockedResolveRuleUsingBaseResolver: jest.Mock<RuleResolverResult> = resolveRuleUsingBaseResolver as jest.Mock<
  RuleResolverResult
>;

const EXPECTED_PARSED: BaseParsedCommit = { raw: 'dummy-raw' };
const EXPECTED_VALUE = 'dummy-value';

const BASE_RESOLVER: RuleResolver<string> = jest.fn();
const RESULT_FROM_BASE_RESOLVER: RuleResolverResult = [true, 'DUMMY_RESULT'];

mockedResolveRuleUsingBaseResolver.mockReturnValue(RESULT_FROM_BASE_RESOLVER);

describe('typeAdapter', () => {
  it('should return the type from the ParsedCommitMessage', () => {
    const type = 'expected-type';
    const commit: ParsedCommitMessage = {
      issueNumbers: [],
      isWip: false,
      body: [],
      type,
    };

    expect(typeAdapter(commit)).toEqual({ type });
  });
});

describe('typeRuleResolver', () => {
  const ruleResolver: RuleResolver<string> = typeRuleResolver(BASE_RESOLVER);

  // See comment in the typeRuleResolver() method for why the when clause gets converted to the NON_WIPS equivalent
  it('should use the arguments passed, converting the "when" to the NON_WIPS equivalent', () => {
    // ALWAYS
    expect(ruleResolver(EXPECTED_PARSED, When.ALWAYS, EXPECTED_VALUE)).toEqual(RESULT_FROM_BASE_RESOLVER);

    expect(mockedResolveRuleUsingBaseResolver).toHaveBeenCalledWith(
      BASE_RESOLVER,
      typeAdapter,
      EXPECTED_PARSED,
      When.ALWAYS,
      EXPECTED_VALUE,
    );

    // IGNORED is treated as NON_WIPS_ALWAYS as it's arbitrary
    expect(ruleResolver(EXPECTED_PARSED, When.IGNORED, EXPECTED_VALUE)).toEqual(RESULT_FROM_BASE_RESOLVER);

    expect(mockedResolveRuleUsingBaseResolver).toHaveBeenCalledWith(
      BASE_RESOLVER,
      typeAdapter,
      EXPECTED_PARSED,
      When.IGNORED,
      EXPECTED_VALUE,
    );

    // NEVER
    expect(ruleResolver(EXPECTED_PARSED, When.NEVER, EXPECTED_VALUE)).toEqual(RESULT_FROM_BASE_RESOLVER);

    expect(mockedResolveRuleUsingBaseResolver).toHaveBeenCalledWith(
      BASE_RESOLVER,
      typeAdapter,
      EXPECTED_PARSED,
      When.NEVER,
      EXPECTED_VALUE,
    );
  });
});
