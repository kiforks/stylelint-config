import { PluginSelectorHelper } from './plugin-selector.helper';
import { PluginSelectorNodeType } from '../../enums';
import { PluginSelectorValueType } from '../../interfaces';

describe('PluginSelectorHelper', () => {
	describe('isPseudoNodeType', () => {
		it('should return true if the type is Pseudo', () => {
			expect(PluginSelectorHelper.isPseudoNodeType(PluginSelectorNodeType.Pseudo)).toBe(true);
		});

		it('should return false if the type is not Pseudo', () => {
			expect(PluginSelectorHelper.isPseudoNodeType(PluginSelectorNodeType.Class)).toBe(false);
		});
	});

	describe('isCombinatorNodeType', () => {
		it('should return true if the type is Combinator', () => {
			expect(PluginSelectorHelper.isCombinatorNodeType(PluginSelectorNodeType.Combinator)).toBe(true);
		});

		it('should return false if the type is not Combinator', () => {
			expect(PluginSelectorHelper.isCombinatorNodeType(PluginSelectorNodeType.ID)).toBe(false);
		});
	});

	describe('isSelectorNodeType', () => {
		it('should return true if the type is Selector', () => {
			expect(PluginSelectorHelper.isSelectorNodeType(PluginSelectorNodeType.Selector)).toBe(true);
		});

		it('should return false if the type is not Selector', () => {
			expect(PluginSelectorHelper.isSelectorNodeType(PluginSelectorNodeType.Pseudo)).toBe(false);
		});
	});

	describe('isChainingType', () => {
		it('should return true for all chaining types', () => {
			const chainingTypes = [
				PluginSelectorNodeType.Attribute,
				PluginSelectorNodeType.Class,
				PluginSelectorNodeType.ID,
				PluginSelectorNodeType.Pseudo,
				PluginSelectorNodeType.Tag,
				PluginSelectorNodeType.Universal,
			] as PluginSelectorValueType[];

			chainingTypes.forEach(type => expect(PluginSelectorHelper.isChainingType(type)).toBe(true));
		});

		it('should return false for non-chaining types', () => {
			const nonChainingTypes = [
				PluginSelectorNodeType.Combinator,
				PluginSelectorNodeType.Selector,
			] as PluginSelectorValueType[];

			nonChainingTypes.forEach(type => expect(PluginSelectorHelper.isChainingType(type)).toBe(false));
		});
	});
});
