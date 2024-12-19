import { PluginMediaConfig } from '@plugin/configs';
import { PluginConfigHelper } from '@plugin/helpers';
import { PluginConfigRuleType, PluginProvider } from '@plugin/interfaces';

import { PluginNoFirstLevelNesting } from '../../api';

export const pluginNoFirstLevelNestingProvider = (): PluginProvider => ({
	provide: PluginNoFirstLevelNesting,
	options: [
		PluginConfigHelper.createRule(/^(?![a-zA-Z.#])(?!(?::host|:root)).*$/),
		PluginConfigHelper.createAtRule(/^media/),

		/**
		 * SCSS Media at-rules for breakpoints:
		 * @example @include media-min(md);
		 */
		PluginMediaConfig.PrefixRegexMixin,
	] as PluginConfigRuleType[],
});
