import { PluginHelper } from '@plugin/helpers';
import { PluginCheckData, PluginData, PluginRuleOptions } from '@plugin/interfaces';

import { PluginMaxNestingDepthPossibleOptions, PluginMaxNestingDepthSecondaryOptions } from '../interfaces';

import { PluginBase } from '../../plugin-base';

import { Node } from 'postcss';
import parser from 'postcss-selector-parser';

/**
 * Source was taken from:
 * @see https://github.com/stylelint/stylelint/blob/main/lib/rules/max-nesting-depth/README.md
 */
export class PluginMaxNestingDepth extends PluginBase {
	protected readonly ruleName = 'max-nesting-depth';

	private isIgnoreHostSelector = false;

	protected readonly message = (depth: string): string => `Expected nesting depth to be no more than ${depth}`;

	protected initialize({
		options: maxDepth,
		secondaryOptions,
		result,
	}: PluginData<number, PluginMaxNestingDepthSecondaryOptions>): void {
		const possibleValues = [PluginHelper.isString, PluginHelper.isRegExp];
		const possibleSecondary: PluginMaxNestingDepthPossibleOptions = {
			ignore: ['blockless-at-rules', 'pseudo-classes'],
			ignoreAtRules: possibleValues,
			ignoreRules: possibleValues,
			ignorePseudoClasses: possibleValues,
			ignoreHostSelectors: possibleValues,
		};
		const mainOptions: PluginRuleOptions = {
			actual: maxDepth,
			possible: [PluginHelper.isNumber],
		};
		const optionalOptions: PluginRuleOptions = {
			optional: true,
			actual: secondaryOptions,
			possible: possibleSecondary,
		};

		if (!this.isValidOptions(mainOptions, optionalOptions)) return;

		this.checkRule(result, maxDepth, secondaryOptions);
		this.checkAtRule(result, maxDepth, secondaryOptions);
	}

	protected check({
		options: maxDepth,
		secondaryOptions,
		rule,
	}: PluginCheckData<number, PluginMaxNestingDepthSecondaryOptions>): false | void {
		const isIgnoreAtRule = this.isIgnoreAtRule(rule, secondaryOptions);
		const isIgnoreRule = this.isIgnoreRule(rule, secondaryOptions);

		if (isIgnoreAtRule || isIgnoreRule || PluginHelper.isInvalidSyntaxBlock(rule)) return;

		const nestingDepth = this.nestingDepth(rule, 0, secondaryOptions);

		if (nestingDepth === 0) this.isIgnoreHostSelector = this.isIgnoreHostSelectors(rule, secondaryOptions);

		const depth = this.isIgnoreHostSelector ? maxDepth + 1 : maxDepth;

		if (nestingDepth <= depth) return;

		this.reportProblem({ node: rule, messageArgs: [maxDepth] });
	}

	private nestingDepth(node: Node, level: number, secondaryOptions: PluginMaxNestingDepthSecondaryOptions): number {
		const { parent } = node;

		if (!parent) {
			return 0;
		}

		const isParentRoot = PluginHelper.isRoot(parent);
		const isGrandparentRootAndParentAtRule =
			PluginHelper.isAtRule(parent) && parent.parent && PluginHelper.isRoot(parent.parent);

		// The nesting maxDepth level's computation has finished
		// when this function, recursively called, receives
		// a node that is not nested -- a direct child of the
		// root node
		if (isParentRoot || isGrandparentRootAndParentAtRule) {
			return level;
		}

		const isIgnoreAtRule = this.isIgnoreAtRule(parent, secondaryOptions);
		const ignoresBlocklessAtRules =
			PluginHelper.optionsMatches(secondaryOptions, 'ignore', 'blockless-at-rules') &&
			PluginHelper.isAtRule(node) &&
			node.every(child => !PluginHelper.isDeclaration(child));
		const ignoresPseudoClasses =
			PluginHelper.optionsMatches(secondaryOptions, 'ignore', 'pseudo-classes') &&
			PluginHelper.isRule(node) &&
			this.containsPseudoClassesOnly(node.selector);
		const ignoresSpecificPseudoClassesOrRules =
			PluginHelper.isRule(node) && this.containsIgnoredPseudoClassesOrRulesOnly(node.selectors, secondaryOptions);
		const isIgnoreRule =
			isIgnoreAtRule || ignoresBlocklessAtRules || ignoresPseudoClasses || ignoresSpecificPseudoClassesOrRules;

		// Unless any of the conditions above apply, we want to
		// add 1 to the nesting maxDepth level and then check the parent,
		// continuing to add and move up the hierarchy
		// until we hit the root node
		return this.nestingDepth(parent, isIgnoreRule ? level : level + 1, secondaryOptions);
	}

