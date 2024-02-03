import React, {memo} from "react";
import {colorLetter, WordProps, wordState} from "../../types/types";
import styles from "../../styles/Text.module.css";
import Letter from "./Letter";

const Word: React.FC<WordProps> = memo(({state, ourWord, expectedWord, indexLetter}) => {
    let wordArray: string[] = expectedWord.split("")

    if (ourWord && expectedWord.length < ourWord.length) {
        wordArray = (expectedWord + ourWord.slice(expectedWord.length, ourWord.length)).split("")
    }

    return (
        <div className={styles.word}>
            {
                wordArray.map((l, i) => {
                    if (i >= expectedWord.length) {
                        return <Letter color={colorLetter.extra_incorrect} letter={l}
                                       isActive={ourWord ? (indexLetter === i + 1) : false}/>

                    }
                    if (state === wordState.active) {
                        return <Letter
                            color={Number(indexLetter) <= i ? colorLetter.based : ourWord?.at(i) === expectedWord[i] ? colorLetter.correct : colorLetter.incorrect}
                            letter={l} isActive={i === indexLetter}/>
                    }

                    return <Letter
                        color={state === wordState.expect ? colorLetter.based : ourWord?.at(i) === expectedWord[i] ? colorLetter.correct : colorLetter.incorrect}
                        letter={l} isActive={false}/>
                })
            }
        </div>
    )
})

export default Word