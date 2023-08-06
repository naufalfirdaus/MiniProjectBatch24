import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { batchs: object; status: string; error: any } = {
  batchs: {},
  status: "idle",
  error: null,
};

const batchSlices = createSlice({
  name: "batch",
  initialState: initialState,
  reducers: {
    getBatchFetch: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    getBatchSuccess: (state, action) => {
      state.status = "succeeded";
      state.batchs = action.payload;
    },
    getBatchFail: (state, action: any) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    getByNameAndStatusFetch:(state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    getByNameAndStatusSuccess:(state, action: any) => {
      state.status = "succeeded";
      state.batchs = action.payload;
    },

  },
});

export const { getBatchFetch, getBatchSuccess, getBatchFail, getByNameAndStatusFetch } = batchSlices.actions;

export default batchSlices.reducer;