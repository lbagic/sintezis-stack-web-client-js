# WebStack Documentation

## Utils

Folder: `src/utils/`

#### **<u>String polyfills</u>**

Additional methods attached to string ctor.  
List of supported methods: `toCamelCase`, `toCapitalCase`, `toConstantCase`, `toDotCase`, `toHeaderCase`, `toNoCase`, `toParamCase`, `toPascalCase`, `toPathCase`, `toSentenceCase`, `toSnakeCase`

> Example: `'Hello world'.toPascalCase()`

Reference: https://github.com/blakeembrey/change-case

#### **<u>Array polyfills</u>**

Additional methods attached to array ctor.  
List of supported methods: `add`, `remove`, `findOne`, `findMany`

> Example: `[{id: 1}].add([{id: 1}, {id: 2}])`

Reference: https://github.com/lbagic/collections

#### **<u>Css</u>**

All project css variables are automatically exported to javascript.

> Example: `css.colors.danger.base`

#### **<u>Breakpoint</u>**

Reactive css breakpoints available in javascript form.

> Example: `breakpoint.s` or `breakpoint.between("m", "xl")`

Implementation based on https://vueuse.org/core/usebreakpoints/.

#### **<u>Date</u>**

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

#### **<u>Breakpoints</u>**

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

#### **<u>Colors</u>**

File: `src/assets/styles/variables/colors.scss`  
Project color palette definition.

> Example: `background: var(--prefix-color-primary);`

#### **<u>Other style definitions</u>**

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

Modals are used via component `BaseInput` and named export `useInputData` for scaffolding reactive data.  
Class modifiers: color

> Modals respect autofocus attribute.

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
  import { modals } from ".../components/base/modal.ctl.js";
</script>
<template>
  <button @click="modals.login.open">Open modal</button>
  <BaseModal class="prefix-modal primary" name="login">...</BaseModal>
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
  import { modals } from ".../components/base/modal.ctl.js";
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
// default options as defined in toast.ctl
const settings = {
  success: { position: "top center", duration: 3 * 1000 },
  danger: { position: "top center", duration: 3 * 1000 },
  info: { position: "bottom right", duration: 20 * 1000, closable: true },
};
```

Example:

```js
import { toast } from ".../components/base/toast.ctl.js";

toast.success("Message", { closable: true, duration: 0 });
```

## Internationalization

Internationalization is supported via https://vue-i18n.intlify.dev/.

# Roadmap

Web Stack roadmap containing current status and stages of custom elements.

| Stage       | Icon | Description                                     |
| ----------- | ---- | ----------------------------------------------- |
| Proposed    | 💬   | Proposition                                     |
| Accepted    | 🖥    | Waiting for or in the process of implementation |
| Released    | 🚀   | Implementation complete                         |
| Recommended | ✅   | Finished & recommended                          |

### Proposed 💬 (To discuss)

- Internationalization support (plugin)
- Loading interceptors and loaders (javascript)

### Accepted 🖥 (In development)

- Admin panel theme
- Documentation

### Released 🚀 (Ready for use)

- Project settings (settings)
- Linter (settings)
- GRPC & API (javascript)
- Store (javascript)
- Utils (javascript)
- SCSS framework (styles & javascript)
- Breakpoints (styles & javascript)
- Buttons (styles)
- Cards (styles)
- Tables (styles)
- Inputs (component)
- Modals (component)
- Toasts (component)

### Recommended ✅ (Battle tested)
