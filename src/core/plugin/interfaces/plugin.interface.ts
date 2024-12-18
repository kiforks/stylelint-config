import { PluginBase } from '../plugins/plugin-base';

import type * as PostCSS from 'postcss';
import { AtRule } from 'postcss';
import Rule from 'postcss/lib/rule';
import stylelint, { Config, PostcssResult, Problem, RuleContext, RuleOptions } from 'stylelint';

export type PluginRuleType = AtRule | Rule;
export type PluginRules = Config['rules'];
export type PluginPlugins = Array<stylelint.Plugin | string>;
export type PluginProvide = new () => PluginBase;
export type PluginConstructor = new (...args: never[]) => Config;
export type PluginRegExp = RegExp | string;
export type PluginRegExpArray = PluginRegExp[];
export type PluginRuleBaseFn = (root: PostCSS.Root, result: PostcssResult) => Promise<void> | void;
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type PluginCheckStatementFn = (rule: PluginRuleType) => false | void;
export type PluginOptions<O = unknown> = O;
export type PluginSecondaryOptions<S = unknown> = Record<string, S>;
export type PluginRuleOptions = RuleOptions;
export type PluginProblem = Omit<Problem, 'message' | 'result' | 'ruleName'>;
export interface PluginRegExpStringMatchedElement {
	match: string;
	pattern: RegExp | string;
	substring: string;
}
export type PluginRegExpStringMatchedData = PluginRegExpStringMatchedElement | false;

export type PluginCheckFn = <O = unknown, S = unknown>(
	result: PostcssResult,
	options: O,
	secondaryOptions?: PluginSecondaryOptions<S>
) => void;

export interface PluginData<O = unknown, S = unknown> {
	context: RuleContext;
	options: PluginOptions<O>;
	result: PostcssResult;
	root: PostCSS.Root;
	secondaryOptions: PluginSecondaryOptions<S>;
}

export interface PluginCheckData<O = unknown, S = unknown, R extends PluginRuleType = PluginRuleType>
	extends Pick<PluginData<O, S>, 'context' | 'options' | 'result' | 'secondaryOptions'> {
	rule: R;
}

export interface PluginProvider<T = unknown> {
	options: T;
	provide: PluginProvide;
}

export interface PluginDecoratorConfig {
	providers: PluginProvider[];
}
