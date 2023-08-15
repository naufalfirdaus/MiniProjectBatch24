import * as ActionType from "../constant/JobConstant";

const INIT_STATE = {
  jobs: [],
  jobCategory: [],
  error: null,
  job: {},
};

const createState = {
  pending: true,
  success: undefined,
};

const JobReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionType.GET_JOB_REQ:
      return { ...state };
    case ActionType.GET_JOB_OK:
      return { ...state, jobs: action.payload };
    case ActionType.GET_JOB_FAILED:
      return { ...state, error: action.error };
    case ActionType.GET_JOB_BYID_REQ:
      return { ...state };
    case ActionType.GET_JOB_BYID_OK:
      return GetJobById(state, action);
    case ActionType.GET_JOB_BYID_FAILED:
      return { ...state, error: action.error };
    case ActionType.GET_JOPONUMBER_REQ:
      return { ...state, jopoNumber: "" };
    case ActionType.GET_JOPONUMBER_OK:
      return GetJopoNumber(state, action);
    case ActionType.GET_JOPONUMBER_FAILED:
      return { ...state, error: action.error };
    case ActionType.GET_JOBCATEGORY_REQ:
      return { ...state };
    case ActionType.GET_JOBCATEGORY_OK:
      return GetJobCategory(state, action);
    case ActionType.GET_JOBCATEGORY_FAILED:
      return { ...state, error: action.error };
    case ActionType.CREATE_JOB_REQ:
      return { ...state, createState };
    case ActionType.CREATE_JOB_OK:
      return CreateJob(state, action);
    case ActionType.CREATE_JOB_FAILED:
      return {
        ...state,
        error: action.error,
        createState: {
          pending: false,
          success: false,
        },
      };
    case ActionType.UPDATE_JOB_REQ:
      return { ...state };
    case ActionType.UPDATE_JOB_OK:
      return UpdateJob(state, action);
    case ActionType.UPDATE_JOB_FAILED:
      return { ...state, error: action.error };
    case ActionType.CREATE_JOB_RESET:
      return { ...state, error: null, createState };
    default:
      return { ...state };
  }
};

const CreateJob = (state: any, action: any) => {
  return {
    ...state,
    jobs: [...state.jobs, action.payload],
    createState: {
      pending: false,
      success: true,
    },
  };
};

const GetJopoNumber = (state: any, action: any) => {
  return { ...state, jopoNumber: action.payload };
};

const GetJobCategory = (state: any, action: any) => {
  return { ...state, jobCategory: action.payload };
};

const GetJobById = (state: any, action: any) => {
  return {
    ...state,
    job: action.payload,
  };
};

const UpdateJob = (state: any, action: any) => {
  return {
    ...state,
    job: { ...state.job, ...action.payload }, //update state change for job
    // jobs: [...state], //update the state for jobs
  };
};

export default JobReducer;
