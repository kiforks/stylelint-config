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
		const possibleValues = [PluginHelper.isString, PluginHelper.isRegExp],
			possibleSecondary: PluginMaxNestingDepthPossibleOptions = {
				ignore: ['blockless-at-rules', 'pseudo-classes'],
				ignoreAtRules: possibleValues,
				ignoreRules: possibleValues,
				ignorePseudoClasses: possibleValues,
				ignoreHostSelectors: possibleValues,
			},
			mainOptions: PluginRuleOptions = {
				actual: maxDepth,
				possible: [PluginHelper.isNumber],
			},
			optionalOptions: PluginRuleOptions = {
				optional: true,
				actual: secondaryOptions,
				possible: possibleSecondary,
			};

		if (!this.isValidOptions(mainOptions, optionalOptions)) {
			return;
		}

		this.checkRule(result, maxDepth, secondaryOptions);
		this.checkAtRule(result, maxDepth, secondaryOptions);
	}

	protected check({
		options: maxDepth,
		secondaryOptions,
		rule,
		// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
	}: PluginCheckData<number, PluginMaxNestingDepthSecondaryOptions>): false | void {
		const isIgnoreAtRule = this.isIgnoreAtRule(rule, secondaryOptions),
			isIgnoreRule = this.isIgnoreRule(rule, secondaryOptions);

		if (isIgnoreAtRule || isIgnoreRule || PluginHelper.isInvalidSyntaxBlock(rule)) {
			return;
		}

		const nestingDepth = this.nestingDepth(rule, 0, secondaryOptions);

		if (nestingDepth === 0) {
			this.isIgnoreHostSelector = this.isIgnoreHostSelectors(rule, secondaryOptions);
		}

		const depth = this.isIgnoreHostSelector ? maxDepth + 1 : maxDepth;

		if (nestingDepth <= depth) {
			return;
		}

		this.reportProblem({ node: rule, messageArgs: [maxDepth] });
	}

	private nestingDepth(node: Node, level: number, secondaryOptions: PluginMaxNestingDepthSecondaryOptions): number {
		const { parent } = node;

		if (!parent) {
			return 0;
		}

		const isParentRoot = PluginHelper.isRoot(parent),
			isGrandparentRootAndParentAtRule =
				PluginHelper.isAtRule(parent) && parent.parent && PluginHelper.isRoot(parent.parent);

		// The nesting maxDepth level's computation has finished
		// When this function, recursively called, receives
		// A node that is not nested -- a direct child of the
		// Root node
		if (isParentRoot || isGrandparentRootAndParentAtRule) {
			return level;
		}

		const isIgnoreAtRule = this.isIgnoreAtRule(parent, secondaryOptions),
			ignoresBlocklessAtRules =
				PluginHelper.optionsMatches(secondaryOptions as Record<string, unknown>, 'ignore', 'blockless-at-rules') &&
				PluginHelper.isAtRule(node) &&
				node.every(child => !PluginHelper.isDeclaration(child)),
			ignoresPseudoClasses =
				PluginHelper.optionsMatches(secondaryOptions as Record<string, unknown>, 'ignore', 'pseudo-classes') &&
				PluginHelper.isRule(node) &&
				this.containsPseudoClassesOnly(node.selector),
			ignoresSpecificPseudoClassesOrRules =
				PluginHelper.isRule(node) && this.containsIgnoredPseudoClassesOrRulesOnly(node.selectors, secondaryOptions),
			isIgnoreRule =
				isIgnoreAtRule || ignoresBlocklessAtRules || ignoresPseudoClasses || ignoresSpecificPseudoClassesOrRules;

		// Unless any of the conditions above apply, we want to
		// Add 1 to the nesting maxDepth level and then check the parent,
		// Continuing to add and move up the hierarchy
		// Until we hit the root node
		return this.nestingDepth(parent, isIgnoreRule ? level : level + 1, secondaryOptions);
	}

	private isIgnoreRule(node: Node, secondaryOptions: PluginMaxNestingDepthSecondaryOptions): boolean {
		return (
			PluginHelper.isRule(node) &&
			PluginHelper.optionsMatches<keyof PluginMaxNestingDepthSecondaryOptions>(
				secondaryOptions as Record<string, unknown>,
				'ignoreRules',
				node.selector
			)
		);
	}

	private isIgnoreAtRule(node: Node, secondaryOptions: PluginMaxNestingDepthSecondaryOptions): boolean {
		return (
			PluginHelper.isAtRule(node) &&
			PluginHelper.optionsMatches<keyof PluginMaxNestingDepthSecondaryOptions>(
				secondaryOptions as Record<string, unknown>,
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
				secondaryOptions as Record<string, unknown>,
				'ignoreHostSelectors',
				node.selector
			)
		);
	}

	private containsPseudoClassesOnly(selector: string): boolean {
		const normalized = parser().processSync(selector, { lossless: false }),
			selectors = normalized.split(',');

		return selectors.every(item => this.extractPseudoRule(item));
	}

	private containsIgnoredPseudoClassesOrRulesOnly(
		selectors: string[],
		secondaryOptions: PluginMaxNestingDepthSecondaryOptions
	): boolean {
		const ignorePseudoClasses = secondaryOptions?.ignorePseudoClasses,
			ignoreRules = secondaryOptions?.ignoreRules,
			hasIgnoredEntities = Boolean(ignorePseudoClasses) || Boolean(ignoreRules);

		return secondaryOptions && hasIgnoredEntities && this.allSelectorsMatchIgnoredRules(selectors, secondaryOptions);
	}

	private allSelectorsMatchIgnoredRules(
		selectors: string[],
		secondaryOptions: PluginMaxNestingDepthSecondaryOptions
	): boolean {
		return selectors.every(selector => {
			const ignoresRules =
					secondaryOptions?.ignoreRules &&
					PluginHelper.optionsMatches(secondaryOptions as Record<string, unknown>, 'ignoreRules', selector),
				ignorePseudoClasses = secondaryOptions?.ignorePseudoClasses;

			if (ignoresRules) {
				return true;
			}

			if (!ignorePseudoClasses) {
				return false;
			}

			const pseudoRule = this.extractPseudoRule(selector);

			return (
				pseudoRule &&
				PluginHelper.optionsMatches(secondaryOptions as Record<string, unknown>, 'ignorePseudoClasses', pseudoRule)
			);
		});
	}

	private extractPseudoRule(selector: string): Nullable<string> {
		const index = 2,
			// Check if the selector starts with '&:' and does not have a double colon '::' indicating a pseudo-element
			startsWithPseudoClass = selector.startsWith('&:') && selector[index] !== ':';

		// Extract and return the pseudo-rule part of the selector if the above condition is true, otherwise return undefined
		return startsWithPseudoClass ? selector.slice(index) : undefined;
	}
}
