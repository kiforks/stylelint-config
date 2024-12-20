import { PluginMediaConfig } from '@plugin/configs';

import { PluginNoDuplicateAtRule } from '../../api';

import { pluginNoDuplicateAtRuleProvider } from './plugin-no-duplicate-at-rule.provider';

describe('PluginNoDuplicateAtRule', () => {
	it('should have the following value', () => {
		const provider = {
			provide: PluginNoDuplicateAtRule,
			options: PluginMediaConfig.AtRules,
		};

		expect(pluginNoDuplicateAtRuleProvider()).toEqual(provider);
	});
});
