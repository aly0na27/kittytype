import React, {useEffect} from "react";
import styles from "../../../styles/Text.module.css"
import {TextProps, wordState} from '../../../types/types';
import Word from "./Word";

export const Text: React.FC<TextProps> = (props) => {

    let {text, userWord,
        typedText, currLetter,
        activeWordRef, animateFlag,
        setAnimateFlag} = props

    useEffect(() => {
        if (animateFlag) {
            setTimeout(() => {
                setAnimateFlag(false)
            }, 1000)
        }
    }, [animateFlag]);

    const checkWordState = (index: number): wordState => {
        return (index < typedText.length - 1) ? wordState.typed : (index > typedText.length - 1) ? wordState.expect : wordState.active
    }

    return (
            <div id={'textBox'} className={styles.textBox}>
                <div id={"caret"} className={styles.caret}></div>
                <div className={styles.words + ' ' + (animateFlag ? styles.animation : '')}>
                    {
                        text.map((w, index) => <Word key={index}
                                                     state={checkWordState(index)}
                                                     expectedWord={w}
                                                     indexLetter={index === typedText.length - 1 ? currLetter : null}
                                                     ourWord={index < typedText.length - 1 ? typedText[index] : index > typedText.length - 1 ? null : userWord}
                                                     activeWordRef={activeWordRef}
                            />
                        )
                    }
                </div>
            </div>
    )
}
