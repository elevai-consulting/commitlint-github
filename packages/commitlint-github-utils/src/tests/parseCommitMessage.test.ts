/* eslint-disable prettier/prettier */
import parseCommitMessage from '../parseCommitMessage';

const COMMIT_MESSAGE = 'Test commit message';

describe('commitlintPluginGitHubTests', () => {
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

    // Other issue numbers referenced later should not be included
    expect(
      parseCommitMessage(`(#123,#45) ${COMMIT_MESSAGE} (#22)`).issueNumbers
    ).toEqual([123, 45]);

    expect(
      parseCommitMessage(`(#123,#45) WIP: ${COMMIT_MESSAGE} (#22)`).issueNumbers
    ).toEqual([123, 45]);

    // Issue Numbers string should be trimmed
    expect(
      parseCommitMessage(`( #123,#45 ) WIP: ${COMMIT_MESSAGE} (#22)`).issueNumbers
    ).toEqual([123, 45]);
  });

  it('should return raw issue numbers', () => {
    // Non-numeric issue numbers prefix
    expect(
      parseCommitMessage(`(#2bob) ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toEqual('#2bob');

    expect(
      parseCommitMessage(`(#2, #1bob) ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toEqual('#2, #1bob');

    expect(
      parseCommitMessage(`(#2,#1bob) ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toEqual('#2,#1bob');

    expect(
      parseCommitMessage(`(#123,#45) WIP: ${COMMIT_MESSAGE} (#22)`).rawIssueNumbers
    ).toEqual('#123,#45');

    // Issue Numbers string should be trimmed
    expect(
      parseCommitMessage(`( #123,#45 ) ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toEqual('#123,#45');
  });

  it('should return no raw issue numbers', () => {
    expect(
      parseCommitMessage('My commit message').rawIssueNumbers
    ).toEqual(undefined);

    // Issue numbers not at the beginning
    expect(
      parseCommitMessage('My commit message (#1)').rawIssueNumbers
    ).toEqual(undefined);

    // Empty brackets should return an empty String (not null)
    expect(
      parseCommitMessage(`() ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toEqual('');

    // Raw Issue Numbers string should be trimmed
    expect(
      parseCommitMessage(`( ) ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toEqual('');
  });

  it('should return no issue numbers', () => {
    // Missing issue numbers prefix entirely
    expect(
      parseCommitMessage('My commit message').issueNumbers
    ).toEqual([]);

    // Issue numbers not at the beginning
    expect(
      parseCommitMessage(`() ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE} (#22)`).issueNumbers
    ).toEqual([]);

     // Empty issue numbers prefix
     expect(
      parseCommitMessage(`${COMMIT_MESSAGE} (#1)`).issueNumbers
    ).toEqual([]);

    // WIP commit without issue numbers
    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).issueNumbers
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
    ).toEqual(undefined);

    expect(
      parseCommitMessage(`(#1, #2) ${COMMIT_MESSAGE}`).type
    ).toEqual(undefined);

    expect(
      parseCommitMessage(`(#1,#2) ${COMMIT_MESSAGE}`).type
    ).toEqual(undefined);

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

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).type
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

    // WIP commits are the exception in that the parser will support not including issue numbers
    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).isWip
    ).toEqual(true);
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

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);
  });
});
