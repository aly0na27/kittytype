import {combineReducers, configureStore} from "@reduxjs/toolkit";
import typeTestSliceReducer from "./reducers/typeTestSlice"

const rootReducer = combineReducers({
    typeTestSliceReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>

export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = AppStore['dispatch']