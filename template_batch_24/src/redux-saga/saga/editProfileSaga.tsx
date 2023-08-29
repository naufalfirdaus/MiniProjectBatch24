import { call, put } from 'redux-saga/effects';
import userApi from '../../pages/api/endPointApi';
import { userEditProfileSuccess, userEditProfileFail } from '../action/editUserProfileAction';


function* editProfile(action:any): any {
    const {payload} = action
    try {
        // Kirim permintaan ke server untuk login
        const result = yield call(userApi.editProfile, payload);
        // console.log("SAGA EDIT PROFILE DATA", result)
        yield put(userEditProfileSuccess(result.data)); // Menggunakan data yang diterima dari server
        // Kirim aksi ke reducer untuk menandakan login berhasil
        // yield put(userEditProfileSuccess(result));
    } catch (error) {
        // Kirim aksi ke reducer untuk menandakan login gagal
        yield put(userEditProfileFail(error));
    }
}

export { editProfile };
