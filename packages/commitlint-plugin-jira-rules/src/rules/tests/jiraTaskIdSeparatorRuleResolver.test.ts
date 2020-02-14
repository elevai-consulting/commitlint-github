import jiraTaskIdSeparatorRuleResolver from '../jiraTaskIdSeparatorRuleResolver'

describe('jiraTaskIdSeparatorRuleResolver', () => {
  it('should return a error response if taskIds separator is incorect', () => {
    const parsed = {
      raw: 'I/111: my commit message',
    }
    expect(jiraTaskIdSeparatorRuleResolver(parsed)[0]).toEqual(false)
  })
  it('should return a success response if taskIds separator is corect', () => {
    const parsed = {
      raw: 'IB-21: my commit message',
    }
    expect(jiraTaskIdSeparatorRuleResolver(parsed)[0]).toEqual(true)
  })
})
