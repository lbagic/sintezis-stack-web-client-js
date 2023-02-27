import type { HTML_INPUT_ERRORS } from "@/enums/HTML_INPUT_ERRORS";
import { formItemProps } from "naive-ui";
import type { ExtractPropTypes, InputHTMLAttributes, PropType, Ref } from "vue";

export const baseFormItemProps = formItemProps;
export const baseInputProps = {
  constraint: Object as PropType<
    Pick<
      InputHTMLAttributes,
      | "pattern"
      | "maxlength"
      | "minlength"
      | "min"
      | "max"
      | "type"
      | "required"
      | "step"
      | "multiple"
    >
  >,
  constraintErrorMessages: Object as PropType<
    Partial<Record<keyof (typeof HTML_INPUT_ERRORS)["enum"], string>>
  >,
  formItem: Object as PropType<
    Partial<
      ExtractPropTypes<Omit<typeof baseFormItemProps, "label" | "feedback">>
    >
  >,
  feedback: formItemProps.feedback,
  label: formItemProps.label,
  modelValue: undefined as unknown as PropType<any>,
  nProps: Object,
  nStyle: [Object, String],
  nClass: [Object, String],
};

export namespace InputTypes {
  export type BaseInputProps = Partial<ExtractPropTypes<typeof baseInputProps>>;
  export type BaseFormItemProps = Partial<
    ExtractPropTypes<typeof baseFormItemProps>
  >;
  export type BaseModel<T extends Record<string, any> = Record<string, any>> = {
    data: T;
    error: null | string;
    touched: boolean;
  };
  export type ContextType<T extends Record<string, any>> = {
    [Mk in keyof BaseModel]: { [Tk in keyof T]: BaseModel<T[Tk]>[Mk] };
  };
  export type ModelType<T extends Record<string, any>> = {
    [Tk in keyof T]: { [Mk in keyof BaseModel]: BaseModel<T[Tk]>[Mk] };
  };
  export type ValidationRef = Ref<{ inputRef: HTMLInputElement }>;
  export type State = {
    submitted: boolean;
  };
  export type SetupArgs = {
    emit: Function;
    props: BaseInputProps;
    validationRef: ValidationRef;
    inputRef: Ref<any>;
    config?: Partial<{
      preventSubmit: boolean;
      ignoreLabel: boolean;
    }>;
  };
  export type ValidationArgs = {
    model: BaseModel;
    props: BaseInputProps;
    validationRef: ValidationRef;
  };
}
