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
  it('should return validated when passed a WIP Commit and the "When" clause is only for non-WIPs', () => {
    expect(handleWipCommits(WIP_COMMIT, When.NON_WIPS_ALWAYS).isWipValidated).toBe(true);
    expect(handleWipCommits(WIP_COMMIT, When.NON_WIPS_NEVER).isWipValidated).toBe(true);
  });

  it('should return not validated when passed a non-WIP Commit and the "When" clause is only for non-WIPs', () => {
    expect(handleWipCommits(NON_WIP_COMMIT, When.NON_WIPS_ALWAYS).isWipValidated).toBe(false);
    expect(handleWipCommits(NON_WIP_COMMIT, When.NON_WIPS_NEVER).isWipValidated).toBe(false);
  });

  it('should return not validated when passed a WIP and non-WIP Commits and the "When" clause is not just for non-WIPs', () => {
    expect(handleWipCommits(WIP_COMMIT, When.ALWAYS).isWipValidated).toBe(false);
    expect(handleWipCommits(WIP_COMMIT, When.NEVER).isWipValidated).toBe(false);
    expect(handleWipCommits(WIP_COMMIT, When.IGNORED).isWipValidated).toBe(false);

    expect(handleWipCommits(NON_WIP_COMMIT, When.ALWAYS).isWipValidated).toBe(false);
    expect(handleWipCommits(NON_WIP_COMMIT, When.NEVER).isWipValidated).toBe(false);
    expect(handleWipCommits(NON_WIP_COMMIT, When.IGNORED).isWipValidated).toBe(false);
  });

  it('should return the corresponding "standard" When when passed a non-WIP Commit and the "When" clause is only for non-WIPs', () => {
    expect(handleWipCommits(NON_WIP_COMMIT, When.NON_WIPS_ALWAYS).when).toBe(When.ALWAYS);
    expect(handleWipCommits(NON_WIP_COMMIT, When.NON_WIPS_NEVER).when).toBe(When.NEVER);
  });

  it('should return the existing "standard" When when passed a non-WIP Commit and the "When" clause is already standard', () => {
    expect(handleWipCommits(NON_WIP_COMMIT, When.ALWAYS).when).toBe(When.ALWAYS);
    expect(handleWipCommits(NON_WIP_COMMIT, When.NEVER).when).toBe(When.NEVER);
    expect(handleWipCommits(NON_WIP_COMMIT, When.IGNORED).when).toBe(When.IGNORED);
  });
});
