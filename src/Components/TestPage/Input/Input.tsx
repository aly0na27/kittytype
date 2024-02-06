import React, {Dispatch, SetStateAction} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typingSlice} from "../../../store/reducers/TypingSlice";

type InputProps = {
    typedText: string[], setTypedText: Dispatch<SetStateAction<string[]>>
    userWord: string, setUserWord: Dispatch<SetStateAction<string>>
    currLetter: number, setCurrLetter: Dispatch<SetStateAction<number>>
    text: string[]

}

export const Input = ({text, typedText, setTypedText, userWord, setUserWord, currLetter, setCurrLetter}: InputProps) => {
    const typingState = useAppSelector(state => state.typingSliceReducer.typingState)
    const selectedTime = useAppSelector(state => state.configTestReducer.time)
    const typingSliceActions = typingSlice.actions
    const dispatch = useAppDispatch()


    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typingState === 'notStarted') { // dispatch в store, что мы начали печатать
            dispatch(typingSliceActions.setTypingState('started'))
            dispatch(typingSliceActions.setTime(selectedTime))
        }
        let inputValue = e.currentTarget.value
        if (inputValue[inputValue.length - 1] === ' ') {
            if (inputValue.length === 1) return; // If word is empty then we don't start type next word

            setTypedText([...typedText, inputValue.slice(0, -1)])
            setUserWord('')
            setCurrLetter(0)
            inputValue = ''
            return;
        }
        setUserWord(inputValue)
        if (inputValue.length > userWord.length) {
            setCurrLetter(currLetter + 1)
        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'ArrowLeft' || e.key === "ArrowRight" || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault()
            return;
        }
        if (e.key !== 'Backspace') return;

        if (currLetter !== 0) {
            setCurrLetter(currLetter - 1)
            return;
        }
        if (typedText[typedText.length - 1] === text[typedText.length - 1]) {
            setCurrLetter(0)
            return;
        }
        e.preventDefault()
        setUserWord(typedText[typedText.length - 1])
        setCurrLetter(typedText[typedText.length - 1].length)
        setTypedText(typedText.slice(0, typedText.length - 1))
    }

    return (
        <>
            <input autoFocus={true} type={"text"} value={userWord} onChange={onChangeInput}
                   onKeyDown={onKeyDownHandler}/>
        </>
    )
}