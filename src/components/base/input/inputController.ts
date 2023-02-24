import { activeLocale } from "@/internationalization/intl";
import * as R from "ramda";
import { computed, mergeProps, reactive, ref, watch } from "vue";
import {
  baseFormItemProps,
  baseInputProps,
  type InputTypes,
} from "./input.types";
import { inputValidation } from "./inputValidation";

let submittedAt = 0;
function checkIfCanSubmit() {
  const now = Date.now();
  if (now - submittedAt > 20) return true;
  submittedAt = now;
  return false;
}
// TODO - label "for"
export const inputController = {
  props: {
    base: baseInputProps,
    formItem: baseFormItemProps,
  },
  setup({
    emit,
    props,
    validationRef,
    inputRef,
    config,
  }: InputTypes.SetupArgs) {
    const staticProps: Record<string, any> = {};
    const isFormModel = ref(props?.modelValue?.isFormModel);
    const model = reactive<InputTypes.BaseModel>({
      data: isFormModel.value ? props.modelValue.data : props.modelValue,
      error: isFormModel.value ? props.modelValue.error : null,
      touched: isFormModel.value ? props.modelValue.touched : false,
    });
    const state = reactive<InputTypes.State>({
      submitted: false,
    });
    const errorMessage = computed(() =>
      (model.touched || state.submitted) && model.error ? model.error : ""
    );
    const validate = props.constraint
      ? inputValidation.create({ model, props, validationRef })
      : R.F;
    function onBlur() {
      model.touched = true;
    }
    staticProps.onBlur = onBlur;
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") submittedAt = Date.now();
    }
    if (config?.preventSubmit) staticProps.onkeydown = onKeydown;
    function onInvalidSubmit() {
      if (!checkIfCanSubmit()) return;
      state.submitted = true;
      validate();
      setTimeout(() =>
        inputRef.value.inputElRef?.form
          .querySelector("[data-input-invalid='true'] input.n-input__input-el")
          .focus()
      );
    }
    const detectModelChange = () =>
      !R.equals(props.modelValue, isFormModel.value ? model : model.data);
    function onExternalUpdate() {
      if (!detectModelChange()) return;
      if (isFormModel.value) Object.assign(model, props.modelValue);
      else model.data = props.modelValue;
    }
    function onInternalUpdate() {
      if (!detectModelChange()) return;
      if (isFormModel.value) Object.assign(props.modelValue, model);
      else emit("update:modelValue", model.data);
    }
    watch(() => model, onInternalUpdate, { deep: true });
    watch(() => props.modelValue, onExternalUpdate, { deep: true });
    watch(
      () => [props.constraint, model.data, activeLocale.value],
      (values, previous) => !R.equals(values, previous) && validate(),
      { immediate: !model.error }
    );

    const context = computed(() =>
      mergeProps(
        {
          ...staticProps,
          style: props.nStyle,
          class: props.nClass,
          status: errorMessage.value ? "error" : undefined,
          "data-input-invalid": !!model.error,
        },
        props,
        props.nProps ?? {}
      )
    );

    const delayedErrorMessage = ref(errorMessage.value);
    watch(errorMessage, (value) => {
      if (!value) delayedErrorMessage.value = value;
      else setTimeout(() => (delayedErrorMessage.value = value));
    });

    const formItem = computed(() => {
      const label = config?.ignoreLabel ? undefined : props?.label;
      const formItemProps: InputTypes.BaseFormItemProps = {
        label,
        showLabel: !!label,
        feedback: delayedErrorMessage.value || props?.feedback,
        showFeedback: !!(props?.feedback || errorMessage.value),
        validationStatus: errorMessage.value ? "error" : undefined,
        showRequireMark: !!props.constraint?.required,
        ...props.formItem,
      };
      return formItemProps;
    });
    const formItemContext = computed(() => ({
      data: model.data,
      formItem: formItem.value,
      constraint: props.constraint,
      onInvalidSubmit,
    }));

    return { model, context, formItemContext };
  },
};
