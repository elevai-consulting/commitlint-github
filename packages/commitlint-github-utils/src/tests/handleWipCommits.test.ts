import handleWipCommits from '../handleWipCommits';
import { ParsedCommitMessage, When } from '../../@types';

const WIP_COMMIT: ParsedCommitMessage = {
  issueNumbers: [],
  isWip: true,
  body: [],
  subject: 'My WIP Commit',
};

const NON_WIP_COMMIT: ParsedCommitMessage = {
  issueNumbers: [],
  isWip: false,
  body: [],
  subject: 'My Non-WIP Commit',
};

describe('handleWipCommits', () => {
  it('should return validated when passed a WIP Commit regardless of the "When" clause', () => {
    expect(handleWipCommits(WIP_COMMIT, When.ALWAYS).isWipValidated).toBe(true);
    expect(handleWipCommits(WIP_COMMIT, When.NEVER).isWipValidated).toBe(true);
  });

  it('should return not validated when passed a non-WIP Commit regardless of the "When" clause', () => {
    expect(handleWipCommits(NON_WIP_COMMIT, When.ALWAYS).isWipValidated).toBe(false);
    expect(handleWipCommits(NON_WIP_COMMIT, When.NEVER).isWipValidated).toBe(false);
  });

  it('should return the When passed in when passed a non-WIP Commit regardless of the "When" clause', () => {
    expect(handleWipCommits(NON_WIP_COMMIT, When.ALWAYS).when).toBe(When.ALWAYS);
    expect(handleWipCommits(NON_WIP_COMMIT, When.NEVER).when).toBe(When.NEVER);
    expect(handleWipCommits(NON_WIP_COMMIT, When.IGNORED).when).toBe(When.IGNORED);
  });
});
