import { When, ParsedCommitMessage } from 'commitlint-github-utils/@types';
import utils from 'commitlint-github-utils';

import { RuleResolverResult, RuleResolver } from '../../../@types';

// For now this is hardcoded because to support custom separators the parser in commitlint-github-utils
// would need to be updated as use static regex patterns to parse commit messages
const EXPECTED_SEPARATOR = ' ';

const subjectSeparatorRuleResolver: RuleResolver<string> = (parsed, whenPassedIn): RuleResolverResult => {
  const rawCommitMessage = parsed.raw;
  if (!rawCommitMessage) return [false, 'Commit message should not be empty'];

  const commitMessage = utils.parseCommitMessage(rawCommitMessage);

  // We short circuit if the When requested is only for non-WIPs and the commit is a WIP
  const wipHandledResult = utils.handleWipCommits(commitMessage, whenPassedIn);
  if (wipHandledResult.isWipValidated) {
    // In that case we just return true immediately
    return [true];
  }
  // Otherwise we continue with validating the separator with the When returned
  // as if it was passed a NON-WIPs one it has been converted to a standard ALWAYS or NEVER
  // so validateSubjectSeparator() only needs to handle standard When values. See the docs on handleWipCommits() for more info

  return validateSubjectSeparator(commitMessage, wipHandledResult.when);
};

function validateSubjectSeparator(commitMessage: ParsedCommitMessage, when: When = When.ALWAYS): RuleResolverResult {
  const { subjectSeparator, subject } = commitMessage;

  // If there is no subject defined (not an empty subject) then we have nothing to validate so we return true
  if (subject === undefined) {
    return [true];
  }

  // Negated instance doesn't make much sense but if negated then we validate there is NO separator of a particular type before the subject
  if (utils.isNegated(when)) {
    return [
      subjectSeparator !== EXPECTED_SEPARATOR,
      `the commit message has a separator '${EXPECTED_SEPARATOR}' before the subject which isn't allowed`,
    ];
  }

  // But by default we validate that there IS a separator of a particular type before the subject
  return [
    subjectSeparator === EXPECTED_SEPARATOR,
    `the commit message does not have a valid separator before the subject; expected: '${EXPECTED_SEPARATOR}'`,
  ];
}

export default subjectSeparatorRuleResolver;
