import { ORDER_CONTENT_SELECTORS } from './order-content-selectors.constant';

describe('ORDER_CONTENT_SELECTORS', () => {
	it('should return the following value', () => {
		expect(ORDER_CONTENT_SELECTORS).toEqual([
			{
				selector: '^[a-z]',
				type: 'rule',
			},
			{
				selector: '^\\*',
				type: 'rule',
			},
			{
				selector: '^\\.\\w+',
				type: 'rule',
			},
			{
				selector: '^\\w+\\[\\w+',
				type: 'rule',
			},
			{
				selector: '^\\w+\\[\\w+\\$=',
				type: 'rule',
			},
			{
				selector: '^\\w+\\[\\w+\\^=',
				type: 'rule',
			},
			{
				selector: '^\\w+\\[\\w+\\*=',
				type: 'rule',
			},
			{
				selector: '^\\w+\\[\\w+\\~=',
				type: 'rule',
			},
			{
				selector: '^\\w+\\[\\w+\\|=',
				type: 'rule',
			},
			{
				selector: '^\\w+\\[\\w+="\\w+"]',
				type: 'rule',
			},
			{
				selector: '^\\[\\w+',
				type: 'rule',
			},
			{
				selector: '^\\[\\w+\\$=',
				type: 'rule',
			},
			{
				selector: '^\\[\\w+\\^=',
				type: 'rule',
			},
			{
				selector: '^\\[\\w+\\*=',
				type: 'rule',
			},
			{
				selector: '^\\[\\w+\\~=',
				type: 'rule',
			},
			{
				selector: '^\\[\\w+\\|=',
				type: 'rule',
			},
			{
				selector: '^\\>',
				type: 'rule',
			},
			{
				selector: '^\\+',
				type: 'rule',
			},
			{
				selector: '^\\~',
				type: 'rule',
			},
			{
				selector: '^#',
				type: 'rule',
			},
			{
				selector: '^&\\.\\w+',
				type: 'rule',
			},
			{
				selector: '^&\\[\\w+',
				type: 'rule',
			},
			{
				selector: '^&\\[\\w+\\$=',
				type: 'rule',
			},
			{
				selector: '^&\\[\\w+\\^=',
				type: 'rule',
			},
			{
				selector: '^&\\[\\w+\\*=',
				type: 'rule',
			},
			{
				selector: '^&\\[\\w+\\~=',
				type: 'rule',
			},
			{
				selector: '^&\\[\\w+\\|=',
				type: 'rule',
			},
			{
				selector: '^&',
				type: 'rule',
			},
			{
				selector: '^&:not',
				type: 'rule',
			},
		]);
	});
});
