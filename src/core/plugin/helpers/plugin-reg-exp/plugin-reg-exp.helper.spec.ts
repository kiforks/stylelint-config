import { PluginRegExpHelper } from './plugin-reg-exp.helper';

describe('PluginRegExp', () => {
	describe('makeRegex', () => {
		it('should create regex with wildcard for matching parenthesis', () => {
			const regex = PluginRegExpHelper.createWildcardRegex('color: (blue)');

			expect(regex).toEqual(new RegExp(/color: \(blue[\s\S]*\)/));
		});

		it('should create regex with wildcard at the end if no matching parenthesis', () => {
			const regex = PluginRegExpHelper.createWildcardRegex('color: blue');

			expect(regex).toEqual(/color: blue[\s\S]*/);
		});
	});
});
