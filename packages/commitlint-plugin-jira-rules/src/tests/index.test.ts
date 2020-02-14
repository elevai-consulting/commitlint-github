import commitlintPluginJira from '../index'

describe('commitlintPluginJira', () => {
  it('should return a valid config', () => {
    expect(commitlintPluginJira).toHaveProperty('rules')
    expect(Object.keys(commitlintPluginJira.rules).length).toBeGreaterThan(0)
  })
})
