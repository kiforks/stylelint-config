import { PluginRegExpArray } from '@plugin/interfaces';

import { RuleOptionsPossible } from 'stylelint';

export type PluginMaxNestingDepthIgnore = 'blockless-at-rules' | 'pseudo-classes';
export type PluginMaxNestingDepthMainOptions = number;
export type PluginMaxNestingDepthOptions =
	| PluginMaxNestingDepthMainOptions
	| [number, PluginMaxNestingDepthSecondaryOptions];

export type PluginMaxNestingDepthPossibleOptions = Record<
	keyof PluginMaxNestingDepthSecondaryOptions,
	RuleOptionsPossible[]
>;

export interface PluginMaxNestingDepthSecondaryOptions {
	ignore?: PluginMaxNestingDepthIgnore[];
	ignoreAtRules?: PluginRegExpArray;
	ignoreHostSelectors?: PluginRegExpArray;
	ignorePseudoClasses?: PluginRegExpArray;
	ignoreRules?: PluginRegExpArray;
}
