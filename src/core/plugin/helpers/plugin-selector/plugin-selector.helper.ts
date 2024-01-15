import { PluginSelectorNodeType } from '../../enums';
import { PluginSelectorValueType } from '../../interfaces';

export abstract class PluginSelectorHelper {
	public static isPseudoNodeType(type: PluginSelectorValueType): type is PluginSelectorNodeType.Pseudo {
		return type === PluginSelectorNodeType.Pseudo;
	}

	public static isCombinatorNodeType(type: PluginSelectorValueType): type is PluginSelectorNodeType.Combinator {
		return type === PluginSelectorNodeType.Combinator;
	}

	public static isSelectorNodeType(type: PluginSelectorValueType): type is PluginSelectorNodeType.Selector {
		return type === PluginSelectorNodeType.Selector;
	}

	public static isChainingType(type: PluginSelectorValueType): boolean {
		return (
			type === PluginSelectorNodeType.Attribute ||
			type === PluginSelectorNodeType.Class ||
			type === PluginSelectorNodeType.ID ||
			type === PluginSelectorNodeType.Pseudo ||
			type === PluginSelectorNodeType.Tag ||
			type === PluginSelectorNodeType.Universal
		);
	}
}
