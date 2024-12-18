import { PluginMediaConfig } from '@plugin/configs';
import { PluginProvider } from '@plugin/interfaces';

import { PluginNoDuplicateAtRule } from '../../api';

export const pluginNoDuplicateAtRuleProvider = (): PluginProvider => ({
	provide: PluginNoDuplicateAtRule,
	options: PluginMediaConfig.AtRules,
});
