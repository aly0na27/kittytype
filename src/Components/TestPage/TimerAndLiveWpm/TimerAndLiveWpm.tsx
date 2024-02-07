import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typingSlice} from "../../../store/reducers/TypingSlice";
import {CharactersType} from "../../../types/types";

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
            let resultCharacters: CharactersType = {correct: 0, incorrect: 0, missing: 0, extra: 0}
            //TODO: УБРАТЬ МИН
            for (let i = 0; i < Math.min(typedText.length, text.length); i++) {
                debugger
                let currCorrect = 0, currIncorrect = 0

                if (typedText[i].length > text[i].length) {
                    resultCharacters.extra += typedText[i].length - text[i].length
                } else if (typedText[i].length < text[i].length) {
                    resultCharacters.missing += text[i].length - typedText[i].length
                }
                for (let j = 0; j < Math.min(typedText[i].length, text[i].length); j++) {
                    if (text[i][j] === typedText[i][j]) {
                        currCorrect++
                    } else {
                        currIncorrect++
                    }
                }
                resultCharacters.incorrect += currIncorrect ? currIncorrect : 0
                resultCharacters.correct += !currIncorrect && typedText[i].length === text[i].length ? currCorrect : 0

                if (i !== typedText.length - 1 && !currIncorrect && typedText[i].length === text[i].length) {
                    resultCharacters.correct += 1
                }
            }
            dispatch(typingSliceActions.setCharacters(resultCharacters))
            dispatch(typingSliceActions.setResult({
                wpm: (resultCharacters.correct * 12) / time,
                accuracy: 0,
                time: time
            }))
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