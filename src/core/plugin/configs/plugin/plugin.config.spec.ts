import { PluginConfig } from './plugin.config';

describe('PluginConfig', () => {
	it('should have the following [NAMESPACE]', () => {
		expect(PluginConfig.Namespace).toBe('kifor-stylelint');
	});

	it('should have the following [REPOSITORY_URL]', () => {
		expect(PluginConfig.RepositoryUrl).toBe('https://github.com/kiforks/@kiforks/stylelint-config');
	});
});
