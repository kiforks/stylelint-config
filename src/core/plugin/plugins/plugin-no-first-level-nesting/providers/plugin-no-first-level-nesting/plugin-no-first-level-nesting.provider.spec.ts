import { PluginConfigRuleType } from '@plugin/interfaces';

import { PluginNoFirstLevelNesting } from '../../api';

import { pluginNoFirstLevelNestingProvider } from './plugin-no-first-level-nesting.provider';

describe('PluginNoFirstLevelNestingProvider', () => {
	it('should have the following value', () => {
		const provider = {
			provide: PluginNoFirstLevelNesting,
			options: [
				{ selector: /^(?![a-zA-Z.#])(?!(?::host|:root)).*$/ },
				{ name: /^media/ },
				{ name: 'include', params: /^media-/ },
			] as PluginConfigRuleType[],
		};

		expect(pluginNoFirstLevelNestingProvider()).toEqual(provider);
	});
});
