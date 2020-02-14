import githubTaskIdEmptyRuleResolver from '../githubTaskIdEmptyRuleResolver'

describe('githubTaskIdEmptyRuleResolver', () => {
  it('should return a error response if taskIds is empty', () => {
    const parsed = {
      raw: ': my commit message',
    }
    expect(githubTaskIdEmptyRuleResolver(parsed)[0]).toEqual(false)
  })
  it('should return a succes response if taskIds is not empty', () => {
    const parsed = {
      raw: 'IB-21: my commit message',
    }
    expect(githubTaskIdEmptyRuleResolver(parsed)[0]).toEqual(true)
  })
})
