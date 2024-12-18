import { PluginConfig } from '@plugin/configs';
import {
	PluginCheckData,
	PluginCheckFn,
	PluginCheckStatementFn,
	PluginConfigData,
	PluginData,
	PluginProblem,
	PluginRuleBaseFn,
	PluginRuleOptions,
	PluginSecondaryOptions,
} from '@plugin/interfaces';

import type * as PostCSS from 'postcss';
import stylelint, { Plugin, PostcssResult, Rule, RuleBase, RuleContext, RuleMessage } from 'stylelint';

const {
	utils: { ruleMessages, validateOptions, report },
} = stylelint;

/**
 * An abstract base class for creating plugins. This class provides a structured approach to
 * implementing custom plugins for a system (like a linter or a compiler). Each plugin
 * derived from this base class must define specific rules and behaviors.
 *
 * @abstract
 * The class is abstract and intended to be extended by specific plugin implementations.
 * It contains abstract methods and properties that must be defined by the extending class.
 */
export abstract class PluginBase {
	/**
	 * The unique name of the rule, to be defined by the extending plugin.
	 */
	protected abstract readonly ruleName: string;

	/**
	 * The message to be displayed when the rule is violated, to be defined by the extending plugin.
	 */
	protected abstract readonly message: RuleMessage;

	/**
	 * Indicates whether the options are expected to be an array. Defaults to false.
	 */
	protected readonly isArrayOptions: boolean = false;

	/**
	 * Validates the plugin's options.
	 */
	protected isValidOptions!: (options: PluginRuleOptions, secondaryOptions?: PluginRuleOptions) => boolean;

	/**
	 * Reports a problem identified by the plugin.
	 */
	protected reportProblem!: (problem: PluginProblem) => void;

	/**
	 * Function to check CSS rules.
	 */
	protected checkRule!: PluginCheckFn;

	/**
	 * Function to check CSS at-rules.
	 */
	protected checkAtRule!: PluginCheckFn;

	/**
	 * Returns the full rule name, including the namespace.
	 */
	public get name(): string {
		return `${PluginConfig.Namespace}/${this.ruleName}`;
	}

	/**
	 * Constructs the rule messages object for this plugin.
	 */
	private get messages(): { expected: RuleMessage } {
		return ruleMessages(this.name, { expected: this.message });
	}

	/**
	 * Creates a rule plugin that can be used within the stylelint configuration.
	 * @returns The constructed plugin with the defined rule and configuration.
	 */
	public createRule(): Plugin {
		const ruleBase: RuleBase =
				<O = unknown, S = unknown>(
					options: O,
					secondaryOptions: PluginSecondaryOptions<S>,
					context: RuleContext
				): PluginRuleBaseFn =>
				(root: PostCSS.Root, result: PostcssResult) =>
					this.render({
						options,
						secondaryOptions,
						context,
						result,
						root,
					}),
			config: PluginConfigData = {
				ruleName: this.name,
				messages: this.messages,
				meta: { url: PluginConfig.RepositoryUrl },
				primaryOptionArray: this.isArrayOptions,
			},
			rule: Rule = Object.assign(ruleBase, config);

		return stylelint.createPlugin(this.name, rule);
	}

	/**
	 * Initializes the plugin with the given options.
	 * @abstract Must be implemented by the extending class to initialize the plugin.
	 */
	protected abstract initialize(options: PluginData): void;

	/**
	 * The core logic for the plugin, checking against the provided data.
	 * @abstract Must be implemented by the extending class to define the check logic.
	 */
	// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
	protected abstract check(data: PluginCheckData): false | void;

	/**
	 * Orchestrates the validation, rule checking, and reporting based on the provided plugin data.
	 */
	private render<O = unknown, S = unknown>({ options, secondaryOptions, context, result, root }: PluginData): void {
		const checkStatement =
			<Options = O, SecondaryOptions = S>(
				result: PostcssResult,
				options: Options,
				secondaryOptions?: PluginSecondaryOptions<SecondaryOptions>
			): PluginCheckStatementFn =>
			rule =>
				this.check({
					rule,
					result,
					options,
					secondaryOptions: secondaryOptions || ({} as PluginSecondaryOptions<S>),
					context,
				});

		this.checkRule = <Options = O, SecondaryOptions = S>(
			result: PostcssResult,
			options: Options,
			secondaryOptions?: PluginSecondaryOptions<SecondaryOptions>
		): void => {
			root.walkRules(checkStatement(result, options, secondaryOptions));
		};

		this.checkAtRule = <Options = O, SecondaryOptions = S>(
			result: PostcssResult,
			options: Options,
			secondaryOptions?: PluginSecondaryOptions<SecondaryOptions>
		): void => {
			root.walkAtRules(checkStatement(result, options, secondaryOptions));
		};

		this.isValidOptions = (options: PluginRuleOptions, secondaryOptions?: PluginRuleOptions): boolean =>
			secondaryOptions
				? validateOptions(result, this.name, options, secondaryOptions)
				: validateOptions(result, this.name, options);

		this.reportProblem = (problem: PluginProblem) =>
			report({
				ruleName: this.name,
				result,
				message: this.messages.expected,
				...problem,
			});

		this.initialize({
			options,
			root,
			result,
			secondaryOptions,
			context,
		});
	}
}
