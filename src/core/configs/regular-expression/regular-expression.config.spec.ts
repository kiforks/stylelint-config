import { RegularExpressionConfig } from './regular-expression.config';

describe('RegularExpressionConfig', () => {
	it('should have the proper value of the SCSS_SCOPE_VARIABLE', () => {
		expect(RegularExpressionConfig.ScssScopeVariable).toBe('/^[a-zA-Z0-9_-]+\\.\\$/');
	});

	it('should have the proper value of the SCSS_VARIABLE', () => {
		expect(RegularExpressionConfig.ScssScopeVariable).toBe('/^[a-zA-Z0-9_-]+\\.\\$/');
	});

	it('should have the proper value of the CSS_VARIABLE', () => {
		expect(RegularExpressionConfig.CssVariable).toBe('/^var\\(--/');
	});
});
