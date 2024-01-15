import { RULE_NO_UNKNOWN } from './rule-no-unknown.config';

describe('RULE_NO_UNKNOWN', () => {
	it('should return the following value', () => {
		expect(RULE_NO_UNKNOWN).toEqual([
			'mixin',
			'include',
			'extend',
			'content',
			'each',
			'function',
			'return',
			'if',
			'else',
			'use',
			'forward',
			'error',
			'for',
		]);
	});
});
