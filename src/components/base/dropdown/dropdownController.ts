import type { NDropdown } from "naive-ui";
import type { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";
import type { Component } from "vue";

type DropdownProps = InstanceType<typeof NDropdown>["$props"];
type DropdownOption = DropdownMixedOption & {
  onClick?: () => any;
  icon?: Component;
};

export function useDropdown(options: DropdownOption[], props?: DropdownProps) {
  return {
    ...props,
    options,
    trigger: props?.trigger ?? "click",
    onSelect: (_: any, { onClick }: any) => onClick?.(),
  };
}
