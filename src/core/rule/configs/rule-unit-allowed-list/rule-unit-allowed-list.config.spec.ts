import { RULE_UNIT_ALLOWED_LIST } from './rule-unit-allowed-list.config';

describe('RULE_UNIT_ALLOWED_LIST', () => {
	it('should have the following value', () => {
		expect(RULE_UNIT_ALLOWED_LIST).toEqual(['px', 'rem', 'deg', 'fr', '%', 'ms', 'vw', 'vh', 'vmin', 'vmax']);
	});
});
