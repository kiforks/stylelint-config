import { MediaConfig } from '@modules/media/configs';
import { MediaRuleHelper } from '@modules/media/helpers';

import { PluginMediaConfig } from './plugin-media.config';

import { PluginConfigHelper } from '../../helpers';
import { PluginConfigAtRule } from '../../interfaces';

describe('PluginMediaConfig', () => {
	describe('MEDIA_PREFIX_MIXIN', () => {
		it('should define the correct MEDIA_PREFIX_MIXIN', () => {
			expect(PluginMediaConfig.PREFIX_MIXIN).toEqual({
				name: 'include',
				params: '^media-',
			});
		});
	});

	describe('MEDIA_PREFIX_REGEXP_MIXIN', () => {
		it('should define the correct MEDIA_PREFIX_REGEXP_MIXIN', () => {
			expect(PluginMediaConfig.PREFIX_REGEXP_MIXIN).toEqual({
				name: 'include',
				params: /^media-/,
			});
		});
	});

	describe('AT_RULES', () => {
		it('should define the correct AT_RULES', () => {
			const data: readonly PluginConfigAtRule[] = PluginConfigHelper.atRuleParamsToRegExp([
				/**
				 * SCSS Media includes for specific devices:
				 * @example @include media-desktop;
				 */
				...MediaRuleHelper.createDeviceConfigRules(MediaConfig.DEVICES),
				/**
				 * SCSS Media includes for minimum breakpoints:
				 * @example @include media-min(md);
				 */
				...MediaRuleHelper.createBreakpointConfigRules('min', MediaConfig.BREAKPOINTS),
				/**
				 * SCSS Media includes for maximum breakpoints:
				 * @example @include media-max(md);
				 */
				...MediaRuleHelper.createBreakpointConfigRules('max', MediaConfig.BREAKPOINTS),
				/**
				 * SCSS Media includes for specific breakpoints:
				 * @example @include media-only(md);
				 */
				...MediaRuleHelper.createBreakpointConfigRules('only', MediaConfig.BREAKPOINTS),
				/**
				 * SCSS Media includes for range between breakpoints:
				 * @example @include media-between(md, lg);
				 */
				...MediaRuleHelper.createBreakpointBetweenConfigRules(MediaConfig.BREAKPOINTS),
			]);

			expect(PluginMediaConfig.AT_RULES).toEqual(data);
		});
	});
});
