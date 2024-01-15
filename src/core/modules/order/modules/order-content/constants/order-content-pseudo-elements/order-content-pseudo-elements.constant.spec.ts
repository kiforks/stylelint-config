import { ORDER_CONTENT_PSEUDO_ELEMENTS } from './order-content-pseudo-elements.constant';

describe('ORDER_CONTENT_PSEUDO_ELEMENTS', () => {
	it('should return the following value', () => {
		expect(ORDER_CONTENT_PSEUDO_ELEMENTS).toEqual([
			{
				selector: '^::first-letter',
				type: 'rule',
			},
			{
				selector: '^::before',
				type: 'rule',
			},
			{
				selector: '^::after',
				type: 'rule',
			},
			{
				selector: '^::placeholder',
				type: 'rule',
			},
			{
				selector: '^::first-line',
				type: 'rule',
			},
			{
				selector: '^::selection',
				type: 'rule',
			},
			{
				selector: '^::backdrop',
				type: 'rule',
			},
			{
				selector: '^::marker',
				type: 'rule',
			},
			{
				selector: '^::spelling-error',
				type: 'rule',
			},
			{
				selector: '^::grammar-error',
				type: 'rule',
			},
			{
				selector: '^::cue',
				type: 'rule',
			},
			{
				selector: '^::file-selector-button',
				type: 'rule',
			},
			{
				selector: '^::highlight',
				type: 'rule',
			},
			{
				selector: '^::slotted',
				type: 'rule',
			},
			{
				selector: '^::target-text',
				type: 'rule',
			},
			{
				selector: '^::-webkit-input-placeholder',
				type: 'rule',
			},
			{
				selector: '^::-moz-placeholder',
				type: 'rule',
			},
			{
				selector: '^::-ms-input-placeholder',
				type: 'rule',
			},
			{
				selector: '^::-ms-clear',
				type: 'rule',
			},
			{
				selector: '^::-ms-reveal',
				type: 'rule',
			},
			{
				selector: '^::-webkit-search-cancel-button',
				type: 'rule',
			},
			{
				selector: '^::-webkit-search-decoration',
				type: 'rule',
			},
			{
				selector: '^::-webkit-search-results-button',
				type: 'rule',
			},
			{
				selector: '^::-webkit-search-results-decoration',
				type: 'rule',
			},
			{
				selector: '^::-webkit-slider-runnable-track',
				type: 'rule',
			},
			{
				selector: '^::-webkit-slider-thumb',
				type: 'rule',
			},
			{
				selector: '^::-webkit-media-controls-panel',
				type: 'rule',
			},
			{
				selector: '^::-webkit-media-controls-play-button',
				type: 'rule',
			},
			{
				selector: '^::-webkit-media-controls-volume-slider',
				type: 'rule',
			},
			{
				selector: '^::[a-z]',
				type: 'rule',
			},
			{
				selector: '^&::first-letter',
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
			{
				selector: '^&::placeholder',
				type: 'rule',
			},
			{
				selector: '^&::first-line',
				type: 'rule',
			},
			{
				selector: '^&::selection',
				type: 'rule',
			},
			{
				selector: '^&::backdrop',
				type: 'rule',
			},
			{
				selector: '^&::marker',
				type: 'rule',
			},
			{
				selector: '^&::spelling-error',
				type: 'rule',
			},
			{
				selector: '^&::grammar-error',
				type: 'rule',
			},
			{
				selector: '^&::cue',
				type: 'rule',
			},
			{
				selector: '^&::file-selector-button',
				type: 'rule',
			},
			{
				selector: '^&::highlight',
				type: 'rule',
			},
			{
				selector: '^&::slotted',
				type: 'rule',
			},
			{
				selector: '^&::target-text',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-input-placeholder',
				type: 'rule',
			},
			{
				selector: '^&::-moz-placeholder',
				type: 'rule',
			},
			{
				selector: '^&::-ms-input-placeholder',
				type: 'rule',
			},
			{
				selector: '^&::-ms-clear',
				type: 'rule',
			},
			{
				selector: '^&::-ms-reveal',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-search-cancel-button',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-search-decoration',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-search-results-button',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-search-results-decoration',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-slider-runnable-track',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-slider-thumb',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-media-controls-panel',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-media-controls-play-button',
				type: 'rule',
			},
			{
				selector: '^&::-webkit-media-controls-volume-slider',
				type: 'rule',
			},
			{
				selector: '^&::[a-z]',
				type: 'rule',
			},
		]);
	});
});
