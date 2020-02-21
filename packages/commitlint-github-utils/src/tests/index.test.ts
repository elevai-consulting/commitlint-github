import utils from '../index';

describe('commitlintPluginGitHub', () => {
  it('should return a expected exports', () => {
    expect(utils).not.toBeNull();
    expect(utils.commitlintGitHubConstants).not.toBeNull();
    expect(utils.parseCommitMessage).toBeInstanceOf(Function);
    expect(utils.handleWipCommits).toBeInstanceOf(Function);
    expect(utils.isNegated).toBeInstanceOf(Function);
  });
});

describe('isNegated', () => {
  it('should return true for "never"', () => {
    expect(utils.isNegated('never')).toBe(true);
  });

  it('should return false for "always"', () => {
    expect(utils.isNegated('always')).toBe(false);
  });
});
