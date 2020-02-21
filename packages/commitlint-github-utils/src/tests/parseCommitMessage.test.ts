/* eslint-disable prettier/prettier */
import parseCommitMessage from '../parseCommitMessage';

import {
  COMMIT_MESSAGE,
  ISSUE_NUMBER,
  COMMIT_TYPE,
  MULTI_LINE_COMMIT_MESSAGE,
  MULTI_LINE_COMMIT_MESSAGE_WITH_TYPE,
  MULTI_LINE_WIP_COMMIT_MESSAGES,
  MULTI_LINE_WIP_COMMIT_MESSAGE_WITH_ISSUE_NUMBERS,
} from './parserTestData';

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

    // WIPs without a subject is allowed to prepend issue number(s)
    expect(
      parseCommitMessage('(#123) WIP').issueNumbers
    ).toEqual([123]);
    expect(
      parseCommitMessage('(#123, #45) WIP').issueNumbers
    ).toEqual([123, 45]);
    expect(
      parseCommitMessage('(#123,#45) WIP').issueNumbers
    ).toEqual([123, 45]);
  });

  it('should return correct issue numbers for multi-line commit messages', () => {
    [
      MULTI_LINE_COMMIT_MESSAGE,
      MULTI_LINE_COMMIT_MESSAGE_WITH_TYPE,
      MULTI_LINE_WIP_COMMIT_MESSAGE_WITH_ISSUE_NUMBERS,
    ].forEach(commitMessage => expect(parseCommitMessage(commitMessage).issueNumbers).toEqual([ISSUE_NUMBER]));
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

  it('should return correct raw issue numbers for multi-line commit messages', () => {
    [
      MULTI_LINE_COMMIT_MESSAGE,
      MULTI_LINE_COMMIT_MESSAGE_WITH_TYPE,
      MULTI_LINE_WIP_COMMIT_MESSAGE_WITH_ISSUE_NUMBERS,
    ].forEach(commitMessage => expect(parseCommitMessage(commitMessage).rawIssueNumbers).toEqual(`#${ISSUE_NUMBER}`));
  });

  it('should return no raw issue numbers', () => {
    expect(
      parseCommitMessage('My commit message').rawIssueNumbers
    ).toBeUndefined();

    // The various different styles of WIP messages without issue numbers present

    expect(
      parseCommitMessage('WIP').rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP - ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage('WIP2').rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage('WIP 2').rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP2: ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP 2: ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP - ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP2 - ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP 2 - ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toBeUndefined();

    // Issue numbers not at the beginning
    expect(
      parseCommitMessage('My commit message (#1)').rawIssueNumbers
    ).toBeUndefined();

    // toEqual([]) brackets should return an empty String (not null)
    expect(
      parseCommitMessage(`() ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toEqual('');

    // Raw Issue Numbers string should be trimmed
    expect(
      parseCommitMessage(`( ) ${COMMIT_MESSAGE}`).rawIssueNumbers
    ).toEqual('');
  });

  it('should return no raw issue numbers for multi-line WIP commit messages without them', () => {
    MULTI_LINE_WIP_COMMIT_MESSAGES
      .forEach(commitMessage => expect(parseCommitMessage(commitMessage).rawIssueNumbers).toBeUndefined);
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
      parseCommitMessage(`${COMMIT_MESSAGE} (#1)`).issueNumbers
    ).toEqual([]);

    // The various different styles of WIP messages without issue numbers present

    expect(
      parseCommitMessage('WIP').issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP - ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage('WIP2').issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage('WIP 2').issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP2: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP 2: ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP - ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP2 - ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP 2 - ${COMMIT_MESSAGE}`).issueNumbers
    ).toEqual([]);

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE} (#22)`).issueNumbers
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

  it('should return no issue numbers for multi-line WIP commit messages without them', () => {
    MULTI_LINE_WIP_COMMIT_MESSAGES
      .forEach(commitMessage => expect(parseCommitMessage(commitMessage).issueNumbers).toEqual([]));
  });

  it('should return the correct type', () => {
    expect(
      parseCommitMessage(`(#1) ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`(#1, #2) ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`(#1,#2) ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`(#123) chore: ${COMMIT_MESSAGE}`).type
    ).toEqual('chore');

    expect(
      parseCommitMessage(`(#123, #45) chore: ${COMMIT_MESSAGE}`).type
    ).toEqual('chore');

    expect(
      parseCommitMessage(`(#123,#45) chore: ${COMMIT_MESSAGE}`).type
    ).toEqual('chore');
  });

  it('should return the correct type for multi-line commit messages with them', () => {
    expect(parseCommitMessage(MULTI_LINE_COMMIT_MESSAGE_WITH_TYPE).type).toEqual(COMMIT_TYPE);
  });

  it('should return no type for WIP commit messages', () => {
    expect(
      parseCommitMessage(`(#123) WIP: ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`(#123, #45) WIP: ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`(#123,#45) WIP: ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage('WIP').type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP - ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage('WIP2').type
    ).toBeUndefined();

    expect(
      parseCommitMessage('WIP 2').type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP2: ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP 2: ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP - ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP2 - ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP 2 - ${COMMIT_MESSAGE}`).type
    ).toBeUndefined();

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE} (#22)`).type
    ).toBeUndefined();
  });

  it('should return no type for multi-line commit messages without them', () => {
    [
      MULTI_LINE_COMMIT_MESSAGE,
      MULTI_LINE_WIP_COMMIT_MESSAGE_WITH_ISSUE_NUMBERS,
      ...MULTI_LINE_WIP_COMMIT_MESSAGES,
    ].forEach(commitMessage => expect(parseCommitMessage(commitMessage).type).toBeUndefined());
  });

  it('should return correct WIP status', () => {
    expect(
      parseCommitMessage(`(#1) ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    expect(
      parseCommitMessage(`(#1, #2) ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    expect(
      parseCommitMessage(`(#1,#2) ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    expect(
      parseCommitMessage(`(#123) chore: ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    expect(
      parseCommitMessage(`(#123, #45) chore: ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    expect(
      parseCommitMessage(`(#123,#45) chore: ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    // Various different WIP formats supported

    expect(
      parseCommitMessage(`(#123) WIP: ${COMMIT_MESSAGE}`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`(#123, #45) WIP: ${COMMIT_MESSAGE}`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`(#123,#45) WIP: ${COMMIT_MESSAGE}`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage('WIP').isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`WIP - ${COMMIT_MESSAGE}`).isWip
    ).toBe(true);

    // WIPs can have numbers suffixed (either with a space after or not)

    expect(
      parseCommitMessage('WIP2').isWip
    ).toBe(true);

    expect(
      parseCommitMessage('WIP 2').isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`WIP2: ${COMMIT_MESSAGE}`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`WIP 2: ${COMMIT_MESSAGE}`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`WIP2 - ${COMMIT_MESSAGE}`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`WIP 2 - ${COMMIT_MESSAGE}`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE} (#22)`).isWip
    ).toBe(true);

    // But WIPs cannot be suffixed with non numeric suffixes

    expect(
      parseCommitMessage(`WIPa`).isWip
    ).toBe(false);

    expect(
      parseCommitMessage(`(#123) WIPa`).isWip
    ).toBe(false);

    expect(
      parseCommitMessage(`(#123) WIPa: ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    // WIP must be all uppercase to match

    expect(
      parseCommitMessage(`(#123) wip: ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    expect(
      parseCommitMessage(`(#123) Wip: ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    expect(
      parseCommitMessage(`(#123) WiP: ${COMMIT_MESSAGE}`).isWip
    ).toBe(false);

    // WIPs can finish with a full stop if there is no subject following
    expect(
      parseCommitMessage(`WIP.`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`WIP2.`).isWip
    ).toBe(true);

    expect(
      parseCommitMessage(`WIP 2.`).isWip
    ).toBe(true);
  });

  it('should return the correct WIP status for multi-line non-WIP commit messages', () => {
    [
      MULTI_LINE_COMMIT_MESSAGE,
      MULTI_LINE_COMMIT_MESSAGE_WITH_TYPE,
    ].forEach(commitMessage => expect(parseCommitMessage(commitMessage).isWip).toBe(false));
  });

  it('should return the correct WIP status for multi-line WIP commit messages', () => {
    [
      MULTI_LINE_WIP_COMMIT_MESSAGE_WITH_ISSUE_NUMBERS,
      ...MULTI_LINE_WIP_COMMIT_MESSAGES,
    ].forEach(commitMessage => expect(parseCommitMessage(commitMessage).isWip).toBe(true));
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

    // Various different WIP formats supported

    expect(
      parseCommitMessage('WIP').subject
    ).toBeUndefined();

    expect(
      parseCommitMessage('WIP2').subject
    ).toBeUndefined();

    expect(
      parseCommitMessage('WIP 2').subject
    ).toBeUndefined();

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

    expect(
      parseCommitMessage(`WIP - ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`WIP2: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`WIP 2: ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`WIP - ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`WIP2 - ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`WIP 2 - ${COMMIT_MESSAGE}`).subject
    ).toEqual(COMMIT_MESSAGE);

    expect(
      parseCommitMessage(`WIP: ${COMMIT_MESSAGE} (#22)`).subject
    ).toEqual(`${COMMIT_MESSAGE} (#22)`);
  });

  it('should return the correct subject for multi-line commit messages', () => {
    [
      MULTI_LINE_COMMIT_MESSAGE,
      MULTI_LINE_COMMIT_MESSAGE_WITH_TYPE,
      MULTI_LINE_WIP_COMMIT_MESSAGE_WITH_ISSUE_NUMBERS,
      ...MULTI_LINE_WIP_COMMIT_MESSAGES,
    ].forEach(commitMessage => expect(parseCommitMessage(commitMessage).subject).toEqual(COMMIT_MESSAGE));
  });
});
