import { OrderContentHelper } from './order-content.helper';

describe('OrderContentHelper', () => {
	describe('createMediaFeatures', () => {
		it('should create an array of media feature at-rules', () => {
			const features = ['max-width: 768px', 'min-resolution: 2dppx'],
				mediaFeatures = OrderContentHelper.createMediaFeatures(features);

			expect(mediaFeatures).toEqual([
				{ type: 'at-rule', name: 'media', parameter: '(max-width: 768px)' },
				{
					type: 'at-rule',
					name: 'media',
					parameter: '(min-resolution: 2dppx)',
				},
			]);
		});
	});

	describe('createPseudoClasses', () => {
		it('should create an array of pseudo class rules', () => {
			const pseudoClasses = ['hover', 'active'],
				pseudoClassRules = OrderContentHelper.createPseudoClasses(pseudoClasses);

			expect(pseudoClassRules).toEqual([
				{
					selector: '^:hover',
					type: 'rule',
				},
				{
					selector: '^:active',
					type: 'rule',
				},
				{
					selector: '^&:hover',
					type: 'rule',
				},
				{
					selector: '^&:active',
					type: 'rule',
				},
			]);
		});
	});

	describe('createPseudoElements', () => {
		it('should create an array of pseudo-element rules', () => {
			const pseudoElements = ['before', 'after'],
				pseudoElementRules = OrderContentHelper.createPseudoElements(pseudoElements);

			expect(pseudoElementRules).toEqual([
				{
					selector: '^::before',
					type: 'rule',
				},
				{
					selector: '^::after',
					type: 'rule',
				},
				{
					selector: '^&::before',
					type: 'rule',
				},
				{
					selector: '^&::after',
					type: 'rule',
				},
			]);
		});
	});
});
