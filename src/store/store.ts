import {combineReducers, configureStore} from "@reduxjs/toolkit";
import configTestReducer from "./reducers/ConfigTestSlice";

const rootReducer = combineReducers({
    configTestReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>

export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = AppStore['dispatch']