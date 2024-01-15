import config from '../../../../../../.stylelintrc.js';
import { getWarning } from '../../../../../js/tests/spec-helpers.js';

import stylelint from 'stylelint';

const lint = stylelint.lint;

describe('PluginMaxNestingDepth', () => {
	const ruleName = 'kifor-stylelint/max-nesting-depth';

	it('should report an error for nesting depth more than 3', async () => {
		const result = await lint({
			code: `
				.parent {
					.child-1 {
						.child-2 {
							.child-3 {
								.child-4 {
									color: red;
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning.text).toBe(`Expected nesting depth to be no more than 3 (${ruleName})`);
	});

	it('should not report an error for nesting depth less than 3', async () => {
		const result = await lint({
			code: `
				.parent {
					.child-1 {
						.child-2 {
							.child-3 {
								color: red;
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning).toBeNull();
	});

	it('should not report an error for nesting depth more than 3 with "@include"', async () => {
		const result = await lint({
			code: `
				.parent {
					.child-1 {
						.child-2 {
							.child-3 {
								@include mixin {
									color: red;
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning).toBeNull();
	});

	it('should not report an error for nesting depth more than 3 with pseudo-element "&::"', async () => {
		const result = await lint({
			code: `
				.parent {
					.child-1 {
						.child-2 {
							.child-3 {
								&::before {
									color: red;
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning).toBeNull();
	});

	it('should not report an error for nesting depth more than 3 with pseudo-element "::"', async () => {
		const result = await lint({
			code: `
				.parent {
					.child-1 {
						.child-2 {
							.child-3 {
								::before {
									color: red;
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning).toBeNull();
	});

	it('should not report an error for pseudo-classes when ignoring pseudo-classes', async () => {
		const result = await lint({
			code: `
				.parent {
					.child-1 {
						.child-2 {
							&:hover {
								.child-3 {
									color: red;
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning).toBeNull();
	});

	it('should report an error for pseudo-classes when ignoring pseudo-classes', async () => {
		const result = await lint({
			code: `
				.parent {
					.child-1 {
						.child-2 {
							&:hover {
								.child-3 {
									.child-4 {
										color: red;
									}
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning.text).toBe(`Expected nesting depth to be no more than 3 (${ruleName})`);
	});

	it('should not report an error for host when ignoring host selector', async () => {
		const result = await lint({
			code: `
				:host {
					.child-1 {
						.child-2 {
							.child-3 {
								.child-4 {
									color: red;
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning).toBeNull();
	});

	it('should report an error for host when ignoring host selector', async () => {
		const result = await lint({
			code: `
				:host {
					.child-1 {
						.child-2 {
							.child-3 {
								.child-4 {
									.child-5 {
										color: red;
									}
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning.text).toBe(`Expected nesting depth to be no more than 3 (${ruleName})`);
	});

	it('should report an error when ignoring atRules /^\\include/ pattern', async () => {
		const result = await lint({
			code: `
				.parent {
					@include hover {
						.nested-1 {
							@include hover {
								@include hover {
									.nested-2 {
										.nested-3 {
											@include focus {
												.nested-4 {
													.nested-5 {
														margin: 0;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning.text).toBe(`Expected nesting depth to be no more than 3 (${ruleName})`);
	});

	it('should not report an error when ignoring atRules /^\\include/ pattern', async () => {
		const result = await lint({
			code: `
				.parent {
					@include hover {
						.nested-1 {
							@include hover {
								@include hover {
									.nested-2 {
										.nested-3 {
											@include focus {
												margin: 0;
											}
										}
									}
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning).toBeNull();
	});

	it('should report an error when ignoring atRules /^\\media/ pattern', async () => {
		const result = await lint({
			code: `
				.parent {
					@media (width >= 450px) {
						.nested-1 {
							@media (width >= 450px) {
								@media (width >= 450px) {
									.nested-2 {
										.nested-3 {
											@media (width >= 450px) {
												.nested-4 {
													.nested-5 {
														margin: 0;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning.text).toBe(`Expected nesting depth to be no more than 3 (${ruleName})`);
	});

	it('should not report an error when ignoring atRules /^\\media/ pattern', async () => {
		const result = await lint({
			code: `
				.parent {
					@media (width >= 450px) {
						.nested-1 {
							@media (width >= 450px) {
								@media (width >= 450px) {
									.nested-2 {
										.nested-3 {
											@media (width >= 450px) {
												margin: 0;
											}
										}
									}
								}
							}
						}
					}
				}
			`,
			config,
		});

		const warning = getWarning(result, ruleName);

		expect(warning).toBeNull();
	});
});
