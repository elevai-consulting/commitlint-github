export interface CommitlintConfigGitHub {
  rules: {
    [key: string]: number | (number | string)[];
  };
}
declare const commitlintConfigGitHub: CommitlintConfigGitHub;

export default commitlintConfigGitHub;
