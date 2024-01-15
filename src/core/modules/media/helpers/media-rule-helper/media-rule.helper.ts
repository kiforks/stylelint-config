import { OrderHelper } from '@modules/order/helpers';
import { PluginConfigHelper } from '@plugin/helpers';

import {
	MediaBreakpoint,
	MediaConfigAtRuleBreakpoint,
	MediaConfigAtRuleBreakpointBetween,
	MediaConfigAtRuleDevice,
	MediaOrderAtRuleBreakpoint,
	MediaOrderAtRuleBreakpointBetween,
	MediaOrderAtRuleDevice,
	MediaRuleBreakpointBetweenParameter,
	MediaRuleBreakpointParameter,
	MediaRuleBreakpointPrefix,
	MediaRuleDevice,
	MediaRuleFullBreakpointPrefix,
	MediaRuleFullDevicePrefix,
} from '../../interfaces';

import { MediaConfig } from '../../configs';

export abstract class MediaRuleHelper {
	/**
	 * Generates a device-specific media rule prefix.
	 * @param device - Type of device (e.g., 'mobile' or 'desktop').
	 * @example: For getDevicePrefixParameter('mobile'), the output is: '^media-mobile'.
	 */
	public static getDevicePrefixParameter<D extends MediaRuleDevice>(device: D): MediaRuleFullDevicePrefix<D> {
		return `${MediaConfig.PREFIX}${device}`;
	}

	/**
	 * Generates a breakpoint-specific media rule prefix.
	 * @param prefix - Type of breakpoint prefix (e.g., 'min', 'max').
	 * @example: For getBreakpointPrefixParameter('min'), the output is: '^media-min'.
	 */
	public static getRuleFullBreakpointPrefix<P extends MediaRuleBreakpointPrefix>(
		prefix: P
	): MediaRuleFullBreakpointPrefix<P> {
		return `${MediaConfig.PREFIX}${prefix}`;
	}

	/**
	 * Generates a breakpoint-specific media rule prefix.
	 * @param prefix - Type of breakpoint prefix (e.g., 'min', 'max').
	 * @param breakpoint - Media breakpoint value (e.g., 'xs', 'sm').
	 * @example: For getBreakpointPrefixParameter('min', 'sm'), the output is: '^media-min(sm)'.
	 */
	public static getBreakpointPrefixParameter<P extends MediaRuleBreakpointPrefix, B extends MediaBreakpoint>(
		prefix: P,
		breakpoint: B
	): MediaRuleBreakpointParameter<P, B> {
		return `${MediaConfig.PREFIX}${prefix}(${breakpoint})`;
	}

	/**
	 * @param breakpointFrom - Media breakpoint value (e.g., 'xs', 'sm').
	 * @param breakpointTo - Media breakpoint value (e.g., 'xs', 'sm').
	 * @example: For getBreakpointBetweenPrefixParameter('xs', 'sm'), the output is: '^media-between(xs, sm)'.
	 */
	public static getBreakpointBetweenPrefixParameter<FROM extends MediaBreakpoint, TO extends MediaBreakpoint>(
		breakpointFrom: FROM,
		breakpointTo: TO
	): MediaRuleBreakpointBetweenParameter<FROM, TO> {
		return `${MediaConfig.PREFIX}between(${breakpointFrom}, ${breakpointTo})`;
	}

	/**
	 * @param device - Type of device.
	 * @example: For createDeviceRuleOrder('mobile'), the output is: { type: 'at-rule', name: 'include', parameter: '^media-mobile' }.
	 */
	public static createDeviceOrderRule<D extends MediaRuleDevice>(device: D): Readonly<MediaOrderAtRuleDevice<D>> {
		return OrderHelper.createInclude(MediaRuleHelper.getDevicePrefixParameter(device));
	}

