export abstract class PluginRegExpHelper {
	/**
	 * Creates a RegExp based on the provided string, inserting a wildcard pattern for flexible matching.
	 * @param parameter - The string to be converted into a RegExp.
	 * @returns A RegExp object based on the input string, enhanced with wildcard patterns.
	 * @example For makeRegex('color: (blue)'), returns a RegExp matching /color: \(blue[\s\S]*\)/.
	 */
	public static createWildcardRegex(parameter: string): RegExp {
		// Search for the last opening parenthesis
		const lastOpeningIndex = parameter.lastIndexOf('(');
		// Find the corresponding closing parenthesis
		const closingIndex = parameter.indexOf(')', lastOpeningIndex);
		// Validate existence of both parenthesis
		const hasValidParenthesis = lastOpeningIndex !== -1 && closingIndex !== -1;

		// Insert [\s\S]* before the closing parenthesis
		const modifiedParameter = hasValidParenthesis
			? `${parameter.substring(0, closingIndex)}[\\s\\S]*${parameter.substring(closingIndex)}`
			: `${parameter}[\\s\\S]*`;

		// Escape special characters
		const escapedParameter = modifiedParameter.replace(/\(/g, '\\(').replace(/\)/g, '\\)');

		return new RegExp(escapedParameter);
	}
}
