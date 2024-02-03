export type WordProps = {
    state: wordState,
    expectedWord: string,
    ourWord: string | null,
    indexLetter: number | null
}

export type LetterProps = {
    color: colorLetter,
    letter: string,
    isActive: boolean,
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

export type ResultsType = {
    wpm: number
    accuracy: number
    time: number

}
