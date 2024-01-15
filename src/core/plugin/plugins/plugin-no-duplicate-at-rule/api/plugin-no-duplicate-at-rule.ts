import { PluginConfigHelper, PluginHelper } from '@plugin/helpers';
import { PluginCheckData, PluginConfigAtRule, PluginData, PluginRuleOptions } from '@plugin/interfaces';

import { PluginNoDuplicateAtRuleMessageArgs, PluginNoDuplicateAtRuleMessageName } from '../interfaces';

import { PluginBase } from '../../plugin-base';

import { AtRule, Node } from 'postcss';

export class PluginNoDuplicateAtRule extends PluginBase {
	protected override readonly isArrayOptions = true;

	protected readonly ruleName = 'no-duplicate-at-rule';

	private violatedNodes: Node[] = [];

	protected readonly message = (name: PluginNoDuplicateAtRuleMessageName): string =>
		`Unexpected duplicate at-rule ${name} at the same nesting level`;

	protected initialize({ options, result }: PluginData<PluginConfigAtRule[]>): void {
		const mainOptions: PluginRuleOptions = {
			actual: options,
			possible: PluginConfigHelper.areAtRules,
		};

		if (!this.isValidOptions(mainOptions)) return;

		this.checkAtRule(result, options);
	}

	protected check({ rule, options }: PluginCheckData<PluginConfigAtRule[], undefined, AtRule>): false | void {
		if (PluginHelper.isInvalidSyntaxBlock(rule)) return;

		const validationRule = PluginConfigHelper.getValidationAtRule(rule, options);
		const { parent } = rule;

		if (!validationRule || !parent) return;

		parent.walk(child => {
			const isInvalidChild = !PluginHelper.isChildPluginAtRule(child) || child === rule || child.parent !== parent;

			if (isInvalidChild) return;

			const childValidationRule = PluginConfigHelper.getValidationAtRule(child, validationRule.rule);

			if (!childValidationRule) return;

			const isNameMatched = childValidationRule.rule === validationRule.rule;

			if (!isNameMatched || this.violatedNodes.includes(child)) return;

			const messageArgs: PluginNoDuplicateAtRuleMessageArgs = [childValidationRule.messageName];

			this.reportProblem({ node: child, messageArgs });

			this.violatedNodes.push(rule);
		});
	}
}
