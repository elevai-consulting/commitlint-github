/* eslint-disable prettier/prettier */
import parseCommitMessage from '../parseCommitMessage';

const COMMIT_MESSAGE = 'Test commit message';

describe('commitlintPluginGitHubTests', () => {
  const testCommitMessages = {
    multiLineCommit: `
      (#123) ${COMMIT_MESSAGE}

      My commit message description
        - SUBTASK-1: I added a new feature
        * SUBTASK-2: I fixed a issue
    `,
  };

  it('should return correct issue numbers', () => {
    expect(
      parseCommitMessage(`(#1) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([1]);

    expect(
      parseCommitMessage(`(#1234) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([1234]);

    expect(
      parseCommitMessage(`(#1, #2) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([1, 2]);

    expect(
      parseCommitMessage(`(#1,#2) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([1, 2]);

    expect(
      parseCommitMessage(`(#1, #34) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([1, 34]);

    expect(
      parseCommitMessage(`(#1,#34) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([1, 34]);

    expect(
      parseCommitMessage(`(#123) chore: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([123]);

    expect(
      parseCommitMessage(`(#123, #45) chore: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([123, 45]);

    expect(
      parseCommitMessage(`(#123,#45) chore: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([123, 45]);

    expect(
      parseCommitMessage(`(#123) WIP: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([123]);

    expect(
      parseCommitMessage(`(#123, #45) WIP: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([123, 45]);

    expect(
      parseCommitMessage(`(#123,#45) WIP: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([123, 45]);
  });

  it('should return no issue numbers', () => {
    // Missing issue numbers prefix entirely
    expect(
      parseCommitMessage('My commit message').issueNumbers
    ).toEqual([]);

    // Empty issue numbers prefix
    expect(
      parseCommitMessage(`() ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    // Non-numeric issue numbers prefix
    expect(
      parseCommitMessage(`(#2bob) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#2, #1bob) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#2,#1bob) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#2, 1bob) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#2,1bob) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#bob, #2) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#1bob,#2) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#1bob, 2) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#1bob,2) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    // Missing issue number hash
    expect(
      parseCommitMessage(`(123) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#1, 123) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(#1,123) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(1, #123) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`(1,#123) ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);
  });

  it('should return correct type', () => {
    expect(
      parseCommitMessage(`(#1) ${COMMIT_MESSAGE}`).type
    ).toEqual(null);

    expect(
      parseCommitMessage(`(#1, #2) ${COMMIT_MESSAGE}`).type
    ).toEqual(null);

    expect(
      parseCommitMessage(`(#1,#2) ${COMMIT_MESSAGE}`).type
    ).toEqual(null);

    expect(
      parseCommitMessage(`(#123) chore: ${COMMIT_MESSAGE}`).type
    ).toEqual('chore');

    expect(
      parseCommitMessage(`(#123, #45) chore: ${COMMIT_MESSAGE}`).type
    ).toEqual('chore');

    expect(
      parseCommitMessage(`(#123,#45) chore: ${COMMIT_MESSAGE}`).type
    ).toEqual('chore');

    expect(
      parseCommitMessage(`(#123) WIP: ${COMMIT_MESSAGE}`).type
    ).toEqual('WIP');

    expect(
      parseCommitMessage(`(#123, #45) WIP: ${COMMIT_MESSAGE}`).type
    ).toEqual('WIP');

    expect(
      parseCommitMessage(`(#123,#45) WIP: ${COMMIT_MESSAGE}`).type
    ).toEqual('WIP');
  });

  it('should return correct WIP status', () => {
    expect(
      parseCommitMessage(`(#1) ${COMMIT_MESSAGE}`).isWip
    ).toEqual(false);

    expect(
      parseCommitMessage(`(#1, #2) ${COMMIT_MESSAGE}`).isWip
    ).toEqual(false);

    expect(
      parseCommitMessage(`(#1,#2) ${COMMIT_MESSAGE}`).isWip
    ).toEqual(false);

    expect(
      parseCommitMessage(`(#123) chore: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(false);

    expect(
      parseCommitMessage(`(#123, #45) chore: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(false);

    expect(
      parseCommitMessage(`(#123,#45) chore: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(false);

    expect(
      parseCommitMessage(`(#123) WIP: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(true);

    expect(
      parseCommitMessage(`(#123, #45) WIP: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(true);

    expect(
      parseCommitMessage(`(#123,#45) WIP: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(true);

    // WIP must be all uppercase to match
    expect(
      parseCommitMessage(`(#123) wip: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(false);

    expect(
      parseCommitMessage(`(#123) Wip: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(false);

    expect(
      parseCommitMessage(`(#123) WiP: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(false);
  });

  it('should return correct subject', () => {
    expect(
      parseCommitMessage(`(#1) ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#1234) ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#1, #2) ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#1,#2) ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#1, #34) ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#1,#34) ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#123) chore: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#123, #45) chore: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#123,#45) chore: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#123) WIP: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#123, #45) WIP: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`(#123,#45) WIP: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);
  });
});
