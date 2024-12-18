import { OrderHelper } from '@modules/order/helpers';

export const ORDER_CONTENT_SELECTORS = OrderHelper.createSelectors([
	'^[a-z]', // Example: 'div'
	'^\\*', // Example: '*'
	'^\\.\\w+', // Example: '.class'
	'^\\w+\\[\\w+', // Example: 'input[type]'
	'^\\w+\\[\\w+\\$=', // Example: 'input[type$="text"]'
	'^\\w+\\[\\w+\\^=', // Example: 'input[type^="text"]'
	'^\\w+\\[\\w+\\*=', // Example: 'input[type*="text"]'
	'^\\w+\\[\\w+\\~=', // Example: 'input[type~="text"]'
	'^\\w+\\[\\w+\\|=', // Example: 'input[type|="text"]'
	'^\\w+\\[\\w+="\\w+"]', // Example: 'input[type="text"]'
	'^\\[\\w+', // Example: '[attr]'
	'^\\[\\w+\\$=', // Example: '[attr$=value]'
	'^\\[\\w+\\^=', // Example: '[attr^=value]'
	'^\\[\\w+\\*=', // Example: '[attr*=value]'
	'^\\[\\w+\\~=', // Example: '[attr~=value]'
	'^\\[\\w+\\|=', // Example: '[attr|=value]'
	'^\\>', // Example: '> child'
	'^\\+', // Example: '+ sibling'
	'^\\~', // Example: '~ sibling'
	'^#', // Example: '#id'
	'^&\\.\\w+', // Example: '&.class'
	'^&\\[\\w+', // Example: '&[attr]'
	'^&\\[\\w+\\$=', // Example: '[attr$=value]'
	'^&\\[\\w+\\^=', // Example: '[attr^=value]'
	'^&\\[\\w+\\*=', // Example: '[attr*=value]'
	'^&\\[\\w+\\~=', // Example: '[attr~=value]'
	'^&\\[\\w+\\|=', // Example: '[attr|=value]'
	'^&', // Example: '&'
	'^&:not', // Example: '&:not(.class)'
]);
