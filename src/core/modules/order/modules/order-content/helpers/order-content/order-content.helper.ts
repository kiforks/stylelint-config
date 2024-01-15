import { OrderHelper } from '@modules/order/helpers';
import { OrderAtRule, OrderRule } from '@modules/order/interfaces';

export abstract class OrderContentHelper {
	/**
	 * Creates an array of media feature at-rules based on the provided features.
	 * Each feature is wrapped in parentheses before being passed to the RuleHelper's createAtRules method.
	 *
	 * @param features - An array of string representing the media features (e.g., 'max-width: 768px', 'min-resolution: 2dppx').
	 * @returns An array of AtRule objects representing the created media feature at-rules.
	 *
	 * @example
	 * For createMediaFeatures(['max-width: 768px', 'min-resolution: 2dppx']), the output is:
	 * [
	 *    { type: 'at-rule', name: 'media', parameter: '(max-width: 768px)' },
	 *    { type: 'at-rule', name: 'media', parameter: '(min-resolution: 2dppx)' }
	 * ]
	 */
	public static createMediaFeatures(features: string[]): OrderAtRule[] {
		return OrderHelper.createAtRules(
			'media',
			features.map(feature => `(${feature})`)
		);
	}

	/**
	 * Creates an array of pseudo class rules based on the provided pseudo class strings.
	 * Each pseudo class is prefixed with "^&:" before being passed to the RuleHelper's createSelectors method.
	 *
	 * @param pseudoClasses - An array of strings representing the pseudo classes (e.g., 'hover', 'active').
	 * @returns An array of Rule objects representing the created pseudo class rules.
	 *
	 * @example
	 * For createPseudoClasses(['hover', 'active']), the output is:
	 * [
	 *    { type: 'rule', selector: '^&:hover' },
	 *    { type: 'rule', selector: '^&:active' }
	 * ]
	 */
	public static createPseudoClasses(pseudoClasses: string[]): OrderRule[] {
		const ampCollection = OrderHelper.createSelectors(pseudoClasses.map(element => `^&:${element}`));
		const collection = OrderHelper.createSelectors(pseudoClasses.map(element => `^:${element}`));

		return [...collection, ...ampCollection] as OrderRule[];
	}

	/**
	 * Creates an array of pseudo-element rules based on the provided pseudo-element strings.
	 * Each pseudo-element is prefixed with "^&::" before being passed to the RuleHelper's createSelectors method.
	 *
	 * @param pseudoElements - An array of strings representing the pseudo-elements (e.g., 'before', 'after').
	 * @returns An array of Rule objects representing the created pseudo-element rules.
	 *
	 * @example
	 * For createPseudoElements(['before', 'after']), the output is:
	 * [
	 *    { type: 'rule', selector: '^&::before' },
	 *    { type: 'rule', selector: '^&::after' }
	 * ]
	 */
	public static createPseudoElements(pseudoElements: string[]): OrderRule[] {
		const ampCollection = OrderHelper.createSelectors(pseudoElements.map(element => `^&::${element}`));
		const collection = OrderHelper.createSelectors(pseudoElements.map(element => `^::${element}`));

		return [...collection, ...ampCollection] as OrderRule[];
	}
}
