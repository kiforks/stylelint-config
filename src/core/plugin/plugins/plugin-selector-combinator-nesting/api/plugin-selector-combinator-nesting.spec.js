import config from '../../../../../../.stylelintrc.js';
import { getWarning } from '../../../../../js/tests/spec-helpers.js';

import stylelint from 'stylelint';

const { lint } = stylelint;

describe('PluginSelectorCombinatorNesting', () => {
	const ruleName = 'kifor-stylelint/selector-combinator-nesting';

	describe('"always" mode', () => {
		describe('invalid', () => {
			it('should report an error for adjacent class selectors', async () => {
				const result = await lint({
					code: `
						.foo .bar {}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected nesting ".foo .bar" detected. Selectors must be strictly nested and not at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for combined class selectors', async () => {
				const result = await lint({
					code: `
						.foo.bar {}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected nesting ".foo.bar" detected. Selectors must be strictly nested and not at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for child combinator selectors', async () => {
				const result = await lint({
					code: `
						.foo > .bar {}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected nesting ".foo > .bar" detected. Selectors must be strictly nested and not at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for pseudo-class selectors', async () => {
				const result = await lint({
					code: `
						.foo:hover {}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected nesting ".foo:hover" detected. Selectors must be strictly nested and not at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for attribute selectors', async () => {
				const result = await lint({
					code: `
						a[href='value'] {}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected nesting "a[href='value']" detected. Selectors must be strictly nested and not at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for adjacent sibling combinator selectors', async () => {
				const result = await lint({
					code: `
						* + li {}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected nesting "* + li" detected. Selectors must be strictly nested and not at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for complex pseudo-class selectors', async () => {
				const result = await lint({
					code: `
						:nth-child(2n - 1):last-child {}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected nesting ":nth-child(2n - 1):last-child" detected. Selectors must be strictly nested and not at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for multiple attribute selectors', async () => {
				const result = await lint({
					code: `
						[type='text'][name='message'] {}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected nesting "[type='text'][name='message']" detected. Selectors must be strictly nested and not at the same level as their parent. (${ruleName})`
				);
			});
		});

		describe('valid', () => {
			it('should not report an error for nested selectors inside a class', async () => {
				const result = await lint({
					code: `
						.foo { .bar {} }
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report an error for combined class selector used with ampersand', async () => {
				const result = await lint({
					code: `
						.foo { &.bar }
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report an error for child combinator selector nested inside a class', async () => {
				const result = await lint({
					code: `
						.foo { > .bar {} }
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report an error for pseudo-class selector nested inside a class', async () => {
				const result = await lint({
					code: `
						.foo { &:hover {} }
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report an error for attribute selector nested inside a class', async () => {
				const result = await lint({
					code: `
						a { &[href='value'] {} }
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report an error for adjacent sibling combinator selector nested inside an element', async () => {
				const result = await lint({
					code: `
						* { + li {} }
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report an error for complex pseudo-class selector nested inside an element', async () => {
				const result = await lint({
					code: `
						:nth-child(2n - 1) { &:last-child {} }
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report an error for multiple attribute selectors nested inside an element', async () => {
				const result = await lint({
					code: `
						[type='text'] { &[name='message'] {} }
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	describe('"never" mode', () => {
		describe('valid', () => {
			it('should not report an error for adjacent class selectors', async () => {
				const result = await lint({
					code: `
            .wrap { .foo .bar {} }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report an error for combined class selectors', async () => {
				const result = await lint({
					code: `
            .wrap { .foo.bar {} }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report an error for child combinator selectors', async () => {
				const result = await lint({
					code: `
            .wrap { .foo > .bar {} }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report an error for pseudo-class selectors', async () => {
				const result = await lint({
					code: `
            .wrap { .foo:hover {} }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report an error for attribute selectors', async () => {
				const result = await lint({
					code: `
            .wrap { a[href='value'] {} }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report an error for adjacent sibling combinator selectors', async () => {
				const result = await lint({
					code: `
            .wrap { * + li {} }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report an error for complex pseudo-class selectors', async () => {
				const result = await lint({
					code: `
            .wrap { :nth-child(2n - 1):last-child {} }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report an error for multiple attribute selectors', async () => {
				const result = await lint({
					code: `
            .wrap { [type='text'][name='message'] {} }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report an error for nested selectors inside a class at the first level of nesting', async () => {
				const result = await lint({
					code: `
            .foo { .bar { color: red; } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});

		describe('invalid', () => {
			it('should report an error for nested selectors inside a class', async () => {
				const result = await lint({
					code: `
            .wrap { .foo { .bar { color: red; } } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting ".bar" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for combined class selector used with ampersand', async () => {
				const result = await lint({
					code: `
            .wrap { .foo { &.bar {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "&.bar" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for child combinator selector nested inside a class', async () => {
				const result = await lint({
					code: `
            .wrap { .foo { > .bar {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "> .bar" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for pseudo-class selector nested inside a class', async () => {
				const result = await lint({
					code: `
            .wrap { .foo { &:hover {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "&:hover" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for attribute selector nested inside a class', async () => {
				const result = await lint({
					code: `
            .wrap { a { &[href='value'] {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "&[href='value']" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for adjacent sibling combinator selector nested inside an element', async () => {
				const result = await lint({
					code: `
            .wrap { * { + li {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "+ li" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for complex pseudo-class selector nested inside an element', async () => {
				const result = await lint({
					code: `
            .wrap { :nth-child(2n - 1) { &:last-child {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "&:last-child" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for multiple attribute selectors nested inside an element', async () => {
				const result = await lint({
					code: `
            .wrap { [type='text'] { &[name='message'] {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "&[name='message']" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for nested pseudo-elements inside a class', async () => {
				const result = await lint({
					code: `
            .wrap { .foo { &::before {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "&::before" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for nested combinators that create a descendant relationship', async () => {
				const result = await lint({
					code: `
            .wrap { .foo { .bar .baz {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting ".bar .baz" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for nested attribute selectors that imply a descendant relationship', async () => {
				const result = await lint({
					code: `
            .wrap { .foo { [type="text"] [name="message"] {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "[type="text"] [name="message"]" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});

			it('should report an error for nested tag selectors implying a parent-child relationship', async () => {
				const result = await lint({
					code: `
            .wrap { ul { li {} } }
          `,
					config: { ...config, rules: { [ruleName]: 'never' } },
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toContain(
					`Unexpected nesting "li" detected. Selectors must not be nested but should be at the same level as their parent. (${ruleName})`
				);
			});
		});
	});
});
