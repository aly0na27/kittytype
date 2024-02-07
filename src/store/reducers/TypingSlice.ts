import {CharactersType, ResultsType, TypingStateType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {faker} from "@faker-js/faker";

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
    text: (faker.word.words(100)).toLowerCase().split(" ")
    // text: 'end need much many year old how because better train just like menu other set map group work way school'.split(' ')
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
        },
        generateNewTextPortion(state: TypingSliceType, action: PayloadAction<number>) {
            debugger
            state.text = state.text.slice(action.payload, state.text.length).concat(faker.word.words(action.payload).split(' '))
            debugger
        }
    }
})

export default typingSlice.reducer