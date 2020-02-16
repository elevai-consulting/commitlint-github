export interface CommitlintConfigGitHub {
  rules: {
    [key: string]: number | (number | string | boolean)[];
  };
}
declare const commitlintConfigGitHub: CommitlintConfigGitHub;

export default commitlintConfigGitHub;
