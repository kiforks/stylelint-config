import { OrderHelper } from '@modules/order/helpers';

import { OrderContentHelper } from '../../helpers';

export const ORDER_CONTENT_MEDIA_QUERY = [
	OrderHelper.createAtRule('media'),
	/*
	 * Standard media types
	 * */
	...OrderHelper.createAtRules('media', ['all', 'print', 'screen', 'speech']),
	/**
	 * Features related to the device display
	 */
	...OrderContentHelper.createMediaFeatures([
		'width',
		'min-width',
		'max-width',
		'min-width and max-width',
		'orientation: portrait',
		'orientation: landscape',
		'aspect-ratio',
		'min-aspect-ratio and max-aspect-ratio',
		'color',
		'min-color and max-color',
		'color-index',
		'min-color-index and max-color-index',
		'monochrome',
		'min-monochrome and max-monochrome',
		'resolution',
		'min-resolution and max-resolution',
		'scan: interlace',
		'scan: progressive',
		'grid',
		'update-frequency',
		'overflow-block',
		'overflow-inline',
		'pointer: none',
		'pointer: coarse',
		'pointer: fine',
		'hover: none',
		'hover: hover',
		'any-pointer: none',
		'any-pointer: coarse',
		'any-pointer: fine',
		'any-hover: none',
		'any-hover: hover',
		'light-level: dim',
		'light-level: normal',
		'light-level: washed',
		'scripting: none',
		'scripting: initial-only',
		'scripting: enabled',
		'device-width',
		'device-height',
		'device-aspect-ratio',
		'-webkit-device-pixel-ratio',
		'-webkit-transform-3d',
		'-webkit-transform-2d',
		'-webkit-transition',
		'-webkit-animation',
	]),
	/*
	 * Deprecated or non-standard features
	 * */
	...OrderContentHelper.createMediaFeatures(['device-width', 'device-height', 'device-aspect-ratio']),
];
