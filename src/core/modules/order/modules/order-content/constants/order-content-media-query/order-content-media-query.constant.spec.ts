import { ORDER_CONTENT_MEDIA_QUERY } from './order-content-media-query.constant';

describe('ORDER_CONTENT_MEDIA_QUERY', () => {
	it('should return the following value', () => {
		expect(ORDER_CONTENT_MEDIA_QUERY).toEqual([
			{
				name: 'media',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: 'all',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: 'print',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: 'screen',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: 'speech',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(width)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(min-width)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(max-width)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(min-width and max-width)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(orientation: portrait)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(orientation: landscape)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(aspect-ratio)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(min-aspect-ratio and max-aspect-ratio)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(color)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(min-color and max-color)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(color-index)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(min-color-index and max-color-index)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(monochrome)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(min-monochrome and max-monochrome)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(resolution)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(min-resolution and max-resolution)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(scan: interlace)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(scan: progressive)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(grid)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(update-frequency)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(overflow-block)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(overflow-inline)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(pointer: none)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(pointer: coarse)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(pointer: fine)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(hover: none)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(hover: hover)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(any-pointer: none)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(any-pointer: coarse)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(any-pointer: fine)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(any-hover: none)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(any-hover: hover)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(light-level: dim)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(light-level: normal)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(light-level: washed)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(scripting: none)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(scripting: initial-only)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(scripting: enabled)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(device-width)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(device-height)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(device-aspect-ratio)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(-webkit-device-pixel-ratio)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(-webkit-transform-3d)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(-webkit-transform-2d)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(-webkit-transition)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(-webkit-animation)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(device-width)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(device-height)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '(device-aspect-ratio)',
				type: 'at-rule',
			},
		]);
	});
});
