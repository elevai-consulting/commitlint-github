import githubCommitStatusCaseRuleResolver from '../githubCommitStatusCaseRuleResolver'

describe('githubCommitStatusCaseRuleResolver', () => {
  it('should return a error response if commitStatus is not in provided case', () => {
    const parsed = {
      raw: '[wip]IB-21: my commit message',
    }
    expect(githubCommitStatusCaseRuleResolver(parsed)[0]).toEqual(false)
  })
  it('should return a success response if commitStatus is in provided case', () => {
    const parsed = {
      raw: '[WIP]IB-21: my commit message',
    }
    expect(githubCommitStatusCaseRuleResolver(parsed)[0]).toEqual(true)
  })
})
