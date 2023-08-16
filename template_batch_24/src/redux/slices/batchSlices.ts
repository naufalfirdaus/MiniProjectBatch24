import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  technologies: object[];
  instructors: object[];
  evaluations: object[];
  traineeEvaluation: object;
  batchs: object;
  batch: object;
  status: string;
  error: any;
} = {
  technologies: [],
  instructors: [],
  evaluations: [],
  traineeEvaluation: {},
  batchs: {},
  batch: {},
  status: "idle",
  error: null,
};

const batchSlices = createSlice({
  name: "batch",
  initialState: initialState,
  reducers: {
    changeToIdle: (state, _) =>{
      state.status = 'idle';
    },
    getBatchFetch: (state, payload: PayloadAction<any>) => {
      state.status = "loading";
    },
    getBatchByIdFetch: (state, payload: PayloadAction<any>) => {
      state.status = 'loading';
    },
    getBatchByIdSuccess: (state, action) => {
      state.status = 'succeeded';
      state.batch = action.payload;
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
    updateBatchTry: (state, action: PayloadAction<any>) => {
      state.status = 'loading';
    },
    updateBatchSuccess: (state, action: PayloadAction<any>) => {
      state.status = "idle";
    },
    updateBatchFail: (state, action: any) => {
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
    getInstructorFetch: (state) => {
      state.status = "loading";
    },
    getInstructorSuccess: (state, action: any) => {
      state.status = "succeeded";
      state.instructors = action.payload;
    },
    getBatchEvaluationFetch: (state, action: PayloadAction<any>) => {
      state.status = 'loading'
    },
    getBatchEvaluationSuccess: (state, action: any) => {
      state.status = 'succeeded';
      state.evaluations = action.payload;
    },
    getBatchTraineeEvaluationFetch: (state, action: PayloadAction<any>) => {
      state.status = 'loading';
    },
    getBatchTraineeEvaluationSuccess: (state, action) => {
      state.status = 'succeeded';
      state.traineeEvaluation = action.payload;
    },
    updateBatchStatusTry: (state, action: PayloadAction<any>) => {
      state.status = 'loading';
    },
    updateBatchStatusSuccess: (state, _) => {
      state.status = 'succeeded';
    },
    updateTraineeEvalutaionScoreTry: (state, action: PayloadAction<any> ) => {
      state.status = 'loading';
    },
    updateTraineeEvalutaionScoreSuccess: (state, _ ) => {
      state.status = 'succeeded';
    },
    updateTraineeEvalutaionScoreFail: (state, action: any ) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  changeToIdle,
  getBatchFetch,
  getBatchByIdFetch,
  getBatchByIdSuccess,
  getBatchSuccess,
  getBatchFail,
  getByNameAndStatusFetch,
  createBatchTry,
  createBatchFail,
  createBatchSuccess,
  updateBatchTry,
  updateBatchSuccess,
  updateBatchFail,
  getTechnologyFetch,
  getTechnologySuccess,
  getInstructorFetch,
  getInstructorSuccess,
  getBatchEvaluationFetch,
  getBatchEvaluationSuccess,
  getBatchTraineeEvaluationFetch,
  getBatchTraineeEvaluationSuccess,
  updateBatchStatusTry,
  updateBatchStatusSuccess,
  updateTraineeEvalutaionScoreTry,
  updateTraineeEvalutaionScoreSuccess,
  updateTraineeEvalutaionScoreFail,
} = batchSlices.actions;

export default batchSlices.reducer;
