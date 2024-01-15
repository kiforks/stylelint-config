import { PluginConfigExecutionMode } from '@plugin/interfaces';

import { PluginSelectorCombinatorNesting } from '../../api';

import { pluginSelectorCombinatorNestingProvider } from './plugin-selector-combinator-nesting.provider';

describe('PluginSelectorCombinatorNestingProvider', () => {
	it('should have the following value', () => {
		const provider = {
			provide: PluginSelectorCombinatorNesting,
			options: 'always' as PluginConfigExecutionMode,
		};

		expect(pluginSelectorCombinatorNestingProvider()).toEqual(provider);
	});
});
