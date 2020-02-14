import githubCommitMessageSeparatorRuleResolver from '../githubCommitMessageSeparatorRuleResolver'

describe('githubCommitMessageSeparatorRuleResolver', () => {
  it('should return a error response if commitMessageSeparator not match provided separator', () => {
    const parsed = {
      raw: 'IB-21/ my commit message',
    }
    expect(githubCommitMessageSeparatorRuleResolver(parsed)[0]).toEqual(false)
  })
  it('should return a success response if commitMessageSeparator match provided separator', () => {
    const parsed = {
      raw: 'IB-21: my commit message',
    }
    expect(githubCommitMessageSeparatorRuleResolver(parsed)[0]).toEqual(true)
  })
})
