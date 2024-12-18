// eslint-disable-next-line max-classes-per-file
import { PluginBase } from '@plugin/plugins/plugin-base';

import { Plugin } from './plugin.decorator';

import { Config } from 'stylelint';

describe('PluginDecorator', () => {
	it('should have the following value', () => {
		const testPlugin = class TestPlugin extends PluginBase {
			protected override readonly isArrayOptions = true;

			protected readonly ruleName = 'my-test-plugin';
			// eslint-disable-next-line class-methods-use-this
			protected readonly message = (nestedName: string, scopeName: string): string =>
				`Nested name is: '${nestedName}'; Scope name is: '${scopeName}'`;

			// eslint-disable-next-line @typescript-eslint/no-empty-function,class-methods-use-this,no-empty-function
			protected initialize(): void {}

			// eslint-disable-next-line class-methods-use-this
			protected check(): false {
				return false;
			}
		};

		// eslint-disable-next-line new-cap
		@Plugin({ providers: [{ provide: testPlugin, options: { someOption: 'value' } }] })
		class Configuration implements Config {
			public plugins = ['stylelint-order'];
			public rules = { 'color-no-hex': true };
		}

		const decorator = new Configuration();

		expect(decorator.plugins).toEqual([
			'stylelint-order',
			{
				rule: expect.objectContaining({
					messages: expect.any(Object),
					meta: {
						url: 'https://github.com/kiforks/@kiforks/stylelint-config',
					},
					primaryOptionArray: true,
					ruleName: 'kifor-stylelint/my-test-plugin',
				}),
				ruleName: 'kifor-stylelint/my-test-plugin',
			},
		]);
		expect(decorator.rules).toEqual({
			'color-no-hex': true,
			'kifor-stylelint/my-test-plugin': {
				someOption: 'value',
			},
		});
	});
});
