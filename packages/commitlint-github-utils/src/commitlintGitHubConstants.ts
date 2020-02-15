export const GITHUB_RULES = {
  issueNumberMissing: 'github-issue-number-missing',
  issueNumberFormat: 'github-issue-number-format',
  typeOrWip: 'github-type-or-wip',
  subjectCase: 'github-subject-case',
};

export const ISSUE_NUMBER_PREFIX = '#';
export const ISSUE_NUMBERS_SEPARATOR = ',';
export const ISSUE_NUMBERS_PATTERN = /^\((?<issues>.+)\) (?:(?<type>\w+): )?(?<description>.*)/;
export const TYPE_SEPARATOR = ':';
export const COMMIT_DESCRIPTION_SEPARATOR = '\n';
