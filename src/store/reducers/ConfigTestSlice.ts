import {QuoteType, ResultsType, TypingModeType} from "../../types/types";
import {createSlice} from "@reduxjs/toolkit";

interface ConfigTestType {
    mode: TypingModeType
    wordCount: number
    time: number
    dictionary: string | null
    punctuation: boolean
    numbers: boolean
    quote: QuoteType | null
    results: ResultsType | null
}

const initialState: ConfigTestType = {
    mode: "time",
    wordCount: 15,
    time: 0,
    dictionary: 'english',
    punctuation: false,
    numbers: false,
    quote: null,
    results: null
}

export const configTestSlice = createSlice({
    name: 'Config',
    initialState,
    reducers: {

    }
})

export default configTestSlice.reducer