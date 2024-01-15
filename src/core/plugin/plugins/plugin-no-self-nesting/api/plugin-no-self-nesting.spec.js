import config from '../../../../../../.stylelintrc.js';
import { getWarning } from '../../../../../js/tests/spec-helpers.js';

import stylelint from 'stylelint';

const lint = stylelint.lint;

describe('PluginNoSelfNesting', () => {
	const ruleName = 'kifor-stylelint/no-self-nesting';

	describe('invalid', () => {
		it('should report an error for nesting selector', async () => {
			const result = await lint({
				code: `
					.class {
						&::ng-deep {
							h1 {
								margin: 0;
								
								p {
									margin: 0;
									
									h1 {
										margin: 0;
									}
								}
							}
						}
					}
				`,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`Nesting is not allowed for child selector 'h1' under parent selector 'h1' when they match the specified pattern. (${ruleName})`
			);
		});

		it('should report an error for nesting at-rule', async () => {
			const result = await lint({
				code: `
					.class {
						@include media-min(md) { 
							margin: 0;
							
							p {
								margin: 0;
								
								@include media-max(sm) { 
									margin: 0;
									
									@include media-max(lg) { 
										margin: 0;
									}
								}
							}
						}
					}
				`,
				config,
			});

			result.results.forEach(item => {
				item.warnings.forEach((warning, index) => {
					if (warning.rule === ruleName) {
						if (!index)
							expect(warning.text).toBe(
								`Nesting is not allowed for child selector '\"@include media-max(sm)\"' under parent selector '\"include /^media-/\"' when they match the specified pattern. (${ruleName})`
							);
						if (index)
							expect(warning.text).toBe(
								`Nesting is not allowed for child selector '\"@include media-max(lg)\"' under parent selector '\"include /^media-/\"' when they match the specified pattern. (${ruleName})`
							);
					}
				});
			});
		});
	});

	describe('valid', () => {
		it('should not report an error for invalid nesting selector', async () => {
			const result = await lint({
				code: `
					.class {
						&::ng-deep {
							h1 {
								margin: 0;
								
								p {
									margin: 0;
									
									h2 {
										margin: 0;
									}
								}
							}
						}
					}
				`,
				config,
			});

			expect(getWarning(result, ruleName)).toBeFalsy();
		});
	});
});
