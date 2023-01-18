import { HTML_INPUT_ERRORS } from "@/enums/HTML_INPUT_ERRORS";
import { intl } from "@/internationalization/intl";
import { stringMapReplace } from "@/utils/string";
import * as R from "ramda";
import { nextTick } from "vue";
import type { InputTypes } from "./input.types";

const errorKeys = HTML_INPUT_ERRORS.keys;
type ErrorKeys = keyof (typeof HTML_INPUT_ERRORS)["enum"];
type Constraint = InputTypes.BaseInputProps["constraint"];
type ConstraintValidators = Partial<
  Record<ErrorKeys, (config: { constraint: Constraint; value: any }) => boolean>
>;

const constraintValidators: ConstraintValidators = {
  tooLong: ({ constraint, value }) =>
    constraint?.maxlength && R.has("length", value)
      ? (value.length as any) > constraint.maxlength
      : false,
  tooShort: ({ constraint, value }) =>
    constraint?.minlength && R.has("length", value)
      ? (value.length as any) < constraint.minlength
      : false,
};

export const inputValidation = {
  create({ props, model, validationRef }: InputTypes.ValidationArgs) {
    return function () {
      nextTick(() => {
        model.error = errorKeys.reduce((error: string | null, key) => {
          if (error) return error;
          const validator = constraintValidators[key];
          const hasError = validator
            ? validator({ constraint: props.constraint, value: model.data })
            : validationRef.value.inputRef.validity[key];
          if (!hasError) return null;
          const rawMessage =
            props.constraintErrorMessages?.[key] ??
            intl.value.HTMLInputErrors[key];
          return stringMapReplace(rawMessage, props.constraint);
        }, null);
      });
    };
  },
  patchConstraint(constraint: InputTypes.BaseInputProps["constraint"]) {
    if (
      !constraint?.pattern &&
      (constraint?.minlength || constraint?.maxlength)
    ) {
      const minlength = constraint?.minlength ?? "";
      const maxlength = constraint?.maxlength ?? "";
      constraint.pattern = `^.{${minlength},${maxlength}}$`;
    }
    return constraint;
  },
};
