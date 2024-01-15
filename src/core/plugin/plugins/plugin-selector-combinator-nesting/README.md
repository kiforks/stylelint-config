# kifor-stylelint/selector-combinator-nesting

This rule requires or disallows nesting of combinators in selectors, enforcing a consistent level of specificity and readability.

#### Selectors without nesting of combinators
```scss
.foo .bar {}

.foo.bar {}

.foo > .bar {}

.foo:hover {}
```

#### Selectors with combinators nested
```scss
.foo {
  .bar {}
}

.foo {
  &.bar {}
}

.foo {
  & > .bar {}
}

.foo {
  &:hover {}
}
```

## Options

`string`: `"always"|"never"`

### `"always"`

Every combinator in a selector must be nested where possible, maintaining the resolved selector's specificity.

Sections of selectors preceding a parent selector are ignored with `always`.
e.g.

```scss
.foo {
  .bar.baz & {}
}
```

Sections of selectors within pseudo selectors are also ignored with `always`.
e.g.

```scss
.foo {
  &:not(.bar .baz) {}
}
```

while this could be refactored to:

```scss
.bar {
  .baz {
    .foo:not(&) {}
  }
}
```

There are variances in the way this is compiled between compilers, therefore for the purposes of this rule the selector sections within pseudo selectors are being ignored.

The following patterns are considered warnings:

```scss
.foo .bar {}
```

```scss
.foo.bar {}
```

```scss
.foo > .bar {}
```

```scss
.foo:hover {}
```

```scss
a[href] {}
```

```scss
* + li {}
```

```scss
:nth-child(2n - 1):last-child {}
```

The following patterns are *not* considered warnings:

```scss
.foo {
  .bar {}
}
```

```scss
.foo {
  &.bar {}
}
```

```scss
.foo {
  & > .bar {}
}
```

```scss
.foo {
  &:hover {}
}
```

```scss
a {
  &[href] {}
}
```

```scss
* {
  & + li {}
}
```

```scss
:nth-child(2n - 1) {
  &:last-child {}
}
```

### `"never"`

Selectors should not be nested. This rule enforces a flat structure for selector specificity.

The following patterns are considered warnings:

```scss
.foo {
  .bar {}
}
```

```scss
.foo {
  &.bar {}
}
```

```scss
.foo {
  & > .bar {}
}
```

```scss
.foo {
  &:hover {}
}
```

```scss
a {
  &[href] {}
}
```

```scss
* {
  & + li {}
}
```

```scss
:nth-child(2n - 1) {
  &:last-child {}
}
```

The following patterns are *not* considered warnings:

```scss
.foo .bar {}
```

```scss
.foo.bar {}
```

```scss
.foo > .bar {}
```

```scss
.foo:hover {}
```

```scss
a[href] {}
```

```scss
* + li {}
```

```scss
:nth-child(2n - 1):last-child {}
```
