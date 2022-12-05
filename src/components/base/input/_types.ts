import type { UnwrapCtor } from "@/utils/types"
import { Options as FlatpickrOptions } from "flatpickr/dist/types/options"
import DateInput from "./DateInput.vue"

type ComponentNames = "text" | "email" | "password" | "search" | "tel" | "url" | "color" | "number" | "range" | "textarea" | "switch" | "checkbox" | "radio" | "select" | "file" | "date" | "time" | "datetime-local"

type InputEvents = Partial<{
  onSearch: (value: any) => any,
  onInput: (e: Event) => any,
  onChange: (e: Event) => any,
  onBlur: (e: Event) => any,
  onFocus: (e: Event) => any,
}>

type InputAttrs = Partial<{
  accept: string,
  config: FlatpickrOptions
  disabled: boolean,
  inputmode: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url',
  max: number | string,
  maxlength: number,
  min: number | string,
  minlength: number,
  multiple: boolean,
  pattern: string,
  readonly: boolean,
  required: boolean,
  step: number,
}>

export type InputProps = Partial<{
  id: number | string,
  value: any,
  type: ComponentNames,
  hint: string,
  label: string,
  labelPosition: "top" | "right" | "bottom" | "left",
  validator: () => boolean | string,
  options: Record<string, number | string> | number[] | string[],
  strictOptions: boolean,
  useErrorBodrder: boolean,
  useErrorMessage: boolean,
  useHtmlValidation: boolean,
  useRequiredAsterisk: boolean,
}>

type InputContext = {
  attrs: InputAttrs,
  config: InputComponentConfig,
  inputRef: HTMLInputElement,
  model: { value: any, valid: boolean, error: null | string, dirty: boolean },
  options: Record<string, number | string> | number[] | string[],
  props: InputProps,
  isRequired: boolean,
}

type InputComponentConfig = {
  attrs?: InputAttrs,
  attrsFactory?: <T>(ctx: InputContext) => T,
  component: "input" | "textarea" | "select" | typeof DateInput,
  wrapperComponent?: any,
  eventsFactory?: (ctx: InputContext) => InputEvents,
  labelPosition?: InputProps['labelPosition'],
  onExternalUpdate?: (ctx: InputContext) => any,
  onInit?: (ctx: InputContext) => any,
  onInternalUpdate?: (ctx: InputContext) => any,
  parseInputValue?: (e: Event, ctx: InputContext) => any,
  supportOptions?: boolean,
  supportDropzone?: boolean,
}

export type FlatpickrConfigFactory = (ctx: InputContext, config?: FlatpickrOptions) => FlatpickrOptions
export type InputComponents = Record<ComponentNames, InputComponentConfig & { alt: InputComponentConfig }>


type FormFieldModelMap<T> = { [K in keyof T]: {
  value: T[K],
  dirty: boolean,
  error: string | null,
  valid: boolean
}}
type FormFieldConfig<T> =  InputAttrs & InputEvents & InputProps & { value: T }
type FormFieldConfigMap<T> =  { [K in keyof T]: FormFieldConfig<T[K]> }

export type FormDataFactory<Schema = any> = <
  U extends Schema,
  T extends Partial<UnwrapCtor<U>>
>(data: T, schema?: U) => {
  data: T,
  isValid: boolean,
  model: FormFieldModelMap<T>
}

export type FormConfigFactory<Schema = any> = <
  U extends Schema,
  T extends FormFieldConfigMap<Partial<UnwrapCtor<U>>>
>(data: T, schema?: U) => {
  data: { [K in keyof T]: T[K]['value'] },
  isValid: boolean,
  model: FormFieldModelMap<{ [K in keyof T]: T[K]['value'] }>,
  config: T
}
