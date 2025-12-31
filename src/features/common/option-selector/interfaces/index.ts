import { Option } from "@/features/common/option-selector/types";

export interface IOptionInitialValue {
  initialOptions: Option[];
  defaultOptionIdx: (number | null)[];
}

export interface IOptionInitialState {
  selectedOptions: (Option | number | null)[];
  validationErrors: Record<number, string>;
  optionsCount?: number;
}

export interface IState {
  [storeKey: string]: IOptionInitialState;
}
