import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  candidates: object;
  programCandidates: object[];
  bootcampCandidates: object[];
  status: string;
  error: any;
} = {
  candidates: {},
  programCandidates: [],
  bootcampCandidates: [],
  status: "idle",
  error: null,
};

export const candidateSlices = createSlice({
  name: "candidate",
  initialState: initialState,
  reducers: {
    changeToIdle: (state, _) =>{
      state.status = 'idle';
    },
    getCandidateFetch: (state, payload: PayloadAction<object>) => {
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
    getPassedCandidateBootcampFetch: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    getPassedCandidateBootcampSuccess: (state, action) => {
      state.status = "succeeded";
      state.bootcampCandidates = action.payload;
    },
    getCandidateBatchTraineeeFetch: (state, payload: PayloadAction<any>) => {
      state.status = 'loading';
    },
    getCandidateBatchTraineeeSuccess: (state, action) => {
      state.status = 'succeeded';
      state.programCandidates = action.payload;
    },
    updateCandidateStatusTry: (state, action: PayloadAction<any>) => {
      state.status = 'loading';
    },
    updateCandidateStatusSuccess: (state) => {
      state.status = 'succeeded';
    }
  },
});

export const {
  changeToIdle,
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
