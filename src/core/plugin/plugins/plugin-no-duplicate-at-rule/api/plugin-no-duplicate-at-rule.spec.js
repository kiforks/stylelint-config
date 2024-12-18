import config from '../../../../../../.stylelintrc.js';
import { getWarning } from '../../../../../js/tests/spec-helpers.js';

import stylelint from 'stylelint';

const { lint } = stylelint;

describe('PluginNoDuplicateAtRule', () => {
	const ruleName = 'kifor-stylelint/no-duplicate-at-rule';

	describe('invalid', () => {
		it('should detect duplicate @include media-max at-rules at the same nesting level', async () => {
			const result = await lint({
				code: `
          @include media-max(sm) {
            background-color: red;
          }
          
          @include media-max(sm) {
            background-color: red;
          }
	      `,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`Unexpected duplicate at-rule \"include ^media-max\\(sm[\\s\\S]*\\)\" at the same nesting level (${ruleName})`
			);
		});

		it('should detect duplicate @include media-min at-rules at the same nesting level within a selector', async () => {
			const result = await lint({
				code: `
          div { 
            @include media-min(sm) {
	            background-color: red;
	          }
	          
	          @include media-min(sm) {
	            background-color: red;
	          }
          }
          
          @include media-max(md) {
            background-color: red;
          }
	      `,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning.text).toBe(
				`Unexpected duplicate at-rule \"include ^media-min\\(sm[\\s\\S]*\\)\" at the same nesting level (${ruleName})`
			);
		});
	});

	describe('valid', () => {
		it('should not detect duplicates when @include media-min and media-max are used at the same level', async () => {
			const result = await lint({
				code: `
          @include media-min(sm) {
            background-color: red;
          }
          
          @include media-max(md) {
            background-color: red;
          }
	      `,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning).toBeFalsy();
		});

		it('should not detect duplicates when @include media-min is used inside a selector and at the root level', async () => {
			const result = await lint({
				code: `
					div {
						@include media-min(sm) {
							background-color: red;
						}
					}
				
          @include media-min(sm) {
            background-color: red;
          }
          
          @include media-max(md) {
            background-color: red;
          }
	      `,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning).toBeFalsy();
		});

		it('should not report duplicates for the same @include directive under different selectors', async () => {
			const result = await lint({
				code: `
		      div {
		        @include media-min(sm) {
		          background-color: red;
		        }
		      }
		      
		      span {
		        @include media-min(sm) {
		          background-color: red;
		        }
		      }
		    `,
				config,
			});

			const warning = getWarning(result, ruleName);

			expect(warning).toBeFalsy();
		});
	});
});
