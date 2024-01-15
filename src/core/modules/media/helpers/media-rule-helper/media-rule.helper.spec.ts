import { MediaRuleHelper } from './media-rule.helper';

describe('MediaRuleHelper', () => {
	describe('getDevicePrefixParameter', () => {
		it('should return correct device prefix', () => {
			const prefix = MediaRuleHelper.getDevicePrefixParameter('mobile');

			expect(prefix).toBe('^media-mobile');
		});
	});

	describe('getRuleFullBreakpointPrefix', () => {
		it('should return correct full breakpoint prefix', () => {
			const prefix = MediaRuleHelper.getRuleFullBreakpointPrefix('min');

			expect(prefix).toBe('^media-min');
		});
	});

	describe('getBreakpointPrefixParameter', () => {
		it('should return correct breakpoint prefix', () => {
			const prefix = MediaRuleHelper.getBreakpointPrefixParameter('min', 'sm');

			expect(prefix).toBe('^media-min(sm)');
		});
	});

	describe('getBreakpointBetweenPrefixParameter', () => {
		it('should return correct between prefix', () => {
			const prefix = MediaRuleHelper.getBreakpointBetweenPrefixParameter('xs', 'sm');

			expect(prefix).toBe('^media-between(xs, sm)');
		});
	});

	describe('createDeviceOrderRule', () => {
		it('should return correct at-rule object', () => {
			const atRule = MediaRuleHelper.createDeviceOrderRule('mobile');

			expect(atRule).toEqual({
				type: 'at-rule',
				name: 'include',
				parameter: '^media-mobile',
			});
		});
	});

	describe('createDeviceConfigRule', () => {
		it('should return correct config at-rule object', () => {
			const atRule = MediaRuleHelper.createDeviceConfigRule('mobile');

			expect(atRule).toEqual({ name: 'include', params: '^media-mobile' });
		});
	});

	describe('createBreakpointOrderAtRule', () => {
		it('should return correct at-rule object', () => {
			const atRule = MediaRuleHelper.createBreakpointOrderAtRule('min', 'sm');

			expect(atRule).toEqual({
				type: 'at-rule',
				name: 'include',
				parameter: '^media-min(sm)',
			});
		});
	});

	describe('createBreakpointConfigAtRule', () => {
		it('should return correct config at-rule object', () => {
			const atRule = MediaRuleHelper.createBreakpointConfigAtRule('min', 'sm');

			expect(atRule).toEqual({ name: 'include', params: '^media-min(sm)' });
		});
	});

	describe('createBreakpointBetweenOrderRule', () => {
		it('should return correct at-rule object', () => {
			const atRule = MediaRuleHelper.createBreakpointBetweenOrderRule('xs', 'sm');

			expect(atRule).toEqual({
				type: 'at-rule',
				name: 'include',
				parameter: '^media-between(xs, sm)',
			});
		});
	});

	describe('createBreakpointBetweenConfigRule', () => {
		it('should return correct config at-rule object', () => {
			const atRule = MediaRuleHelper.createBreakpointBetweenConfigRule('xs', 'sm');

			expect(atRule).toEqual({
				name: 'include',
				params: '^media-between(xs, sm)',
			});
		});
	});

	describe('createDeviceOrderRules', () => {
		it('should return an array of at-rule objects', () => {
			const data = MediaRuleHelper.createDeviceOrderRules(['mobile', 'desktop']);

			expect(data).toEqual([
				{ type: 'at-rule', name: 'include', parameter: '^media-mobile' },
				{ type: 'at-rule', name: 'include', parameter: '^media-desktop' },
			]);
		});
	});

	describe('createDeviceConfigRules', () => {
		it('should return an array of config at-rule objects', () => {
			const data = MediaRuleHelper.createDeviceConfigRules(['mobile', 'desktop']);

			expect(data).toEqual([
				{ name: 'include', params: '^media-mobile' },
				{ name: 'include', params: '^media-desktop' },
			]);
		});
	});

	describe('createBreakpointOrderRules', () => {
		it('should return an array of at-rule objects', () => {
			const data = MediaRuleHelper.createBreakpointOrderRules('min', ['sm', 'md']);

			expect(data).toEqual([
				{ type: 'at-rule', name: 'include', parameter: '^media-min(sm)' },
				{ type: 'at-rule', name: 'include', parameter: '^media-min(md)' },
			]);
		});
	});

	describe('createBreakpointConfigRules', () => {
		it('should return an array of config at-rule objects', () => {
			const data = MediaRuleHelper.createBreakpointConfigRules('min', ['sm', 'md']);

			expect(data).toEqual([
				{ name: 'include', params: '^media-min(sm)' },
				{ name: 'include', params: '^media-min(md)' },
			]);
		});
	});

	describe('createBreakpointBetweenOrderRules', () => {
		it('should return an array of at-rule objects for each unique pair of breakpoints', () => {
			const data = MediaRuleHelper.createBreakpointBetweenOrderRules(['xs', 'sm', 'md', 'lg']);

			expect(data).toEqual([
				{
					type: 'at-rule',
					name: 'include',
					parameter: '^media-between(xs, sm)',
				},
				{
					type: 'at-rule',
					name: 'include',
					parameter: '^media-between(xs, md)',
				},
				{
					type: 'at-rule',
					name: 'include',
					parameter: '^media-between(xs, lg)',
				},
				{
					type: 'at-rule',
					name: 'include',
					parameter: '^media-between(sm, md)',
				},
				{
					type: 'at-rule',
					name: 'include',
					parameter: '^media-between(sm, lg)',
				},
				{
					type: 'at-rule',
					name: 'include',
					parameter: '^media-between(md, lg)',
				},
			]);
		});
	});

	describe('createBreakpointBetweenConfigRules', () => {
		it('should return an array of config at-rule objects for each unique pair of breakpoints', () => {
			const data = MediaRuleHelper.createBreakpointBetweenConfigRules(['xs', 'sm', 'md', 'lg']);

			expect(data).toEqual([
				{ name: 'include', params: '^media-between(xs, sm)' },
				{ name: 'include', params: '^media-between(xs, md)' },
				{ name: 'include', params: '^media-between(xs, lg)' },
				{ name: 'include', params: '^media-between(sm, md)' },
				{ name: 'include', params: '^media-between(sm, lg)' },
				{ name: 'include', params: '^media-between(md, lg)' },
			]);
		});
	});
});
