import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CharactersType, ResultsType, TypingModeType, TypingStateType} from "../../types/types";
import {faker} from '@faker-js/faker'

interface TypeTestState {
    typeMode: TypingModeType
    value: number
    typingState: TypingStateType
    time: number
    results: ResultsType
    characters: CharactersType
    initialText: string[]
    slicedText: string[]
    typedText: string[]
}

const initialState: TypeTestState = {
    typeMode: 'time',
    value: 15,
    typingState: 'notStarted',
    time: 0,
    results: {wpm: 0, time: 0, accuracy: 0},
    characters: {correct: 0, incorrect: 0, extra: 0, missing: 0},
    initialText: [],
    slicedText: faker.word.words(100).split(' '),
    typedText: []
}

export const typeTestSlice = createSlice({
    name: 'typeTest',
    initialState,
    reducers: {
        setTypeMode(state: TypeTestState, action: PayloadAction<TypingModeType>) {
            state.typeMode = action.payload
        },
        setValue(state: TypeTestState, action: PayloadAction<number>) {
            state.value = action.payload
        },
        setTypingState(state: TypeTestState, action: PayloadAction<TypingStateType>) {
            state.typingState = action.payload
        },
        setTime(state: TypeTestState, actions: PayloadAction<number>) {
            state.time = actions.payload
        },
        setInitialText(state: TypeTestState, actions: PayloadAction<string[]>) {
            state.initialText = [...state.initialText, ...actions.payload]
        },
        generateNewText(state: TypeTestState) {
            if (state.typeMode === 'words' && state.value < 100) {
                state.slicedText = faker.word.words(state.value).split(' ')
            } else {
                state.slicedText = faker.word.words(100).split(' ')
            }
        },
        generateNewPortionText(state: TypeTestState, action: PayloadAction<number>) {
            state.slicedText = state.slicedText.concat(faker.word.words(action.payload).split(' '))
        },
        setTypedText(state: TypeTestState, action: PayloadAction<string[]>) {
            state.typedText = [...state.typedText, ...action.payload]
        },
        setSlicedText(state: TypeTestState, action: PayloadAction<string[]>) {
            state.slicedText = action.payload
        },
        setResult(state: TypeTestState) {
            let resultCharacters: CharactersType = {correct: 0, incorrect: 0, missing: 0, extra: 0}

            for (let i = 0; i < state.typedText.length; i++) {
                let currCorrect = 0, currIncorrect = 0

                if (state.typedText[i].length > state.initialText[i].length) {
                    resultCharacters.extra += state.typedText[i].length - state.initialText[i].length
                } else if (state.typedText[i].length < state.initialText[i].length) {
                    resultCharacters.missing += state.initialText[i].length - state.typedText[i].length
                }
                for (let j = 0; j < Math.min(state.typedText[i].length, state.initialText[i].length); j++) {
                    if (state.initialText[i][j] === state.typedText[i][j]) {
                        currCorrect++
                    } else {
                        currIncorrect++
                    }
                }
                resultCharacters.incorrect += currIncorrect ? currIncorrect : 0
                resultCharacters.correct += !currIncorrect && state.typedText[i].length === state.initialText[i].length ? currCorrect : 0

                if (i !== state.typedText.length - 1 && !currIncorrect && state.typedText[i].length === state.initialText[i].length) {
                    resultCharacters.correct += 1
                }
            }
            state.characters = resultCharacters
            state.results = {
                wpm: state.typeMode === 'time' ? (resultCharacters.correct * 12) / state.value : (resultCharacters.correct * 12) / state.time,
                accuracy: 0,
                time: state.time
            }
        }
    }
})

export default typeTestSlice.reducer