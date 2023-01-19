<script setup lang="ts">
import BaseAutocomplete from "@/components/base/input/BaseAutocomplete.vue";
import BaseCascader from "@/components/base/input/BaseCascader.vue";
import BaseCheckbox from "@/components/base/input/BaseCheckbox.vue";
import BaseColorPicker from "@/components/base/input/BaseColorPicker.vue";
import BaseDatePicker from "@/components/base/input/BaseDatePicker.vue";
import BaseDynamicInput from "@/components/base/input/BaseDynamicInput.vue";
import BaseDynamicTags from "@/components/base/input/BaseDynamicTags.vue";
import BaseInput from "@/components/base/input/BaseInput.vue";
import BaseInputNumber from "@/components/base/input/BaseInputNumber.vue";
import BaseMention from "@/components/base/input/BaseMention.vue";
import BaseRadio from "@/components/base/input/BaseRadio.vue";
import BaseRate from "@/components/base/input/BaseRate.vue";
import BaseSelect from "@/components/base/input/BaseSelect.vue";
import BaseSlider from "@/components/base/input/BaseSlider.vue";
import BaseSwitch from "@/components/base/input/BaseSwitch.vue";
import BaseTimePicker from "@/components/base/input/BaseTimePicker.vue";
import BaseTransfer from "@/components/base/input/BaseTransfer.vue";
import BaseTreeSelect from "@/components/base/input/BaseTreeSelect.vue";
import BaseUpload from "@/components/base/input/BaseUpload.vue";
import { useFormData } from "@/components/base/input/inputController";
import { NButton } from "naive-ui";

const form = useFormData({
  Autocomplete: "",
  Cascader: null,
  Checkbox: true,
  ColorPicker: "",
  DatePicker: 0,
  DynamicInput: [],
  DynamicTags: [],
  Input: "",
  InputNumber: 0,
  Mention: "",
  Radio: true,
  Rate: 0,
  Select: null,
  Slider: 12,
  Switch: true,
  TimePicker: 0,
  Transfer: [],
  TreeSelect: [],
  Upload: null,
});

const baseOptions = ["asdf", "one", "two"];
type OptionsConfig = {
  key?: boolean;
  value?: boolean;
  label?: boolean;
  children?: boolean;
};
function createOptions(config: OptionsConfig, options = baseOptions): any[] {
  return options.map((option) => {
    const { key, value, label, children } = config;
    const object: any = {};
    if (key) object.key = option;
    if (value) object.value = option;
    if (label) object.label = option;
    if (children)
      object.children = createOptions(
        { key, value, label },
        options.map((childOption) => `${option}-${childOption}`)
      );
    return object;
  });
}
const constraint = { required: true };
</script>

<template>
  <a href="https://www.naiveui.com/en-US/light/components/input"
    >Based off of NaiveUi input components</a
  >
  <pre>{{ form.data }}</pre>
  <form @submit.prevent="$log" class="snt-grid snt-container">
    <pre>Autocomplete: {{ form.data.Autocomplete }}</pre>
    <BaseAutocomplete
      :constraint="constraint"
      :options="createOptions({ label: true, value: true })"
      label="Autocomplete"
      placeholder="Autocomplete"
      v-model="form.model.Autocomplete"
    />
    <pre>Cascader: {{ form.data.Cascader }}</pre>
    <BaseCascader
      :constraint="constraint"
      :options="createOptions({ label: true, value: true, children: true })"
      label="Cascader"
      placeholder="Cascader"
      v-model="form.model.Cascader"
    />
    <pre>ColorPicker: {{ form.data.ColorPicker }}</pre>
    <BaseColorPicker
      :constraint="constraint"
      :modes="['hex']"
      label="ColorPicker"
      placeholder="ColorPicker"
      v-model="form.model.ColorPicker"
    />
    <pre>Checkbox: {{ form.data.Checkbox }}</pre>
    <BaseCheckbox
      :constraint="constraint"
      label="Checkbox"
      placeholder="Checkbox"
      v-model="form.model.Checkbox"
    />
    <pre>DatePicker: {{ form.data.DatePicker }}</pre>
    <BaseDatePicker
      :constraint="constraint"
      label="DatePicker"
      placeholder="DatePicker"
      v-model="form.model.DatePicker"
    />
    <pre>DynamicInput: {{ form.data.DynamicInput }}</pre>
    <BaseDynamicInput
      :constraint="constraint"
      label="DynamicInput"
      placeholder="DynamicInput"
      v-model="form.model.DynamicInput"
    />
    <pre>DynamicTags: {{ form.data.DynamicTags }}</pre>
    <BaseDynamicTags
      :constraint="constraint"
      label="DynamicTags"
      placeholder="DynamicTags"
      v-model="form.model.DynamicTags"
    />
    <pre>Input: {{ form.data.Input }}</pre>
    <BaseInput
      :constraint="constraint"
      label="Input"
      placeholder="Input"
      v-model="form.model.Input"
    />
    <pre>InputNumber: {{ form.data.InputNumber }}</pre>
    <BaseInputNumber
      :constraint="constraint"
      label="InputNumber"
      placeholder="InputNumber"
      v-model="form.model.InputNumber"
    />
    <pre>Mention: {{ form.data.Mention }}</pre>
    <BaseMention
      :constraint="constraint"
      :options="createOptions({ label: true, value: true })"
      label="Mention"
      placeholder="Mention"
      v-model="form.model.Mention"
    />
    <pre>Radio: {{ form.data.Radio }}</pre>
    <BaseRadio
      :constraint="constraint"
      label="Radio"
      placeholder="Radio"
      v-model="form.model.Radio"
    />
    <pre>Rate: {{ form.data.Rate }}</pre>
    <BaseRate
      :constraint="constraint"
      label="Rate"
      placeholder="Rate"
      v-model="form.model.Rate"
    />
    <pre>Select: {{ form.data.Select }}</pre>
    <BaseSelect
      :constraint="constraint"
      :options="createOptions({ label: true, value: true })"
      filterable
      label="Select"
      placeholder="Select"
      v-model="form.model.Select"
    />
    <pre>Slider: {{ form.data.Slider }}</pre>
    <BaseSlider
      :constraint="constraint"
      label="Slider"
      placeholder="Slider"
      v-model="form.model.Slider"
    />
    <pre>Switch: {{ form.data.Switch }}</pre>
    <BaseSwitch
      :constraint="constraint"
      label="Switch"
      placeholder="Switch"
      v-model="form.model.Switch"
    />
    <pre>TimePicker: {{ form.data.TimePicker }}</pre>
    <BaseTimePicker
      :constraint="constraint"
      label="TimePicker"
      placeholder="TimePicker"
      v-model="form.model.TimePicker"
    />
    <pre>Transfer: {{ form.data.Transfer }}</pre>
    <BaseTransfer
      :constraint="constraint"
      :options="createOptions({ label: true, value: true })"
      label="Transfer"
      placeholder="Transfer"
      v-model="form.model.Transfer"
    />
    <pre>TreeSelect: {{ form.data.TreeSelect }}</pre>
    <BaseTreeSelect
      :constraint="constraint"
      :options="createOptions({ label: true, key: true, children: true })"
      label="TreeSelect"
      placeholder="TreeSelect"
      multiple
      v-model="form.model.TreeSelect"
    />
    <pre>Upload: {{ form.data.Upload }}</pre>
    <BaseUpload
      :constraint="constraint"
      label="Upload"
      placeholder="Upload"
      v-model="form.model.Upload"
    >
      <NButton>Upload</NButton>
    </BaseUpload>
    <button>submit</button>
  </form>
</template>

<style scoped lang="scss"></style>
