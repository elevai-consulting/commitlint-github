export const COMMIT_MESSAGE = 'Test commit message.';
export const ISSUE_NUMBER = 42;
export const COMMIT_TYPE = 'chore';

// Note: We need to trim the beginning of each multiline String to it starts with the first non-whitespace character
//       As otherwise it adds a leading line break and whitespace which is invalid.
//       We deliberately don't trim the end to leave a trailing new line and ensure that works.

export const MULTI_LINE_COMMIT_MESSAGE = `
  (#${ISSUE_NUMBER}) ${COMMIT_MESSAGE}

  My commit message description
    - SUBTASK-1: I added a new feature
    * SUBTASK-2: I fixed a issue

  For more information see: https://github.com/conventional-changelog/commitlint/
`.trimStart();

export const MULTI_LINE_COMMIT_MESSAGE_WITH_TYPE = `
  (#${ISSUE_NUMBER}) ${COMMIT_TYPE}: ${COMMIT_MESSAGE}

  My commit message description
    - SUBTASK-1: I added a new feature
    * SUBTASK-2: I fixed a issue

  For more information see: https://github.com/conventional-changelog/commitlint/
`.trimStart();

export const MULTI_LINE_WIP_COMMIT_MESSAGES = [
  `
    WIP: ${COMMIT_MESSAGE}

    My commit message description
        - SUBTASK-1: I added a new feature
        * SUBTASK-2: I fixed a issue

    For more information see: https://github.com/conventional-changelog/commitlint/
  `.trimStart(),
  `
    WIP2: ${COMMIT_MESSAGE}

    My commit message description
        - SUBTASK-1: I added a new feature
        * SUBTASK-2: I fixed a issue

    For more information see: https://github.com/conventional-changelog/commitlint/
  `.trimStart(),
  `
    WIP 2: ${COMMIT_MESSAGE}

    My commit message description
        - SUBTASK-1: I added a new feature
        * SUBTASK-2: I fixed a issue

    For more information see: https://github.com/conventional-changelog/commitlint/
  `.trimStart(),
  `
    WIP2:${COMMIT_MESSAGE}

    My commit message description
        - SUBTASK-1: I added a new feature
        * SUBTASK-2: I fixed a issue

    For more information see: https://github.com/conventional-changelog/commitlint/
  `.trimStart(),
  `
    WIP 2:${COMMIT_MESSAGE}

    My commit message description
        - SUBTASK-1: I added a new feature
        * SUBTASK-2: I fixed a issue

    For more information see: https://github.com/conventional-changelog/commitlint/
  `.trimStart(),
  `
    WIP 2 - ${COMMIT_MESSAGE}

    My commit message description
        - SUBTASK-1: I added a new feature
        * SUBTASK-2: I fixed a issue

    For more information see: https://github.com/conventional-changelog/commitlint/
  `.trimStart(),
  `
    WIP2 - ${COMMIT_MESSAGE}

    My commit message description
        - SUBTASK-1: I added a new feature
        * SUBTASK-2: I fixed a issue

    For more information see: https://github.com/conventional-changelog/commitlint/
  `.trimStart(),
];

export const MULTI_LINE_WIP_COMMIT_MESSAGE_WITH_ISSUE_NUMBERS = `
    (#${ISSUE_NUMBER}) WIP: ${COMMIT_MESSAGE}

    My commit message description
    - SUBTASK-1: I added a new feature
    * SUBTASK-2: I fixed a issue

    For more information see: https://github.com/conventional-changelog/commitlint/
  `.trimStart();
