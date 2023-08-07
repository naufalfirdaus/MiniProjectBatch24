import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  technologies: object[];
  batchs: object;
  status: string;
  error: any;
} = {
  technologies: [],
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
    getByNameAndStatusFetch: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    getByNameAndStatusSuccess: (state, action: any) => {
      state.status = "succeeded";
      state.batchs = action.payload;
    },
    createBatchTry: (state, action: PayloadAction<any>) => {
      state.status = "loading";
    },
    createBatchSuccess: (state, action: PayloadAction<any>) => {
      state.status = "idle";
    },
    createBatchFail: (state, action: any) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    getTechnologyFetch: (state) => {
      state.status = "loading";
    },
    getTechnologySuccess: (state, action: any) => {
      state.status = "succeeded";
      state.technologies = action.payload;
    },
  },
});

export const {
  getBatchFetch,
  getBatchSuccess,
  getBatchFail,
  getByNameAndStatusFetch,
  createBatchTry,
  createBatchFail,
  createBatchSuccess,
  getTechnologyFetch,
  getTechnologySuccess
} = batchSlices.actions;

export default batchSlices.reducer;
