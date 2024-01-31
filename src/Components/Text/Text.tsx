import React, {useState} from "react";
import styles from "./Text.module.css"


const Text: React.FC = () => {
    const text = ["server", "bebebe", "hello", "cat", "never", "never", "never", "never", "never", "never", "never", "thing", "will", "never", "ever", "almost"]
    const [typedText, setTypedText] = useState("")
    const [pointerTypedWord, setPointerWord] = useState(0)
    const [pointerTypedLetter, setPointerLetter] = useState(0)
    const [isEndWord, setIsEndWord] = useState(false)

    const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (typedText.length > e.currentTarget.value.length) {
            if (typedText[typedText.length - 1] !== ' ') {
                if (isEndWord) {
                    //стираем только тогда, когда prev word wrong
                    if (typedText.split(' ')[pointerTypedWord] !== text[pointerTypedWord]) {
                        setPointerLetter(text[pointerTypedWord].length-1)
                        setPointerWord(pointerTypedWord - 1 )
                    }

                    // setPointerLetter(pointerTypedLetter - 1)
                    setIsEndWord(false)
                } else {
                    setPointerLetter(pointerTypedLetter - 1)
                }
            } else {
                debugger

                setIsEndWord(true)
            }
        } else {
            setPointerLetter(pointerTypedLetter + 1)
            if (e.currentTarget.value[e.currentTarget.value.length - 1] === ' ') {
                setPointerWord(pointerTypedWord + 1)
                setPointerLetter(0)
            }
        }
        setTypedText(e.currentTarget.value)
    }

    return (
        <>
            <div className={styles.words}>
                {
                    text.map((w, index) => <Word text={text} indexWord={index} typedText={typedText} word={w + " "}
                                                 pointer={pointerTypedWord} pointerLetter={pointerTypedLetter}/>)
                }
            </div>
            <input type={"text"} value={typedText} onChange={onChangeInput}/>
            <div>
                {typedText}
            </div>
        </>
    )
}

const Word: React.FC<{
    word: string,
    typedText: string,
    indexWord: number,
    text: Array<string>,
    pointer: number,
    pointerLetter: number
}> = ({text, word, typedText, indexWord, pointer, pointerLetter}) => {
    const wordArray: Array<string> = word.split("")
    return (
        <div className={styles.word}>
            {
                wordArray.map((l, i) => <Letter text={text} indexWord={indexWord} indexLetter={i} typedText={typedText}
                                                letter={l} pointer={pointer} pointerLetter={pointerLetter}/>)
            }
        </div>
    )
}


enum ColorLetter {
    Green,
    Red,
    Ordinary
}
const Letter: React.FC<{
    letter: string,
    typedText: string,
    indexWord: number,
    indexLetter: number,
    text: Array<string>,
    pointer: number,
    pointerLetter: number
}> = ({text, letter, typedText, indexWord, indexLetter, pointer, pointerLetter}) => {

    let typedTextArray = typedText.split(' ')


    function compareWords(): ColorLetter {

        if (indexWord < pointer) {
            if (typedTextArray[indexWord][indexLetter] === text[indexWord][indexLetter]) {
                //green color
                return ColorLetter.Green
            } else {
                //red color
                return ColorLetter.Red
            }
        } else if (indexWord > pointer) {
            // debugger
            // ordinary color
            return ColorLetter.Ordinary
        } else {
            // debugger
            if (pointerLetter <= indexLetter) {
                //ordinary color
                return ColorLetter.Ordinary
            } else if (pointerLetter > indexLetter) {
                if (typedTextArray[indexWord][indexLetter] === text[indexWord][indexLetter]) {
                    /// green
                    return ColorLetter.Green
                } else {
                    // red
                    return ColorLetter.Red
                }
            }
        }
        return ColorLetter.Ordinary
    }

    return (
        <div className={styles.letter + ' ' + (compareWords() === ColorLetter.Ordinary ? '' : compareWords() === ColorLetter.Red ? styles.error : styles.okey)}>
            {letter}
        </div>
    )
}

export default Text