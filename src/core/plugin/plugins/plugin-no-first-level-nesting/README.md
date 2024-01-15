# kifor-stylelint/no-first-level-nesting

The rule examines each selector at the first level within the CSS and compares it against the provided patterns. If a match is found, it reports an error, indicating that the use of such a selector or pattern at the first level is not allowed.

## Options

```ts
type TextPattern = string | RegExp;

interface AtRule {
  name: TextPattern;
  parameter?: TextPattern;
}

interface Rule {
  selector: TextPattern;
}
```

Within an options array, you can include:

- Extended at-rule objects:
	```json
	{
		"name": "include",
		"parameter": "hello"
	}
	```

- Extended rule objects:
	```json
	{
		"selector": "div"
	}
	```

### Extended at-rule objects

Specify at-rules with parameters to target:

- `name`: The name of the at-rule, e.g., `name: "include"` for `@include`.
- `parameter`: The parameters of the at-rule, which will be converted into a RegExp.

### Extended rule objects

Specify selector patterns to target with these objects. For example:

- `selector`: A pattern to match selectors, which will be converted into a RegExp.

### Example Configuration (included by default):

```json
{
  "kifor-stylelint/no-first-level-nesting": [
    {
      "name": "include",
      "parameter": "/^media-/"
    },
    {
      "name": "/^media-/"
    },
    {
      "selector": "/^(?![a-zA-Z.#])(?!(?::host|:root)).*$/"
    }
  ]
}
```

The following pattern is considered a problem when it matches the provided configuration:

<!-- prettier-ignore -->
```css
::ng-deep {}
```

<!-- prettier-ignore -->
```css
:hover {}
```

<!-- prettier-ignore -->
```css
@include media-min(md) {}
```

<!-- prettier-ignore -->
```css
@media screen {}
```

<!-- prettier-ignore -->
```css
> .foo {}
```

The following patterns are _not_ considered problems:

<!-- prettier-ignore -->
```css
.class {}
```

<!-- prettier-ignore -->
```css
#element-id {}
```

<!-- prettier-ignore -->
```css
div {}
```
