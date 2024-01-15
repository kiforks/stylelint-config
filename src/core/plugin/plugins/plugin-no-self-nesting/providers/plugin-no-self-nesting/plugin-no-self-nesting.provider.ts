import { PluginMediaConfig } from '@plugin/configs';
import { PluginConfigHelper } from '@plugin/helpers';
import { PluginConfigRuleType, PluginProvider } from '@plugin/interfaces';

import { PluginNoSelfNesting } from '../../api';

export const pluginNoSelfNestingProvider = (): PluginProvider => ({
	provide: PluginNoSelfNesting,
	options: [
		PluginConfigHelper.createRule('body'),
		PluginConfigHelper.createRule('html'),
		PluginConfigHelper.createRule('main'),
		PluginConfigHelper.createRule('h1'),
		PluginConfigHelper.createRule(/^:host/),
		PluginConfigHelper.createRule(/^&:host/),
		PluginConfigHelper.createRule(/^::ng-deep/),
		PluginConfigHelper.createRule(/^&::ng-deep/),

		/**
		 * SCSS Media at-rules for breakpoints:
		 * @example @include media-min(md);
		 */
		PluginMediaConfig.PREFIX_REGEXP_MIXIN,
	] as PluginConfigRuleType[],
});
