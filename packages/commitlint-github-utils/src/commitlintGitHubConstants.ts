export const GITHUB_RULES = {
  issueNumberMissing: 'github-issue-number-missing',
  issueNumberFormat: 'github-issue-number-format',
  issueNumberDuplicate: 'github-issue-number-duplicate',

  wipAllowed: 'wip-allowed',

  // The following should match the base rule strings in @commitlint/rules:

  subjectEmpty: 'subject-empty',
  subjectCase: 'subject-case',
  subjectFullStop: 'subject-full-stop',
  subjectMinLength: 'subject-min-length',
  subjectMaxLength: 'subject-max-length',
  subjectSeparator: 'subject-separator',

  typeEmpty: 'type-empty',
  typeCase: 'type-case',
  typeEnum: 'type-enum',
  typeMaxLength: 'type-max-length',
  typeMinLength: 'type-min-length',
};

export const ISSUE_NUMBER_PREFIX = '#';
export const ISSUE_NUMBERS_SEPARATOR = ',';
export const ISSUE_NUMBER_PATTERN = /^#(?<issueNumber>\d+)$/;

// Exclude matching 'WIP' as the start of a description using a negative look-ahead
// Instead should match WIP_WITH_JUST_ISSUE_NUMBERS_PATTERN below
export const ISSUE_NUMBERS_PATTERN = /^\((?<issues>.*?)\)(?: (?<type>\S+?):)?(?!\s*WIP)(?<description>.*)/;

// Allow WIPs to avoid specifying issue number as should only exist on feature branches which are per issue
// Allow either 'WIP: ...', 'WIP - ...', 'WIP2', 'WIP 2', 'WIP 2: ...', 'WIP 2 - ...' etc.
export const WIP_WITHOUT_ISSUE_NUMBER_PATTERN = /^WIP(?:\s*\d+)?(?:(?:\.|:|(?:\s*-))(?<description>.*))?(?:\n|$)/;
export const WIP_WITH_JUST_ISSUE_NUMBERS_PATTERN = /^\((?<issues>.*?)\) WIP\b/;
export const SUBJECT_PATTERN = /^(?<subjectSeparator>\s*)?(?<subject>.*)/;
export const WIP_TYPE = 'WIP';
export const TYPE_SEPARATOR = ':';
export const COMMIT_DESCRIPTION_SEPARATOR = '\n';
