import parseCommitMessage from '../parseCommitMessage'

const COMMIT_MESSAGE = 'Test commit message'

describe('commitlintPluginGitHubTests', () => {
  const testCommitMessages = {
    singleScope: `(#1) ${COMMIT_MESSAGE}`,
    singleScopeMultipleDigits: `(#1234) ${COMMIT_MESSAGE}`,
    multiScope: `(#1, #2) ${COMMIT_MESSAGE}`,
    multiScopeMultipleDigits: `(#1, #34) ${COMMIT_MESSAGE}`,
    singleScopeTypedTask: `(#123) chore: ${COMMIT_MESSAGE}`,
    multiScopeTypedTask: `(#123, #45) chore: ${COMMIT_MESSAGE}`,
    singleScopeWipTask: `(#123) WIP: ${COMMIT_MESSAGE}`,
    multiScopeWipTask: `(#123, #45) WIP: ${COMMIT_MESSAGE}`,
    issueNumberMissing: 'My commit message',
    issueNumberEmpty: '() My commit message',
    issueNumberMissingHash: '(123) My commit message',
    issueNumberNonNumeric: '(#bob) My commit message',
    multiCommitPartsSeparator: `(#42) ${COMMIT_MESSAGE} http://gherciu.github.io`,
    multiLineCommit: `
      (#123) ${COMMIT_MESSAGE}

      My commit message description
        - SUBTASK-1: I added a new feature
        * SUBTASK-2: I fixed a issue
    `,
  }

  it('should return correct commitTaskIds', () => {
    expect(
      parseCommitMessage(testCommitMessages.singleScope).commitTaskIds,
    ).toEqual(['IB-2121'])
    // expect(
    //   parseCommitMessage(testCommitMessages.singleScopeWipTask).commitTaskIds,
    // ).toEqual(['IB-2121'])
    expect(
      parseCommitMessage(testCommitMessages.multiScope).commitTaskIds,
    ).toEqual(['IB-2121', 'IB-21'])
    // expect(
    //   parseCommitMessage(testCommitMessages.multiScopeWipTask).commitTaskIds,
    // ).toEqual(['IB-2121', 'IB-21'])
  })

  it('should return correct commitFooter', () => {
    expect(
      parseCommitMessage(testCommitMessages.singleScope).commitFooter,
    ).toEqual('test commit message')
  })

  it('should return empty array of taskIds', () => {
    expect(
      parseCommitMessage(testCommitMessages.emptyTaskIds).commitTaskIds,
    ).toEqual([])
    expect(
      parseCommitMessage(testCommitMessages.missingSeparator).commitTaskIds,
    ).toEqual([])
  })

  it('should return corect taskIds and commit footer if a url is added in commit message', () => {
    expect(
      parseCommitMessage(testCommitMessages.multiCommitPartsSeparator)
        .commitTaskIds,
    ).toEqual(['IB-2121'])
    expect(
      parseCommitMessage(testCommitMessages.multiCommitPartsSeparator)
        .commitFooter,
    ).toEqual('test commit message http://gherciu.github.io')
  })

  it('should return corect taskIds and commit footer if is provided a multiline commit message used for description', () => {
    expect(
      parseCommitMessage(testCommitMessages.multiLineCommit).commitTaskIds,
    ).toEqual(['IB-2121'])
    expect(
      parseCommitMessage(testCommitMessages.multiLineCommit).commitFooter,
    ).toEqual('test commit message')
  })
})
