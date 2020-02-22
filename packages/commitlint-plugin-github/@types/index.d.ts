import { When } from '@elevai/commitlint-github-utils/@types';
import { ParsedCommitMessage } from '@elevai/commitlint-github-utils';

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

export type WrappedRuleResolver<T> = (
  baseResolver: RuleResolver<T>,
  adapter: BaseParsedCommitAdapter,
  parsed: BaseParsedCommit,
  when?: When,
  value?: T,
) => RuleResolverResult;

export type BaseParsedCommitAdapter = (parsed: ParsedCommitMessage) => BaseParsedCommit;

export type WhenAndValue<T> = [When, T?];

export type WhenAndRequiredValue<T> = [When, T];

export interface CommitlintPluginGitHub {
  rules: {
    [key: string]: unknown;
  };
}

declare const commitlintPluginGitHub: CommitlintPluginGitHub;

export default commitlintPluginGitHub;
