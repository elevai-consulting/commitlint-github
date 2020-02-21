import { When } from 'commitlint-github-utils/@types';

import {
  executeFunctionUnderTest,
  EXPECTED_WHEN,
  EXPECTED_VALUE,
  RESULT_FROM_BASE_RESOLVER,
  COMMIT_FROM_ADAPTER,
  WrappedRuleResolverResult,
} from './wrappedRuleResolver.test.setup';

describe('wrappedRuleResolver', () => {
  it('should return false if an empty commit message is provided', () => {
    const results: WrappedRuleResolverResult[] = [
      executeFunctionUnderTest('', EXPECTED_WHEN, EXPECTED_VALUE),
      executeFunctionUnderTest('', EXPECTED_WHEN, EXPECTED_VALUE),
    ];

    results.forEach(execution => {
      expect(execution.result[0]).toEqual(false);
      expect(execution.baseResolver).not.toHaveBeenCalled();
      expect(execution.adapter).not.toHaveBeenCalled();
    });
  });

  it('should return just true for WIP Commits when not validating WIPs', () => {
    const results: WrappedRuleResolverResult[] = [
      executeFunctionUnderTest('WIP', When.NON_WIPS_ALWAYS, EXPECTED_VALUE),
      executeFunctionUnderTest('WIP', When.NON_WIPS_NEVER, EXPECTED_VALUE),
    ];

    results.forEach(execution => {
      expect(execution.result[0]).toEqual(true);
      expect(execution.baseResolver).not.toHaveBeenCalled();
      expect(execution.adapter).not.toHaveBeenCalled();
    });
  });

  it('should delegate for non-WIP Commits when validating "always"', () => {
    const execution: WrappedRuleResolverResult = executeFunctionUnderTest('dummy commit', When.ALWAYS, EXPECTED_VALUE);

    expect(execution.result).toEqual(RESULT_FROM_BASE_RESOLVER);
    expect(execution.adapter).toHaveBeenCalled();
    expect(execution.baseResolver).toHaveBeenCalledWith(COMMIT_FROM_ADAPTER, When.ALWAYS, EXPECTED_VALUE);
  });

  it('should delegate for WIP Commits when validating "always"', () => {
    const execution: WrappedRuleResolverResult = executeFunctionUnderTest('WIP', When.ALWAYS, EXPECTED_VALUE);

    expect(execution.result).toEqual(RESULT_FROM_BASE_RESOLVER);
    expect(execution.adapter).toHaveBeenCalled();
    expect(execution.baseResolver).toHaveBeenCalledWith(COMMIT_FROM_ADAPTER, When.ALWAYS, EXPECTED_VALUE);
  });

  it('should delegate for non-WIP Commits when validating "never"', () => {
    const execution: WrappedRuleResolverResult = executeFunctionUnderTest('dummy commit', When.NEVER, EXPECTED_VALUE);

    expect(execution.result).toEqual(RESULT_FROM_BASE_RESOLVER);
    expect(execution.adapter).toHaveBeenCalled();
    expect(execution.baseResolver).toHaveBeenCalledWith(COMMIT_FROM_ADAPTER, When.NEVER, EXPECTED_VALUE);
  });

  it('should delegate for WIP Commits when validating "never"', () => {
    const execution: WrappedRuleResolverResult = executeFunctionUnderTest('WIP', When.NEVER, EXPECTED_VALUE);

    expect(execution.result).toEqual(RESULT_FROM_BASE_RESOLVER);
    expect(execution.adapter).toHaveBeenCalled();
    expect(execution.baseResolver).toHaveBeenCalledWith(COMMIT_FROM_ADAPTER, When.NEVER, EXPECTED_VALUE);
  });
});
