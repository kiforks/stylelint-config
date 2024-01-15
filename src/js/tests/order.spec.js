import config from '../../../.stylelintrc.js';

import stylelint from 'stylelint';

const lint = stylelint.lint;

describe('order', () => {
	/** @see https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md */
	describe('order/properties-order', () => {
		const ruleName = 'order/properties-order';

		it('should not report an error when ordering is the following', async () => {
			const result = await lint({
				code: `
					.example {
						content: "test";
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						z-index: 1;
						display: flex;
						flex: 1;
						flex-grow: 1;
						flex-shrink: 1;
						flex-basis: 10%;
						flex-flow: row wrap;
						flex-direction: row;
						flex-wrap: wrap;
						place-content: center space-between;
						justify-content: center;
						align-content: center;
						align-items: center;
						order: 1;
						align-self: center;
						justify-self: center;
						grid: auto / auto;
						grid-area: 1 / 1 / 2 / 2;
						grid-auto-columns: auto;
						grid-auto-flow: row;
						grid-auto-rows: auto;
						grid-column: 1 / span 2;
						grid-column-end: span 3;
						grid-column-gap: 10px;
						grid-column-start: 2;
						gap: 10px;
						grid-row: 1 / span 2;
						grid-row-end: span 3;
						grid-row-gap: 10px;
						grid-row-start: 2;
						grid-template: none;
						grid-template-areas: "a b c";
						grid-template-columns: 1fr 2fr;
						grid-template-rows: 100px 200px;
						float: left;
						clear: both;
						box-sizing: border-box;
						width: 100px;
						min-width: 50px;
						max-width: 150px;
						height: 100px;
						min-height: 50px;
						max-height: 150px;
						margin: 10px;
						margin-top: 10px;
						margin-right: 20px;
						margin-bottom: 30px;
						margin-left: 40px;
						padding: 5px;
						padding-top: 5px;
						padding-right: 10px;
						padding-bottom: 15px;
						padding-left: 20px;
						overflow: auto;
						overflow-x: hidden;
						overflow-y: scroll;
						list-style: square inside;
						list-style-position: inside;
						list-style-type: disc;
						list-style-image: url('bullet.png');
						border-collapse: collapse;
						border-spacing: 2px;
						table-layout: fixed;
						empty-cells: show;
						caption-side: top;
						font: 400 12px/1.5 "Helvetica Neue", sans-serif;
						font-weight: 700;
						font-size: 14px;
						line-height: 1.5;
						font-family: "Helvetica Neue", sans-serif;
						vertical-align: top;
						text-align: center;
						direction: ltr;
						color: black;
						text-transform: uppercase;
						text-decoration: underline;
						font-style: italic;
						font-variant: small-caps;
						font-size-adjust: none;
						font-stretch: expanded;
						text-align-last: justify;
						letter-spacing: 1px;
						word-spacing: 2px;
						white-space: nowrap;
						text-emphasis: circle;
						text-emphasis-color: black;
						text-emphasis-style: filled;
						text-emphasis-position: under;
						text-indent: 20px;
						text-justify: inter-word;
						text-outline: 1px solid black;
						text-wrap: balance;
						text-overflow: ellipsis;
						text-orientation: mixed;
						word-wrap: break-word;
						word-break: break-all;
						overflow-wrap: break-word;
						tab-size: 4;
						hyphens: auto;
						unicode-bidi: bidi-override;
						columns: 100px 3;
						column-count: 3;
						column-fill: balance;
						column-gap: 20px;
						column-rule: 1px solid black;
						column-rule-color: black;
						column-rule-style: solid;
						column-rule-width: 1px;
						column-span: all;
						column-width: 100px;
						text-shadow: 1px 1px 2px black;
						page-break-after: auto;
						page-break-before: auto;
						page-break-inside: avoid;
						src: url('font.woff2') format('woff2');
						background: black;
						background-color: black;
						background-image: url('bg.jpg');
						background-repeat: no-repeat;
						background-position: center top;
						background-position-x: center;
						background-position-y: top;
						background-size: cover;
						background-clip: padding-box;
						background-origin: content-box;
						background-attachment: fixed;
						box-decoration-break: clone;
						background-blend-mode: multiply;
						border: 1px solid black;
						border-width: 1px;
						border-style: solid;
						border-color: black;
						border-top: 1px solid black;
						border-top-width: 1px;
						border-top-style: solid;
						border-top-color: black;
						border-right: 1px solid black;
						border-right-width: 1px;
						border-right-style: solid;
						border-right-color: black;
						border-bottom: 1px solid black;
						border-bottom-width: 1px;
						border-bottom-style: solid;
						border-bottom-color: black;
						border-left: 1px solid black;
						border-left-width: 1px;
						border-left-style: solid;
						border-left-color: black;
						border-radius: 4px;
						border-top-left-radius: 4px;
						border-top-right-radius: 4px;
						border-bottom-right-radius: 4px;
						border-bottom-left-radius: 4px;
						border-image: url('border.png') 30 stretch;
						border-image-source: url('border.png');
						border-image-slice: 30;
						border-image-width: 30px;
						border-image-outset: 1;
						border-image-repeat: stretch;
						outline: 1px solid black;
						outline-width: 1px;
						outline-style: solid;
						outline-color: black;
						outline-offset: 2px;
						box-shadow: 2px 2px 5px black;
						transform: rotate(45deg);
						transform-origin: center;
						backface-visibility: hidden;
						perspective: 1000px;
						perspective-origin: 50% 50%;
						transform-style: preserve-3d;
						visibility: visible;
						cursor: pointer;
						opacity: 1;
						interpolation-mode: bicubic;
						filter: blur(5px);
						backdrop-filter: blur(10px);
						transition: all 0.3s ease-out;
						transition-delay: 0.1s;
						transition-timing-function: ease-in-out;
						transition-duration: 0.2s;
						transition-property: opacity;
						animation: slidein 3s ease-in 1s infinite reverse both running;
						animation-name: slidein;
						animation-duration: 3s;
						animation-play-state: running;
						animation-timing-function: ease-in;
						animation-delay: 1s;
						animation-iteration-count: infinite;
						animation-direction: reverse;
						animation-fill-mode: forwards;
						contain: none;
						appearance: none;
						clip: rect(0, 0, 0, 0);
						clip-path: circle(50%);
						counter-reset: section;
						counter-increment: section;
						resize: both;
						user-select: none;
						nav-index: auto;
						nav-up: auto;
						nav-right: auto;
						nav-down: auto;
						nav-left: auto;
						pointer-events: auto;
						quotes: '“' '”' '‘' '’';
						touch-action: manipulation;
						will-change: transform;
						zoom: 1;
						fill: currentcolor;
						fill-rule: nonzero;
						clip-rule: evenodd;
						stroke: currentcolor;
						aspect-ratio: auto 1 / 1;
						accent-color: auto;
					}
				`,
				config,
			});

			const { warnings } = result.results[0];
			const warning = warnings.find(warning => warning.rule === ruleName);

			expect(warning).toBeFalsy();
		});

		it('should not report an error when ordering is the following', async () => {
			const result = await lint({
				code: `
					.example {
						accent-color: auto;
						aspect-ratio: auto 1 / 1;
						content: "test";
					}
				`,
				config,
			});

			const { warnings } = result.results[0];
			const warning = warnings.find(warning => warning.rule === ruleName);

			expect(warning.text).toBe(`Expected "aspect-ratio" to come before "accent-color" (${ruleName})`);
		});
	});
});
