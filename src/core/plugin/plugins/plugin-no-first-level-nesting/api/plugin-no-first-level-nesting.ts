import { PluginConfigHelper, PluginHelper } from '@plugin/helpers';
import { PluginCheckData, PluginConfigRuleType, PluginData, PluginRuleOptions } from '@plugin/interfaces';

import {
	PluginNoFirstLevelNestingMessageArgs,
	PluginNoFirstLevelNestingName,
	PluginNoFirstLevelNestingPattern,
} from '../interfaces';

import { PluginBase } from '../../plugin-base';

export class PluginNoFirstLevelNesting extends PluginBase {
	protected override readonly isArrayOptions = true;

	protected readonly ruleName = 'no-first-level-nesting';
	protected readonly message = (
		name: PluginNoFirstLevelNestingName,
		pattern: PluginNoFirstLevelNestingPattern
	): string => `First level nesting of "${name}" is not allowed for the given ${pattern} rule pattern.`;

	protected initialize({ options, result }: PluginData<PluginConfigRuleType[]>): void {
		const mainOptions: PluginRuleOptions = {
			actual: options,
			possible: PluginConfigHelper.isValidRuleData,
		};

		if (!this.isValidOptions(mainOptions)) return;

		this.checkRule(result, options);
		this.checkAtRule(result, options);
	}

	protected check({ rule, options }: PluginCheckData<PluginConfigRuleType[]>): void {
		const validationRule = PluginConfigHelper.getValidationData(rule, options);

		if (!validationRule || !PluginHelper.isPluginRuleType(rule) || !PluginHelper.isParentRoot(rule)) return;

		const messageArgs: PluginNoFirstLevelNestingMessageArgs = [PluginHelper.getName(rule)!, validationRule.messageName];

		this.reportProblem({ node: rule, messageArgs });
	}
}
