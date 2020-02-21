/* eslint-disable import/no-extraneous-dependencies */
import * as shell from 'shelljs';

describe('commitlintPluginGitHubTests', () => {
  const testCommitMessages = {
    singleScope: '(#1) Test commit message.',
  };

  it('should load with success provided commitlint config', () => {
    let cliOutput = {
      stderr: '',
      code: 0,
    };
    try {
      cliOutput = shell.exec(`echo "${testCommitMessages.singleScope}" | npx commitlint"`);
    } catch (error) {
      cliOutput = {
        stderr: error,
        code: 1,
      };
    }

    expect(cliOutput.code).toEqual(0);
  });
});
