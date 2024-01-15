import { PluginRegExpHelper } from '@plugin/helpers';

import { OrderHelper } from '../order';

export abstract class OrderRegExpHelper {
	/**
	 * Transforms the 'parameter' field of each rule in the array into a RegExp source string for flexible matching.
	 * @param rules - An array of objects, potentially containing 'parameter' fields.
	 * @returns The same array of objects with 'parameter' fields converted to RegExp source strings.
	 * @example For paramToRegex([
	 *   { type: 'at-rule', name: 'include', parameter: '^media-min(xs)' },
	 *   { type: 'at-rule', name: 'media', parameter: '(width)' }
	 * ]),
	 * output is [
	 *   { type: 'at-rule', name: 'include', parameter: ^media-min\(xs[\s\S]*\) },
	 *   { type: 'at-rule', name: 'media', parameter: \(width[\s\S]*\) }
	 * ])
	 */
	public static parametersToWildcardRegex<T>(rules: T[]): T[] {
		return rules.map(rule => {
			const isAtRule = OrderHelper.isAtRule(rule) && rule.type === 'at-rule';

			return isAtRule && typeof rule.parameter === 'string'
				? {
						...rule,
						parameter: PluginRegExpHelper.createWildcardRegex(rule.parameter).source,
					}
				: rule;
		});
	}
}
