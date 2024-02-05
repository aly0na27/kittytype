import {QuoteType, TypingModeType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ConfigTestType {
    mode: TypingModeType
    wordCount: number
    time: number
    dictionary: string | null
    punctuation: boolean
    numbers: boolean
    quote: QuoteType | null
}

const initialState: ConfigTestType = {
    mode: "time",
    wordCount: 10,
    time: 15,
    dictionary: 'english',
    punctuation: false,
    numbers: false,
    quote: null,
}

export const testConfigSlice = createSlice({
    name: 'Config',
    initialState,
    reducers: {
        setTime(state: ConfigTestType, action: PayloadAction<number>) {
            state.time = action.payload
        },
        setMode(state: ConfigTestType, action: PayloadAction<TypingModeType>) {
            state.mode = action.payload
        },
        setWordCount(state: ConfigTestType, action: PayloadAction<number>) {
            state.wordCount = action.payload
        }
    }
})

export default testConfigSlice.reducer