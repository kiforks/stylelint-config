export abstract class RegularExpressionConfig {
	public static readonly ScssScopeVariable = '/^[a-zA-Z0-9_-]+\\.\\$/';
	public static readonly ScssVariable = '/^(\\$|--)/';
	public static readonly CssVariable = '/^var\\(--/';
}
