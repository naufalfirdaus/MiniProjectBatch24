import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  candidates: any;
  programCandidates: object[];
  bootcampCandidates: object[];
  isLoading: boolean;
  error: any;
} = {
  candidates: null,
  programCandidates: [],
  bootcampCandidates: [],
  isLoading: false,
  error: null,
};

export const candidateSlices = createSlice({
  name: "candidate",
  initialState: initialState,
  reducers: {
    getCandidateFetch: (state, payload: PayloadAction<object>) => {
      state.isLoading = true;
    },
    getCandidateSuccess: (state, action) => {
      state.isLoading = false;
      state.candidates = action.payload;
    },
    getCandidateFail: (state, action: any) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    getPassedCandidateBootcampFetch: (state, payload: PayloadAction<any>) => {
      state.isLoading = true;
    },
    getPassedCandidateBootcampSuccess: (state, action) => {
      state.isLoading = false;
      state.bootcampCandidates = action.payload;
    },
    getCandidateBatchTraineeeFetch: (state, payload: PayloadAction<any>) => {
      state.isLoading = true;
    },
    getCandidateBatchTraineeeSuccess: (state, action) => {
      state.isLoading = false;
      state.programCandidates = action.payload;
    },
    updateCandidateStatusTry: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    updateCandidateStatusSuccess: (state) => {
      state.isLoading = false;
    }
  },
});

export const {
  getCandidateFetch,
  getCandidateSuccess,
  getCandidateFail,
  getPassedCandidateBootcampFetch,
  getPassedCandidateBootcampSuccess,
  getCandidateBatchTraineeeFetch,
  getCandidateBatchTraineeeSuccess,
  updateCandidateStatusTry,
  updateCandidateStatusSuccess,
} = candidateSlices.actions;

export default candidateSlices.reducer;
