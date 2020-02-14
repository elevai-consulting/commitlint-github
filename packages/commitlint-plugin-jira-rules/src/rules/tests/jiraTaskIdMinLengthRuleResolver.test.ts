import jiraTaskIdMinLengthRuleResolver from '../jiraTaskIdMinLengthRuleResolver'

describe('jiraTaskIdMinLengthRuleResolver', () => {
  it('should return a error response if taskIds length is shorten that provided value', () => {
    const parsed = {
      raw: 'I1: my commit message',
    }
    expect(jiraTaskIdMinLengthRuleResolver(parsed)[0]).toEqual(false)
  })
  it('should return a success response if taskIds length is not shorten that provided value', () => {
    const parsed = {
      raw: 'IB-21: my commit message',
    }
    expect(jiraTaskIdMinLengthRuleResolver(parsed)[0]).toEqual(true)
  })
})
