import {CharactersType, ResultsType, TypingStateType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TypingSliceType {
    typingState: TypingStateType
    time: number
    results: ResultsType | null
    correctWordCount: number
    characters: CharactersType
    typedText: string[] | null
    text: string[]
}

const initialState: TypingSliceType = {
    typingState: 'notStarted',
    time: 0,
    results: null,
    correctWordCount: 0,
    characters: {
        correct: 0, incorrect: 0, extra: 0, missing: 0
    },
    typedText: null,
    // text: (faker.word.words(20)).toLowerCase().split(" ")
    text: 'never last few many year in some fact more how because but that true false never never'.split(' ')
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
        },
        setCharacters(state: TypingSliceType, action: PayloadAction<CharactersType>) {
            state.characters = action.payload
        },
        setTypedText(state: TypingSliceType, action: PayloadAction<string[]>) {
            state.typedText = action.payload
        }
    }
})

export default typingSlice.reducer