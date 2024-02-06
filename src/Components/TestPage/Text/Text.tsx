import React from "react";
import styles from "../../../styles/Text.module.css"
import {wordState} from '../../../types/types';
import Word from "./Word";


const Text = ({text, userWord, typedText, currLetter} : {text: string[], userWord: string, typedText: string[], currLetter: number}) => {

    // userWord.position => typedText.length -1 or -2 or ''
    const checkWordState = (index: number): wordState => {
        return (index < typedText.length) ? wordState.typed : (index > typedText.length) ? wordState.expect : wordState.active
    }

    return (
        <div id={'textBox'} className={styles.textBox}>
            <div id={"caret"} className={styles.caret}></div>
            <div className={styles.words}>
                {
                    text.map((w, index) => <Word key={index}
                                                 state={checkWordState(index)}
                                                 expectedWord={w}
                                                 indexLetter={index === typedText.length ? currLetter : null}
                                                 ourWord={index < typedText.length ? typedText[index] : index > typedText.length ? null : userWord}/>
                    )
                }
            </div>
        </div>
    )
}

export default Text