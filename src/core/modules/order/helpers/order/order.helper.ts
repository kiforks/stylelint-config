import { OrderAtRule, OrderRule } from '../../interfaces';

export abstract class OrderHelper {
	/**
	 * Checks if the given object conforms to the Rule interface.
	 * @param obj - The object to be checked.
	 * @returns true if obj is a Rule type, false otherwise.
	 * @example For isRule({ type: 'rule', selector: '.example' }), returns true.
	 */
	public static isRule(obj: unknown): obj is OrderRule {
		const isObject = typeof obj === 'object' && obj !== null;

		return isObject && 'type' in obj && obj.type === 'rule';
	}

	/**
	 * Checks if the given object conforms to the OrderAtRule interface.
	 * @param obj - The object to be checked.
	 * @returns true if obj is a OrderAtRule type, false otherwise.
	 * @example For isAtRule({ type: 'at-rule', name: 'font-feature-values' }), returns true.
	 */
	public static isAtRule(obj: unknown): obj is OrderAtRule {
		const isObject = typeof obj === 'object' && obj !== null;

		return isObject && 'type' in obj && obj.type === 'at-rule';
	}

	/**
	 * Creates an at-rule with a given name and parameter.
	 * @param name - The name of the at-rule (e.g., 'media', 'include', etc.).
	 * @param parameter - The parameter for the at-rule (e.g., 'screen and (max-width: 768px)', 'mixinName', etc.).
	 * @example: For createAtRule('media', 'screen and (max-width: 768px)'), the output is:
	 * { type: 'at-rule', name: 'media', parameter: 'screen and (max-width: 768px)' }.
	 */
	public static createAtRule(name: TextPattern, parameter?: TextPattern): OrderAtRule {
		return parameter
			? {
					type: 'at-rule',
					name,
					parameter,
				}
			: {
					type: 'at-rule',
					name,
				};
	}

	/**
	 * Creates a standard CSS rule with a given selector.
	 * @param selector - The CSS selector string or regular expression.
	 * @example: For createSelector('.myClass'), the output is:
	 * { type: 'rule', selector: '.myClass' }.
	 */
	public static createSelector(selector: TextPattern): OrderRule {
		return {
			type: 'rule',
			selector,
		};
	}

	/**
	 * Creates an @include rule with a given mixin parameter.
	 * @param mixin - The mixin parameter string or regular expression.
	 * @example: For createInclude('mixinName'), the output is:
	 * { type: 'at-rule', name: 'include', parameter: 'mixinName' }.
	 */
	public static createInclude<P extends TextPattern = TextPattern>(mixin: P): OrderAtRule<P> {
		return {
			type: 'at-rule',
			name: 'include',
			parameter: mixin,
		};
	}

	/**
	 * Creates an array of standard CSS rules with given selectors.
	 * @param selectors - Array of CSS selector strings or regular expressions.
	 * @example: For createSelectors(['.class1', '.class2']), the output is:
	 * [
	 *    { type: 'rule', selector: '.class1' },
	 *    { type: 'rule', selector: '.class2' }
	 * ]
	 */
	public static createSelectors(selectors: TextPattern[]): OrderRule[] {
		return selectors.map(selector => OrderHelper.createSelector(selector));
	}

	/**
	 * Creates an array of @include rules with given mixin parameters.
	 * @param mixins - Array of mixin parameters strings or regular expressions.
	 * @example: For createIncludes(['mixin1', 'mixin2']), the output is:
	 * [
	 *    { type: 'at-rule', name: 'include', parameter: 'mixin1' },
	 *    { type: 'at-rule', name: 'include', parameter: 'mixin2' }
	 * ]
	 */
	public static createIncludes<P extends TextPattern = TextPattern>(mixins: P[]): Array<OrderAtRule<P>> {
		return mixins.map(mixin => OrderHelper.createInclude(mixin));
	}

	/**
	 * Creates an array of at-rules with a given name and an array of parameters.
	 * @param name - The name of the at-rule (e.g., 'media', 'include', etc.).
	 * @param parameters - An array of parameters for the at-rule
	 * @example: For createAtRules('media', ['screen and (max-width: 768px)', 'print']), the output is:
	 * [
	 *    { type: 'at-rule', name: 'media', parameter: 'screen and (max-width: 768px)' },
	 *    { type: 'at-rule', name: 'media', parameter: 'print' }
	 * ]
	 */
	public static createAtRules(name: TextPattern, parameters: TextPattern[]): OrderAtRule[] {
		return parameters.map(parameter => OrderHelper.createAtRule(name, parameter));
	}
}
