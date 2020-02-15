import * as commitlintGitHubConstants from './commitlintGitHubConstants';
import parseCommitMessage from './parseCommitMessage';
import { CommitlintGitHubUtils } from '../@types';

const commitlintGitHubUtils: CommitlintGitHubUtils = {
  commitlintGitHubConstants,
  parseCommitMessage,
};

export { commitlintGitHubConstants, parseCommitMessage };
export default commitlintGitHubUtils;
