import { CommitlintGitHubUtils, When } from '../@types';
import * as commitlintGitHubConstants from './commitlintGitHubConstants';
import parseCommitMessage from './parseCommitMessage';
import handleWipCommits from './handleWipCommits';

const isNegated = (when?: When): boolean => when === When.NEVER;

const commitlintGitHubUtils: CommitlintGitHubUtils = {
  commitlintGitHubConstants,
  parseCommitMessage,
  isNegated,
  handleWipCommits,
};

export default commitlintGitHubUtils;
