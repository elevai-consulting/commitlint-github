import commitlintConfigGitHub from '../index'

describe('commitlintConfigGitHub', () => {
  it('should return a valid config', () => {
    expect(commitlintConfigGitHub).toHaveProperty('rules')
    expect(Object.keys(commitlintConfigGitHub.rules).length).toBeGreaterThan(0)
  })
})
