import React, {Dispatch, SetStateAction, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typingSlice} from "../../../store/reducers/TypingSlice";

type InputProps = {
    typedText: string[], setTypedText: Dispatch<SetStateAction<string[]>>
    userWord: string, setUserWord: Dispatch<SetStateAction<string>>
    currLetter: number, setCurrLetter: Dispatch<SetStateAction<number>>
    text: string[]
    activeWordRef: React.RefObject<HTMLDivElement>
}

export const Input = ({text, typedText, setTypedText, userWord, setUserWord, currLetter, setCurrLetter, activeWordRef}: InputProps) => {
    const typingState = useAppSelector(state => state.typingSliceReducer.typingState)
    const selectedTime = useAppSelector(state => state.configTestReducer.time)
    const typingSliceActions = typingSlice.actions
    const dispatch = useAppDispatch()

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typingState === 'notStarted') { // dispatch в store, что мы начали печатать
            dispatch(typingSliceActions.setTypingState('started'))
            dispatch(typingSliceActions.setTime(selectedTime))
        }
        if (e.currentTarget.value[e.currentTarget.value.length - 1] === ' ') {
            if (e.currentTarget.value.length === 1) return;   // If word is empty then we don't start type next word

            const activeWord = activeWordRef.current
            // const activeWord = document.getElementById('word_active')


            if (activeWord) {
                const next_word = activeWord.nextElementSibling
                let first_word = activeWord.previousElementSibling
                while (first_word && first_word.previousElementSibling) {
                    first_word = first_word?.previousElementSibling
                }
                if (first_word && first_word.getBoundingClientRect().top < activeWord.getBoundingClientRect().top && next_word && (next_word.getBoundingClientRect().top > activeWord.getBoundingClientRect().top)) {
                    let it = 1
                    while (first_word && first_word.nextElementSibling && (first_word.nextElementSibling.getBoundingClientRect().top === first_word.getBoundingClientRect().top)) {
                        first_word = first_word.nextElementSibling
                        it++
                    }
                    setTypedText(typedText.slice(it, typedText.length).concat(['']))
                    dispatch(typingSliceActions.generateNewTextPortion(it))
                    setUserWord('')
                    setCurrLetter(0)
                    e.currentTarget.value = ''
                    return

                }
            }
            setTypedText([...typedText, ''])
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