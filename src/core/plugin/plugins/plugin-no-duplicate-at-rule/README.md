# kifor-stylelint/no-duplicate-at-rule

Disallow duplicate at-rules.

<!-- prettier-ignore -->
```css
@include hover { paddding: 0; }
@include hover { margin: 0 }
/**     ↑
 * This duplicate */
```
The same selector _is_ allowed to repeat in the following circumstances:

- It is used in different selector lists, e.g. `a { @include hover { padding: 0; } } @include hover { padding: 0; }`.
- The duplicates are determined to originate in different stylesheets, e.g. you have concatenated or compiled files in a way that produces sourcemaps for PostCSS to read, e.g. postcss-import.
- The duplicates are in rules with different parent nodes, e.g. inside and outside of a media query.

## Options

```ts
type RuleRegExp = string | RegExp;

interface RuleAtCommon {
	name: TextPattern;
	params?: TextPattern;
}
```

Within an order array, you can include:

- extended at-rule objects:

	```json
	{
	  "name": "include",
	  "params": "hello"
	}
	```

### Extended at-rule objects

Extended at-rule objects have different parameters and variations.

Object parameters:

* `name`: `string`. E. g., `name: "include"` for `@include`
* `params`: `string | RegExp`. A string will be translated into a RegExp — `new RegExp(yourString)` — so _be sure to escape properly_. E. g., `params: "icon"` for `@include icon(20px);`


Matches all at-rules with specific name:

```json
{
  "name": "media"
}
```

Matches all at-rules with specific name and parameters:

```json
{
  "name": "include",
  "params": "icon"
}
```

### Example:
```json
{
  "kifor-stylelint/no-self-nesting": [
    {
      "name": "include",
      "params": "icon"
    },
    {
      "name": "media"
    }
  ]
}
```

The following patterns are considered problems:

<!-- prettier-ignore -->
```css
@include media-min(sm) { paddding: 0; }
@include media-max(lg) { paddding: 0; }
@include media-min(sm) { paddding: 0; }
```

<!-- prettier-ignore -->
```css
@include hover { paddding: 0; }
@include hover;
```

<!-- prettier-ignore -->
```css
div {
 @include focus { paddding: 0; }
		
 p {
   margin: 0;
 }
		
 @include focus { paddding: 0; }
}
```

The following patterns are _not_ considered problems:

<!-- prettier-ignore -->
```css
@include media-min(sm) {
  background-color: red;
}

@include media-max(md) {  
  background-color: red;
}
```

<!-- prettier-ignore -->
```css
div {
  @include media-min(sm) {
    background-color: red;
  }
}

@include media-min(sm) {
  background-color: red;
}

@include media-max(md) {
  background-color: red;
}
```

<!-- prettier-ignore -->
```css
div {
  @include media-min(sm) {
    background-color: red;
  }
}

span {
  @include media-min(sm) {
    background-color: red;
  }
}
```
