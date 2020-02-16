import { commitlintGitHubConstants, parseCommitMessage } from '../index';

describe('commitlintPluginGitHub', () => {
  it('should return a expected exports', () => {
    expect(commitlintGitHubConstants).not.toBeNull();
    expect(parseCommitMessage).not.toBeNull();
  });
});
