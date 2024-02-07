import React, {Dispatch, SetStateAction, useEffect} from "react";
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

    useEffect(() => {
        const activeLetter = document.getElementById('active')
        const textBox = document.getElementById('textBox')

        if (activeLetter && textBox) {
            if ((textBox.getBoundingClientRect().top + textBox.getBoundingClientRect().height) - (activeLetter.getBoundingClientRect().top + activeLetter.getBoundingClientRect().height) < activeLetter.getBoundingClientRect().height) {
                let it = 1
                let s = activeLetter.parentElement?.previousElementSibling
                while (s && s.previousElementSibling) {
                    s = s?.previousElementSibling
                }
                while (s && s.nextElementSibling && (s.nextElementSibling.getBoundingClientRect().top === s.getBoundingClientRect().top)) {
                    s = s.nextElementSibling
                    it++
                }
                dispatch(typingSliceActions.generateNewTextPortion(it))
                debugger
            }
        }
    }, [currLetter]);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typingState === 'notStarted') { // dispatch в store, что мы начали печатать
            dispatch(typingSliceActions.setTypingState('started'))
            dispatch(typingSliceActions.setTime(selectedTime))
        }
        if (e.currentTarget.value[e.currentTarget.value.length - 1] === ' ') {
            if (e.currentTarget.value.length === 1) return; // If word is empty then we don't start type next word

            setTypedText([...typedText, '']) //bebe
            setUserWord('')
            setCurrLetter(0)
            e.currentTarget.value = ''
            return;
        }
        typedText[typedText.length - 1] = e.currentTarget.value
        setTypedText([...typedText]) //bebe

        setUserWord(e.currentTarget.value)
        if (e.currentTarget.value.length > userWord.length) {
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
        if (typedText[typedText.length - 2] === text[typedText.length - 2]) return;

        e.preventDefault()
        setUserWord(typedText[typedText.length - 2])
        setCurrLetter(typedText[typedText.length - 2].length)
        setTypedText(typedText.slice(0, typedText.length - 1))
    }

    return (
        <>
            <input autoFocus={true} type={"text"} value={userWord} onChange={onChangeInput}
                   onKeyDown={onKeyDownHandler}/>
        </>
    )
}