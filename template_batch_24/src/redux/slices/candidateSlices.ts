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
    getPassedCandidateBootcampFetch: (state, payload: PayloadAction<number>) => {
      state.status = "loading";
    },
    getPassedCandidateBootcampSuccess: (state, action) => {
      state.status = "succeeded";
      state.bootcampCandidates = action.payload;
    },
    getCandidateByProgramFetch: (state, payload: PayloadAction<number>) => {
      state.status = 'loading';
    },
    getCandidateByProgramSuccess: (state, action) => {
      state.status = 'loading';
      state.programCandidates = action.payload;
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
  getCandidateByProgramFetch,
  getCandidateByProgramSuccess
} = candidateSlices.actions;

export default candidateSlices.reducer;
