import { RuleResolver, RuleResolverResult, BaseParsedCommit, WhenAndValue } from '../../../../@types';

const createBaseParsedCommit = (rawCommitMessage: string): BaseParsedCommit => ({ raw: rawCommitMessage });

function parse<T>(
  ruleResolver: RuleResolver<T>,
  whenAndValue: WhenAndValue<T>,
  rawCommitMessage: string,
): RuleResolverResult {
  return ruleResolver(createBaseParsedCommit(rawCommitMessage), whenAndValue[0], whenAndValue[1]);
}

export { createBaseParsedCommit };
export default parse;
