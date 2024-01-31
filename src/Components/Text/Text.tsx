import React, {useState} from "react";
import styles from "./Text.module.css"


const Text: React.FC = () => {
    const text = ["server", "bebebe", "hello", "cat", "never", "never", "never", "never", "never", "never", "never", "thing", "will", "never", "ever", "almost"]
    const [typedText, setTypedText] = useState<string[]>([])
    const [currWord, setCurrWord] = useState<{position: number, word: string}>({position: 0, word: ''})
    const [currLetter, setCurrLetter] = useState(0)

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value[e.currentTarget.value.length - 1] === ' ') {
            setTypedText([...typedText, e.currentTarget.value.slice(0, e.currentTarget.value.length - 1)])
            e.currentTarget.value = ''
            setCurrWord({position: currWord.position + 1, word: ''})
            setCurrLetter(0)
        } else {
            setCurrWord({...currWord, word: e.currentTarget.value})
            if (e.currentTarget.value.length > currWord.word.length) {
                setCurrLetter(currLetter + 1)
            }

        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Backspace') {
            if (currLetter !== 0) {
                setCurrLetter(currLetter - 1)
            } else {
                if (typedText[typedText.length - 1] === text[currWord.position - 1]) {
                    setCurrLetter(0)
                } else {
                    e.preventDefault()
                    setCurrWord({position: currWord.position - 1, word: typedText[typedText.length - 1]})
                    setCurrLetter(typedText[typedText.length - 1].length)
                    setTypedText(typedText.slice(0, typedText.length-1))
                }
            }
        }
    }

    return (
        <>
            <div className={styles.words}>
                {
                    text.map((w, index) => <Word text={text} indexWord={index} typedText={typedText}
                                                 word={w + " "} currWord={currWord} currLetter={currLetter}/>)
                }
            </div>
            <input type={"text"} value={currWord.word} onChange={onChangeInput} onKeyDown={onKeyDownHandler}/>
            <div>
                {typedText.map(w => <p>{w}</p>)}
            </div>
        </>
    )
}

const Word: React.FC<{
    word: string, typedText: string[],
    indexWord: number, text: string[],
    currWord: {position: number, word: string}, currLetter: number,
}> = ({text, word, typedText, indexWord, currWord, currLetter}) => {
    const wordArray: Array<string> = word.split("")
    return (
        <div className={styles.word}>
            {
                wordArray.map((l, i) => <Letter text={text} indexWord={indexWord} indexLetter={i} typedText={typedText}
                                                letter={l} currWord={currWord} currLetter={currLetter} word={word}/>)
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
    letter: string, typedText: string[], indexWord: number,
    indexLetter: number, text: string[], currWord: {position: number, word: string}, currLetter: number, word: string
}> = ({text, letter, typedText, indexWord, indexLetter, currWord, currLetter, word}) => {
    function compareWords(): ColorLetter {

        if (indexWord < currWord.position) {
            if (typedText[indexWord][indexLetter] === text[indexWord][indexLetter]) {
                return ColorLetter.Green
            } else {
                return ColorLetter.Red
            }
        } else if (indexWord > currWord.position) {
            return ColorLetter.Ordinary
        } else {
            if (currLetter <= indexLetter) {
                return ColorLetter.Ordinary
            } else if (currLetter > indexLetter) {
                if (currWord.word[indexLetter] === text[currWord.position][indexLetter]) {
                    return ColorLetter.Green
                } else {
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