import { MediaBreakpoint, MediaRuleDevice, MediaRulePrefix } from '../../interfaces';

/**
 * Provides configuration settings for media queries in a responsive design context.
 */
export abstract class MediaConfig {
	public static readonly BREAKPOINTS: readonly MediaBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
	public static readonly DEVICES: readonly MediaRuleDevice[] = ['mobile', 'desktop'];

	public static readonly NAME = 'media';

	public static readonly PREFIX: MediaRulePrefix = `^${MediaConfig.NAME}-`;
}
