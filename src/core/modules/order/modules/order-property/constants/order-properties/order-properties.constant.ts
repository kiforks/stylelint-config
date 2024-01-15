import { ORDER_PROPERTIES_CONFIG } from '../order-property-config';

const { position, blockModel, typography, decoration, animation, miscellanea } = ORDER_PROPERTIES_CONFIG;

/**
 * Declarations of logically related properties are grouped in the following order:
 *
 * - Positioning
 * - Block Model
 * - Typography
 * - Decoration
 * - Animation
 * - Miscellaneous
 *
 * Positioning comes first because it affects the positioning of blocks in the document flow.
 * The Block Model comes next as it defines the dimensions and placement of blocks.
 *
 * All other declarations that change the appearance of the inner parts of blocks and do not affect other blocks come last.
 */
export const ORDER_PROPERTIES = [
	...position,
	...blockModel,
	...typography,
	...decoration,
	...animation,
	...miscellanea,
];
