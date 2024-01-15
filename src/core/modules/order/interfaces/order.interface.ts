export type RuleType = OrderAtRule | OrderRule;

/**
 * @see https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md#extended-at-rule-objects
 */
export interface OrderAtRule<P extends TextPattern = TextPattern> {
	hasBlock?: boolean;
	name?: TextPattern;
	parameter?: P;
	type: 'at-rule';
}

/**
 * @see https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md#extended-rule-objects
 */
export interface OrderRule {
	name?: TextPattern;
	selector?: TextPattern;
	type: 'rule';
}
