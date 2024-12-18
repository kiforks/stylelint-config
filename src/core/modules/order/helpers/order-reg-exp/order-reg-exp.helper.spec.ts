import { OrderRegExpHelper } from './order-reg-exp.helper';

describe('OrderRegExpHelper', () => {
	describe('parametersToWildcardRegex', () => {
		it('should transform rule parameters to regex source strings', () => {
			const rules = [
					{ type: 'at-rule', name: 'include', parameter: '^media-min(xs)' },
					{ type: 'at-rule', name: 'media', parameter: '(width)' },
				],
				transformed = OrderRegExpHelper.parametersToWildcardRegex(rules);

			expect(transformed).toEqual([
				{
					name: 'include',
					parameter: '^media-min\\(xs[\\s\\S]*\\)',
					type: 'at-rule',
				},
				{
					name: 'media',
					parameter: '\\(width[\\s\\S]*\\)',
					type: 'at-rule',
				},
			]);
		});

		it('should not modify rules without a string parameter', () => {
			const rules = [
					{ type: 'at-rule', name: 'include', parameter: 123 },
					{ type: 'rule', name: 'color', parameter: 'blue' },
				],
				transformed = OrderRegExpHelper.parametersToWildcardRegex(rules);

			expect(transformed).toEqual(rules);
		});
	});
});
