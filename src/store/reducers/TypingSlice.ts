import {ResultsType, TypingStateType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";




interface TypingSliceType {
    typingState: TypingStateType
    time: number
    results: ResultsType | null
    correctWordCount: number
}

const initialState: TypingSliceType = {
    typingState: 'notStarted',
    time: 0,
    results: null,
    correctWordCount: 0
}

export const typingSlice = createSlice({
    name: 'Typing process',
    initialState,
    reducers: {
        setTypingState(state: TypingSliceType, action: PayloadAction<TypingStateType>) {
            state.typingState = action.payload
        },
        setResult(state: TypingSliceType, action: PayloadAction<ResultsType>) {
            state.results = {...action.payload}
        },
        setTime(state: TypingSliceType, action: PayloadAction<number>) {
            state.time = action.payload
        },
        setCorrectWordCount(state: TypingSliceType, action: PayloadAction<number>) {
            state.correctWordCount = action.payload
        }
    }
})

export default typingSlice.reducer