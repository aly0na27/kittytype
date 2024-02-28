import React from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typeTestSlice} from "../../../store/reducers/typeTestSlice";
import {InputProps} from "../../../types/types";


export const Input = (props: InputProps) => {
    const {
        text, typedText, setTypedText,
        userWord, setUserWord, currLetter,
        setCurrLetter, activeWordRef, userWordCount,
        setUserWordCount
    } = props

    const typeTestState = useAppSelector(state => state.typeTestSliceReducer)

    const typingSliceActions = typeTestSlice.actions
    const dispatch = useAppDispatch()

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeTestState.typingState === 'notStarted') { // dispatch в store, что мы начали печатать
            dispatch(typingSliceActions.setTypingState('started'))
        }

        if (e.currentTarget.value[e.currentTarget.value.length - 1] === ' ') {
            if (e.currentTarget.value.length === 1) return;   // If word is empty then we don't start type next word

            const activeWord = activeWordRef.current

            if (activeWord) {
                const next_word = activeWord.nextElementSibling
                let first_word = activeWord.previousElementSibling
                let last_word = activeWord.nextElementSibling

                while (first_word && first_word.previousElementSibling) {
                    first_word = first_word.previousElementSibling
                }

                while (last_word && last_word.nextElementSibling) {
                    last_word = last_word.nextElementSibling
                }

                if (first_word && first_word.getBoundingClientRect().top < activeWord.getBoundingClientRect().top
                    && next_word && (next_word.getBoundingClientRect().top > activeWord.getBoundingClientRect().top)
                ) {

                    let it = 1
                    while (first_word && first_word.nextElementSibling && (first_word.nextElementSibling.getBoundingClientRect().top === first_word.getBoundingClientRect().top)) {
                        first_word = first_word.nextElementSibling
                        it++
                    }

                    setTypedText(typedText.slice(it, typedText.length).concat(['']))
                    dispatch(typingSliceActions.setInitialText(text.slice(0, it)))
                    dispatch(typingSliceActions.setTypedText(typedText.slice(0, it)))

                    if (typeTestState.typeMode === 'words') {
                        if (typeTestState.value >= 100) {
                            if (it < typeTestState.value - typeTestState.typedText.length - typedText.length) {
                                dispatch(typingSliceActions.generateNewPortionText(it))
                            } else {
                                dispatch(typingSliceActions.generateNewPortionText(typeTestState.value - typeTestState.typedText.length - typedText.length))
                            }
                        } else {

                            dispatch(typingSliceActions.setSlicedText(typeTestState.slicedText.slice(it, typeTestState.slicedText.length)))
                        }
                    } else {
                        dispatch(typingSliceActions.generateNewPortionText(it))
                    }

                    const textBox = document.getElementById('textBox')

                    console.log(last_word?.getBoundingClientRect().height, last_word?.getBoundingClientRect().top, next_word.previousElementSibling?.getBoundingClientRect().top)
                    debugger

                    setUserWordCount(userWordCount + 1)
                    setUserWord('')
                    setCurrLetter(0)
                    e.currentTarget.value = ''
                    return
                }
            } // Generate new portion of words

            setUserWordCount(userWordCount + 1)
            setTypedText([...typedText, ''])
            setUserWord('')
            setCurrLetter(0)
            e.currentTarget.value = ''
            return;
        }

        typedText[typedText.length - 1] = e.currentTarget.value
        setTypedText([...typedText])

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

        // If we don't erase word
        if (currLetter !== 0) {
            setCurrLetter(currLetter - 1)
            return;
        }

        // If prev typed word === word from dictionary => we don't start erase this word
        if (typedText[typedText.length - 2] === text[typedText.length - 2]) return;

        // Other case
        e.preventDefault()
        setUserWordCount(userWordCount - 1)
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