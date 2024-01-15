import config from '../../../.stylelintrc.js';

import stylelint from 'stylelint';

const lint = stylelint.lint;

/** @see src/index.ts */
describe('config', () => {
	describe('at-rule', () => {
		/** @see https://stylelint.io/user-guide/rules/at-rule-property-required-list/  */
		describe('at-rule-property-required-list', () => {
			it('should report an error for @font-face without font-display', async () => {
				const result = await lint({
					code: `
						@font-face {
					    font-family: 'foo';
					    src: url('./fonts/foo.woff2') format('woff2');
						}
					`,
					config,
				});

				const { warnings } = result.results[0];

				const customMediaPatternWarning = warnings.find(warning => warning.rule === 'at-rule-property-required-list');

				expect(customMediaPatternWarning.text).toContain(
					'Expected property "font-display" for at-rule "font-face" (at-rule-property-required-list'
				);
			});
		});
	});

	describe('function', () => {
		/** @see https://stylelint.io/user-guide/rules/function-disallowed-list/  */
		describe('function-disallowed-list', () => {
			it('should report an error for using the rgb function', async () => {
				const result = await lint({
					code: `
							.element {
							    color: rgb(0, 0, 0);
							}
						`,
					config,
				});

				const { warnings } = result.results[0];

				const customMediaPatternWarning = warnings.find(warning => warning.rule === 'function-disallowed-list');

				expect(customMediaPatternWarning.text).toContain('Unexpected function "rgb" (function-disallowed-list)');
			});
		});

		/** @see https://stylelint.io/user-guide/rules/function-url-no-scheme-relative/  */
		describe('function-url-no-scheme-relative', () => {
			it('should report an error for using scheme-relative URLs', async () => {
				const result = await lint({
					code: `
							a {
							  background: url("//www.google.com/file.jpg");
							}
						`,
					config,
				});

				const { warnings } = result.results[0];

				const customMediaPatternWarning = warnings.find(warning => warning.rule === 'function-url-no-scheme-relative');

				expect(customMediaPatternWarning.text).toContain(
					'Unexpected scheme-relative url (function-url-no-scheme-relative)'
				);
			});
		});

		/** @see https://stylelint.io/user-guide/rules/function-url-scheme-disallowed-list/  */
		describe('function-url-scheme-disallowed-list', () => {
			it('should report an error for URLs with the "ftp" scheme', async () => {
				const result = await lint({
					code: `
							a { background-image: url("ftp://www.example.com/file.jpg"); }
						`,
					config,
				});

				const ftpWarning = result.results[0].warnings.find(
					warning => warning.rule === 'function-url-scheme-disallowed-list'
				);
				expect(ftpWarning.text).toContain('Unexpected URL scheme "ftp:" (function-url-scheme-disallowed-list)');
			});

			it('should report an error for URLs with the "http" scheme', async () => {
				const result = await lint({
					code: 'a { background-image: url("http://www.example.com/file.jpg"); }',
					config,
				});

				const httpWarning = result.results[0].warnings.find(
					warning => warning.rule === 'function-url-scheme-disallowed-list'
				);
				expect(httpWarning.text).toContain('Unexpected URL scheme "http:" (function-url-scheme-disallowed-list)');
			});

			it('should report an error for URLs with the "https" scheme', async () => {
				const result = await lint({
					code: 'a { background-image: url("https://www.example.com/file.jpg"); }',
					config,
				});

				const httpsWarning = result.results[0].warnings.find(
					warning => warning.rule === 'function-url-scheme-disallowed-list'
				);
				expect(httpsWarning.text).toContain('Unexpected URL scheme "https:" (function-url-scheme-disallowed-list)');
			});
		});
	});

	describe('rule', () => {
		/** @see https://stylelint.io/user-guide/rules/rule-selector-property-disallowed-list  */
		describe('rule-selector-property-disallowed-list', () => {
			it('should report an error for using the font size for the ".ri-" class', async () => {
				const result = await lint({
					code: `
							.ri-icon {
							    font-size: 12px;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'rule-selector-property-disallowed-list');

				expect(warning.text).toContain(
					'Unexpected property "font-size" for selector ".ri-icon" (rule-selector-property-disallowed-list)'
				);
			});

			it('should report an error for using the font size for the "[class*=\'ri-\']" selector', async () => {
				const result = await lint({
					code: `
							[class*='ri-'] {
							    font-size: 12px;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'rule-selector-property-disallowed-list');

				expect(warning.text).toContain(
					'Unexpected property "font-size" for selector "[class*=\'ri-\']" (rule-selector-property-disallowed-list)'
				);
			});

			it('should report an error for using the font size for the "i" tag', async () => {
				const result = await lint({
					code: `
							i {
							    font-size: 12px;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'rule-selector-property-disallowed-list');

				expect(warning.text).toContain(
					'Unexpected property "font-size" for selector "i" (rule-selector-property-disallowed-list)'
				);
			});
		});

		/** @see https://stylelint.io/user-guide/rules/at-rule-disallowed-list  */
		describe('at-rule-disallowed-list', () => {
			it('should report an error for using the "@extend"', async () => {
				const result = await lint({
					code: `
							body {
							  @extend .some-class;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'at-rule-disallowed-list');

				expect(warning.text).toContain('Unexpected at-rule "extend" (at-rule-disallowed-list)');
			});
		});
	});

	describe('selector', () => {
		/** @see https://stylelint.io/user-guide/rules/selector-disallowed-list  */
		describe('selector-disallowed-list', () => {
			it('should report an error for using the ".container" class', async () => {
				const result = await lint({
					code: `
							.container {
							    color: red;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-disallowed-list');

				expect(warning.text).toContain('Unexpected selector ".container" (selector-disallowed-list)');
			});

			it('should report an error for using the "i" tag', async () => {
				const result = await lint({
					code: `
							i {
							    color: red;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-disallowed-list');

				expect(warning.text).toContain('Unexpected selector "i" (selector-disallowed-list)');
			});

			it('should report an error for using the ".g-col" class', async () => {
				const result = await lint({
					code: `
							.g-col-24 {
							    color: red;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-disallowed-list');

				expect(warning.text).toContain('Unexpected selector ".g-col-24" (selector-disallowed-list)');
			});

			it('should report an error for using the ".col" class', async () => {
				const result = await lint({
					code: `
							.col-24 {
							    color: red;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-disallowed-list');

				expect(warning.text).toContain('Unexpected selector ".col-24" (selector-disallowed-list)');
			});

			it('should report an error for using the ".grid" class', async () => {
				const result = await lint({
					code: `
							.grid {
							    color: red;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-disallowed-list');

				expect(warning.text).toContain('Unexpected selector ".grid" (selector-disallowed-list)');
			});

			it('should report an error for using the "[data-test]" attribute', async () => {
				const result = await lint({
					code: `
							[data-test="test"]{
							    color: red;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-disallowed-list');

				expect(warning.text).toContain('Unexpected selector "[data-test="test"]" (selector-disallowed-list)');
			});

			it('should report an error for using the "[data-po]" attribute', async () => {
				const result = await lint({
					code: `
							[data-po="test"]{
							    color: red;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-disallowed-list');

				expect(warning.text).toContain('Unexpected selector "[data-po="test"]" (selector-disallowed-list)');
			});
		});

		/** @see https://stylelint.io/user-guide/rules/selector-no-qualifying-type  */
		describe('selector-no-qualifying-type', () => {
			it('should report an error for using the "input.button" type and class combination', async () => {
				const result = await lint({
					code: `
							input.button {
								color: blue;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-no-qualifying-type');

				expect(warning.text).toContain(
					'Unexpected qualifying type selector "input.button" (selector-no-qualifying-type)'
				);
			});

			it('should report an error for using the "ul.list" type and class combination', async () => {
				const result = await lint({
					code: `
							input[type='button'] {
								margin: 0
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-no-qualifying-type');

				expect(warning.text).toContain(
					'Unexpected qualifying type selector "input[type=\'button\']" (selector-no-qualifying-type)'
				);
			});
		});
	});

	describe('unknown', () => {
		/** @see https://stylelint.io/user-guide/rules/at-rule-no-unknown  */
		describe('at-rule-no-unknown', () => {
			it('should report an error for unknown at-rule', async () => {
				const result = await lint({
					code: `
							@some-mixin {
							    color: red;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'at-rule-no-unknown');

				expect(warning.text).toContain('Unexpected unknown at-rule "@some-mixin" (at-rule-no-unknown)');
			});
		});

		/** @see https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown  */
		describe('declaration-property-value-no-unknown', () => {
			it('should report an error for unknown at-rule', async () => {
				const result = await lint({
					code: `
							a { top: red; }
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'declaration-property-value-no-unknown');

				expect(warning.text).toContain(
					'Unexpected unknown value "red" for property "top" (declaration-property-value-no-unknown)'
				);
			});
		});
	});

	describe('max & min', () => {
		/** @see https://stylelint.io/user-guide/rules/max-nesting-depth */
		describe('selector-max-attribute', () => {
			it('should report an error when more than 1 attribute selectors are used', async () => {
				const result = await lint({
					code: `
							[type="text"][name="message"] {
								color: red;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-max-attribute');

				expect(warning.text).toContain(
					'Expected "[type="text"][name="message"]" to have no more than 1 attribute selector (selector-max-attribute)'
				);
			});
		});

		/** @see https://stylelint.io/user-guide/rules/max-nesting-id */
		describe('selector-max-id', () => {
			it('should report an error when more than 1 attribute selectors are used', async () => {
				const result = await lint({
					code: `
							#selector {
								#selector-2 {
									color: red;
								}
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'selector-max-id');

				expect(warning.text).toContain('Expected "#selector-2" to have no more than 1 ID selector (selector-max-id)');
			});
		});

		/** @see https://stylelint.io/user-guide/rules/time-min-milliseconds */
		describe('time-min-milliseconds', () => {
			it('should report an error when more than 1 attribute selectors are used', async () => {
				const result = await lint({
					code: `
							#selector {
								animation: 49ms;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'time-min-milliseconds');

				expect(warning.text).toContain('Expected a minimum of 50 milliseconds (time-min-milliseconds)');
			});
		});
	});

	describe('notation', () => {
		/** @see https://stylelint.io/user-guide/rules/font-weight-notation */
		describe('font-weight-notation', () => {
			it('should report an error when more than 1 attribute selectors are used', async () => {
				const result = await lint({
					code: `
							#selector {
								font-weight: bold;
							}
						`,
					config,
				});

				const { warnings } = result.results[0];
				const warning = warnings.find(warning => warning.rule === 'font-weight-notation');

				expect(warning.text).toContain('Expected "bold" to be "700" (font-weight-notation)');
			});
		});
	});
});
