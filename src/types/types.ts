import React, {Dispatch, SetStateAction} from "react";

export type TextProps = {
    text: string[],
    userWord: string,
    typedText: string[],
    currLetter: number,
    activeWordRef: React.RefObject<HTMLDivElement>,
    animateFlag: boolean,
    setAnimateFlag: React.Dispatch<React.SetStateAction<boolean>>
}

export type WordProps = {
    state: wordState,
    expectedWord: string,
    ourWord: string | null,
    indexLetter: number | null
    activeWordRef: React.RefObject<HTMLDivElement>
}

export type LetterProps = {
    color: colorLetter,
    letter: string,
    isActive: boolean,
    isSpace: boolean
}


export type RestartButtonProps = {
    setTypedText: React.Dispatch<React.SetStateAction<string[]>>
    setUserWord: React.Dispatch<React.SetStateAction<string>>
    setCurrLetter: React.Dispatch<React.SetStateAction<number>>
    setAnimateFlag: React.Dispatch<React.SetStateAction<boolean>>
}

export type InputProps = {
    typedText: string[], setTypedText: Dispatch<SetStateAction<string[]>>
    userWord: string, setUserWord: Dispatch<SetStateAction<string>>
    currLetter: number, setCurrLetter: Dispatch<SetStateAction<number>>
    text: string[]
    activeWordRef: React.RefObject<HTMLDivElement>
    setUserWordCount: Dispatch<SetStateAction<number>>
    userWordCount: number
}


export enum wordState {
    expect,
    active,
    typed
}

export enum colorLetter {
    correct,
    incorrect,
    based,
    extra_incorrect
}

export type TypingModeType = 'time' | 'words' | 'qoute' | 'zen' | 'custom'

export type QuoteType = 'all' | 'short' | 'medium' | 'long' | 'thick'

export type TypingStateType = 'notStarted' | 'started' | 'completed'

export type ResultsType = {
    wpm: number
    accuracy: number
    time: number
}

export type CharactersType = {
    correct: number
    incorrect: number
    extra: number
    missing: number
}
