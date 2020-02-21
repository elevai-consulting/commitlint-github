import { ParsedCommitMessage, When, WipHandledResult } from '../@types';

/**
 * Handles short-circuiting WIP commits to immediately return as valid. Previsouly it also converted the if the when passed in
 * when we had custom When values to allow rules to be configured to only be applicable to non-WIPs (e.g. NON_WIPS_ALWAYS, NON_WIPS_NEVER).
 * However commitlint currently restricts When values in the top-level configuration to just 'always' and 'never' and rejects configuration
 * with any other value.
 *
 * Therefore we have stripped out support for custom When values until a time when they may be supported (or not):
 * See: https://github.com/conventional-changelog/commitlint/issues/1003
 *
 * @param commitMessage the parsed commit message
 * @param whenPassedIn the When passed in
 * @returns { isWipValidated: true } if the When given only applies to non-WIP commits and the commit is a WIP;
 * or { isWipValidated: false, when } with the When to apply to the non-WIP, see description above.
 */
function handleWipCommits(commitMessage: ParsedCommitMessage, when?: When): WipHandledResult {
  if (commitMessage.isWip) {
    return { isWipValidated: true };
  }

  return { isWipValidated: false, when };
}

export default handleWipCommits;
