// See comment in subjectRuleResolvers.ts for why these checks are disabled:
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import baseRules from '@commitlint/rules';
import { When } from '@elevai/commitlint-github-utils/@types';
import utils from '@elevai/commitlint-github-utils';

import { BaseParsedCommit, RuleResolverResult, RuleResolver } from '../../../../@types';
import { subjectAdapter } from '../helpers';
import * as SubjectRuleResolvers from '..';

import resolveRuleUsingBaseResolver from '../../utils/wrappedRuleResolver';

// Mock the resolveRuleUsingBaseResolver so we can isolate our test to just the function-under-test: subjectRuleResolver
jest.mock('../../utils/wrappedRuleResolver');

const mockedResolveRuleUsingBaseResolver: jest.Mock<RuleResolverResult> = resolveRuleUsingBaseResolver as jest.Mock<
  RuleResolverResult
>;

const commitlintGitHubRules = utils.commitlintGitHubConstants.GITHUB_RULES;

const EXPECTED_PARSED: BaseParsedCommit = { raw: 'dummy-raw' };
const EXPECTED_WHEN = When.NEVER;
const EXPECTED_VALUE = 'dummy-value';

function validateDelegateRuleResolver(
  delegateRuleName: string,
  subjectRuleResolver: RuleResolver<any>,
  defaultValue?: string,
): void {
  // Given that the standard subject rule exists
  const delegate = baseRules[delegateRuleName];
  expect(delegate).toBeDefined();

  // And that the wrapped subject rule under test exists
  expect(subjectRuleResolver).toBeDefined();

  // And we mock the base rule resolving function to return a mock response
  const mockResult: RuleResolverResult = [true, delegateRuleName];
  mockedResolveRuleUsingBaseResolver.mockClear();
  mockedResolveRuleUsingBaseResolver.mockReturnValue(mockResult);

  // Unless a default value was passed into this test, we will pass the placeholder EXPECTED_VALUE
  // and expect that to be passed to the base rule resolving function
  let valuePassedIn: string | null = EXPECTED_VALUE;
  let expectedValue = valuePassedIn;

  // Otherwise, if a default value is specified we'll won't pass a value in but expect the default value to be used instead
  if (defaultValue) {
    valuePassedIn = null;
    expectedValue = defaultValue;
  }

  // When we call the subject rule under test
  const result = subjectRuleResolver(EXPECTED_PARSED, EXPECTED_WHEN, valuePassedIn);

  // Then we expect the mock response from the base rule resolving function to be returned
  expect(result).toEqual(mockResult);

  // And we expect the base rule resolving function with the correct arguments
  expect(mockedResolveRuleUsingBaseResolver).toHaveBeenCalledWith(
    delegate,
    subjectAdapter,
    EXPECTED_PARSED,
    EXPECTED_WHEN,
    expectedValue,
  );

  // The base rule resolving function itself is tested by wrappedRuleResolver.test.ts
  // We also have black box tests in this directory
}

describe('delegate subject rule resolvers', () => {
  it('subjectEmptyRuleResolver should delegate correctly for non-WIP commits only', () => {
    validateDelegateRuleResolver(commitlintGitHubRules.subjectEmpty, SubjectRuleResolvers.subjectEmptyRuleResolver);
  });

  it('subjectCaseRuleResolver should delegate correctly for non-WIP commits only', () => {
    validateDelegateRuleResolver(commitlintGitHubRules.subjectCase, SubjectRuleResolvers.subjectCaseRuleResolver);
  });

  it('subjectFullStopRuleResolver should delegate correctly for non-WIP commits only, using explicit value if passed', () => {
    validateDelegateRuleResolver(
      commitlintGitHubRules.subjectFullStop,
      SubjectRuleResolvers.subjectFullStopRuleResolver,
    );
  });

  it('subjectFullStopRuleResolver should delegate correctly for non-WIP commits only, defaulting to default value if no value passed', () => {
    validateDelegateRuleResolver(
      commitlintGitHubRules.subjectFullStop,
      SubjectRuleResolvers.subjectFullStopRuleResolver,
      // Verify default value is used when no explict value passed
      '.',
    );
  });

  it('subjectMinLengthRuleResolver should delegate correctly for non-WIP commits only', () => {
    validateDelegateRuleResolver(
      commitlintGitHubRules.subjectMinLength,
      SubjectRuleResolvers.subjectMinLengthRuleResolver,
    );
  });

  it('subjectMaxLengthRuleResolver should delegate correctly for non-WIP commits only', () => {
    validateDelegateRuleResolver(
      commitlintGitHubRules.subjectMaxLength,
      SubjectRuleResolvers.subjectMaxLengthRuleResolver,
    );
  });
});
