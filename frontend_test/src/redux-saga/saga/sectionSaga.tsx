import { call, put } from "redux-saga/effects";
import section from "@/api/section";
<<<<<<< HEAD
import { AddSectionFailed, AddSectionSuccess, DeleteSectionSuccess, GetSectionFailed, GetSectionSuccess,EditSectionFailed,EditSectionSuccess } from "../action/sectionAction";
=======
import { AddSectionFailed, AddSectionSuccess, DeleteSectionSuccess, GetSectionFailed, GetSectionSuccess, UpdateSectionFailed, UpdateSectionSuccess } from "../action/sectionAction";
>>>>>>> 83cd4321747a6df064a464fc4a892b8a3e8af8dc

function* handleGetSection(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(section.getSection, payload)
        yield put(GetSectionSuccess(result.data))
    } catch (error) {
        yield put(GetSectionFailed(error))
    }
}

function* handleDeleteSection(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(section.deleteSection, payload)
        yield put(DeleteSectionSuccess(result))
    } catch (error) {
        yield put(GetSectionFailed(error))
    }
}

function* handleAddSection(action: any): any {
    const { payload } = action
    try {
        const result = yield call(section.createSection, payload)
        yield put(AddSectionSuccess(result.data))
    } catch (error) {
        yield put(AddSectionFailed(error))

    }
}

<<<<<<< HEAD
function* handleEditSection(action: any): any {
    const {payload} = action;
    
    try {
        const result = yield call(section.updateSection, payload)
        yield put(EditSectionSuccess(result.data))
    } catch (error) {
        yield put(EditSectionFailed(error))

=======
function* handleUpdateSection(action: any): any {
    const { payload } = action

    try {
        const result = yield call(section.updateSection, payload)
        yield put(UpdateSectionSuccess(result.data))
    } catch (error) {
        yield put(UpdateSectionFailed(error))

>>>>>>> 83cd4321747a6df064a464fc4a892b8a3e8af8dc
    }
}

// function* handleGetCategory(): any {
//     try {
//         const result = yield call(curriculum.getCategory)
//         yield put(GetCatSuccess(result.data))
//     } catch (error) {
//         yield put(GetCatFailed(error))
//     }
// }

export {
    handleGetSection,
    handleDeleteSection,
    handleAddSection,
<<<<<<< HEAD
    // handleGetCategory,
    handleEditSection,
=======
    handleUpdateSection,
>>>>>>> 83cd4321747a6df064a464fc4a892b8a3e8af8dc
}