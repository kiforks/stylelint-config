# kifor-stylelint/no-self-nesting

Prevents nesting of child selectors in the parent if they match the given pattern.

<!-- prettier-ignore -->
```css
a { a { top: 0; } }
/** ↑
 * This is a nested selector that matched with parent */
```

This rule works by checking for 'self-nesting' nesting of child selectors compared to parent selectors. Here's how it works:

<!-- prettier-ignore -->
```css
a { /* parent selector */
  & a { /* nested child selector */
    & .foo {
      @media print { 
        & a { /* nested child selector */
          color: pink;
        }
      }
    }
  }
}
```

This rule integrates into this core the functionality.

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

Within an order array, you can include:

- extended at-rule objects:

	```json
	{
	  "name": "include",
	  "parameter": "hello"
	}
	```

- extended rule objects:

	```json
	{
	  "selector": "div"
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

Matches all at-rules with specific name and parameter:

```json
{
  "name": "include",
  "params": "icon"
}
```

### Extended rule objects

Object parameters:

* `selector`: `string | RegExp`. Selector pattern. A string will be translated into a RegExp — `new RegExp(yourString)` — so _be sure to escape properly_. Examples:
	* `selector: /^&:[\w-]+$/` matches simple pseudo-classes. E. g., `&:hover`, `&:first-child`. Doesn't match complex pseudo-classes, e. g. `&:not(.is-visible)`.
	* `selector: /^&::[\w-]+$/` matches pseudo-elements. E. g. `&::before`, `&::placeholder`.

Matches all rules with selector matching pattern:

```json
{
  "selector": "div"
}
```

```json
{
  "selector": "/^&:\\w+$/"
}
```

### Example Configuration:
```json
{
  "kifor-stylelint/no-self-nesting": [
    {
      "name": "include",
      "params": "icon"
    },
    {
      "name": "media"
    },
    {
      "selector": "body"
    }
  ]
}
```

The following patterns are considered problems:

<!-- prettier-ignore -->
```css
.my-selector { /* parent */
  .foo {
    .my-selector { /* matched child */
      & > .bar {}
    }
  }
}
```

<!-- prettier-ignore -->
```css
.ignored-selector {  /* parent */
  @media print {
    .ignored-selector { /* matched child */
      & .bar {}
    }
  }
}
```

The following patterns are _not_ considered problems:

<!-- prettier-ignore -->
```css
.my-selector { /* parent */
  & .my-selector-2 {
    &__foo {} 
  }
}
```

<!-- prettier-ignore -->
```css
.ignored-selector { /* parent */
  & .foo { 
    &__foo {} 
  }
}
```

> [!NOTE]
> Selectors that are at the same nesting level **will be ignored**. For example:
<!-- prettier-ignore -->
```css
.my-selector .my-selector .my-selector { /* parent */
  .foo {
    p { /* matched child */
      & > .bar {}
    }
  }
}
```
