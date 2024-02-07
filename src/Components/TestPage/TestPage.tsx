import {ConfigTest} from "./TypingConfig/ConfigTest";
import Text from "./Text/Text";
import styles from "./TestPage.module.css"
import {useAppSelector} from "../../hooks/redux";
import {TimerAndLiveWpm} from "./TimerAndLiveWpm/TimerAndLiveWpm";
import {useState} from "react";
import {Input} from './Input/Input'
// let text = (faker.word.words(20)).toLowerCase().split(" ")

export const TestPage = () => {
    const [typedText, setTypedText] = useState<string[]>([''])
    const [userWord, setUserWord] = useState('')
    const [currLetter, setCurrLetter] = useState(0)

    const typingState = useAppSelector(state => state.typingSliceReducer.typingState)
    const text = useAppSelector(state => state.typingSliceReducer.text)

    return (
        <main className={styles.main}>
            <ConfigTest/>
            {typingState === 'started' && <TimerAndLiveWpm text={text} typedText={typedText}/>}
            <Text text={text} userWord={userWord} typedText={typedText} currLetter={currLetter}/>
            <Input text={text} typedText={typedText} setTypedText={setTypedText}
                   userWord={userWord} setUserWord={setUserWord}
                   currLetter={currLetter} setCurrLetter={setCurrLetter}/>
        </main>
    )
}