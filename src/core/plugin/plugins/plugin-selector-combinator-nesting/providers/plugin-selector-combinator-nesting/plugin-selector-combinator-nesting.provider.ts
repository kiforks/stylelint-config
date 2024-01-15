import { PluginConfigExecutionMode, PluginProvider } from '@plugin/interfaces';

import { PluginSelectorCombinatorNesting } from '../../api';

export const pluginSelectorCombinatorNestingProvider = (): PluginProvider => ({
	provide: PluginSelectorCombinatorNesting,
	options: 'always' as PluginConfigExecutionMode,
});
