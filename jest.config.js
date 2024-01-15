/** @type {import('jest').Config} */
export default {
	preset: 'jest-preset-stylelint',
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	testMatch: ['**/*.spec.ts', '**/*.spec.js'],
	moduleFileExtensions: ['ts', 'js', 'json'],
	moduleNameMapper: {
		'^@core/(.*)$': '<rootDir>/src/core/$1',
		'^@plugin/(.*)$': '<rootDir>/src/core/plugin/$1',
		'^@rule/(.*)$': '<rootDir>/src/core/rule/$1',
		'^@modules/(.*)$': '<rootDir>/src/core/modules/$1',
	},
};
