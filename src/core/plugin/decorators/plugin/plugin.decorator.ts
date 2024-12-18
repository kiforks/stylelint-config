import { PluginConstructor, PluginDecoratorConfig, PluginPlugins, PluginRules } from '../../interfaces';

/**
 * Decorator for enriching a configuration class with additional plugins and rules.
 * This decorator modifies the class to include new plugins and their corresponding rules,
 * merging them with any existing plugins and rules.
 *
 * @param config Configuration object specifying plugins and their options.
 * @returns The class augmented with the specified plugins and rules.
 *
 * @example
 * Applying the `Plugin` decorator to the `Configuration` class:
 *
 * @Plugin({
 *   providers: [
 *     {
 *       provide: PluginNoSelfNesting,
 *       options: { someOption: 'value' },
 *     },
 *     {
 *       provide: PluginMaxNestingDepth,
 *       options: { someOption: 'value-2' },
 *     },
 *   ],
 * })
 * class Configuration implements Config {
 *   public plugins = ['stylelint-order'];
 *   public rules = {
 *     'color-no-hex': true,
 *   };
 * }
 *
 * Instantiating Configuration results in an object like this:
 *
 * Configuration {
 *   plugins: [
 *     'stylelint-order',
 *     { ruleName: 'no-self-nesting', rule: [Function] },
 *     { ruleName: 'max-nesting-depth', rule: [Function] }
 *   ],
 *   rules: {
 *     'color-no-hex': true,
 *     'no-self-nesting': { someOption: 'value' },
 *     'max-nesting-depth': { someOption: 'value-2' }
 *   }
 * }
 */
export const Plugin =
	(config: PluginDecoratorConfig): (<T extends PluginConstructor>(constructor: T) => T) =>
	<T extends PluginConstructor>(constructor: T): T =>
		// @ts-ignore it's currently the only way to solve the eslint issues
		class extends constructor {
			constructor(...args: unknown[]) {
				super(...(args as never[]));

				const currentPlugins = (this.plugins || []) as PluginPlugins,
					currentRules: PluginRules = this.rules;

				this.plugins = [...currentPlugins, ...config.providers.map(({ provide }) => new provide().createRule())];

				this.rules = Object.assign(
					{},
					currentRules,
					...config.providers.map(({ options }, index) => {
						const ruleName = new config.providers[index].provide().name;

						return { [ruleName]: options };
					})
				);
			}
		};
