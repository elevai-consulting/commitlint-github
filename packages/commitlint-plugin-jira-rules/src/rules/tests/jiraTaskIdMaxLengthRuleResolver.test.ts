import githubTaskIdMaxLengthRuleResolver from '../githubTaskIdMaxLengthRuleResolver'

describe('githubTaskIdMaxLengthRuleResolver', () => {
  it('should return a error response if taskIds length is longer that provided value', () => {
    const parsed = {
      raw: 'IB-21212121212121: my commit message',
    }
    expect(githubTaskIdMaxLengthRuleResolver(parsed)[0]).toEqual(false)
  })
  it('should return a success response if taskIds length is not longer that provided value', () => {
    const parsed = {
      raw: 'IB-2121: my commit message',
    }
    expect(githubTaskIdMaxLengthRuleResolver(parsed)[0]).toEqual(true)
  })
})
