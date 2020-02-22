import { ParsedCommitMessage, When } from '@elevai/commitlint-github-utils/@types';
import { RuleResolver, RuleResolverResult, BaseParsedCommit } from '../../../../@types';
import { subjectAdapter, subjectRuleResolver } from '../helpers';

import resolveRuleUsingBaseResolver from '../../utils/wrappedRuleResolver';

// Mock the resolveRuleUsingBaseResolver so we can isolate our test to just the function-under-test: subjectRuleResolver
jest.mock('../../utils/wrappedRuleResolver');

const mockedResolveRuleUsingBaseResolver: jest.Mock<RuleResolverResult> = resolveRuleUsingBaseResolver as jest.Mock<
  RuleResolverResult
>;

const EXPECTED_PARSED: BaseParsedCommit = { raw: 'dummy-raw' };
const EXPECTED_WHEN = When.NEVER;
const EXPECTED_VALUE = 'dummy-value';

const BASE_RESOLVER: RuleResolver<string> = jest.fn();
const RESULT_FROM_BASE_RESOLVER: RuleResolverResult = [true, 'DUMMY_RESULT'];

mockedResolveRuleUsingBaseResolver.mockReturnValue(RESULT_FROM_BASE_RESOLVER);

describe('subjectAdapter', () => {
  it('should return the subject from the ParsedCommitMessage', () => {
    const subject = 'expected-subject';
    const commit: ParsedCommitMessage = {
      issueNumbers: [],
      isWip: false,
      body: [],
      subject,
    };

    expect(subjectAdapter(commit)).toEqual({ subject });
  });
});

describe('subjectRuleResolver', () => {
  const defaultValue = 'default-value' as string;

  const ruleResolverWithDefaultValue: RuleResolver<string> = subjectRuleResolver(BASE_RESOLVER, defaultValue);

  it('should use the arguments passed, including value in when specified', () => {
    expect(ruleResolverWithDefaultValue(EXPECTED_PARSED, EXPECTED_WHEN, EXPECTED_VALUE)).toEqual(
      RESULT_FROM_BASE_RESOLVER,
    );

    expect(mockedResolveRuleUsingBaseResolver).toHaveBeenCalledWith(
      BASE_RESOLVER,
      subjectAdapter,
      EXPECTED_PARSED,
      EXPECTED_WHEN,
      EXPECTED_VALUE,
    );
  });

  it('should use the arguments passed with default value being used when value not specified', () => {
    expect(ruleResolverWithDefaultValue(EXPECTED_PARSED, EXPECTED_WHEN, undefined)).toEqual(RESULT_FROM_BASE_RESOLVER);

    expect(mockedResolveRuleUsingBaseResolver).toHaveBeenCalledWith(
      BASE_RESOLVER,
      subjectAdapter,
      EXPECTED_PARSED,
      EXPECTED_WHEN,
      defaultValue,
    );
  });
});
