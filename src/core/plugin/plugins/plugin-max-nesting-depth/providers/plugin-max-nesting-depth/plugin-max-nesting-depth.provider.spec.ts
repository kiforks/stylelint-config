import { PluginMaxNestingDepth } from '../../api';
import { PluginMaxNestingDepthOptions } from '../../interfaces';

import { pluginMaxNestingDepthProvider } from './plugin-max-nesting-depth.provider';

describe('PluginMaxNestingDepthProvider', () => {
	it('should have the following value', () => {
		const provider = {
			provide: PluginMaxNestingDepth,
			options: [
				3,
				{
					ignore: ['pseudo-classes'],
					ignoreRules: ['/^&::/', '/^::/'],
					ignoreAtRules: ['/^\\include/', '/^\\media/'],
					ignoreHostSelectors: [/:host/],
				},
			] as PluginMaxNestingDepthOptions,
		};

		expect(pluginMaxNestingDepthProvider()).toEqual(provider);
	});
});
