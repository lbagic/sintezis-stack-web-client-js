import { activeLocale } from "@/internationalization/intl";
import * as R from "ramda";
import { computed, mergeProps, reactive, ref, watch } from "vue";
import {
  baseFormItemProps,
  baseInputProps,
  type InputTypes,
} from "./input.types";
import { inputValidation } from "./inputValidation";

export function useFormData<
  T extends Parameters<S>[0],
  S extends (...args: any[]) => Promise<unknown>
>(
  data: T,
  submit?: S,
  hooks?: {
    onError?: (...args: any[]) => any;
    onSuccess?: (...args: any[]) => any;
  }
) {
  const fields = Object.keys(data);
  const ctx = reactive({
    data,
    error: R.mapObjIndexed(() => null, data),
    dirty: R.mapObjIndexed(() => false, data),
  }) as InputTypes.ContextType<T>;

  const model = R.mapObjIndexed((_, propertyKey: keyof T) => {
    const isFormModel = { value: true, configurable: false };
    const accessors = R.mapObjIndexed(
      (contextField) => ({
        get: () => contextField[propertyKey],
        set: (value: any) => (contextField[propertyKey] = value),
        enumerable: true,
      }),
      ctx
    );
    return Object.defineProperties({}, { isFormModel, ...accessors });
  }, data) as InputTypes.ModelType<T>;
  const isPending = ref(false);
  const isValid = computed(() => R.values(ctx.error).every(R.not));
  const isSubmittable = computed(() => isValid.value && !isPending.value);

  function hydrate(data: any) {
    if (typeof data !== "object") return;
    fields.forEach((key) => {
      if (R.has(key, data)) (ctx.data as any)[key] = data[key];
    });
  }
  function reset() {
    fields.forEach((key) => {
      model[key].data = data[key];
      model[key].error = null;
      model[key].dirty = false;
    });
  }

  const submitter = !submit
    ? (undefined as never)
    : () => {
        isPending.value = true;
        submit(ctx.data)
          .then((res) => {
            isPending.value = false;
            hooks?.onSuccess?.(res);
          })
          .catch((err) => {
            isPending.value = false;
            hooks?.onError?.(err);
          });
      };

  return reactive({
    isValid,
    isPending,
    isSubmittable,
    ...ctx,
    model,
    reset,
    hydrate,
    submit: submitter,
  });
}

let submittedAt = 0;
function checkIfCanSubmit() {
  const now = Date.now();
  if (now - submittedAt > 20) return true;
  submittedAt = now;
  return false;
}
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
      dirty: isFormModel.value ? props.modelValue.dirty : false,
    });
    const state = reactive<InputTypes.State>({
      submitted: false,
    });
    const errorMessage = computed(() =>
      (model.dirty || state.submitted) && model.error ? model.error : ""
    );
    const validate = props.constraint
      ? inputValidation.create({ model, props, validationRef })
      : R.F;
    function onBlur() {
      model.dirty = true;
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
      mergeProps(props, {
        ...staticProps,
        "data-input-invalid": !!model.error,
      })
    );

    const formItem = computed(() => {
      const label = config?.ignoreLabel ? undefined : props?.label;
      const feedback = errorMessage.value || props?.feedback;
      const formItemProps: InputTypes.BaseFormItemProps = {
        label,
        showLabel: !!label,
        feedback,
        showFeedback: !!(props?.feedback || props?.constraint),
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
