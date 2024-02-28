import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typeTestSlice} from "../../../store/reducers/typeTestSlice";

export const TimerAndLiveWpm = ({typedText, text}: { typedText: string[], text: string[]}) => {
    const time = useAppSelector(state => state.typeTestSliceReducer.value)
    const typingSliceActions = typeTestSlice.actions
    const dispatch = useAppDispatch()

    const [counter, setCounter] = useState(time)

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            setCounter(counter - 1)
        }, 1000)
        if (counter <= 0) {
            dispatch(typingSliceActions.setTypingState('completed'))
            dispatch(typingSliceActions.setInitialText(text.slice(0, typedText.length)))
            dispatch(typingSliceActions.setTypedText(typedText))
            dispatch(typingSliceActions.setResult())
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