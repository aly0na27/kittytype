import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typingSlice} from "../../../store/reducers/TypingSlice";

export const TimerAndLiveWpm = () => {
    const time = useAppSelector(state => state.typingSliceReducer.time)
    const wordsCount = useAppSelector(state => state.typingSliceReducer.correctWordCount)
    const setTime = typingSlice.actions.setTime
    const setTypingState = typingSlice.actions.setTypingState
    const setResult = typingSlice.actions.setResult
    const dispatch = useAppDispatch()

    const [counter, setCounter] = useState(time)

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
                setCounter(counter-1)
            }, 1000)
        if (counter <= 0) {
            dispatch(setTypingState('completed'))
            dispatch(setResult({wpm: (wordsCount * 60) / time, accuracy: 0, time: time }))
        }
        return () => {
            debugger
            if (timer) return clearInterval(timer)
        }
    }, [counter]);

    return (
        <div>
            <div>{counter}</div>
        </div>
    )
}