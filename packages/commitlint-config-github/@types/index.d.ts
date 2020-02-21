type RuleConfig = [number, string?, (boolean | number | string | string[])?];

export interface CommitlintConfigGitHub {
  rules: {
    [key: string]: RuleConfig;
  };
}
declare const commitlintConfigGitHub: CommitlintConfigGitHub;

export default commitlintConfigGitHub;
