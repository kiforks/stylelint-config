import { PluginConfigRuleType } from '@plugin/interfaces';

import { PluginNoSelfNesting } from '../../api';

import { pluginNoSelfNestingProvider } from './plugin-no-self-nesting.provider';

describe('PluginNoSelfNestingProvider', () => {
	it('should have the following value', () => {
		const provider = {
			provide: PluginNoSelfNesting,
			options: [
				{ selector: 'body' },
				{ selector: 'html' },
				{ selector: 'main' },
				{ selector: 'h1' },
				{ selector: /^:host/ },
				{ selector: /^&:host/ },
				{ selector: /^::ng-deep/ },
				{ selector: /^&::ng-deep/ },
				{ name: 'include', params: /^media-/ },
			] as PluginConfigRuleType[],
		};

		expect(pluginNoSelfNestingProvider()).toEqual(provider);
	});
});
