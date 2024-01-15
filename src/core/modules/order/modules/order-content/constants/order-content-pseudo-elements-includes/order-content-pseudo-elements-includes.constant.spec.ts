import { ORDER_CONTENT_PSEUDO_ELEMENT_INCLUDES } from './order-content-pseudo-elements-includes.constant';

describe('ORDER_CONTENT_PSEUDO_ELEMENT_INCLUDES', () => {
	it('should return the following value', () => {
		expect(ORDER_CONTENT_PSEUDO_ELEMENT_INCLUDES).toEqual([
			{
				name: 'include',
				parameter: 'before-clean',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-hover',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-active',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'after-clean',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'after',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'after-hover',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'after-active',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-after-clean',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-after',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-after-hover',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-after-active',
				type: 'at-rule',
			},
		]);
	});
});
