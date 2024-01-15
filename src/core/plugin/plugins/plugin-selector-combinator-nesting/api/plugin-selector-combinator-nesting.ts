import { PluginConfigHelper, PluginHelper, PluginSelectorHelper } from '@plugin/helpers';
import { PluginCheckData, PluginConfigExecutionMode, PluginData, PluginRuleOptions } from '@plugin/interfaces';

import { PluginSelectorCombinatorNestingMessageArgs, PluginSelectorCombinatorNestingName } from '../interfaces';

import { PluginBase } from '../../plugin-base';

import selectorParser from 'postcss-selector-parser';
import Rule from 'postcss/lib/rule';

export class PluginSelectorCombinatorNesting extends PluginBase {
	protected readonly ruleName = 'selector-combinator-nesting';

	private readonly interpolationRe = /#{.+?}$/;

	private isAlwaysMode = true;

	protected readonly message = (name: PluginSelectorCombinatorNestingName): string =>
		this.isAlwaysMode
			? `Unexpected nesting "${name}" detected. Selectors must be strictly nested and not at the same level as their parent.`
			: `Unexpected nesting "${name}" detected. Selectors must not be nested but should be at the same level as their parent.`;

	protected initialize({ options: mode, result }: PluginData<PluginConfigExecutionMode>): void {
		const mainOptions: PluginRuleOptions = {
			actual: mode,
			possible: PluginConfigHelper.isExecutionMode,
		};

		if (this.isValidOptions(mainOptions)) this.checkRule(result, mode);
	}

	protected check({ rule, options: mode }: PluginCheckData<PluginConfigExecutionMode>): false | void {
		const isInvalidSyntaxBlock = PluginHelper.isInvalidSyntaxBlock(rule);
		const isRule = PluginHelper.isRule(rule);

		if (isInvalidSyntaxBlock || !isRule) return;

		const isStringSelector = typeof rule.selector === 'string';
		const isNestedProperty = rule.selector.slice(-1) === ':';

		if (isStringSelector && isNestedProperty) return;

		this.isAlwaysMode = PluginConfigHelper.isAlwaysExecutionMode(mode);

		selectorParser(selector =>
			selector.walk(node =>
				node.value !== '}' && this.isAlwaysMode ? this.checkAlwaysMode(node, rule) : this.checkNeverMode(rule)
			)
		).processSync(rule.selector, { lossless: false });
	}

	private checkAlwaysMode(node: selectorParser.Node, rule: Rule): void {
		const { value, parent, type } = node;

		const isSelectorNodeType = PluginSelectorHelper.isSelectorNodeType(type);
		const isChildOfPseudoSelector =
			parent?.parent &&
			PluginSelectorHelper.isSelectorNodeType(parent.type) &&
			PluginSelectorHelper.isPseudoNodeType(parent.parent.type);

		if (!value || isSelectorNodeType || isChildOfPseudoSelector) return;

		const nodePrev = node.prev();

		if (!nodePrev) return;

		const nodeNext = node.next();

		if (nodeNext && this.precedesParentSelector(node)) return;

		const prevType = nodePrev.type;

		const isNodeTypeCombinator = PluginSelectorHelper.isCombinatorNodeType(type);
		const isNodeNextPresentAndNotChaining = nodeNext && !PluginSelectorHelper.isChainingType(nodeNext.type);
		const isNodePrevNotChaining = !PluginSelectorHelper.isChainingType(prevType);

		if (isNodeTypeCombinator && (isNodeNextPresentAndNotChaining || isNodePrevNotChaining)) return;

		const isCurrentTypeChainingAndPrevNot =
			PluginSelectorHelper.isChainingType(type) && !PluginSelectorHelper.isChainingType(prevType);
		const isTypeNotCombinatorAndNotChaining =
			!PluginSelectorHelper.isCombinatorNodeType(type) && !PluginSelectorHelper.isChainingType(type);

		if (isCurrentTypeChainingAndPrevNot || isTypeNotCombinatorAndNotChaining) return;

		const ruleSelector = rule.selector;
		const hasInterpolation = this.interpolationRe.test(ruleSelector);

		if (hasInterpolation) return;

		const messageArgs: PluginSelectorCombinatorNestingMessageArgs = [ruleSelector];

		this.reportProblem({ node: rule, messageArgs });
	}

	private checkNeverMode(rule: Rule): void {
		if (rule.parent && PluginHelper.isRoot(rule.parent)) return;

		rule.nodes.forEach(node => {
			if (!PluginHelper.isRule(node)) return;

			const messageArgs: PluginSelectorCombinatorNestingMessageArgs = [node.selector];

			this.reportProblem({ node, messageArgs });
		});
	}

	private precedesParentSelector(currentNode: Nullable<selectorParser.Node>): boolean {
		do {
			// eslint-disable-next-line no-param-reassign
			currentNode = currentNode?.next();

			if (currentNode?.type === 'nesting') {
				return true;
			}
		} while (currentNode?.next());

		return false;
	}
}
