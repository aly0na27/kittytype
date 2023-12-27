import React, {useState} from "react";
import styles from "./Text.module.css"

const Text: React.FC = () => {
    const text = ["server", "hello", "cat", "thing", "will", "never", "ever", "almost"]
    const [typedText, setTypedText] = useState("")

    const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        setTypedText(e.currentTarget.value)
        debugger
    }

    return (
        <>
            <div className={styles.words}>
                {
                    text.map((w, index) => <Word text={text} indexWord={index} typedText={typedText} word={w + " "}/>)
                }
            </div>
            <input type={"text"} value={typedText} onChange={onChangeInput}/>
            <div>
                {typedText}
            </div>
        </>
    )
}

const Word: React.FC<{ word: string, typedText: string, indexWord: number, text: Array<string>}> = ({text, word, typedText, indexWord}) => {
    const wordArray: Array<string> = word.split("")
    return (
        <div className={styles.word}>
            {
                wordArray.map((l, i) => <Letter text={text} indexWord={indexWord} indexLetter={i} typedText={typedText} letter={l}/>)
            }
        </div>
    )
}

const Letter: React.FC<{ letter: string, typedText: string, indexWord: number, indexLetter: number, text: Array<string>}> = ({text, letter, typedText, indexWord, indexLetter}) => {

    const typedTextArray = typedText.split(' ')

    return (
        <div className={styles.letter + ' ' + (indexWord + 1 >= typedTextArray.length ? '' : (typedTextArray[indexWord][indexLetter] === text[indexWord][indexLetter] ? styles.okey : styles.error))}>
            {letter}
        </div>
    )
}

export default Text