	/**
	 * @param device - Type of device.
	 * @example: For createDeviceRuleOrder('mobile'), the output is: { name: 'include', params: '^media-mobile' }.
	 */
	public static createDeviceConfigRule<D extends MediaRuleDevice>(device: D): Readonly<MediaConfigAtRuleDevice<D>> {
		return PluginConfigHelper.createAtRuleInclude(MediaRuleHelper.getDevicePrefixParameter(device));
	}

	/**
	 * @param prefix - Type of breakpoint prefix.
	 * @param breakpoint - Media breakpoint value.
	 * @example: For createBreakpointRuleOrder('min', 'sm'), the output is:
	 * { type: 'at-rule', name: 'include', parameter: '^media-min(sm)' }.
	 */
	public static createBreakpointOrderAtRule<P extends MediaRuleBreakpointPrefix, B extends MediaBreakpoint>(
		prefix: P,
		breakpoint: B
	): Readonly<MediaOrderAtRuleBreakpoint<P, B>> {
		return OrderHelper.createInclude(MediaRuleHelper.getBreakpointPrefixParameter(prefix, breakpoint));
	}

	/**
	 * @param prefix - Type of breakpoint prefix.
	 * @param breakpoint - Media breakpoint value.
	 * @example: For createBreakpointConfigRule('min', 'sm'), the output is:
	 * { name: 'include', params: '^media-min(sm)' }.
	 */
	public static createBreakpointConfigAtRule<P extends MediaRuleBreakpointPrefix, B extends MediaBreakpoint>(
		prefix: P,
		breakpoint: B
	): Readonly<MediaConfigAtRuleBreakpoint<P, B>> {
		return PluginConfigHelper.createAtRuleInclude(MediaRuleHelper.getBreakpointPrefixParameter(prefix, breakpoint));
	}

	/**
	 * @param breakpointFrom - Media breakpoint value (e.g., 'xs', 'sm').
	 * @param breakpointTo - Media breakpoint value (e.g., 'xs', 'sm').
	 * @example: For createBreakpointBetweenRuleOrder('xs', 'sm'), the output is:
	 * { type: 'at-rule', name: 'include', parameter: '^media-between(xs, sm)' }.
	 */
	public static createBreakpointBetweenOrderRule<FROM extends MediaBreakpoint, TO extends MediaBreakpoint>(
		breakpointFrom: FROM,
		breakpointTo: TO
	): Readonly<MediaOrderAtRuleBreakpointBetween<FROM, TO>> {
		return OrderHelper.createInclude(MediaRuleHelper.getBreakpointBetweenPrefixParameter(breakpointFrom, breakpointTo));
	}

	/**
	 * @param breakpointFrom - Media breakpoint value (e.g., 'xs', 'sm').
	 * @param breakpointTo - Media breakpoint value (e.g., 'xs', 'sm').
	 * @example: For createBreakpointBetweenRuleOrder('xs', 'sm'), the output is:
	 * { name: 'include', params: '^media-between(xs, sm)' }.
	 */
	public static createBreakpointBetweenConfigRule<FROM extends MediaBreakpoint, TO extends MediaBreakpoint>(
		breakpointFrom: FROM,
		breakpointTo: TO
	): Readonly<MediaConfigAtRuleBreakpointBetween<FROM, TO>> {
		return PluginConfigHelper.createAtRuleInclude(
			MediaRuleHelper.getBreakpointBetweenPrefixParameter(breakpointFrom, breakpointTo)
		);
	}

	/**
	 * @param devices - Array of devices.
	 * @example: For createDeviceRulesOrder(['mobile', 'desktop']), the output is:
	 * [
	 *    { type: 'at-rule', name: 'include', parameter: '^media-mobile' },
	 *    { type: 'at-rule', name: 'include', parameter: '^media-desktop' }
	 * ]
	 */
	public static createDeviceOrderRules<D extends MediaRuleDevice>(
		devices: readonly D[]
	): ReadonlyArray<MediaOrderAtRuleDevice<D>> {
		return devices.map(value => MediaRuleHelper.createDeviceOrderRule(value));
	}

