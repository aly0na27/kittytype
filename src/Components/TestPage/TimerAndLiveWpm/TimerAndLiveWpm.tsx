import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typingSlice} from "../../../store/reducers/TypingSlice";
import {CharactersType} from "../../../types/types";

export const TimerAndLiveWpm = ({typedText, text}: {typedText: string[], text: string[]}) => {
    const time = useAppSelector(state => state.typingSliceReducer.time)
    const typingSliceActions = typingSlice.actions
    const dispatch = useAppDispatch()

    const [counter, setCounter] = useState(time)

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
                setCounter(counter-1)
            }, 1000)
        if (counter <= 0) {
            dispatch(typingSliceActions.setTypingState('completed'))
            dispatch(typingSliceActions.setTypedText(typedText))
            let resultCharacters: CharactersType = {correct: 0, incorrect: 0, missing: 0, extra: 0}
            for (let i = 0; i < typedText.length; i++) {
                for (let j = 0; j < Math.min(typedText[i].length, text[i].length); j++) {
                    if (text[i][j] === typedText[i][j]) {
                        resultCharacters.correct++
                    } else {
                        resultCharacters.incorrect++
                    }
                }
            }
            dispatch(typingSliceActions.setCharacters(resultCharacters))
            dispatch(typingSliceActions.setResult({wpm: (resultCharacters.correct * 12) / time, accuracy: 0, time: time }))
        }
        return () => {
            if (timer) return clearInterval(timer)
        }
    }, [counter]);

    return (
        <div>
            <div>{counter}</div>
        </div>
    )
}