import jiraTaskIdCaseRuleResolver from '../jiraTaskIdCaseRuleResolver'

describe('jiraTaskIdCaseRuleResolver', () => {
  it('should return a error response if taskId is not in provided case', () => {
    const parsed = {
      raw: 'ib-21: my commit message',
    }
    expect(jiraTaskIdCaseRuleResolver(parsed)[0]).toEqual(false)
  })
  it('should return a success response if taskId is in provided case', () => {
    const parsed = {
      raw: 'IB-21: my commit message',
    }
    expect(jiraTaskIdCaseRuleResolver(parsed)[0]).toEqual(true)
  })
})
