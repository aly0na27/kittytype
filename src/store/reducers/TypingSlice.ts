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
            let resultCharacters: CharactersType = {correct: 0, incorrect: 0, missing: 0, extra: 0}

            for (let i = 0; i < action.payload.length; i++) {
                let currCorrect = 0, currIncorrect = 0

                if (action.payload[i].length > state.text[i].length) {
                    resultCharacters.extra += action.payload[i].length - state.text[i].length
                } else if (action.payload[i].length < state.text[i].length) {
                    resultCharacters.missing += state.text[i].length - action.payload[i].length
                }
                for (let j = 0; j < Math.min(action.payload[i].length, state.text[i].length); j++) {
                    if (state.text[i][j] === action.payload[i][j]) {
                        currCorrect++
                    } else {
                        currIncorrect++
                    }
                }
                resultCharacters.incorrect += currIncorrect ? currIncorrect : 0
                resultCharacters.correct += !currIncorrect && action.payload[i].length === state.text[i].length ? currCorrect : 0

                if (i !== action.payload.length - 1 && !currIncorrect && action.payload[i].length === state.text[i].length) {
                    resultCharacters.correct += 1
                }
            }
            state.characters = resultCharacters
            state.results = {
                wpm: (resultCharacters.correct * 12) / state.time,
                accuracy: 0,
                time: state.time
            }
        },
        generateNewTextPortion(state: TypingSliceType, action: PayloadAction<number>) {
            state.text = state.text.slice(action.payload, state.text.length).concat(faker.word.words(action.payload).split(' '))
        }
    }
})

export default typingSlice.reducer