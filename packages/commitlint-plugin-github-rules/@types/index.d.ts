export type RuleResolverResult = [boolean, string?];

export type RuleResolver<T> = (
  parsed: Partial<{
    type: string;
    scope: string;
    subject: string;
    merge: string;
    header: string;
    body: string;
    footer: string;
    notes: string[];
    references: string[];
    mentions: string[];
    revert: string;
    raw: string;
  }>,
  when?: string,
  value?: T,
) => RuleResolverResult;

export interface CommitlintPluginGitHub {
  rules: {
    [key: string]: unknown;
  };
}

declare const commitlintPluginGitHub: CommitlintPluginGitHub;

export default commitlintPluginGitHub;
