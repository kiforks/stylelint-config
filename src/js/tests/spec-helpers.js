export const getWarning = (result, ruleName) => {
	const { warnings } = result.results[0];

	return warnings.find(warning => warning.rule === ruleName) || null;
};
