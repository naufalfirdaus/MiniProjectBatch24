import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { candidates: object; status: string; error: any } = {
  candidates: {},
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
  },
});

export const { getCandidateFetch, getCandidateSuccess, getCandidateFail } =
  candidateSlices.actions;

export default candidateSlices.reducer;
