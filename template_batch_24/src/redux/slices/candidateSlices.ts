import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  candidates: object;
  bootcampCandidates: object[];
  status: string;
  error: any;
} = {
  candidates: {},
  bootcampCandidates: [],
  status: "idle",
  error: null,
};

export const candidateSlices = createSlice({
  name: "candidate",
  initialState: initialState,
  reducers: {
    getCandidateFetch: (state, payload: PayloadAction<string>) => {
      state.status = "loading";
    },
    getCandidateSuccess: (state, action) => {
      state.status = "succeeded";
      state.candidates = action.payload;
    },
    getCandidateFail: (state, action: any) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    getPassedCandidateBootcampFetch: (state, payload: PayloadAction<number>) => {
      state.status = "loading";
    },
    getPassedCandidateBootcampSuccess: (state, action) => {
      state.status = "succeeded";
      state.bootcampCandidates = action.payload;
    },
  },
});

export const {
  getCandidateFetch,
  getCandidateSuccess,
  getCandidateFail,
  getPassedCandidateBootcampFetch,
  getPassedCandidateBootcampSuccess,
} = candidateSlices.actions;

export default candidateSlices.reducer;
