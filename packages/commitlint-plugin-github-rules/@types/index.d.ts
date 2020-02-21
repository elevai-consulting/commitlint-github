import { When } from 'commitlint-github-utils/@types';

export type RuleResolverResult = [boolean, string?];

export type BaseParsedCommit = Partial<{
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
}>;

export type RuleResolver<T> = (parsed: BaseParsedCommit, when?: When, value?: T) => RuleResolverResult;

export interface CommitlintPluginGitHub {
  rules: {
    [key: string]: unknown;
  };
}

declare const commitlintPluginGitHub: CommitlintPluginGitHub;

export default commitlintPluginGitHub;
