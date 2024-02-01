import React, {memo, useState} from "react";
import styles from "./Text.module.css"
import {faker} from "@faker-js/faker"

let text = faker.random.words(10).toLowerCase().split(" ")

enum wordState {
    expect,
    active,
    typed
}

enum ColorLetter {
    Green,
    Red,
    Ordinary
}

type WordPropsType = {
    state: wordState,
    expectedWord: string,
    ourWord: string | null,
    indexLetter: number | null
}

const Text: React.FC = () => {
    const [typedText, setTypedText] = useState<string[]>([])
    const [currWord, setCurrWord] = useState<{ position: number, word: string }>({position: 0, word: ''})
    const [currLetter, setCurrLetter] = useState(0)

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value[e.currentTarget.value.length - 1] === ' ') {
            setTypedText([...typedText, e.currentTarget.value.slice(0, e.currentTarget.value.length - 1)])
            setCurrWord({position: currWord.position + 1, word: ''})
            setCurrLetter(0)
            e.currentTarget.value = ''
            return;
        }
        setCurrWord({...currWord, word: e.currentTarget.value})
        if (e.currentTarget.value.length > currWord.word.length) {
            setCurrLetter(currLetter + 1)
        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Backspace') {
            if (currLetter !== 0) {
                setCurrLetter(currLetter - 1)
                return;
            }
            if (typedText[typedText.length - 1] === text[currWord.position - 1]) {
                setCurrLetter(0)
                return;
            }
            e.preventDefault()
            setCurrWord({position: currWord.position - 1, word: typedText[typedText.length - 1]})
            setCurrLetter(typedText[typedText.length - 1].length)
            setTypedText(typedText.slice(0, typedText.length - 1))
        }

    }

    const checkWordState = (index: number): wordState => {
        return (index < currWord.position) ? wordState.typed : (index > currWord.position) ? wordState.expect : wordState.active
    }


    return (
        <>
            <div className={styles.words}>
                {
                    text.map((w, index) => <Word key={index} state={checkWordState(index)} expectedWord={text[index]}
                                                 indexLetter={index === currWord.position ? currLetter : null}
                                                 ourWord={index < currWord.position ? typedText[index] : index > currWord.position ? null : currWord.word}/>)
                }
            </div>
            <input type={"text"} value={currWord.word} onChange={onChangeInput} onKeyDown={onKeyDownHandler}/>
            {/*<div>*/}
            {/*    {typedText.map(w => <p>{w}</p>)}*/}
            {/*</div>*/}
        </>
    )
}


const Word: React.FC<WordPropsType> = memo(({state, ourWord, expectedWord, indexLetter}) => {
    // console.log("Rerender word")
    const wordArray: Array<string> = expectedWord.split("")

    return (
        <div className={styles.word}>
            {
                wordArray.map((l, i) => {
                    if (state === wordState.expect) {
                        return <Letter color={ColorLetter.Ordinary} letter={l}/>
                    } else if (state === wordState.active) {
                        if (Number(indexLetter) <= i) {
                            return <Letter color={ColorLetter.Ordinary} letter={l}/>
                        } else {
                            return <Letter
                                color={ourWord?.at(i) === expectedWord[i] ? ColorLetter.Green : ColorLetter.Red}
                                letter={l}/>
                        }
                    }
                    return <Letter color={ourWord?.at(i) === expectedWord[i] ? ColorLetter.Green : ColorLetter.Red}
                                   letter={l}/>
                })
            }
        </div>
    )
})


const Letter: React.FC<{ color: ColorLetter, letter: string }> = memo(({letter, color}) => {
    // console.log("Rerender letter")
    return (
        <div
            className={styles.letter + ' ' + (color === ColorLetter.Ordinary ? '' : color === ColorLetter.Red ? styles.error : styles.okey)}>
            {letter}
        </div>
    )
})

export default Text