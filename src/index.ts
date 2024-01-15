import { ORDER_CONTENT } from '@modules/order/modules/order-content';
import { ORDER_PROPERTIES } from '@modules/order/modules/order-property';
import { Plugin } from '@plugin/decorators';
import { pluginMaxNestingDepthProvider } from '@plugin/plugins/plugin-max-nesting-depth';
import { pluginNoDuplicateAtRuleProvider } from '@plugin/plugins/plugin-no-duplicate-at-rule';
import { pluginNoFirstLevelNestingProvider } from '@plugin/plugins/plugin-no-first-level-nesting';
import { pluginNoSelfNestingProvider } from '@plugin/plugins/plugin-no-self-nesting';
import { pluginSelectorCombinatorNestingProvider } from '@plugin/plugins/plugin-selector-combinator-nesting';
import {
	DeclarationPropertyValueAllowedListConfig,
	RULE_NO_UNKNOWN,
	RULE_PROPERTY_UNIT_ALLOWED_LIST,
	RULE_UNIT_ALLOWED_LIST,
} from '@rule/configs';

import { Config } from 'stylelint';

/**
 * Docs:
 * @see https://stylelint.io/user-guide/rules
 */
@Plugin({
	providers: [
		pluginMaxNestingDepthProvider(),
		pluginNoSelfNestingProvider(),
		pluginNoDuplicateAtRuleProvider(),
		pluginSelectorCombinatorNestingProvider(),
		pluginNoFirstLevelNestingProvider(),
	],
})
class Configuration implements Config {
	public extends = [
		/** @see https://github.com/stylelint-scss/stylelint-config-standard-scss */
		'stylelint-config-standard',
	];

	public customSyntax = 'postcss-scss';
	public ignoreFiles = ['**/*.css'];
	public plugins = [
		/** @see https://github.com/stylelint-scss/stylelint-scss */
		'stylelint-scss',

		/**
		 * @name order/order
		 * @name order/properties-order
		 * @see https://www.npmjs.com/package/stylelint-order
		 */
		'stylelint-order',

		/** @see https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties/blob/master/README.md */
		'stylelint-declaration-block-no-ignored-properties',
	];

