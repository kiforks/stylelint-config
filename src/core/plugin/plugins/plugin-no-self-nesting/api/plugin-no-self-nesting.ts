import { PluginConfigHelper, PluginHelper } from '@plugin/helpers';
import { PluginCheckData, PluginConfigRuleType, PluginData, PluginRuleOptions } from '@plugin/interfaces';

import { PluginNoSelfNestingMessageArgs, PluginNoSelfNestingName, PluginNoSelfNestingScopeName } from '../interfaces';

import { PluginBase } from '../../plugin-base';

export class PluginNoSelfNesting extends PluginBase {
	protected override readonly isArrayOptions = true;

	protected readonly ruleName = 'no-self-nesting';
	protected readonly message = (nestedName: PluginNoSelfNestingName, scopeName: PluginNoSelfNestingScopeName): string =>
		`Nesting is not allowed for child selector '${nestedName}' under parent selector '${scopeName}' when they match the specified pattern.`;

	protected initialize({ options, result }: PluginData<PluginConfigRuleType[], PluginConfigRuleType[]>): void {
		const mainOptions: PluginRuleOptions = {
			actual: options,
			possible: PluginConfigHelper.isValidRuleData,
		};

		if (!this.isValidOptions(mainOptions)) return;

		this.checkRule(result, options);
		this.checkAtRule(result, options);
	}

	protected check({ rule, options }: PluginCheckData<PluginConfigRuleType[], PluginConfigRuleType[]>): false | void {
		if (PluginHelper.isInvalidSyntaxBlock(rule)) return;

		const validationRule = PluginConfigHelper.getValidationData(rule, options);
		const childNodes = rule.nodes;

		if (!validationRule || !childNodes?.length) return;

		rule.walk(child => {
			if (!PluginHelper.isValidChildPluginRule(child)) return;

			const childValidationRule = PluginConfigHelper.getValidationData(child, options);

			if (!childValidationRule) return;

			const isNameMatched = childValidationRule.rule === validationRule.rule;

			if (!isNameMatched) return;

			const messageArgs: PluginNoSelfNestingMessageArgs = [
				childValidationRule.messageFormattedName,
				validationRule.messageName,
			];

			this.reportProblem({ node: child, messageArgs });
		});
	}
}
