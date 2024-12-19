import { PluginRegExpStringMatchedData, PluginRuleType } from '../../interfaces';

import { AtRule, Comment, Container, Declaration, Document, Node, Root, Rule } from 'postcss';
import { FunctionNode, Node as ValueNode } from 'postcss-value-parser';
import { ChildNode } from 'postcss/lib/node';

/**
 * All of these methods are the utilities version of stylelint
 * @see https://github.com/stylelint/stylelint/tree/main/lib/utils
 *
 * Since this is a copied version of the original functions, there are no tests for this helper.
 * This is done purely to be able to test our .ts files, because .mjs files are not allowed.
 */
export abstract class PluginHelper {
	public static isInvalidSyntaxBlock(rule: PluginRuleType): boolean {
		const hasRuleBlock = PluginHelper.hasBlock(rule),
			isNotStandardSyntaxRule = PluginHelper.isRule(rule) && !PluginHelper.isStandardSyntaxRule(rule);

		return !hasRuleBlock || isNotStandardSyntaxRule;
	}

	public static isRoot(node: Node): node is Root {
		return node.type === 'root';
	}

	public static isParentRoot(node: Nullable<Node>): boolean {
		// @ts-ignore this is the only way to fix it
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return Boolean(node?.parent) && PluginHelper.isRoot(node.parent!);
	}

	public static isRule(node: Node): node is Rule {
		return node.type === 'rule';
	}

	public static isAtRule(node: Node): node is AtRule {
		return node.type === 'atrule';
	}

	public static isComment(node: Node): node is Comment {
		return node.type === 'comment';
	}

	public static isDeclaration(node: Node): node is Declaration {
		return node.type === 'decl';
	}

	public static isDocument(node: Node): node is Document {
		return node.type === 'document';
	}

	public static isValueFunction(node: ValueNode): node is FunctionNode {
		return node.type === 'function';
	}

	public static hasSource(node: Node): node is Node & { source: Node['source'] } {
		return Boolean(node.source);
	}

	public static hasBlock(statement: Container): boolean {
		return statement.nodes !== undefined;
	}

	public static isStandardSyntaxRule(rule: Rule | never): boolean {
		if (rule.type !== 'rule') {
			return false;
		}

		if ('extend' in rule && rule.extend) {
			return false;
		}

		return PluginHelper.isStandardSyntaxSelector(rule.selector);
	}

	public static isChildPluginAtRule(child: ChildNode): child is AtRule {
		return PluginHelper.isAtRule(child);
	}

	public static isValidChildPluginRule(child: ChildNode): child is PluginRuleType {
		return PluginHelper.isRule(child) || PluginHelper.isAtRule(child);
	}

	public static isStandardSyntaxSelector(selector: string): boolean {
		if (PluginHelper.hasInterpolation(selector)) {
			return false;
		}

		return !(
			selector.startsWith('%') ||
			selector.endsWith(':') ||
			/:extend(?:\(.*?\))?/.test(selector) ||
			/\.[\w-]+\(.*\).+/.test(selector) ||
			(selector.endsWith(')') && !selector.includes(':')) ||
			/\(@.*\)$/.test(selector) ||
			selector.includes('<%') ||
			selector.includes('%>') ||
			selector.includes('//')
		);
	}

	public static hasInterpolation(string: string): boolean {
		return (
			PluginHelper.hasLessInterpolation(string) ||
			PluginHelper.hasScssInterpolation(string) ||
			PluginHelper.hasTplInterpolation(string) ||
			PluginHelper.hasPsvInterpolation(string)
		);
	}

	public static hasLessInterpolation(string: string): boolean {
		return /@\{.+?}/.test(string);
	}

	public static hasPsvInterpolation(string: string): boolean {
		return /\$\(.+?\)/.test(string);
	}

	public static hasScssInterpolation(string: string): boolean {
		return /#\{.+?}/s.test(string);
	}

	public static hasTplInterpolation(string: string): boolean {
		return /\{.+?}/s.test(string);
	}

	public static getName(node: Node): Nullable<string> {
		if (!PluginHelper.isPluginRuleType(node)) {
			return null;
		}

		return PluginHelper.isRule(node) ? node.selector : node.params ? `@${node.name} ${node.params}` : `@${node.name}`;
	}

	public static isPluginRuleType(node: Node): node is PluginRuleType {
		return PluginHelper.isRule(node) || PluginHelper.isAtRule(node);
	}

	/**
	 * Compares a string to a second value that, if it fits a certain convention,
	 * is converted to a regular expression before the comparison.
	 * If it doesn't fit the convention, then two strings are compared.
	 *
	 * Any strings starting and ending with `/` are interpreted
	 * as regular expressions.
	 */
	public static matchesStringOrRegExp(
		input: string[] | string,
		comparison: Array<RegExp | string> | RegExp | string
	): PluginRegExpStringMatchedData {
		if (!Array.isArray(input)) {
			return PluginHelper.testAgainstStringOrRegExpOrArray(input, comparison);
		}

		for (const inputItem of input) {
			const testResult = PluginHelper.testAgainstStringOrRegExpOrArray(inputItem, comparison);

			if (testResult) {
				return testResult;
			}
		}

		return false;
	}

