import config from '../../../../../../.stylelintrc.js';
import { getWarning } from '../../../../../js/tests/spec-helpers.js';

import stylelint from 'stylelint';

const lint = stylelint.lint;

describe('PluginNoFirstLevelNesting', () => {
	const ruleName = 'kifor-stylelint/no-first-level-nesting';

	describe('invalid', () => {
		it('should report an error for a pseudo-element when first level nesting is not allowed', async () => {
			const result = await lint({
				code: `
					::ng-deep {}
				`,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`First level nesting of "::ng-deep" is not allowed for the given /^(?![a-zA-Z.#])(?!(?::host|:root)).*$/ rule pattern. (${ruleName})`
			);
		});

		it('should report an error for a pseudo-class when first level nesting is not allowed', async () => {
			const result = await lint({
				code: `
					:hover {}
				`,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`First level nesting of ":hover" is not allowed for the given /^(?![a-zA-Z.#])(?!(?::host|:root)).*$/ rule pattern. (${ruleName})`
			);
		});

		it('should report an error for an @include rule with a media feature when first level nesting is not allowed', async () => {
			const result = await lint({
				code: `
					@include media-min(md) {}
				`,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`First level nesting of "@include media-min(md)" is not allowed for the given "include /^media-/" rule pattern. (${ruleName})`
			);
		});

		it('should report an error for a @media rule when first level nesting is not allowed', async () => {
			const result = await lint({
				code: `
					@media screen {}
				`,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`First level nesting of "@media screen" is not allowed for the given \"/^media/\" rule pattern. (${ruleName})`
			);
		});

		it('should report an error for the reference combinator ">" when first level nesting is not allowed', async () => {
			const result = await lint({
				code: `
					> {}
				`,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`First level nesting of ">" is not allowed for the given /^(?![a-zA-Z.#])(?!(?::host|:root)).*$/ rule pattern. (${ruleName})`
			);
		});

		it('should report an error for the sibling combinator "&" when first level nesting is not allowed', async () => {
			const result = await lint({
				code: `
					& {}
				`,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`First level nesting of "&" is not allowed for the given /^(?![a-zA-Z.#])(?!(?::host|:root)).*$/ rule pattern. (${ruleName})`
			);
		});

		it('should report an error for the adjacent sibling combinator "~" when first level nesting is not allowed ', async () => {
			const result = await lint({
				code: `
					~ {}
				`,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`First level nesting of "~" is not allowed for the given /^(?![a-zA-Z.#])(?!(?::host|:root)).*$/ rule pattern. (${ruleName})`
			);
		});

		it('should report an error for the adjacent sibling combinator "+" when first level nesting is not allowed', async () => {
			const result = await lint({
				code: `
					+ {}
				`,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`First level nesting of "+" is not allowed for the given /^(?![a-zA-Z.#])(?!(?::host|:root)).*$/ rule pattern. (${ruleName})`
			);
		});
	});

	describe('valid', () => {
		it('should not report an error for class selectors when first level nesting is allowed', async () => {
			const result = await lint({
				code: `
					.class {}
				`,
				config,
			});

			expect(getWarning(result, ruleName)).toBeFalsy();
		});

		it('should not report an error for ID selectors when first level nesting is allowed', async () => {
			const result = await lint({
				code: `
					#element-id {}
				`,
				config,
			});

			expect(getWarning(result, ruleName)).toBeFalsy();
		});

		it('should not report an error for element selectors when first level nesting is allowed', async () => {
			const result = await lint({
				code: `
					div {}
				`,
				config,
			});

			expect(getWarning(result, ruleName)).toBeFalsy();
		});
	});
});
