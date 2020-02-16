import { commitlintGitHubConstants } from 'commitlint-github-utils';
import { CommitlintConfigGitHub } from '../@types';

export const commitlintConfigGitHub: CommitlintConfigGitHub = {
  rules: {
    [commitlintGitHubConstants.GITHUB_RULES.issueNumberMissing]: [2, 'always', true],
    [commitlintGitHubConstants.GITHUB_RULES.issueNumberFormat]: [2, 'always'],
  },
};

export default commitlintConfigGitHub;
