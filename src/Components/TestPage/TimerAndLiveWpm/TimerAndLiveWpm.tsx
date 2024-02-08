import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typingSlice} from "../../../store/reducers/TypingSlice";

export const TimerAndLiveWpm = ({typedText, text}: { typedText: string[], text: string[] }) => {
    const time = useAppSelector(state => state.typingSliceReducer.time)
    const typingSliceActions = typingSlice.actions
    const dispatch = useAppDispatch()

    const [counter, setCounter] = useState(time)

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setCounter(counter - 1)
        }, 1000)
        if (counter <= 0) {
            dispatch(typingSliceActions.setTypingState('completed'))
            dispatch(typingSliceActions.setTypedText(typedText))
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