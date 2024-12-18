import kiforJest from '@kiforks/eslint-config/jest.js';
import kiforTests from '@kiforks/eslint-config/test.js';
import kiforTypescript from '@kiforks/eslint-config/typescript.js';

/** @type { import("eslint").Linter.Config[] } */
export default [
	...kiforTypescript.map(config => ({
		...config,
		languageOptions: {
			...config.languageOptions,
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	})),
	...kiforJest.map(config => ({
		...config,
		languageOptions: {
			...config.languageOptions,
			globals: {
				jest: true,
			},
		},
	})),
	...kiforTests,
	{
		rules: {
			'require-unicode-regexp': 'off',
			'sort-keys': 'off',
			'no-undef': 'off',
			'sort-vars': 'off',
			'one-var': 'off',
		},
	},

	{
		ignores: [
			// Compiled output
			'dist/',
			'tmp/',
			'out-tsc/',
			'bazel-out/',

			// Node
			'node_modules/',
			'npm-debug.log',
			'yarn-error.log',

			// IDEs and editors
			'.idea/',
			'.project',
			'.classpath',
			'.c9/',
			'*.launch',
			'.settings/',
			'*.sublime-workspace',

			// Visual Studio Code
			'.vscode/',
			'!.vscode/settings.json',
			'!.vscode/tasks.json',
			'!.vscode/launch.json',
			'!.vscode/extensions.json',
			'.history/',

			// Miscellaneous
			'.angular/cache/',
			'.sass-cache/',
			'connect.lock',
			'coverage/',
			'libpeerconnection.log',
			'testem.log',
			'typings/',

			// System files
			'.DS_Store',
			'Thumbs.db',

			// Storybook і NX
			'*storybook.log',
			'.nx/',
			'.vscode/',
			'.stylelintrc.js',
		],
	},
];
