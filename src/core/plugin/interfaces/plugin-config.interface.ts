import { Rule } from 'stylelint';

export type PluginConfigExecutionMode = 'always' | 'never';
export type PluginConfigData = Pick<Rule, 'messages' | 'meta' | 'primaryOptionArray' | 'ruleName'>;
export type PluginConfigRuleType<P extends TextPattern = TextPattern> = PluginConfigAtRule<P> | PluginConfigRule;
export type PluginConfigValidationRule = PluginConfigValidationData<PluginConfigRule>;
export type PluginConfigValidationAtRule = PluginConfigValidationData<PluginConfigAtRule>;

export interface PluginConfigValidationData<T extends PluginConfigRuleType = PluginConfigRuleType> {
	messageFormattedName: string;
	messageName: string;
	rule: T;
}

export interface PluginConfigRule {
	selector: TextPattern;
}

export interface PluginConfigAtRule<P extends TextPattern = TextPattern> {
	name: TextPattern;
	params?: P;
}
