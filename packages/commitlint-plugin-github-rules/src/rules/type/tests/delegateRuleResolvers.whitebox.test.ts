// See comment in typeRuleResolvers.ts for why these checks are disabled:
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import baseRules from '@commitlint/rules';
import { When } from 'commitlint-github-utils/@types';
import utils from 'commitlint-github-utils';

import { BaseParsedCommit, RuleResolverResult, RuleResolver } from '../../../../@types';
import { typeAdapter } from '../helpers';
import * as typeRuleResolvers from '../index';

import resolveRuleUsingBaseResolver from '../../utils/wrappedRuleResolver';

// Mock the resolveRuleUsingBaseResolver so we can isolate our test to just the function-under-test: typeRuleResolver
jest.mock('../../utils/wrappedRuleResolver');

const mockedResolveRuleUsingBaseResolver: jest.Mock<RuleResolverResult> = resolveRuleUsingBaseResolver as jest.Mock<
  RuleResolverResult
>;

const commitlintGitHubRules = utils.commitlintGitHubConstants.GITHUB_RULES;

const EXPECTED_PARSED: BaseParsedCommit = { raw: 'dummy-raw' };
const EXPECTED_VALUE = 'dummy-value';

function validateDelegateRuleResolver(
  delegateRuleName: string,
  typeRuleResolver: RuleResolver<any>,
  whenPassedIn: When,
): void {
  // Given that the standard type rule exists
  const delegate = baseRules[delegateRuleName];
  expect(delegate).toBeDefined();

  // And that the wrapped type rule under test exists
  expect(typeRuleResolver).toBeDefined();

  // And we mock the base rule resolving function to return a mock response
  const mockResult: RuleResolverResult = [true, delegateRuleName];
  mockedResolveRuleUsingBaseResolver.mockClear();
  mockedResolveRuleUsingBaseResolver.mockReturnValue(mockResult);

  // When we call the type rule under test
  const result = typeRuleResolver(EXPECTED_PARSED, whenPassedIn, EXPECTED_VALUE);

  // Then we expect the mock response from the base rule resolving function to be returned
  expect(result).toEqual(mockResult);

  // And we convert the When clause to the corresponding NON_WIPS equivalent to allow for WIP short-circuiting
  // See comment in the typeRuleResolver() method in typeRuleResolvers.helpers.ts for why the when clause gets converted
  const expectedWhen = whenPassedIn === When.NEVER ? When.NON_WIPS_NEVER : When.NON_WIPS_ALWAYS;

  // And we expect the base rule resolving function with the correct arguments, including the converted when
  expect(mockedResolveRuleUsingBaseResolver).toHaveBeenCalledWith(
    delegate,
    typeAdapter,
    EXPECTED_PARSED,
    expectedWhen,
    EXPECTED_VALUE,
  );

  // The base rule resolving function itself is tested by wrappedRuleResolver.test.ts
  // We also have black box tests in this directory
}

describe('delegate type rule resolvers', () => {
  it('typeEmptyRuleResolver should delegate correctly for non-WIP commits only', () => {
    validateDelegateRuleResolver(commitlintGitHubRules.typeEmpty, typeRuleResolvers.typeEmptyRuleResolver, When.ALWAYS);
    validateDelegateRuleResolver(commitlintGitHubRules.typeEmpty, typeRuleResolvers.typeEmptyRuleResolver, When.NEVER);

    validateDelegateRuleResolver(
      commitlintGitHubRules.typeEmpty,
      typeRuleResolvers.typeEmptyRuleResolver,
      When.IGNORED,
    );
  });

  it('typeCaseRuleResolver should delegate correctly for non-WIP commits only', () => {
    validateDelegateRuleResolver(commitlintGitHubRules.typeCase, typeRuleResolvers.typeCaseRuleResolver, When.ALWAYS);
    validateDelegateRuleResolver(commitlintGitHubRules.typeCase, typeRuleResolvers.typeCaseRuleResolver, When.NEVER);
    validateDelegateRuleResolver(commitlintGitHubRules.typeCase, typeRuleResolvers.typeCaseRuleResolver, When.IGNORED);
  });

  it('typeEnumRuleResolver should delegate correctly for non-WIP commits only, using explicit value if passed', () => {
    validateDelegateRuleResolver(commitlintGitHubRules.typeEnum, typeRuleResolvers.typeEnumRuleResolver, When.ALWAYS);
    validateDelegateRuleResolver(commitlintGitHubRules.typeEnum, typeRuleResolvers.typeEnumRuleResolver, When.NEVER);
    validateDelegateRuleResolver(commitlintGitHubRules.typeEnum, typeRuleResolvers.typeEnumRuleResolver, When.IGNORED);
  });

  it('typeMinLengthRuleResolver should delegate correctly for non-WIP commits only', () => {
    validateDelegateRuleResolver(
      commitlintGitHubRules.typeMinLength,
      typeRuleResolvers.typeMinLengthRuleResolver,
      When.ALWAYS,
    );
    validateDelegateRuleResolver(
      commitlintGitHubRules.typeMinLength,
      typeRuleResolvers.typeMinLengthRuleResolver,
      When.NEVER,
    );
    validateDelegateRuleResolver(
      commitlintGitHubRules.typeMinLength,
      typeRuleResolvers.typeMinLengthRuleResolver,
      When.IGNORED,
    );
  });

  it('typeMaxLengthRuleResolver should delegate correctly for non-WIP commits only', () => {
    validateDelegateRuleResolver(
      commitlintGitHubRules.typeMaxLength,
      typeRuleResolvers.typeMaxLengthRuleResolver,
      When.ALWAYS,
    );
    validateDelegateRuleResolver(
      commitlintGitHubRules.typeMaxLength,
      typeRuleResolvers.typeMaxLengthRuleResolver,
      When.NEVER,
    );
    validateDelegateRuleResolver(
      commitlintGitHubRules.typeMaxLength,
      typeRuleResolvers.typeMaxLengthRuleResolver,
      When.IGNORED,
    );
  });
});