	/**
	 * @param devices - Array of devices.
	 * @example: For createDeviceRulesOrder(['mobile', 'desktop']), the output is:
	 * [
	 *    { name: 'include', params: '^media-mobile' },
	 *    { name: 'include', params: '^media-desktop' }
	 * ]
	 */
	public static createDeviceConfigRules<D extends MediaRuleDevice>(
		devices: readonly D[]
	): ReadonlyArray<MediaConfigAtRuleDevice<D>> {
		return devices.map(value => MediaRuleHelper.createDeviceConfigRule(value));
	}

	/**
	 * @param prefix - Type of breakpoint prefix.
	 * @param breakpoints - Array of media breakpoints.
	 * @example: For createBreakpointRulesOrder('min', ['sm', 'md']), the output is:
	 * [
	 *    { type: 'at-rule', name: 'include', parameter: '^media-min(sm)' },
	 *    { type: 'at-rule', name: 'include', parameter: '^media-min(md)' }
	 * ]
	 */
	public static createBreakpointOrderRules<P extends MediaRuleBreakpointPrefix, B extends MediaBreakpoint>(
		prefix: P,
		breakpoints: readonly B[]
	): ReadonlyArray<MediaOrderAtRuleBreakpoint<P, B>> {
		return breakpoints.map(value => MediaRuleHelper.createBreakpointOrderAtRule(prefix, value));
	}

	/**
	 * @param prefix - Type of breakpoint prefix.
	 * @param breakpoints - Array of media breakpoints.
	 * @example: For createBreakpointRulesOrder('min', ['sm', 'md']), the output is:
	 * [
	 *    { name: 'include', params: '^media-min(sm)' },
	 *    { name: 'include', params: '^media-min(md)' }
	 * ]
	 */
	public static createBreakpointConfigRules<P extends MediaRuleBreakpointPrefix, B extends MediaBreakpoint>(
		prefix: P,
		breakpoints: readonly B[]
	): ReadonlyArray<MediaConfigAtRuleBreakpoint<P, B>> {
		return breakpoints.map(value => MediaRuleHelper.createBreakpointConfigAtRule(prefix, value));
	}

	/**
	 * @param breakpoints - Array of media breakpoints.
	 * @example: For createBreakpointBetweenRulesOrder(['xs', 'sm', 'md']), the output is:
	 * [
	 *    { type: 'at-rule', name: 'include', parameter: '^media-between(xs, sm)' },
	 *    { type: 'at-rule', name: 'include', parameter: '^media-between(xs, md)' },
	 *    { type: 'at-rule', name: 'include', parameter: '^media-between(sm, md)' },
	 * ]
	 */
	public static createBreakpointBetweenOrderRules<B extends MediaBreakpoint>(
		breakpoints: readonly B[]
	): ReadonlyArray<MediaOrderAtRuleBreakpointBetween<B, B>> {
		return breakpoints.flatMap((current, idx, arr) =>
			arr.slice(idx + 1).map(next => MediaRuleHelper.createBreakpointBetweenOrderRule(current, next))
		);
	}

	/**
	 * @param breakpoints - Array of media breakpoints.
	 * @example: For createBreakpointBetweenRulesOrder(['xs', 'sm', 'md']), the output is:
	 * [
	 *    { name: 'include', params: '^media-between(xs, sm)' },
	 *    { name: 'include', params: '^media-between(xs, md)' },
	 *    { name: 'include', params: '^media-between(sm, md)' },
	 * ]
	 */
	public static createBreakpointBetweenConfigRules<B extends MediaBreakpoint>(
		breakpoints: readonly B[]
	): ReadonlyArray<MediaConfigAtRuleBreakpointBetween<B, B>> {
		return breakpoints.flatMap((current, idx, arr) =>
			arr.slice(idx + 1).map(next => MediaRuleHelper.createBreakpointBetweenConfigRule(current, next))
		);
	}
}
