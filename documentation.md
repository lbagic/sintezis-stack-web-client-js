# WebStack Documentation

#### Table of Contents

- [WebStack Documentation](#webstack-documentation) - [Table of Contents](#table-of-contents)
  - [Utils](#utils)
    - [String polyfills](#string-polyfills)
    - [Array Polyfills](#array-polyfills)
    - [CSS](#css)
    - [Breakpoint](#breakpoint)
    - [Date](#date)
  - [SCSS](#scss)
    - [Breakpoints](#breakpoints)
    - [Colors](#colors)
    - [Other style definitions](#other-style-definitions)
  - [Buttons (styles)](#buttons-styles)
  - [Cards (styles)](#cards-styles)
  - [Tables (styles)](#tables-styles)
  - [Carousel (unsupported)](#carousel-unsupported)
  - [Inputs (component)](#inputs-component)
  - [Modals (component)](#modals-component)
  - [Toasts (component)](#toasts-component)
  - [Internationalization (plugin)](#internationalization-plugin)
- [Roadmap](#roadmap)
  - [Proposed 💬 (To discuss)](#proposed--to-discuss)
  - [Accepted 🖥 (In development)](#accepted--in-development)
  - [Released 🚀 (Ready for use)](#released--ready-for-use)
  - [Recommended ✅ (Battle tested)](#recommended--battle-tested)

---

## Utils

Folder: `src/utils/`

### String polyfills

Additional methods attached to string ctor.  
List of supported methods: `toCamelCase`, `toCapitalCase`, `toConstantCase`, `toDotCase`, `toHeaderCase`, `toNoCase`, `toParamCase`, `toPascalCase`, `toPathCase`, `toSentenceCase`, `toSnakeCase`

> Example: `'Hello world'.toPascalCase()`

Reference: https://github.com/blakeembrey/change-case

### Array Polyfills

Additional methods attached to array ctor.  
List of supported methods: `add`, `remove`, `findOne`, `findMany`

> Example: `[{id: 1}].add([{id: 1}, {id: 2}])`

Reference: https://github.com/lbagic/collections

### CSS

All project css variables are automatically exported to javascript.

> Example: `css.colors.danger.base`

### Breakpoint

Reactive css breakpoints available in javascript form.

> Example: `breakpoint.s` or `breakpoint.between("m", "xl")`

Implementation based on https://vueuse.org/core/usebreakpoints/.

### Date

Util for formatting dates explicitly.  
List of supported methods: `format`, `difference`, `duration`, `toMs`

Format Parameters:

```js
{
    hour: ["-h2", "-h"],
    minute: ["-min2", "-min"],
    second: ["-sec2", "-sec"],
    weekday: ["-dl", "-ds"],
    day: ["-d2", "-d"],
    month: ["-ml", "-ms", "-m2", "-m"],
    year: ["-y2", "-y"],
}
```

Example:

```js
import { date } from ".../utils/date.js";

date.format("-dl -d2, -y/-m2, -dl, -h2:-min2", new Date(Date.now()));
// Friday 21, 2022/09, 22:02
date.difference(
  "-dd -hh -minm",
  new Date(Date.now() - days(3.5)),
  new Date(Date.now())
);
// 3d 12h 0m
date.duration(
  "-ww, -dd, -hh, -minmin, -secsec",
  Date.now() - (Date.now() - days(3.5))
);
// 0w, 3d, 12h, 0min, 0sec
```

---

## SCSS

Folder: `src/assets/styles/`

Custom SCSS framework integrated within project.

### Breakpoints

File: `src/assets/styles/variables/breakpoints.scss`  
When defining breakpoints in css **always use predefined breakpoints via mixins**.  
For usage within javascript refer to [breakpoint util](#ubreakpointu).

Example:

```scss
@include s {
 .some-class {...styles}
}
// or
.some-class {
 @include s {...styles}
}
```

### Colors

File: `src/assets/styles/variables/colors.scss`  
Project color palette definition.

> Example: `background: var(--prefix-color-primary);`

### Other style definitions

Folder: `src/assets/styles/elements/`  
Style definitions for custom components and utilities.  
Notable mentions: `containers`, `typography`

---

## Buttons (styles)

Buttons are defined via styles, use by attaching appropriate classes.  
Class: `prefix-button`  
Class modifiers: color (palette color), size (`small`, `large`, `expand`)

> Example: \<button class="prefix-button primary small">\</button>

Reference: `src/assets/styles/elements/buttons.scss`

---

## Cards (styles)

Cards are defined via styles, use by attaching appropriate classes.  
Class: `prefix-card`  
Class modifiers: color

> Example: \<div class="prefix-card primary">\</div>

Reference: `src/assets/styles/elements/cards.scss`

---

## Tables (styles)

Tables are defined via styles, use by attaching appropriate classes.  
Class: `prefix-table`  
Class modifiers: color

> Example: \<table class="prefix-table primary">\</table>

Reference: `src/assets/styles/elements/tables.scss`

For better and more configurable tables, consider using third party package, e.g. https://xaksis.github.io/vue-good-table/.

---

## Carousel (unsupported)

Carousel solution is not provided, consider using third party package, e.g. https://swiperjs.com/.

---

## Inputs (component)

Inputs are used via component `BaseInput` and named export `useFormData` for scaffolding reactive data.

> Lightweight wrapper around html input that provides input validation and basic validation styles.

| Prop                  | Value    | Description                                    |
| --------------------- | -------- | ---------------------------------------------- |
| type                  | string   | Input type (defaults to text)                  |
| hint                  | string   | Hint text                                      |
| label                 | string   | Label text                                     |
| validator             | function | Custom validator function                      |
| use-error-border      | boolean  | Enables error border                           |
| use-error-message     | boolean  | Enables error messages                         |
| use-html-validation   | boolean  | Enables html warning tooltip                   |
| use-required-asterisk | boolean  | Enables `*` sign on labels with required field |

```js
// default settings as defined in input.ctl
const settings = {
  useErrorMessage: true,
  useErrorBorder: true,
  useRequiredAsterisk: true,
  useHtmlValidation: false,
};
```

Example:

```html
<script setup>
  import BaseInput from "../components/base/BaseInput.vue";
  import { useFormData } from "../components/base/input.ctl";

  const form = useFormData({
    email: "",
    password: "",
  });
</script>

<template>
  <form @submit.prevent>
    <BaseInput v-model="form.model.email" type="email" required />
    <BaseInput v-model="form.model.password" type="password" required />
    <button type="submit">submit</button>
  </form>
</template>
```

---

## Modals (component)

Modals are used via component `BaseModal`.  
Class modifiers: color

> Modals respect autofocus attribute when it is used on element within modal.

| Prop                           | Value   | Description                          |
| ------------------------------ | ------- | ------------------------------------ |
| name                           | string  | Name of the modal                    |
| local                          | boolean | Contained within parent element      |
| expand                         | boolean | Spans full width and height          |
| keep-alive                     | boolean | State persists through open/close    |
| disable-close                  | boolean | Disables all forms of manual closing |
| disable-close-on-esc           | boolean | Disables closing via escape          |
| disable-close-on-button        | boolean | Disables closing via close button    |
| disable-close-on-click-outside | boolean | Disables closing via click-outside   |

Example:

```html
<script setup>
  import { modals } from ".../components/base/modal.ctl";
</script>
<template>
  <button @click="modals.login.open">Open modal</button>
  <BaseModal class="primary" name="login">...</BaseModal>
</template>
```

---

## Toasts (component)

Toasts are used via named export `toast`.

- variants: `success`, `danger`, `info`
- options: `position`, `duration`, `closable`

```js
// default settings as defined in toast.ctl
const settings = {
  success: { position: "top center", duration: 3 * 1000 },
  danger: { position: "top center", duration: 3 * 1000 },
  info: { position: "bottom right", duration: 20 * 1000, closable: true },
};
```

Example:

```js
import { toast } from ".../components/base/toast.ctl";

toast.success("Message", { closable: true, duration: 0 });
```

---

## Internationalization (plugin)

Internationalization is supported via vue18n.

Defining messages:

```js
// Message enums # .../utils/translations/index.js
export const messages = { login: { action: "", description: "" } };
```

```js
// Translations # .../utils/translations/en.js
export const en = {
  login: { action: "Log in", description: "Log in description" },
};
```

Using translations:

```html
<script setup>
  import { messages } from ".../utils/translations";
</script>

<template>
  <p>{{ $t(messages.login.action) }}</p>
</template>
```

Reference: https://vue-i18n.intlify.dev/.

# Roadmap

Web Stack roadmap containing current status and stages of custom elements.

| Stage       | Icon | Description                                     |
| ----------- | ---- | ----------------------------------------------- |
| Proposed    | 💬   | Proposition                                     |
| Accepted    | 🖥    | Waiting for or in the process of implementation |
| Released    | 🚀   | Implementation complete                         |
| Recommended | ✅   | Finished & recommended                          |

### Proposed 💬 (To discuss)

- Loading interceptors and loaders (javascript)
- utils: object iterator

### Accepted 🖥 (In development)

- Admin panel theme

### Released 🚀 (Ready for use)

- Documentation
- Project settings (settings)
- Linter (settings)
- GRPC & API (javascript)
- Store (javascript)
- Utils (javascript)
- SCSS framework (styles)
- Breakpoints (styles & javascript)
- Buttons (styles)
- Cards (styles)
- Tables (styles)
- Inputs (component)
- Modals (component)
- Toasts (component)
- Internationalization (plugin)

### Recommended ✅ (Battle tested)

## BaseInput roadmap

| Feature                         | Status |
| ------------------------------- | ------ |
| validation                      | ✅     |
| label support                   | ✅     |
| error & help text support       | ✅     |
| icon support                    |        |
| placeholders                    |        |
| option                          |        |
| `date`, `time`, `month` support | native |
| `date range` support            |        |
| `textarea`, `select` support    | native |
| `checkbox`, `radio` support     | native |
| `file input` support            | native |

## BaseModal roadmap

| Feature                                    | Status |
| ------------------------------------------ | ------ |
| modal & overlay support                    | ✅     |
| color scheme                               | ✅     |
| sizing and overflowing                     | ✅     |
| focus trap                                 | ✅     |
| focus first focusable element              | ✅     |
| modal stack for multiple fullscreen modals |        |
| open via ref                               | ✅     |
| open via url hash                          |        |
| open via url query                         |        |
| open programmaticaly                       | ✅     |
| disable body scroll                        | ✅     |
| close via escape                           | ✅     |
| close via clickaway                        | ✅     |
| close via close button                     | ✅     |
