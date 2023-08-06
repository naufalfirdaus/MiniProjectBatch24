import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import candidateReducer from "../slices/candidateSlices";
import rootSaga from "../saga/index";

const logger = createLogger();
const saga = createSagaMiddleware();
const store = configureStore({
    reducer: {
        candidates: candidateReducer,
    },
    middleware: [saga],
});

saga.run(rootSaga);

export default store;