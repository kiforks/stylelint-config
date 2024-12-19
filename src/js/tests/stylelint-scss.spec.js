import config from '../../../.stylelintrc.js';
import { getWarning } from './spec-helpers.js';

import stylelint from 'stylelint';

const { lint } = stylelint;

/** @see src/index.ts */
describe('stylelint-scss', () => {
	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-extend-no-missing-placeholder/README.md */
	describe('scss/at-extend-no-missing-placeholder', () => {
		const ruleName = 'scss/at-extend-no-missing-placeholder';

		describe('invalid', () => {
			it('should report when @extend is used with a class selector', async () => {
				const result = await lint({
					code: `
						.p {
						  @extend .b;
						}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Expected a placeholder selector (e.g. %placeholder) to be used in @extend (scss/at-extend-no-missing-placeholder)`
				);
			});

			it('should report when @extend is used with an ID selector', async () => {
				const result = await lint({
					code: `
						.p {
						  @extend #some-identifer;
						}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Expected a placeholder selector (e.g. %placeholder) to be used in @extend (scss/at-extend-no-missing-placeholder)`
				);
			});

			it('should report when @extend is used with a dynamically generated class selector', async () => {
				const result = await lint({
					code: `
						.p {
						  @extend .blah-#{$dynamically_generated_name};
						}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Expected a placeholder selector (e.g. %placeholder) to be used in @extend (scss/at-extend-no-missing-placeholder)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when @extend is used with a placeholder', async () => {
				const result = await lint({
					code: `
						p {
						  @extend %placeholder;
						}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report when @extend is used with a dynamically generated placeholder', async () => {
				const result = await lint({
					code: `
						p {
						  @extend #{$dynamically_generated_placeholder_name};
						}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-no-null/README.md */
	describe('scss/at-if-no-null', () => {
		const ruleName = 'scss/at-if-no-null';

		describe('invalid', () => {
			it('should report when @if is compared directly to null', async () => {
				const result = await lint({
					code: `
						a {
						    @if $x == null {}
						}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Expected @if not statement rather than @if statement == null (scss/at-if-no-null)`);
			});

			it('should report when @if is compared directly to not null', async () => {
				const result = await lint({
					code: `
						a {
					    @if $x != null {}
						}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Expected @if statement rather than @if statement != null (scss/at-if-no-null)`);
			});
		});

		describe('valid', () => {
			it('should not report when @if is used with a not null comparison in a negated form', async () => {
				const result = await lint({
					code: `
						a {
					    @if $x {}
						}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report ', async () => {
				const result = await lint({
					code: `
					a {
				    @if not $x {}
					}
					`,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-rule-no-unknown/README.md */
	describe('scss/at-rule-no-unknown', () => {
		const ruleName = 'scss/at-rule-no-unknown';

		describe('invalid', () => {
			it('should report unknown at-rule', async () => {
				const result = await lint({
					code: `
            @unknown {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected unknown at-rule "@unknown" (scss/at-rule-no-unknown)`);
			});
		});

		describe('valid', () => {
			it('should not report known function at-rule', async () => {
				const result = await lint({
					code: `
            @function foo () {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report known while at-rule', async () => {
				const result = await lint({
					code: `
                    @while ($i == 1) {}
                `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report known if-else at-rule', async () => {
				const result = await lint({
					code: `
                    @if ($i) {} @else {}
                `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/comment-no-empty/README.md */
	describe('scss/comment-no-empty', () => {
		const ruleName = 'scss/comment-no-empty';

		describe('invalid', () => {
			it('should report empty comment', async () => {
				const result = await lint({
					code: `
            /**/
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected empty comment (scss/comment-no-empty)`);
			});

			it('should report empty comment with spaces', async () => {
				const result = await lint({
					code: `
            /* */
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected empty comment (scss/comment-no-empty)`);
			});

			it('should report empty multiline comment', async () => {
				const result = await lint({
					code: `
            /*

            */
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected empty comment (scss/comment-no-empty)`);
			});
		});

		describe('valid', () => {
			it('should not report non-empty comment', async () => {
				const result = await lint({
					code: `
            /* comment */
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report non-empty multiline comment', async () => {
				const result = await lint({
					code: `
            /*
            * Multi-line Comment
            **/
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/declaration-nested-properties/README.md */
	describe('scss/declaration-nested-properties', () => {
		const ruleName = 'scss/declaration-nested-properties';

		describe('invalid', () => {
			it('should report when properties are nested', async () => {
				const result = await lint({
					code: `
              a {
                margin: {
                  left: 10px;
                }
              }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected nested property \"margin\" (scss/declaration-nested-properties)`);
			});
		});

		describe('valid', () => {
			it('should not report when properties are not nested', async () => {
				const result = await lint({
					code: `
            a {
              background-color: red;
              background-repeat: no-repeat;
            }
	        `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when using a browser-specific property', async () => {
				const result = await lint({
					code: `
            a {
              -webkit-box-sizing: border-box;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-no-missing-interpolation/README.md */
	describe('scss/dollar-variable-no-missing-interpolation', () => {
		const ruleName = 'scss/dollar-variable-no-missing-interpolation';

		describe('invalid', () => {
			it('should report when a variable is used without interpolation in @keyframes', async () => {
				const result = await lint({
					code: `
            $var: my-anim;
            @keyframes $var {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected variable $var to be interpolated when using it with @keyframes (scss/dollar-variable-no-missing-interpolation)`
				);
			});

			it('should report when a variable is used without interpolation in @counter-style', async () => {
				const result = await lint({
					code: `
            $var: "circled-digits";
            @counter-style $var {
              system: fixed;
              symbols: ➀ ➁ ➂;
              suffix: ' ';
              speak-as: numbers;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected variable $var to be interpolated when using it with @counter-style (scss/dollar-variable-no-missing-interpolation)`
				);
			});

			it('should report when a variable is used without interpolation in counter-reset', async () => {
				const result = await lint({
					code: `
            $var: "my-counter";
            body {
                counter-reset: $var;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected variable $var to be interpolated when using it with counter-reset (scss/dollar-variable-no-missing-interpolation)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when a variable is interpolated in @keyframes', async () => {
				const result = await lint({
					code: `
            $var: my-anim;
            @keyframes #{$var} {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when a variable is interpolated in @counter-style', async () => {
				const result = await lint({
					code: `
            $var: circled-digits;
            @counter-style #{$var} {
                system: fixed;
                symbols: ➀ ➁ ➂;
                suffix: ' ';
                speak-as: numbers;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when a variable is not interpolated but is used where interpolation is not required', async () => {
				const result = await lint({
					code: `
            $var: my-counter;
            body {
                counter-reset: $var;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-default/README.md */
	describe('scss/dollar-variable-default', () => {
		const ruleName = 'scss/dollar-variable-default';

		describe('invalid', () => {
			it('should report when a global variable is declared without !default', async () => {
				const result = await lint({
					code: `
            $variable: 10px;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected !default flag for \"$variable\" (scss/dollar-variable-default)`);
			});
		});

		describe('valid', () => {
			it('should not report when a global variable is declared with !default', async () => {
				const result = await lint({
					code: `
            $var: 10px !default;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when a local variable is declared without !default', async () => {
				const result = await lint({
					code: `
            a {
              $local-var: 10px;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-no-namespaced-assignment/README.md */
	describe('scss/dollar-variable-no-namespaced-assignment', () => {
		const ruleName = 'scss/dollar-variable-no-namespaced-assignment';

		describe('invalid', () => {
			it('should report when assigning a value to a namespaced variable', async () => {
				const result = await lint({
					code: `
            imported.$foo: 1;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected assignment to a namespaced $ variable (scss/dollar-variable-no-namespaced-assignment)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when using a namespaced variable without assignment', async () => {
				const result = await lint({
					code: `
            a { b: imported.$foo-bar; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report when assigning a value to a local variable', async () => {
				const result = await lint({
					code: `
            a { $foo: 0; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-quote-no-quoted-strings-inside/README.md */
	describe('scss/function-quote-no-quoted-strings-inside', () => {
		const ruleName = 'scss/function-quote-no-quoted-strings-inside';

		describe('invalid', () => {
			it('should report when quoted string is used inside quote function', async () => {
				const result = await lint({
					code: `
            a {
              font-family: quote("Helvetica");
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Quote function used with an already-quoted string (scss/function-quote-no-quoted-strings-inside)`
				);
			});

			it('should report when quoted string variable is used inside quote function', async () => {
				const result = await lint({
					code: `
            $font: "Helvetica";
            p {
              font-family: quote($font);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Quote function used with an already-quoted string (scss/function-quote-no-quoted-strings-inside)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when unquoted string is used inside quote function', async () => {
				const result = await lint({
					code: `
            a {
              color: quote(blue);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when unquoted string variable is used inside quote function', async () => {
				const result = await lint({
					code: `
            $font: Helvetica;
            p {
              font-family: quote($font);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-unquote-no-unquoted-strings-inside/README.md */
	describe('scss/function-unquote-no-unquoted-strings-inside', () => {
		const ruleName = 'scss/function-unquote-no-unquoted-strings-inside';

		describe('invalid', () => {
			it('should report when unquoted string is used inside unquote function', async () => {
				const result = await lint({
					code: `
            a {
              font-family: unquote(Helvetica);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unquote function used with an already-unquoted string (scss/function-unquote-no-unquoted-strings-inside)`
				);
			});

			it('should report when unquoted string variable is used inside unquote function', async () => {
				const result = await lint({
					code: `
            $font: Helvetica;
            p {
              font-family: unquote($font);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unquote function used with an already-unquoted string (scss/function-unquote-no-unquoted-strings-inside)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when quoted string is used inside unquote function', async () => {
				const result = await lint({
					code: `
            a {
              color: unquote("blue");
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when quoted string variable is used inside unquote function', async () => {
				const result = await lint({
					code: `
            $font: "Helvetica";
            p {
              font-family: unquote($font);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/load-no-partial-leading-underscore/README.md */
	describe('scss/load-no-partial-leading-underscore', () => {
		const ruleName = 'scss/load-no-partial-leading-underscore';

		describe('invalid', () => {
			it('should report when a partial with a leading underscore is used in @import', async () => {
				const result = await lint({
					code: `
            @import "_foo";
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected leading underscore in imported partial name (scss/load-no-partial-leading-underscore)`
				);
			});

			it('should report when a partial with a leading underscore is used in @forward', async () => {
				const result = await lint({
					code: `
            @forward "path\\_fff";
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected leading underscore in imported partial name (scss/load-no-partial-leading-underscore)`
				);
			});

			it('should report when a partial with a leading underscore is used in @use', async () => {
				const result = await lint({
					code: `
            @use "df/fff", "_1.scss";
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected leading underscore in imported partial name (scss/load-no-partial-leading-underscore)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when the underscore is in the directory name, not in the partial name', async () => {
				const result = await lint({
					code: `
            @use "_path/fff";
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when the file has a .css extension in @forward', async () => {
				const result = await lint({
					code: `
            @forward "_file.css";
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-duplicate-mixins/README.md */
	describe('scss/no-duplicate-mixins', () => {
		const ruleName = 'scss/no-duplicate-mixins';

		describe('invalid', () => {
			it('should report when the same mixin is declared multiple times', async () => {
				const result = await lint({
					code: `
            @mixin font-size-default {
              font-size: 16px;
            }
            @mixin font-size-default {
              font-size: 18px;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Unexpected duplicate mixin font-size-default (scss/no-duplicate-mixins)`);
			});

			it('should report when the same mixin is declared multiple times with different parameters', async () => {
				const result = await lint({
					code: `
            @mixin font-size($property, $value) {
              #{$property}: $value;
            }
            @mixin font-size($var) {
              font-size: $var;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Unexpected duplicate mixin font-size (scss/no-duplicate-mixins)`);
			});
		});

		describe('valid', () => {
			it('should not report when different mixins are declared', async () => {
				const result = await lint({
					code: `
            @mixin font-size-default {
              font-size: 16px;
            }
            @mixin font-size-lg {
              font-size: 18px;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md */
	describe('scss/no-global-function-names', () => {
		const ruleName = 'scss/no-global-function-names';

		describe('invalid', () => {
			it('should report when a global function name is used', async () => {
				const result = await lint({
					code: `
            a {
              background: adjust-color(#6b717f, $red: 15);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected color.adjust instead of adjust-color (scss/no-global-function-names)`);
			});
		});

		describe('valid', () => {
			it('should not report when a namespaced function is used', async () => {
				const result = await lint({
					code: `
            @use "sass:color";
            a {
              background: color.adjust(#6b717f, $red: 15);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-newline-after/README.md */
	describe('scss/operator-no-newline-before', () => {
		const ruleName = 'scss/operator-no-newline-before';

		describe('invalid', () => {
			it('should report when there is a newline before an operator', async () => {
				const result = await lint({
					code: `
            a { width: 10
            + 1; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected newline before \"+\" (scss/operator-no-newline-before)`);
			});

			it('should report when there is a newline before an operator with indentation', async () => {
				const result = await lint({
					code: `
            a {
              width: 10
              + 1;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected newline before \"+\" (scss/operator-no-newline-before)`);
			});
		});

		describe('valid', () => {
			it('should not report when there is no newline before the operator', async () => {
				const result = await lint({
					code: `
            a { width: 10px - 1; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report when the operator is not the first character on the line', async () => {
				const result = await lint({
					code: `
            a { width: 100px +
            $var * 0.5625; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report when the operator is part of a negative value', async () => {
				const result = await lint({
					code: `
            a { width: 10px -1; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-unspaced/README.md */
	describe('scss/operator-no-unspaced', () => {
		const ruleName = 'scss/operator-no-unspaced';

		describe('invalid', () => {
			it('should report when there is no space around an operator', async () => {
				const result = await lint({
					code: `
            a { width: 10+1; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Expected single space before \"+\" (scss/operator-no-unspaced)`);
			});

			it('should report when there is no space before the operator', async () => {
				const result = await lint({
					code: `
            a { width: 10+ 1; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Expected single space before \"+\" (scss/operator-no-unspaced)`);
			});

			it('should report when there is more than one space around an operator', async () => {
				const result = await lint({
					code: `
            a { width: 10px  * 1.5; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Expected single space before \"*\" (scss/operator-no-unspaced)`);
			});
		});

		describe('valid', () => {
			it('should not report when operators are properly spaced', async () => {
				const result = await lint({
					code: `
            a { width: 10 * 1; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report when using space-delimited lists', async () => {
				const result = await lint({
					code: `
            a { width: 10px - 1; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report when using a division that is a part of CSS property value', async () => {
				const result = await lint({
					code: `
            a { width: 10px/1; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-redundant-nesting-selector/README.md */
	describe('scss/selector-no-redundant-nesting-selector', () => {
		const ruleName = 'scss/selector-no-redundant-nesting-selector';

		describe('invalid', () => {
			it('should report when & is used redundantly before an element', async () => {
				const result = await lint({
					code: `
            p {
              & a {}
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unnecessary nesting selector (&) (scss/selector-no-redundant-nesting-selector)`);
			});

			it('should report when & is used redundantly before a child selector', async () => {
				const result = await lint({
					code: `
            p {
              & > a {}
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unnecessary nesting selector (&) (scss/selector-no-redundant-nesting-selector)`);
			});

			it('should report when & is used redundantly before a class', async () => {
				const result = await lint({
					code: `
            p {
              & .class {}
            }
        `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unnecessary nesting selector (&) (scss/selector-no-redundant-nesting-selector)`);
			});
		});

		describe('valid', () => {
			it('should not report when & is used correctly with a class', async () => {
				const result = await lint({
					code: `
            p {
              &.foo {}
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report when & is used in a group selector', async () => {
				const result = await lint({
					code: `
            p {
              &,
              .foo,
              .bar {
                margin: 0;
              }
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report when & is used with an element selector in a different context', async () => {
				const result = await lint({
					code: `
            p {
              .foo > & {}
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-union-class-name/README.md */
	describe('scss/selector-no-union-class-name', () => {
		const ruleName = 'scss/selector-no-union-class-name';

		describe('invalid', () => {
			it('should report when union class names are used with the parent selector', async () => {
				const result = await lint({
					code: `
            .class {
              &-union {}
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected union class name with the parent selector (&) (scss/selector-no-union-class-name)`
				);
			});

			it('should report when &_ is used for union class names', async () => {
				const result = await lint({
					code: `
            .class {
              &_union {}
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected union class name with the parent selector (&) (scss/selector-no-union-class-name)`
				);
			});

			it('should report when & is used directly before a class name without any delimiter', async () => {
				const result = await lint({
					code: `
            .class {
              &union {}
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected union class name with the parent selector (&) (scss/selector-no-union-class-name)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when & is used correctly with a class in conjunction', async () => {
				const result = await lint({
					code: `
            .class {
              &.foo {}
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when & is used with an element selector', async () => {
				const result = await lint({
					code: `
            .class {
              & p {}
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-duplicate-dollar-variables/README.md */
	describe('scss/no-duplicate-dollar-variables', () => {
		const ruleName = 'scss/no-duplicate-dollar-variables';

		describe('invalid', () => {
			it('should report duplicate dollar variables in the same scope', async () => {
				const result = await lint({
					code: `
            $a: 1;
            $a: 2;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected duplicate dollar variable $a (scss/no-duplicate-dollar-variables)`);
			});

			it('should report duplicate dollar variables across different scopes', async () => {
				const result = await lint({
					code: `
            $a: 1;
            .b {
                $a: 1;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected duplicate dollar variable $a (scss/no-duplicate-dollar-variables)`);
			});

			it('should report duplicate dollar variables inside a mixin', async () => {
				const result = await lint({
					code: `
            $a: 1;
            @mixin b {
                $a: 1;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected duplicate dollar variable $a (scss/no-duplicate-dollar-variables)`);
			});
		});

		describe('valid', () => {
			it('should not report unique dollar variables', async () => {
				const result = await lint({
					code: `
            $a: 1;
            $b: 2;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report variables with !default flag', async () => {
				const result = await lint({
					code: `
            $a: 1;
            $a: 5 !default;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-closing-brace-newline-after/README.md */
	describe('scss/at-else-closing-brace-newline-after', () => {
		const ruleName = 'scss/at-else-closing-brace-newline-after';

		describe('invalid', () => {
			it('should report when there is no newline after the closing brace of @else', async () => {
				const result = await lint({
					code: `
            a {
              @if ($x == 1) {
              } @else {
              } width: 10px;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Expected newline after \"}\" of @else statement (scss/at-else-closing-brace-newline-after)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when there is a newline after the closing brace of @else', async () => {
				const result = await lint({
					code: `
            a {
              @if ($x == 1) {
              } @else if {
              } @else {
              }

              width: 10px;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should not report when @else is not the last statement in a chain', async () => {
				const result = await lint({
					code: `
            a {
              @if ($x == 1) { } @else if { }@else { }

              width: 10px;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-closing-brace-space-after/README.md */
	describe('scss/at-else-closing-brace-space-after', () => {
		const ruleName = 'scss/at-else-closing-brace-space-after';

		describe('invalid', () => {
			it('should report when there is no space after the closing brace of @else if', async () => {
				const result = await lint({
					code: `
            @if ($x == 1) {
            } @else if ($x == 2) {
            }@else {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected single space after \"}\" of @else statement (scss/at-else-closing-brace-space-after)`
				);
			});

			it('should report when there is more than one space after the closing brace of @else if', async () => {
				const result = await lint({
					code: `
            @if ($x == 1) {
            } @else if ($x == 2) {
            }  @else {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected single space after \"}\" of @else statement (scss/at-else-closing-brace-space-after)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when there is a single space after the closing brace of @else if', async () => {
				const result = await lint({
					code: `
            @if ($x == 1) {
            } @else if ($x == 2) {
            } @else {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when @else is the last statement in a conditional statement chain', async () => {
				const result = await lint({
					code: `
            @if ($x == 1) {
            } @else if ($x == 2) {
            } @else {}
            width: 10px;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-if-parentheses-space-before/README.md */
	describe('scss/at-else-if-parentheses-space-before', () => {
		const ruleName = 'scss/at-else-if-parentheses-space-before';

		describe('invalid', () => {
			it('should report when there is no space before @else if parentheses', async () => {
				const result = await lint({
					code: `
            @else if($condition) { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected a single space before parentheses in else-if declaration (scss/at-else-if-parentheses-space-before)`
				);
			});

			it('should report when there is more than one space before @else if parentheses', async () => {
				const result = await lint({
					code: `
                    @else if  ($condition) { }
                `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected a single space before parentheses in else-if declaration (scss/at-else-if-parentheses-space-before)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when there is exactly one space before @else if parentheses', async () => {
				const result = await lint({
					code: `
            @else if ($condition) { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when @else if is used without parentheses', async () => {
				const result = await lint({
					code: `
            @else if $condition { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-parentheses-space-before/README.md */
	describe('scss/at-function-parentheses-space-before', () => {
		const ruleName = 'scss/at-function-parentheses-space-before';

		describe('invalid', () => {
			it('should report when there is a space before @function parentheses', async () => {
				const result = await lint({
					code: `
            @function foo ($arg) { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(
					`Unexpected whitespace before parentheses in function declaration (scss/at-function-parentheses-space-before)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when there is no space before @function parentheses', async () => {
				const result = await lint({
					code: `
            @function foo($arg) { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-pattern/README.md */
	describe('scss/at-function-pattern', () => {
		const ruleName = 'scss/at-function-pattern';

		describe('invalid', () => {
			it('should report when function name does not match the kebab-case pattern', async () => {
				const result = await lint({
					code: `
            @function booBar($n) { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Expected function name to be kebab-case`);
			});
		});

		describe('valid', () => {
			it('should not report when function name matches the kebab-case pattern', async () => {
				const result = await lint({
					code: `
            @function foo-bar($n) { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-closing-brace-newline-after/README.md */
	describe('scss/at-if-closing-brace-newline-after', () => {
		const ruleName = 'scss/at-if-closing-brace-newline-after';

		describe('invalid', () => {
			it('should report when there is no newline after the closing brace of @if that is the last in chain', async () => {
				const result = await lint({
					code: `
            a {
              @if ($x == 1) {
              } width: 10px;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected newline after \"}\" of @if statement (scss/at-if-closing-brace-newline-after)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when there is a newline after the closing brace of @if that is last in chain', async () => {
				const result = await lint({
					code: `
            a {
              @if ($x == 1) {}
              width: 10px;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when @if is followed by @else', async () => {
				const result = await lint({
					code: `
            @if ($x == 1) {
            } @else {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-closing-brace-space-after/README.md */
	describe('scss/at-if-closing-brace-space-after', () => {
		const ruleName = 'scss/at-if-closing-brace-space-after';

		describe('invalid', () => {
			it('should report when there is no space after the closing brace of @if with @else following', async () => {
				const result = await lint({
					code: `
            @if ($x == 1) {
            }@else {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected single space after \"}\" of @if statement (scss/at-if-closing-brace-space-after)`
				);
			});

			it('should report when there is more than one space after the closing brace of @if with @else following', async () => {
				const result = await lint({
					code: `
            @if ($x == 1) {
            }  @else {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected single space after \"}\" of @if statement (scss/at-if-closing-brace-space-after)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when there is a single space after the closing brace of @if with @else following', async () => {
				const result = await lint({
					code: `
            @if ($x == 1) {
            } @else {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when @if is followed by another statement, not @else', async () => {
				const result = await lint({
					code: `
            @if ($x == 1) {
            } @include x;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-argumentless-call-parentheses/README.md */
	describe('scss/at-mixin-argumentless-call-parentheses', () => {
		const ruleName = 'scss/at-mixin-argumentless-call-parentheses';

		describe('invalid', () => {
			it('should report when parentheses are used in argumentless @mixin calls', async () => {
				const result = await lint({
					code: `
            @include mixin-name();
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected parentheses in argumentless mixin \"mixin-name\" call (scss/at-mixin-argumentless-call-parentheses)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when no parentheses are used in argumentless @mixin calls', async () => {
				const result = await lint({
					code: `
            @include mixin-name;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-parentheses-space-before/README.md */
	describe('scss/at-mixin-parentheses-space-before', () => {
		const ruleName = 'scss/at-mixin-parentheses-space-before';

		describe('invalid', () => {
			it('should report when there is a space before @mixin parentheses', async () => {
				const result = await lint({
					code: `
            @mixin foo ($arg) { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected whitespace before parentheses in mixin declaration (scss/at-mixin-parentheses-space-before)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when there is no space before @mixin parentheses', async () => {
				const result = await lint({
					code: `
            @mixin foo($arg) { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when @mixin is used without arguments', async () => {
				const result = await lint({
					code: `
            @mixin foo { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-pattern/README.md */
	describe('scss/at-mixin-pattern', () => {
		const ruleName = 'scss/at-mixin-pattern';

		describe('invalid', () => {
			it('should report when mixin name does not match the kebab-case pattern', async () => {
				const result = await lint({
					code: `
            @mixin booBar { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected mixin name to be kebab-case`);
			});
		});

		describe('valid', () => {
			it('should not report when mixin name matches the kebab-case pattern', async () => {
				const result = await lint({
					code: `
            @mixin foo-bar { }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-rule-conditional-no-parentheses/README.md */
	describe('scss/at-rule-conditional-no-parentheses', () => {
		const ruleName = 'scss/at-rule-conditional-no-parentheses';

		describe('invalid', () => {
			it('should report when parentheses are used in @if', async () => {
				const result = await lint({
					code: `
              @if (true) {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected () used to surround statements for @-rules (scss/at-rule-conditional-no-parentheses)`
				);
			});

			it('should report when parentheses are used in @else if', async () => {
				const result = await lint({
					code: `
            @else if (true) {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected () used to surround statements for @-rules (scss/at-rule-conditional-no-parentheses)`
				);
			});

			it('should report when parentheses are used in @while', async () => {
				const result = await lint({
					code: `
            @while (true) {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Unexpected () used to surround statements for @-rules (scss/at-rule-conditional-no-parentheses)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when no parentheses are used in @if', async () => {
				const result = await lint({
					code: `
            @if true {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when no parentheses are used in @else if', async () => {
				const result = await lint({
					code: `
            @else if true {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when no parentheses are used in @while', async () => {
				const result = await lint({
					code: `
            @while true {}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-colon-space-after/README.md */
	describe('scss/dollar-variable-colon-space-after with option always-single-line', () => {
		const ruleName = 'scss/dollar-variable-colon-space-after';

		describe('invalid', () => {
			it('should report when there is no space after the colon for single-line $variable declarations', async () => {
				const result = await lint({
					code: `
            $box-shadow:0 0 0 1px #5b9dd9, 0 0 2px 1px rgba(30, 140, 190, 0.8);
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(
					`Expected single space after \":\" with a single-line value (scss/dollar-variable-colon-space-after)`
				);
			});
		});

		describe('valid', () => {
			it('should not report when there is a single space after the colon for single-line $variable declarations inside a rule', async () => {
				const result = await lint({
					code: `
            a {
              $box-shadow: 0 0 0 1px #5b9dd9, 0 0 2px 1px rgba(30, 140, 190, 0.8);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report for multi-line $variable declarations', async () => {
				const result = await lint({
					code: `
            $box-shadow:
              0 0 0 1px #5b9dd9,
              0 0 2px 1px rgba(30, 140, 190, 0.8);
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when there is a single space after the colon for single-line $variable declarations with multiple properties', async () => {
				const result = await lint({
					code: `
            a {
              $box-shadow:0 0 0 1px #5b9dd9,
                0 0 2px 1px rgba(30, 140, 190, 0.8);
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-colon-space-before/README.md */
	describe('scss/dollar-variable-colon-space-before with option never', () => {
		const ruleName = 'scss/dollar-variable-colon-space-before';

		describe('invalid', () => {
			it('should report when there is whitespace before the colon in $variable declarations', async () => {
				const result = await lint({
					code: `
            $variable : 10px;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Unexpected whitespace before \":\" (scss/dollar-variable-colon-space-before)`);
			});

			it('should report when there is a newline before the colon in $variable declarations', async () => {
				const result = await lint({
					code: `
            $variable
            :10px;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Unexpected whitespace before \":\" (scss/dollar-variable-colon-space-before)`);
			});
		});

		describe('valid', () => {
			it('should not report when there is no whitespace before the colon in $variable declarations', async () => {
				const result = await lint({
					code: `
            $variable:10px;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when there is no whitespace before the colon in nested $variable declarations', async () => {
				const result = await lint({
					code: `
            a {
              $variable:10px;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-first-in-block/README.md */
	describe('scss/dollar-variable-first-in-block with option { ignore: ["comments", "imports"] }', () => {
		const ruleName = 'scss/dollar-variable-first-in-block';

		describe('invalid', () => {
			it('should report when $variable declaration is not the first in a block', async () => {
				const result = await lint({
					code: `
            a {
              width: 100px;
              $var: 1;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected $-variable to be first in block (scss/dollar-variable-first-in-block)`);
			});
		});

		describe('valid', () => {
			it('should not report when $variable declaration is the first in a block', async () => {
				const result = await lint({
					code: `
            a {
              $var: 1;
              color: red;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when $variable declaration follows an @import statement', async () => {
				const result = await lint({
					code: `
            @import "1.css";
            $var: 1;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when $variable declaration follows a comment', async () => {
				const result = await lint({
					code: `
            // Comment
            $var: 1;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-empty-line-before/README.md */
	describe('scss/dollar-variable-empty-line-before with option always', () => {
		const ruleName = 'scss/dollar-variable-empty-line-before';

		describe('invalid', () => {
			it('should report when there is no empty line before a $variable declaration', async () => {
				const result = await lint({
					code: `
            a {
              color: red;
              $var: 1;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected an empty line before $-variable (scss/dollar-variable-empty-line-before)`);
			});
		});

		describe('valid', () => {
			it('should not report when there is an empty line before a $variable declaration', async () => {
				const result = await lint({
					code: `
            a {
              color: red;

              $var: 1;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report for the first $variable declaration in a file', async () => {
				const result = await lint({
					code: `
            $var: 100px;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});

		describe('with ignore option', () => {
			describe('ignore after-comment', () => {
				it('should not report when $variable declaration follows a comment', async () => {
					const result = await lint({
						code: `
              // Comment
              $var: 1;
	          `,
						config,
					});

					const warning = getWarning(result, ruleName);
					expect(warning).toBeFalsy();
				});
			});

			describe('ignore inside-single-line-block', () => {
				it('should not report when $variable is inside a single-line block', async () => {
					const result = await lint({
						code: `
              a { $var: 10; }
            `,
						config,
					});

					const warning = getWarning(result, ruleName);
					expect(warning).toBeFalsy();
				});
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-pattern/README.md */
	describe('scss/dollar-variable-pattern', () => {
		const ruleName = 'scss/dollar-variable-pattern';

		describe('invalid', () => {
			it('should report when variable name does not match the pattern', async () => {
				const result = await lint({
					code: `
            $fooBar: 0;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected variable to be kebab-case`);
			});
		});

		describe('valid', () => {
			it('should not report when variable name matches the pattern', async () => {
				const result = await lint({
					code: `
            $foo-bar: 0;
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});

		describe('ignore local', () => {
			it('should not report local variables even if they do not match the pattern', async () => {
				const result = await lint({
					code: `
						$foo-name00: 10px;
						a { $bar-name01: 10px; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-empty-line-before/README.md */
	describe('scss/double-slash-comment-empty-line-before', () => {
		const ruleName = 'scss/double-slash-comment-empty-line-before';

		describe('invalid', () => {
			it('should report when there is no empty line before a // comment', async () => {
				const result = await lint({
					code: `
            a {}
            // comment
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Expected empty line before comment (scss/double-slash-comment-empty-line-before)`);
			});
		});

		describe('valid', () => {
			it('should not report when there is an empty line before a // comment', async () => {
				const result = await lint({
					code: `
            a {}

            // comment
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});
		});

		describe('inside-block exception', () => {
			it('should not report for // comments inside a block with "always" option', async () => {
				const result = await lint({
					code: `
	          a {
						  background: pink;
						
						  // comment
						  // comment
						  color: #eee;
						}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report', async () => {
				const result = await lint({
					code: `
	         a {
						  background: pink;
						  // stylelint-disable color-no-hex
						  color: pink;
						}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning).toBeFalsy();
			});

			it('should report', async () => {
				const result = await lint({
					code: `
	           a {
						  background: pink;
						  // not a stylelint command
						  color: #eee;
						}
          `,
					config,
				});

				const warning = getWarning(result, ruleName);

				expect(warning.text).toBe(`Expected empty line before comment (scss/double-slash-comment-empty-line-before)`);
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-whitespace-inside/README.md */
	describe('scss/double-slash-comment-whitespace-inside', () => {
		const ruleName = 'scss/double-slash-comment-whitespace-inside';

		describe('invalid', () => {
			it('should report when there is no whitespace after // in comments', async () => {
				const result = await lint({
					code: `
            //comment
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected a space after // (scss/double-slash-comment-whitespace-inside)`);
			});
		});

		describe('valid', () => {
			it('should not report when there is whitespace after // in comments', async () => {
				const result = await lint({
					code: `
            // comment
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when there is multiple whitespace after /// in comments', async () => {
				const result = await lint({
					code: `
            ///   comment
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});

	/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/percent-placeholder-pattern/README.md */
	describe('scss/percent-placeholder-pattern', () => {
		const ruleName = 'scss/percent-placeholder-pattern';

		describe('invalid', () => {
			it('should report when placeholder does not match the pattern', async () => {
				const result = await lint({
					code: `
              %myria_d { display: flex; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected placeholder to be kebab-case`);
			});

			it('should report when nested placeholder does not match the pattern', async () => {
				const result = await lint({
					code: `
            %fooBar { 
              &-supa { display: flex; }
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected placeholder to be kebab-case`);
			});

			it('should report when the first level placeholder does not match the pattern', async () => {
				const result = await lint({
					code: `
            %foo- { 
              &bar { display: flex; }
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning.text).toBe(`Expected placeholder to be kebab-case`);
			});
		});

		describe('valid', () => {
			it('should not report when placeholder matches the pattern', async () => {
				const result = await lint({
					code: `
            %foo-aimp { display: flex; }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report when nested placeholder matches the pattern', async () => {
				const result = await lint({
					code: `
            %foo-bar { 
              &lignt { display: flex; }
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});

			it('should not report for extend with placeholders', async () => {
				const result = await lint({
					code: `
            .p {
              @extend %mathy;
            }
          `,
					config,
				});

				const warning = getWarning(result, ruleName);
				expect(warning).toBeFalsy();
			});
		});
	});
});
