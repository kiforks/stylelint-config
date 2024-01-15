import { OrderHelper } from './order.helper';

describe('OrderHelper', () => {
	describe('isAtRule', () => {
		it('should return true for valid AtRule object', () => {
			const obj = { type: 'at-rule', parameter: 'example' };

			expect(OrderHelper.isAtRule(obj)).toBeTruthy();
		});

		it('should return false for invalid object', () => {
			const obj = { type: 'rule', value: 'example' };

			expect(OrderHelper.isAtRule(obj)).toBeFalsy();
		});
	});

	describe('createAtRule', () => {
		it('should create an at-rule object with the correct name and parameter', () => {
			const result = OrderHelper.createAtRule('media', 'screen and (max-width: 768px)');

			expect(result).toEqual({
				type: 'at-rule',
				name: 'media',
				parameter: 'screen and (max-width: 768px)',
			});
		});

		it('should create an at-rule object with the correct name and no parameter', () => {
			const result = OrderHelper.createAtRule('charset');

			expect(result).toEqual({
				type: 'at-rule',
				name: 'charset',
			});
		});
	});

	describe('createSelector', () => {
		it('should create a rule object with the correct selector', () => {
			const result = OrderHelper.createSelector('.myClass');

			expect(result).toEqual({
				type: 'rule',
				selector: '.myClass',
			});
		});
	});

	describe('createInclude', () => {
		it('should create an include rule with the correct mixin', () => {
			const result = OrderHelper.createInclude('mixinName');

			expect(result).toEqual({
				type: 'at-rule',
				name: 'include',
				parameter: 'mixinName',
			});
		});
	});

	describe('createSelectors', () => {
		it('should create an array of rule objects with the correct selectors', () => {
			const result = OrderHelper.createSelectors(['.class1', '.class2']);

			expect(result).toEqual([
				{ type: 'rule', selector: '.class1' },
				{ type: 'rule', selector: '.class2' },
			]);
		});
	});

	describe('createIncludes', () => {
		it('should create an array of include rules with the correct mixins', () => {
			const result = OrderHelper.createIncludes(['mixin1', 'mixin2']);

			expect(result).toEqual([
				{ type: 'at-rule', name: 'include', parameter: 'mixin1' },
				{ type: 'at-rule', name: 'include', parameter: 'mixin2' },
			]);
		});
	});

	describe('createAtRules', () => {
		it('should create an array of at-rule objects with the correct name and parameters', () => {
			const result = OrderHelper.createAtRules('media', ['screen and (max-width: 768px)', 'print']);

			expect(result).toEqual([
				{
					type: 'at-rule',
					name: 'media',
					parameter: 'screen and (max-width: 768px)',
				},
				{ type: 'at-rule', name: 'media', parameter: 'print' },
			]);
		});
	});
});
