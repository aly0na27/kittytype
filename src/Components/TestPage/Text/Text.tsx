import React, {useState} from "react";
import styles from "../../../styles/Text.module.css"
import {faker} from "@faker-js/faker"
import {wordState} from '../../../types/types';
import Word from "./Word";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typingSlice} from "../../../store/reducers/TypingSlice";

let text = (faker.word.words(20)).toLowerCase().split(" ")

const Text: React.FC = () => {
    const [typedText, setTypedText] = useState<string[]>([])
    const [userWord, setUserWord] = useState<{ position: number, word: string }>({position: 0, word: ''})
    const [currLetter, setCurrLetter] = useState(0)
    const [caret, setCaret] = useState(0)

    const typingState = useAppSelector(state => state.typingSliceReducer.typingState)
    const selectedTime = useAppSelector(state => state.configTestReducer.time)
    const correctWords = useAppSelector(state => state.typingSliceReducer.correctWordCount)
    const dispatch = useAppDispatch()
    const setTypingState = typingSlice.actions.setTypingState
    const setTime = typingSlice.actions.setTime
    const setCorrectWordCount = typingSlice.actions.setCorrectWordCount


    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typingState === 'notStarted') { // dispatch в store, что мы начали печатать
            dispatch(setTypingState('started'))
            dispatch(setTime(selectedTime))
        }

        let inputValue = e.currentTarget.value
        if (inputValue[inputValue.length - 1] === ' ') {
            if (inputValue.length === 1) { // If word is empty then we don't start type next word
                return;
            }
            if (inputValue.slice(0 , -1) === text[userWord.position]) {
                dispatch(setCorrectWordCount(correctWords+1))
            }
            setTypedText([...typedText, inputValue.slice(0, -1)])
            setUserWord({position: userWord.position + 1, word: ''})
            setCurrLetter(0)
            inputValue = ''
            return;
        }
        setUserWord({...userWord, word: inputValue})
        setCaret(caret + 1)
        if (inputValue.length > userWord.word.length) {
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
            setCaret(caret - 1)
            return;
        }
        if (typedText[typedText.length - 1] === text[userWord.position - 1]) {
            setCurrLetter(0)
            return;
        }
        e.preventDefault()
        setUserWord({position: userWord.position - 1, word: typedText[typedText.length - 1]})
        setCaret(caret - 1)
        setCurrLetter(typedText[typedText.length - 1].length)
        setTypedText(typedText.slice(0, typedText.length - 1))
    }

    const checkWordState = (index: number): wordState => {
        return (index < userWord.position) ? wordState.typed : (index > userWord.position) ? wordState.expect : wordState.active
    }

    return (
        <div id={'textBox'} className={styles.textBox}>
            <div id={"caret"} className={styles.caret}></div>
            <div className={styles.words}>
                {
                    text.map((w, index) => <Word key={index} state={checkWordState(index)} expectedWord={text[index]}
                                                 indexLetter={index === userWord.position ? currLetter : null}
                                                 ourWord={index < userWord.position ? typedText[index] : index > userWord.position ? null : userWord.word}/>)
                }
            </div>
            <input autoFocus={true} type={"text"} value={userWord.word} onChange={onChangeInput}
                   onKeyDown={onKeyDownHandler}/>
        </div>
    )
}

export default Text