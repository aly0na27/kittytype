import {ConfigTest} from "./TypingConfig/ConfigTest";
import {Text} from "./Text/Text";
import styles from "./TestPage.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {TimerAndLiveWpm} from "./TimerAndLiveWpm/TimerAndLiveWpm";
import React, {useEffect, useRef, useState} from "react";
import {Input} from './Input/Input'
import {typeTestSlice} from "../../store/reducers/typeTestSlice";
import ReplayIcon from "@mui/icons-material/Replay";
import {WordCounter} from "./WordCounter/WordCounter";

export const TestPage = () => {
    const [typedText, setTypedText] = useState<string[]>([''])
    const [userWord, setUserWord] = useState('')
    const [currLetter, setCurrLetter] = useState(0)
    const [animateFlag, setAnimateFlag] = useState(false)
    const [userWordCount, setUserWordCount] = useState(0)

    const activeWordRef = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()
    const typingSliceActions = typeTestSlice.actions
    const typeTestState = useAppSelector(state => state.typeTestSliceReducer)

    const refreshText = () => {
        dispatch(typingSliceActions.setTypingState('notStarted'))
        dispatch(typingSliceActions.setTypedText([]))
        dispatch(typingSliceActions.generateNewText())
        dispatch(typingSliceActions.setInitialText([]))
        setTypedText([''])
        setCurrLetter(0)
        setUserWord('')
        setAnimateFlag(true)
    }

    useEffect(() => {
        refreshText()
    }, [typeTestState.typeMode, typeTestState.value]);

    return (
        <main className={styles.main}>
            <ConfigTest/>
            {typeTestState.typingState === 'started' &&
                (typeTestState.typeMode === 'time' ?
                    <TimerAndLiveWpm typedText={typedText} text={typeTestState.slicedText}/> :
                    <WordCounter userWordCount={userWordCount} text={typeTestState.slicedText} typedText={typedText}/>)}
            <Text text={typeTestState.slicedText} userWord={userWord} typedText={typedText} currLetter={currLetter}
                  activeWordRef={activeWordRef} animateFlag={animateFlag} setAnimateFlag={setAnimateFlag}/>
            <Input text={typeTestState.slicedText} typedText={typedText} setTypedText={setTypedText}
                   userWord={userWord} setUserWord={setUserWord}
                   currLetter={currLetter} setCurrLetter={setCurrLetter}
                   activeWordRef={activeWordRef}
                   userWordCount={userWordCount} setUserWordCount={setUserWordCount}
            />
            <div>
                <button className={styles.replayButton} onClick={() => refreshText()}>
                    <ReplayIcon/>
                </button>
            </div>
        </main>
    )
}