	public rules = {
		/* At-rule */
		'at-rule-no-unknown': [true, { ignoreAtRules: RULE_NO_UNKNOWN }],
		'at-rule-property-required-list': {
			'font-face': ['font-display', 'font-family', 'font-style'],
		},

		/* Color */
		'color-function-notation': ['legacy', { ignore: ['with-var-inside'] }],
		'color-hex-length': 'long',

		/* Declaration block */
		'declaration-block-no-duplicate-properties': true,
		'declaration-block-no-redundant-longhand-properties': null,

		/* Declaration property */
		'declaration-property-unit-allowed-list': RULE_PROPERTY_UNIT_ALLOWED_LIST,
		'declaration-property-value-no-unknown': [true, { ignoreProperties: { '/^[a-zA-Z].*$/': /.*\$\w+.*/ } }],
		'declaration-property-value-allowed-list': DeclarationPropertyValueAllowedListConfig.VALUES,
		'plugin/declaration-block-no-ignored-properties': true,

		/* Function */
		'function-disallowed-list': ['rgb'],
		'function-url-no-scheme-relative': true,
		'function-url-scheme-disallowed-list': ['ftp', '/^http/'],

		/* Media feature */
		'media-feature-name-no-vendor-prefix': true,
		'media-feature-name-disallowed-list': ['max-width', 'min-width', 'width'],

		/* Rule */
		'rule-selector-property-disallowed-list': {
			'/ri\\-/': ['font-size'],
			'/^\\.ri-/': ['font-size'],
			i: ['font-size'],
		},
		'at-rule-disallowed-list': ['extend'],
		'at-rule-empty-line-before': [
			'always',
			{
				except: ['blockless-after-same-name-blockless', 'first-nested'],
				ignore: ['after-comment'],
				ignoreAtRules: ['else'],
			},
		],

		/* Selector */
		'selector-disallowed-list': [
			'i',
			'/^\\.container/',
			'/^\\.g-col-/',
			'/^\\.col-/',
			'/^\\.grid+$/',
			'/^\\.row+$/',
			'/\\[data-test.+]/',
			'/\\[data-po.+]/',
		],
		'selector-max-attribute': 1,
		'selector-max-id': 1,
		'selector-no-qualifying-type': true,
		'selector-not-notation': 'simple',
		'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['ng-deep'] }],
		'selector-nested-pattern': '^(?!::?[a-zA-Z0-9-]+)',
		'declaration-property-value-disallowed-list': {
			/** @see https://github.com/YozhikM/stylelint-a11y/blob/master/src/rules/no-display-none/README.md */
			display: ['/none/'],
			/** @see https://github.com/YozhikM/stylelint-a11y/blob/master/src/rules/no-text-align-justify/README.md */
			'text-align': ['/justify/'],

			border: ['/none/'],
		},

		/* Time */
		'time-min-milliseconds': 50,

		/* Unit */
		'unit-allowed-list': RULE_UNIT_ALLOWED_LIST,

		/* Plugin */
		'order/order': ORDER_CONTENT,
		'order/properties-order': [{ properties: ORDER_PROPERTIES }],

		/* Case */
		'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],

		/* Empty lines */
		'rule-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'custom-property-empty-line-before': 'never',

		/* Notation */
		'font-weight-notation': 'numeric',
		'annotation-no-unknown': [true, { ignoreAnnotations: [/default\b/] }],
		'import-notation': 'string',

		/**
		 * SCSS
		 * @see https://github.com/stylelint-scss/stylelint-scss/tree/master
		 * */
		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-extend-no-missing-placeholder/README.md */
		'scss/at-extend-no-missing-placeholder': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-no-null/README.md */
		'scss/at-if-no-null': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-rule-no-unknown/README.md */
		'scss/at-rule-no-unknown': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/comment-no-empty/README.md */
		'scss/comment-no-empty': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/declaration-nested-properties-no-divided-groups/README.md */
		'scss/declaration-nested-properties-no-divided-groups': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/declaration-nested-properties/README.md */
		'scss/declaration-nested-properties': 'never',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-no-missing-interpolation/README.md */
		'scss/dollar-variable-no-missing-interpolation': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-default/README.md */
		'scss/dollar-variable-default': [true, { ignore: 'local' }],

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-no-namespaced-assignment/README.md */
		'scss/dollar-variable-no-namespaced-assignment': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-quote-no-quoted-strings-inside/README.md */
		'scss/function-quote-no-quoted-strings-inside': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-unquote-no-unquoted-strings-inside/README.md */
		'scss/function-unquote-no-unquoted-strings-inside': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/load-no-partial-leading-underscore/README.md */
		'scss/load-no-partial-leading-underscore': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-duplicate-mixins/README.md */
		'scss/no-duplicate-mixins': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md */
		'scss/no-global-function-names': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-newline-after/README.md */
		'scss/operator-no-newline-after': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-newline-before/README.md */
		'scss/operator-no-newline-before': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-unspacedREADME.md */
		'scss/operator-no-unspaced': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-redundant-nesting-selector/README.md */
		'scss/selector-no-redundant-nesting-selector': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-union-class-name/README.md */
		'scss/selector-no-union-class-name': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-duplicate-dollar-variables/README.md */
		'scss/no-duplicate-dollar-variables': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-closing-brace-newline-after/README.md */
		'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-closing-brace-space-after/README.md */
		'scss/at-else-closing-brace-space-after': 'always-intermediate',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-if-parentheses-space-before/README.md */
		'scss/at-else-if-parentheses-space-before': 'always',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-parentheses-space-before/README.md */
		'scss/at-function-parentheses-space-before': 'never',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-pattern/README.md */
		'scss/at-function-pattern': [
			'^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{ message: 'Expected function name to be kebab-case' },
		],

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-closing-brace-newline-after/README.md */
		'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-closing-brace-space-after/README.md */
		'scss/at-if-closing-brace-space-after': 'always-intermediate',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-argumentless-call-parentheses/README.md */
		'scss/at-mixin-argumentless-call-parentheses': 'never',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-parentheses-space-before/README.md */
		'scss/at-mixin-parentheses-space-before': 'never',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-pattern/README.md */
		'scss/at-mixin-pattern': ['^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$', { message: 'Expected mixin name to be kebab-case' }],

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-rule-conditional-no-parentheses/README.md */
		'scss/at-rule-conditional-no-parentheses': true,

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-colon-space-after/README.md */
		'scss/dollar-variable-colon-space-after': 'always-single-line',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-colon-space-before/README.md */
		'scss/dollar-variable-colon-space-before': 'never',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-first-in-block/README.md */
		'scss/dollar-variable-first-in-block': [true, { ignore: ['comments', 'imports'] }],

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-empty-line-before/README.md */
		'scss/dollar-variable-empty-line-before': [
			'always',
			{
				except: ['after-dollar-variable', 'first-nested'],
				ignore: ['after-comment', 'inside-single-line-block'],
			},
		],

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-pattern/README.md */
		'scss/dollar-variable-pattern': [
			'^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{ message: 'Expected variable to be kebab-case' },
		],

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-empty-line-before/README.md */
		'scss/double-slash-comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['between-comments', 'stylelint-commands'],
			},
		],

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-whitespace-inside/README.md */
		'scss/double-slash-comment-whitespace-inside': 'always',

		/** @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/percent-placeholder-pattern/README.md */
		'scss/percent-placeholder-pattern': [
			'^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{ message: 'Expected placeholder to be kebab-case' },
		],
	};
}

export default { ...new Configuration() };
