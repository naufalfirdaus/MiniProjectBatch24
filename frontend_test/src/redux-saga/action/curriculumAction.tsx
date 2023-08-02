import * as ActionCurriculum from '../constant/curriculumConstant'

// Get
export const GetCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.GET_DATA_REQ,
    payload
})

export const GetCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.GET_DATA_SUCCESS,
    payload
})

export const GetCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.GET_DATA_FAILED,
    payload
})

// Search
export const SearchCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.SEARCH_DATA_REQ,
    payload
})

export const SearchCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.SEARCH_DATA_SUCCESS,
    payload
})

export const SearchCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.SEARCH_DATA_FAILED,
    payload
})

// Add
export const AddCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.ADD_DATA_REQ,
    payload
})

export const AddCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.ADD_DATA_SUCCESS,
    payload
})

export const AddCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.ADD_DATA_FAILED,
    payload
})

// Delete
export const DeleteCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.DELETE_DATA_REQ,
    payload
})

export const DeleteCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.DELETE_DATA_SUCCESS,
    payload
})

export const DeleteCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.DELETE_DATA_FAILED,
    payload
})