import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import candidateReducer from "../slices/candidateSlices";
import batchReducer from "../slices/batchSlices";
import rootSaga from "../saga/index";

const logger = createLogger();
const saga = createSagaMiddleware();
const store = configureStore({
    reducer: {
        candidates: candidateReducer,
        batchs: batchReducer,
    },
    middleware: [saga],
});

saga.run(rootSaga);

export default store;