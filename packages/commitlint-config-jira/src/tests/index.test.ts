import commitlintConfigJira from '../index'

describe('commitlintConfigJira', () => {
  it('should return a valid config', () => {
    expect(commitlintConfigJira).toHaveProperty('rules')
    expect(Object.keys(commitlintConfigJira.rules).length).toBeGreaterThan(0)
  })
})
