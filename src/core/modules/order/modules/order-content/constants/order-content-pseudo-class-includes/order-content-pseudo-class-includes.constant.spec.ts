import { ORDER_CONTENT_PSEUDO_CLASS_INCLUDES } from './order-content-pseudo-class-includes.constant';

describe('ORDER_CONTENT_PSEUDO_CLASS_INCLUDES', () => {
	it('should return the following value', () => {
		expect(ORDER_CONTENT_PSEUDO_CLASS_INCLUDES).toEqual([
			{
				name: 'include',
				parameter: 'hover',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'active',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'focus',
				type: 'at-rule',
			},
		]);
	});
});
