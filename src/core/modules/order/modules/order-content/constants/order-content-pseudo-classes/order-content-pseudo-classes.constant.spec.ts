import { ORDER_CONTENT_PSEUDO_CLASSES } from './order-content-pseudo-classes.constant';

describe('ORDER_CONTENT_PSEUDO_CLASSES', () => {
	it('should return the following value', () => {
		expect(ORDER_CONTENT_PSEUDO_CLASSES).toEqual([
			{
				selector: '^:root',
				type: 'rule',
			},
			{
				selector: '^:first',
				type: 'rule',
			},
			{
				selector: '^:first-child',
				type: 'rule',
			},
			{
				selector: '^:first-of-type',
				type: 'rule',
			},
			{
				selector: '^:lang',
				type: 'rule',
			},
			{
				selector: '^:last-child',
				type: 'rule',
			},
			{
				selector: '^:last-of-type',
				type: 'rule',
			},
			{
				selector: '^:nth-last-child',
				type: 'rule',
			},
			{
				selector: '^:nth-last-of-type',
				type: 'rule',
			},
			{
				selector: '^:nth-child',
				type: 'rule',
			},
			{
				selector: '^:nth-of-type',
				type: 'rule',
			},
			{
				selector: '^:only-child',
				type: 'rule',
			},
			{
				selector: '^:only-of-type',
				type: 'rule',
			},
			{
				selector: '^:hover',
				type: 'rule',
			},
			{
				selector: '^:focus',
				type: 'rule',
			},
			{
				selector: '^:active',
				type: 'rule',
			},
			{
				selector: '^:visited',
				type: 'rule',
			},
			{
				selector: '^:invalid',
				type: 'rule',
			},
			{
				selector: '^:valid',
				type: 'rule',
			},
			{
				selector: '^:empty',
				type: 'rule',
			},
			{
				selector: '^:target',
				type: 'rule',
			},
			{
				selector: '^:enabled',
				type: 'rule',
			},
			{
				selector: '^:disabled',
				type: 'rule',
			},
			{
				selector: '^:checked',
				type: 'rule',
			},
			{
				selector: '^:is',
				type: 'rule',
			},
			{
				selector: '^:where',
				type: 'rule',
			},
			{
				selector: '^:has',
				type: 'rule',
			},
			{
				selector: '^:dir',
				type: 'rule',
			},
			{
				selector: '^:default',
				type: 'rule',
			},
			{
				selector: '^:optional',
				type: 'rule',
			},
			{
				selector: '^:required',
				type: 'rule',
			},
			{
				selector: '^:read-only',
				type: 'rule',
			},
			{
				selector: '^:read-write',
				type: 'rule',
			},
			{
				selector: '^:scope',
				type: 'rule',
			},
			{
				selector: '^:placeholder-shown',
				type: 'rule',
			},
			{
				selector: '^:autofill',
				type: 'rule',
			},
			{
				selector: '^:indeterminate',
				type: 'rule',
			},
			{
				selector: '^:[a-z]',
				type: 'rule',
			},
			{
				selector: '^&:root',
				type: 'rule',
			},
			{
				selector: '^&:first',
				type: 'rule',
			},
			{
				selector: '^&:first-child',
				type: 'rule',
			},
			{
				selector: '^&:first-of-type',
				type: 'rule',
			},
			{
				selector: '^&:lang',
				type: 'rule',
			},
			{
				selector: '^&:last-child',
				type: 'rule',
			},
			{
				selector: '^&:last-of-type',
				type: 'rule',
			},
			{
				selector: '^&:nth-last-child',
				type: 'rule',
			},
			{
				selector: '^&:nth-last-of-type',
				type: 'rule',
			},
			{
				selector: '^&:nth-child',
				type: 'rule',
			},
			{
				selector: '^&:nth-of-type',
				type: 'rule',
			},
			{
				selector: '^&:only-child',
				type: 'rule',
			},
			{
				selector: '^&:only-of-type',
				type: 'rule',
			},
			{
				selector: '^&:hover',
				type: 'rule',
			},
			{
				selector: '^&:focus',
				type: 'rule',
			},
			{
				selector: '^&:active',
				type: 'rule',
			},
			{
				selector: '^&:visited',
				type: 'rule',
			},
			{
				selector: '^&:invalid',
				type: 'rule',
			},
			{
				selector: '^&:valid',
				type: 'rule',
			},
			{
				selector: '^&:empty',
				type: 'rule',
			},
			{
				selector: '^&:target',
				type: 'rule',
			},
			{
				selector: '^&:enabled',
				type: 'rule',
			},
			{
				selector: '^&:disabled',
				type: 'rule',
			},
			{
				selector: '^&:checked',
				type: 'rule',
			},
			{
				selector: '^&:is',
				type: 'rule',
			},
			{
				selector: '^&:where',
				type: 'rule',
			},
			{
				selector: '^&:has',
				type: 'rule',
			},
			{
				selector: '^&:dir',
				type: 'rule',
			},
			{
				selector: '^&:default',
				type: 'rule',
			},
			{
				selector: '^&:optional',
				type: 'rule',
			},
			{
				selector: '^&:required',
				type: 'rule',
			},
			{
				selector: '^&:read-only',
				type: 'rule',
			},
			{
				selector: '^&:read-write',
				type: 'rule',
			},
			{
				selector: '^&:scope',
				type: 'rule',
			},
			{
				selector: '^&:placeholder-shown',
				type: 'rule',
			},
			{
				selector: '^&:autofill',
				type: 'rule',
			},
			{
				selector: '^&:indeterminate',
				type: 'rule',
			},
			{
				selector: '^&:[a-z]',
				type: 'rule',
			},
		]);
	});
});
