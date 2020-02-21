import { When } from 'commitlint-github-utils/@types';
import utils from 'commitlint-github-utils';
import { CommitlintConfigGitHub } from '../@types';

const commitlintGitHubRules = utils.commitlintGitHubConstants.GITHUB_RULES;

const supportedTypes = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'feature', // Additional one for those who prefer a full word
  'fix',
  'improvement',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
];

export const commitlintConfigGitHub: CommitlintConfigGitHub = {
  rules: {
    [commitlintGitHubRules.issueNumberMissing]: [2, When.NEVER],
    [commitlintGitHubRules.issueNumberFormat]: [2, When.ALWAYS],
    [commitlintGitHubRules.issueNumberDuplicate]: [2, When.NEVER],

    [commitlintGitHubRules.wipAllowed]: [2, When.ALWAYS],

    [commitlintGitHubRules.subjectEmpty]: [2, When.NEVER],
    [commitlintGitHubRules.subjectSeparator]: [2, When.ALWAYS],
    [commitlintGitHubRules.subjectCase]: [2, When.ALWAYS, 'sentence-case'],
    [commitlintGitHubRules.subjectFullStop]: [1, When.ALWAYS], // Warning only

    [commitlintGitHubRules.typeCase]: [2, When.ALWAYS, 'lower-case'],
    [commitlintGitHubRules.typeEnum]: [2, When.ALWAYS, supportedTypes],
  },
};

export default commitlintConfigGitHub;
