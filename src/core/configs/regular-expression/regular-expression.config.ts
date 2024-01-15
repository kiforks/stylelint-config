export abstract class RegularExpressionConfig {
	public static readonly SCSS_SCOPE_VARIABLE = '/^[a-zA-Z0-9_-]+\\.\\$/';
	public static readonly SCSS_VARIABLE = '/^(\\$|--)/';
	public static readonly CSS_VARIABLE = '/^var\\(--/';
}
