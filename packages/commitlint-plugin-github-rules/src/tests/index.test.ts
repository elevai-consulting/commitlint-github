import commitlintPluginGitHub from '../index';

describe('commitlintPluginGitHub', () => {
  it('should return a valid config', () => {
    expect(commitlintPluginGitHub).toHaveProperty('rules')
    expect(Object.keys(commitlintPluginGitHub.rules).length).toBeGreaterThan(0);
  });
});
