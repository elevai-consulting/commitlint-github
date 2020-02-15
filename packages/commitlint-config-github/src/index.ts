import { commitlintGitHubConstants } from 'commitlint-github-utils';
import { CommitlintConfigGitHub } from '../@types';

export const commitlintConfigGitHub: CommitlintConfigGitHub = {
  rules: {
    [commitlintGitHubConstants.GITHUB_RULES.issueNumberMissing]: [2, 'always'],
    [commitlintGitHubConstants.GITHUB_RULES.issueNumberFormat]: [2, 'always'],
    [commitlintGitHubConstants.GITHUB_RULES.typeOrWip]: [2, 'always', 9],
    [commitlintGitHubConstants.GITHUB_RULES.subjectCase]: [2, 'always', 'sentence-case'],
  },
};

export default commitlintConfigGitHub;
