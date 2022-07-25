export const BaseInputInternals = {
  text: {
    type: "text",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      if (vm.options?.length) {
        const selected = vm.parsedOptions.find((el) => el.label === vm.value);
        vm.output = selected ? selected.id : vm.value;
        if (selected) vm.$emit("select", vm.output);
      } else {
        vm.output = e.target.value;
      }
    },
    onExternal: (vm, model) => {
      const selected = vm.parsedOptions.find((el) => el.id === model);
      vm.value = selected ? selected.label : model;
    },
  },
  email: {
    type: "email",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      vm.output = e.target.value;
    },
    onExternal: (vm, model) => (vm.value = model),
  },
  password: {
    type: "password",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      vm.output = e.target.value;
    },
    onExternal: (vm, model) => (vm.value = model),
  },
  search: {
    type: "search",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      vm.output = e.target.value;
    },
    onExternal: (vm, model) => (vm.value = model),
  },
  tel: {
    type: "tel",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      vm.output = e.target.value;
    },
    onExternal: (vm, model) => (vm.value = model),
  },
  url: {
    type: "url",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      vm.output = e.target.value;
    },
    onExternal: (vm, model) => (vm.value = model),
  },
  color: {
    type: "color",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      vm.output = e.target.value;
    },
    onExternal: (vm, model) => (vm.value = model),
  },
  number: {
    type: "number",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      vm.output = e.target.value === "" ? "" : Number(e.target.value);
    },
    onExternal: (vm, model) => (vm.value = model),
  },
  range: {
    type: "range",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      vm.output = Number(e.target.value);
    },
    onExternal: (vm, model) => (vm.value = model),
  },
  checkbox: {
    type: "checkbox",
    component: "input",
    onInternal: (vm, e) => (vm.output = e.target.checked),
    onExternal: (vm, model) => (vm.$refs.input.checked = model),
  },
  radio: {
    type: "radio",
    component: "input",
    onInternal: (vm, e) => (vm.output = e.target.checked),
    onExternal: (vm, model) => (vm.$refs.input.checked = model),
  },
  file: {
    type: "file",
    component: "input",
    onInternal: (vm, e) => {
      vm.value = e.target.value;
      vm.output = e.target.value;
    },
    onExternal: (vm, model) => (vm.value = model),
  },
  textarea: {
    type: "textarea",
    component: "textarea",
    onInternal: (vm, e) => (vm.output = e.target.value),
    onExternal: (vm, model) => (vm.value = model),
  },
  select: {
    type: "select",
    component: "select",
    onInternal: (vm, e) => {
      vm.output = vm.parsedOptions[e.target.selectedIndex].id;
      vm.value = e.target.value;
    },
    onExternal: (vm, model) => {
      const selected = vm.parsedOptions.find((el) => el.id === model);
      if (selected) vm.value = selected.label;
    },
  },
  date: {
    type: "text",
    component: "input",
    datetimeOptions: {
      locale: "en",
      autoApply: true,
      maxlength: 0,
      enableTimePicker: false,
    },
    // format: (model) => {
    //   const isRange = Array.isArray(model);
    //   const formatter = (input) => {
    //     const fmt = formatDate(input);
    //     return `${fmt.dayShort}, ${fmt.day} ${fmt.monthShort} ${fmt.year}`;
    //   };

    //   return isRange
    //     ? [...model].map((el) => formatter(el)).join(" - ")
    //     : formatter(model);
    // },
    onInternal: (vm, dateValue) => {
      if (!dateValue) {
        vm.dateValue = undefined;
        vm.value = vm.output = "";
        return;
      }
      const model = Array.isArray(dateValue)
        ? [...dateValue].map((el) => el.toISOString())
        : dateValue.toISOString();
      vm.value = vm.formatDate(model);
      vm.output = model;
    },
    onExternal: (vm, model) => {
      if (!model) {
        vm.dateValue = undefined;
        vm.value = "";
        return;
      }
      const isArray = Array.isArray(model);
      vm.value = isArray
        ? [...model].map((el) => vm.formatDate(el)).join(" - ")
        : vm.formatDate(model);
      vm.dateValue = isArray
        ? [...model].map((el) => new Date(el))
        : new Date(model);
    },
  },
  time: {
    type: "text",
    component: "input",
    // format: (model) =>
    //   `${getTwoDigitFormat(model.hours)}:${getTwoDigitFormat(model.minutes)}`,
    // datetimeOptions: {
    //   timePicker: true,
    //   maxlength: 0,
    // },
    onInternal: (vm, dateValue) => {
      if (!dateValue) {
        vm.dateValue = undefined;
        vm.value = vm.output = "";
        return;
      }
      vm.value = vm.formatDate(dateValue);
      vm.output = dateValue;
    },
    onExternal: (vm, model) => {
      if (!model) {
        vm.dateValue = undefined;
        vm.value = "";
        return;
      }
      vm.dateValue = model;
      vm.value = vm.formatDate(model);
    },
  },
  month: {
    type: "text",
    component: "input",
    // format: (model) => `${model.year}-${getTwoDigitFormat(model.month + 1)}`,
    datetimeOptions: {
      autoApply: true,
      monthPicker: true,
      maxlength: 0,
    },
    onInternal: (vm, dateValue) => {
      if (!dateValue) {
        vm.dateValue = undefined;
        vm.value = vm.output = "";
        return;
      }
      vm.value = vm.formatDate(dateValue);
      vm.output = dateValue;
    },
    onExternal: (vm, model) => {
      if (!model) {
        vm.dateValue = undefined;
        vm.value = "";
        return;
      }
      vm.dateValue = model;
      vm.value = vm.formatDate(model);
    },
  },
};

// export const sntInputTypes = Object.keys(sntInputElements);
