TODO:

- update docs
- storybook integration
- GRPC/REST - stream logger
- input - test performance, maybe some eager computeds?
- components - a11y

# WebStack Documentation

- [WebStack Documentation](#webstack-documentation)
  - [Input (component)](#input-component)
      - [**Usage example:**](#usage-example)
  - [Modal (component)](#modal-component)
      - [**Usage example:**](#usage-example-1)
  - [Toast (component)](#toast-component)
      - [**Usage example:**](#usage-example-2)
  - [Utils](#utils)
    - [String polyfills](#string-polyfills)
      - [**Usage example:**](#usage-example-3)
    - [Array Polyfills](#array-polyfills)
      - [**Usage example:**](#usage-example-4)
    - [CSS](#css)
      - [**Usage example:**](#usage-example-5)
    - [Breakpoint](#breakpoint)
      - [**Usage example:**](#usage-example-6)
    - [Date](#date)
      - [**Usage example:**](#usage-example-7)
  - [SCSS](#scss)
    - [Breakpoints](#breakpoints)
      - [**Usage example:**](#usage-example-8)
    - [Colors](#colors)
      - [**Usage example:**](#usage-example-9)
    - [Other style definitions](#other-style-definitions)
  - [Buttons (styles)](#buttons-styles)
      - [**Usage example:**](#usage-example-10)
  - [Cards (styles)](#cards-styles)
      - [**Usage example:**](#usage-example-11)
  - [Tables (styles)](#tables-styles)
      - [**Usage example:**](#usage-example-12)
  - [Carousel (unsupported)](#carousel-unsupported)
  - [Internationalization (plugin)](#internationalization-plugin)
      - [**Usage example:**](#usage-example-13)
- [Roadmap](#roadmap)
    - [Proposed 💬 (To discuss)](#proposed--to-discuss)
    - [Accepted 🖥 (In development)](#accepted--in-development)
    - [Released 🚀 (Ready for use)](#released--ready-for-use)
    - [Recommended ✅ (Battle tested)](#recommended--battle-tested)
  - [BaseInput roadmap](#baseinput-roadmap)

---

## Input (component)

Component name - `BaseInput`  
Data modelling function - `useFormData`

#### **Usage example:**

```html
<script setup>
  import BaseInput from "../components/base/BaseInput.vue";
  import { useFormData } from "../components/base/input.ctl";

  const form = useFormData({
    email: "",
  });
</script>

<template>
  <form @submit.prevent>
    <BaseInput v-model="form.model.email" type="email" required />
    <button type="submit">submit</button>
  </form>
</template>
```

**Props:**

| Prop                  | Value           | Description                                    |
| --------------------- | --------------- | ---------------------------------------------- |
| type                  | string          | Input type (defaults to text)                  |
| hint                  | string          | Hint text                                      |
| label                 | string          | Label text                                     |
| options               | object \| array | List of options for select input               |
| validator             | function        | Custom validator function                      |
| use-error-border      | boolean         | Enables error border                           |
| use-error-message     | boolean         | Enables error messages                         |
| use-html-validation   | boolean         | Enables html warning tooltip                   |
| use-required-asterisk | boolean         | Enables `*` sign on labels with required field |

**Global settings (_input.ctl.js_):**

```js
const settings = {
  useErrorMessage: true,
  useErrorBorder: true,
  useRequiredAsterisk: true,
  useHtmlValidation: false,
};
```

---

## Modal (component)

Component name - `BaseModal`  
Modal control object - `modal`  
Class modifiers - color

Modals respect autofocus attribute when it is used on elements within modal.

#### **Usage example:**

```html
<script setup>
  import { modal } from ".../components/base/modal.ctl";
</script>
<template>
  <button @click="modal.login.open">Open modal</button>
  <BaseModal class="primary" name="login">...</BaseModal>
</template>
```

**Props:**

| Prop                           | Value   | Description                          |
| ------------------------------ | ------- | ------------------------------------ |
| name                           | string  | Name of the modal                    |
| hash                           | string  | Route hash on which modal will open  |
| query                          | string  | Route query on which modal will open |
| local                          | boolean | Contained within parent element      |
| expand                         | boolean | Spans full width and height          |
| keep-alive                     | boolean | State persists through open/close    |
| disable-close                  | boolean | Disables all forms of manual closing |
| disable-close-on-esc           | boolean | Disables closing via escape          |
| disable-close-on-button        | boolean | Disables closing via close button    |
| disable-close-on-click-outside | boolean | Disables closing via click-outside   |

---

## Toast (component)

Toast control object - `toast`  
Class modifiers - color

#### **Usage example:**

```js
import { toast } from ".../components/base/toast.ctl";

toast.success("Success message");
toast.danger("Danger message");
toast.info("Info message");
```

**Global settings (_toast.ctl.js_):**

```js
const settings = {
  success: { position: "top center", duration: 3 * 1000 },
  danger: { position: "top center", duration: 3 * 1000 },
  info: { position: "bottom right", duration: 20 * 1000, closable: true },
};
```

---

## Utils

Folder: `src/utils/`

### String polyfills

Additional methods attached to string ctor.  
List of supported methods: `toCamelCase`, `toCapitalCase`, `toConstantCase`, `toDotCase`, `toHeaderCase`, `toNoCase`, `toParamCase`, `toPascalCase`, `toPathCase`, `toSentenceCase`, `toSnakeCase`

#### **Usage example:**

```js
const string = "Hello world";
const pascalString = string.toPascalCase();
```

Reference: https://github.com/blakeembrey/change-case

### Array Polyfills

Additional methods attached to array ctor.  
List of supported methods: `add`, `remove`, `findOne`, `findMany`

#### **Usage example:**

```js
const data = [{ id: 1 }];
data.add([{ id: 1 }, { id: 2 }]);
```

Reference: https://github.com/lbagic/collections

### CSS

All project css variables are automatically exported to javascript.

#### **Usage example:**

```js
import { css } from "./utils/css";
const dangerColor = css.colors.danger.base;
```

### Breakpoint

Reactive css breakpoints available in javascript form.

#### **Usage example:**

```js
import { breakpoint } from "./utils/breakpoint";
const isSmall = breakpoint.s;
const isBetweenMAndXL = breakpoint.between("m", "xl");
```

Implementation based on https://vueuse.org/core/usebreakpoints/.

### Date

Util for formatting dates explicitly.  
List of supported methods: `format`, `difference`, `duration`, `toMs`

#### **Usage example:**

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

**Format parameters:**

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

---

## SCSS

Folder: `src/assets/styles/`

Custom SCSS framework integrated within project.

### Breakpoints

File: `src/assets/styles/variables/breakpoints.scss`  
When defining breakpoints in css **always use predefined breakpoints via mixins**.  
For usage within javascript refer to [breakpoint util](#ubreakpointu).

#### **Usage example:**

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

#### **Usage example:**

```css
background: var(--prefix-color-primary);
```

### Other style definitions

Folder: `src/assets/styles/elements/`  
Style definitions for custom components and utilities.  
Notable mentions: `containers`, `typography`

---

## Buttons (styles)

Buttons are defined via styles, use by attaching appropriate classes.  
Class: `prefix-button`  
Class modifiers: color, size (`small`, `large`, `expand`)

#### **Usage example:**

```html
<button class="prefix-button primary small">A Button</button>
```

Reference: `src/assets/styles/elements/buttons.scss`

---

## Cards (styles)

Cards are defined via styles, use by attaching appropriate classes.  
Class: `prefix-card`  
Class modifiers: color

#### **Usage example:**

```html
<div class="prefix-card primary">A Card</div>
```

Reference: `src/assets/styles/elements/cards.scss`

---

## Tables (styles)

Tables are defined via styles, use by attaching appropriate classes.  
Class: `prefix-table`  
Class modifiers: color

#### **Usage example:**

```html
<table class="prefix-table primary">
  <header>
    <tr>
      <th>Row header 1</th>
      <th>Row header 2</th>
    </tr>
  </header>
  <body>
    <tr>
      <td>Row 1.1</td>
      <td>Row 1.2</td>
    </tr>
    <tr>
      <td>Row 2.1</td>
      <td>Row 2.2</td>
    </tr>
  </body>
</table>
```

Reference: `src/assets/styles/elements/tables.scss`

For better and more configurable tables, consider using third party package, e.g. https://xaksis.github.io/vue-good-table/.

---

## Carousel (unsupported)

Carousel solution is not provided, consider using third party package, e.g. https://swiperjs.com/.

---

## Internationalization (plugin)

Internationalization is supported via vue18n.

#### **Usage example:**

1. Defining messages:

```js
// Message enums # ./utils/translations/index.js
export const messages = { login: { action: "", description: "" } };
```

```js
// Translations # ./utils/translations/en.js
export const en = {
  login: { action: "Log in", description: "Log in description" },
};
```

2. Using translations:

```html
<script setup>
  import { messages } from "./utils/translations";
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
- modals style overriding - not possible with classes
- modals hash and query on pageload
- forms - form builder
- buttons - block
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
| support basic v-model           | ✅     |
| support list of options         | ✅     |
| placeholders                    | ✅     |
| icon support                    |        |
| `date`, `time`, `month` support | ✅     |
| `date range` support            | ✅     |
| `textarea`, `select` support    | ✅     |
| `checkbox`, `radio` support     | ✅     |
| `file input` support            | ✅     |
