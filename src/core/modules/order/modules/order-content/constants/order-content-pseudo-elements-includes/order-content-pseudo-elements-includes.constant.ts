import { OrderHelper } from '@modules/order/helpers';

export const ORDER_CONTENT_PSEUDO_ELEMENT_INCLUDES = OrderHelper.createIncludes([
	// Before
	'before-clean',
	'before',
	'before-hover',
	'before-active',

	// After
	'after-clean',
	'after',
	'after-hover',
	'after-active',

	// Before-after
	'before-after-clean',
	'before-after',
	'before-after-hover',
	'before-after-active',
]);
