import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  summary: object;
  chartData: object;
  status: string;
  error: any;
} = {
  summary: {},
  chartData: {},
  status: "idle",
  error: null,
};

const dashboardSlices = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    getSummaryFetch: (state) => {
      state.status = "loading";
    },
    getSummaryFetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.summary = action.payload;
    },
    getSummaryFetchFail: (state, action: any) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    getChartFetch: (state, action: PayloadAction<any>) => {
      state.status = "loading";
    },
    getChartFetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.chartData = action.payload;
    },
    getChartFetchFail: (state, action: any) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  getSummaryFetch,
  getSummaryFetchSuccess,
  getSummaryFetchFail,
  getChartFetch,
  getChartFetchSuccess,
  getChartFetchFail,
} = dashboardSlices.actions;

export default dashboardSlices.reducer;
