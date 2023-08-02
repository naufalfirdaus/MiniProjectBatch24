import { combineReducers } from "redux";
import CurriculumReducer from "./curriculumReducer";

const rootReducer = combineReducers({
    curriculumState: CurriculumReducer,
    searchcurriculumState: CurriculumReducer,
    deletecurriculumState: CurriculumReducer,
})

export default rootReducer