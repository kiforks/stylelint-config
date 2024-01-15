import { PluginConfig } from './plugin.config';

describe('PluginConfig', () => {
	it('should have the following [NAMESPACE]', () => {
		expect(PluginConfig.NAMESPACE).toBe('kifor-stylelint');
	});

	it('should have the following [REPOSITORY_URL]', () => {
		expect(PluginConfig.REPOSITORY_URL).toBe('https://github.com/kiforks/@kiforks/stylelint-config');
	});
});