	/**
	 * Check if an options object's propertyName contains a user-defined string or
	 * regex that matches the passed-in input.
	 */
	public static optionsMatches<Key extends string = string>(
		options: Record<string, unknown>,
		propertyName: Key,
		input: unknown
	): boolean {
		if (!options || typeof input !== 'string') {
			return false;
		}

		const propertyValue = options[propertyName];

		if (propertyValue instanceof RegExp || Array.isArray(propertyValue)) {
			return Boolean(PluginHelper.matchesStringOrRegExp(input, propertyValue));
		}

		return false;
	}

	public static isBoolean(value: unknown): value is boolean {
		return typeof value === 'boolean' || value instanceof Boolean;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	public static isFunction(value: unknown): value is Function {
		return typeof value === 'function' || value instanceof Function;
	}

	public static isNullish(value: unknown): value is null | undefined {
		return value == null;
	}

	public static isNumber(value: unknown): value is number {
		return typeof value === 'number' || value instanceof Number;
	}

	public static isObject(value: unknown): value is object {
		return value !== null && typeof value === 'object';
	}

	public static isRegExp(value: unknown): value is RegExp {
		return value instanceof RegExp;
	}

	public static isString(value: unknown): value is string {
		return typeof value === 'string' || value instanceof String;
	}

	public static isPlainObject(value: unknown): value is Record<string, unknown> {
		return PluginHelper._isPlainObject(value);
	}

	public static assert(value: unknown, message?: string): asserts value {
		// eslint-disable-next-line no-console
		console.assert(value, message);
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	public static assertFunction(value: unknown): asserts value is Function {
		// eslint-disable-next-line no-console
		console.assert(PluginHelper.isFunction(value), `"${value}" must be a function`);
	}

	public static assertNumber(value: unknown): asserts value is number {
		// eslint-disable-next-line no-console
		console.assert(PluginHelper.isNumber(value), `"${value}" must be a number`);
	}

	public static assertString(value: unknown): asserts value is string {
		// eslint-disable-next-line no-console
		console.assert(PluginHelper.isString(value), `"${value}" must be a string`);
	}

	// Internal helper method to check if an object is plain
	private static _isPlainObject(o: unknown): boolean {
		if (!PluginHelper.isObject(o)) {
			return false;
		}

		const obj = o as object,
			ctor = obj.constructor;

		if (ctor === undefined) {
			return true;
		}

		const prot = ctor.prototype;

		if (!PluginHelper.isObject(prot)) {
			return false;
		}

		return Object.hasOwn(prot, 'isPrototypeOf');
	}

	private static testAgainstStringOrRegExpOrArray(
		value: string,
		comparison: Array<RegExp | string> | RegExp | string
	): false | { match: string; pattern: RegExp | string; substring: string } {
		if (!Array.isArray(comparison)) {
			return PluginHelper.testAgainstStringOrRegExp(value, comparison);
		}

		for (const comparisonItem of comparison) {
			const testResult = PluginHelper.testAgainstStringOrRegExp(value, comparisonItem);

			if (testResult) {
				return testResult;
			}
		}

		return false;
	}

	private static testAgainstStringOrRegExp(
		value: string,
		comparison: RegExp | string
	): false | { match: string; pattern: RegExp | string; substring: string } {
		if (comparison instanceof RegExp) {
			const match = value.match(comparison);

			return match ? { match: value, pattern: comparison, substring: match[0] || '' } : false;
		}

		const index = 2,
			[firstComparisonChar] = comparison,
			lastComparisonChar = comparison[comparison.length - 1],
			secondToLastComparisonChar = comparison[comparison.length - index],
			comparisonIsRegex =
				firstComparisonChar === '/' &&
				(lastComparisonChar === '/' || (secondToLastComparisonChar === '/' && lastComparisonChar === 'i')),
			hasCaseInsensitiveFlag = comparisonIsRegex && lastComparisonChar === 'i';

		if (comparisonIsRegex) {
			const regexPattern = hasCaseInsensitiveFlag ? comparison.slice(1, -index) : comparison.slice(1, -1),
				regexFlags = hasCaseInsensitiveFlag ? 'i' : '',
				valueMatch = value.match(new RegExp(regexPattern, regexFlags));

			return valueMatch ? { match: value, pattern: comparison, substring: valueMatch[0] || '' } : false;
		}

		return value === comparison ? { match: value, pattern: comparison, substring: value } : false;
	}
}
