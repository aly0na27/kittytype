import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect, useState} from "react";
import {typeTestSlice} from "../../../store/reducers/typeTestSlice";

export const WordCounter = ({userWordCount, text, typedText} : {userWordCount: number, text: string[], typedText: string[]}) => {
    const [seconds, setSeconds] = useState(0)

    const wordCount = useAppSelector(state => state.typeTestSliceReducer.value)
    const dispatch = useAppDispatch()
    const typingSliceActions = typeTestSlice.actions

    useEffect(() => {
        if (wordCount === userWordCount) {
            dispatch(typingSliceActions.setTypingState('completed'))
            dispatch(typingSliceActions.setTime(seconds))
            dispatch(typingSliceActions.setInitialText(text.slice(0, typedText.length)))
            dispatch(typingSliceActions.setTypedText(typedText.slice(0, typedText.length - 1)))
            dispatch(typingSliceActions.setResult())
        }

        let timer = setTimeout(() => {
            setSeconds(seconds + 0.1)
        }, 100)

        return () => clearTimeout(timer)
    }, [seconds]);

    return (
        <div>
            {userWordCount}/{wordCount}
        </div>
    )
}