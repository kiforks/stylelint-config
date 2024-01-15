import { ORDER_CONTENT } from './order-content.constant';

describe('ORDER_CONTENT', () => {
	it('should have the following value', () => {
		expect(ORDER_CONTENT).toEqual([
			{
				name: 'charset',
				type: 'at-rule',
			},
			{
				name: 'import',
				type: 'at-rule',
			},
			{
				name: 'font-face',
				type: 'at-rule',
			},
			{
				name: 'font-feature-values',
				type: 'at-rule',
			},
			{
				name: 'font-palette-values',
				type: 'at-rule',
			},
			{
				name: 'keyframes',
				type: 'at-rule',
			},
			{
				name: 'layer',
				type: 'at-rule',
			},
			{
				name: 'property',
				type: 'at-rule',
			},
			{
				name: 'counter-style',
				type: 'at-rule',
			},
			{
				name: 'namespace',
				type: 'at-rule',
			},
			'custom-properties',
			'dollar-variables',
			{
				name: 'include',
				parameter: '^reset[\\s\\S]*',
				type: 'at-rule',
			},
			'declarations',
			{
				name: 'extend',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'include[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-clean[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-hover[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-active[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'after-clean[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'after[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'after-hover[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'after-active[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-after-clean[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-after[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-after-hover[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'before-after-active[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'hover[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'active[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: 'focus[\\s\\S]*',
				type: 'at-rule',
			},
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
			{
				name: 'include',
				parameter: '^media-mobile[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-desktop[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-min\\(xs[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-min\\(sm[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-min\\(md[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-min\\(lg[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-min\\(xl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-min\\(xxl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-max\\(xs[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-max\\(sm[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-max\\(md[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-max\\(lg[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-max\\(xl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-max\\(xxl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-only\\(xs[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-only\\(sm[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-only\\(md[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-only\\(lg[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-only\\(xl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-only\\(xxl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(xs, sm[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(xs, md[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(xs, lg[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(xs, xl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(xs, xxl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(sm, md[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(sm, lg[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(sm, xl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(sm, xxl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(md, lg[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(md, xl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(md, xxl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(lg, xl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(lg, xxl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'include',
				parameter: '^media-between\\(xl, xxl[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: 'all[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: 'print[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: 'screen[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: 'speech[\\s\\S]*',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(width[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(min-width[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(max-width[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(min-width and max-width[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(orientation: portrait[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(orientation: landscape[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(aspect-ratio[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(min-aspect-ratio and max-aspect-ratio[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(color[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(min-color and max-color[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(color-index[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(min-color-index and max-color-index[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(monochrome[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(min-monochrome and max-monochrome[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(resolution[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(min-resolution and max-resolution[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(scan: interlace[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(scan: progressive[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(grid[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(update-frequency[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(overflow-block[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(overflow-inline[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(pointer: none[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(pointer: coarse[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(pointer: fine[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(hover: none[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(hover: hover[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(any-pointer: none[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(any-pointer: coarse[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(any-pointer: fine[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(any-hover: none[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(any-hover: hover[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(light-level: dim[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(light-level: normal[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(light-level: washed[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(scripting: none[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(scripting: initial-only[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(scripting: enabled[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(device-width[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(device-height[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(device-aspect-ratio[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(-webkit-device-pixel-ratio[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(-webkit-transform-3d[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(-webkit-transform-2d[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(-webkit-transition[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(-webkit-animation[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(device-width[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(device-height[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'media',
				parameter: '\\(device-aspect-ratio[\\s\\S]*\\)',
				type: 'at-rule',
			},
			{
				name: 'page',
				type: 'at-rule',
			},
			{
				name: 'container',
				type: 'at-rule',
			},
			{
				name: 'supports',
				type: 'at-rule',
			},
		]);
	});
});
