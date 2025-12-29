import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "@/features/common/option-selector/store/initials";
import { ensureStoreKeyState } from "@/features/common/option-selector/helpers";

const optionSlice = createSlice({
  name: "option/state",
  initialState,
  reducers: {
    setSelectedOption: (
      state,
      action: PayloadAction<{
        storeKey: string;
        currentValue: { index: number; value: number | null };
      }>,
    ) => {
      const { storeKey, currentValue } = action.payload;
      const { index, value } = currentValue;
      ensureStoreKeyState(state, storeKey);

      if (!Array.isArray(state[storeKey].selectedOptions)) {
        state[storeKey].selectedOptions = [];
      }

      state[storeKey].selectedOptions[index] = value;
    },
    setOptionsCount: (
      state,
      action: PayloadAction<{ storeKey: string; options: Record<number, string>[] }>,
    ) => {
      const { storeKey, options } = action.payload;
      ensureStoreKeyState(state, storeKey);
      state[storeKey].optionsCount = options?.length;
    },

    setValidationErrors: (
      state,
      action: PayloadAction<{ storeKey: string; errors: Record<number, string> }>,
    ) => {
      const { storeKey, errors } = action.payload;
      ensureStoreKeyState(state, storeKey);
      state[storeKey].validationErrors = errors;
    },

    resetOptions: (state, action: PayloadAction<{ storeKey: string }>) => {
      const { storeKey } = action.payload;
      ensureStoreKeyState(state, storeKey);
      state[storeKey].selectedOptions = [];
      state[storeKey].validationErrors = [];
    },
  },
});

export const { setSelectedOption, setOptionsCount, setValidationErrors, resetOptions } =
  optionSlice.actions;

export default optionSlice.reducer;
