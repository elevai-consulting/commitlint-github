import { ParsedCommitMessage, When, WipHandledResult } from '../@types';

/**
 * Handles both short-circuiting WIP commits to return as valid if the whenPassedIn is only applicable to non-WIPs (e.g. NON_WIPS_ALWAYS, NON_WIPS_NEVER).
 * Also handles converting those Whens if the commit isn't a WIP, and so returns NEVER when given NON_WIPS_NEVER or ALWAYS otherwise.
 * This is so that standard rules can use the standard When values and not deal with NON_WIPS_* When values.
 *
 * @param commitMessage the parsed commit message
 * @param whenPassedIn the When passed in
 * @returns { isWipValidated: true } if the When given only applies to non-WIP commits and the commit is a WIP;
 * or { isWipValidated: false, when } with the When to apply to the non-WIP, see description above.
 */
function handleWipCommits(commitMessage: ParsedCommitMessage, whenPassedIn?: When): WipHandledResult {
  let when = whenPassedIn;

  // Handle the non-wips 'when' if specified as it is custom and not intended to be passed to a base rule resolver
  if (when === When.NON_WIPS_ALWAYS || when === When.NON_WIPS_NEVER) {
    // If the commit is a WIP commit we don't validate as requested not to by the When
    if (commitMessage.isWip) {
      return { isWipValidated: true };
    }

    // Otherwise the commit the commit isn't a WIP so we just need to convert the non-wips 'when'
    // to the corresponding standard 'when' for the baseResolver to understand.
    if (when === When.NON_WIPS_ALWAYS) {
      when = When.ALWAYS;
    } else {
      when = When.NEVER;
    }
  }

  return { isWipValidated: false, when };
}

export default handleWipCommits;