	private isIgnoreRule(node: Node, secondaryOptions: PluginMaxNestingDepthSecondaryOptions): boolean {
		return (
			PluginHelper.isRule(node) &&
			PluginHelper.optionsMatches<keyof PluginMaxNestingDepthSecondaryOptions>(
				secondaryOptions,
				'ignoreRules',
				node.selector
			)
		);
	}

	private isIgnoreAtRule(node: Node, secondaryOptions: PluginMaxNestingDepthSecondaryOptions): boolean {
		return (
			PluginHelper.isAtRule(node) &&
			PluginHelper.optionsMatches<keyof PluginMaxNestingDepthSecondaryOptions>(
				secondaryOptions,
				'ignoreAtRules',
				node.name
			)
		);
	}

	private isIgnoreHostSelectors(node: Node, secondaryOptions: PluginMaxNestingDepthSecondaryOptions): boolean {
		return (
			PluginHelper.isParentRoot(node) &&
			PluginHelper.isRule(node) &&
			PluginHelper.optionsMatches<keyof PluginMaxNestingDepthSecondaryOptions>(
				secondaryOptions,
				'ignoreHostSelectors',
				node.selector
			)
		);
	}

	private containsPseudoClassesOnly(selector: string): boolean {
		const normalized = parser().processSync(selector, { lossless: false });
		const selectors = normalized.split(',');

		return selectors.every(item => this.extractPseudoRule(item));
	}

	private containsIgnoredPseudoClassesOrRulesOnly(
		selectors: string[],
		secondaryOptions: PluginMaxNestingDepthSecondaryOptions
	): boolean {
		const ignorePseudoClasses = secondaryOptions?.ignorePseudoClasses;
		const ignoreRules = secondaryOptions?.ignoreRules;
		const hasIgnoredEntities = !!ignorePseudoClasses || !!ignoreRules;

		return secondaryOptions && hasIgnoredEntities && this.allSelectorsMatchIgnoredRules(selectors, secondaryOptions);
	}

	private allSelectorsMatchIgnoredRules(
		selectors: string[],
		secondaryOptions: PluginMaxNestingDepthSecondaryOptions
	): boolean {
		return selectors.every(selector => {
			const ignoresRules =
				secondaryOptions?.ignoreRules && PluginHelper.optionsMatches(secondaryOptions, 'ignoreRules', selector);
			const ignorePseudoClasses = secondaryOptions?.ignorePseudoClasses;

			if (ignoresRules) return true;

			if (!ignorePseudoClasses) return false;

			const pseudoRule = this.extractPseudoRule(selector);

			return pseudoRule && PluginHelper.optionsMatches(secondaryOptions, 'ignorePseudoClasses', pseudoRule);
		});
	}

	private extractPseudoRule(selector: string): Nullable<string> {
		// Check if the selector starts with '&:' and does not have a double colon '::' indicating a pseudo-element
		const startsWithPseudoClass = selector.startsWith('&:') && selector[2] !== ':';

		// Extract and return the pseudo-rule part of the selector if the above condition is true, otherwise return undefined
		return startsWithPseudoClass ? selector.slice(2) : undefined;
	}
}
