import {configureStore} from '@reduxjs/toolkit'
import rootReducer from '../reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const store  = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware] // register middleware saga
    
});
// jalankan midleware saga dengan mengirimkan argumen berupa file yg berisi logic saga yg akan diproses
sagaMiddleware.run(rootSaga)
export default store;