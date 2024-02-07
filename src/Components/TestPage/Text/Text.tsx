import React from "react";
import styles from "../../../styles/Text.module.css"
import {wordState} from '../../../types/types';
import Word from "./Word";


const Text = ({text, userWord, typedText, currLetter} : {text: string[], userWord: string, typedText: string[], currLetter: number}) => {
    const checkWordState = (index: number): wordState => {
        return (index < typedText.length - 1) ? wordState.typed : (index > typedText.length - 1) ? wordState.expect : wordState.active
    }

    return (
        <div id={'textBox'} className={styles.textBox}>
            <div id={"caret"} className={styles.caret}></div>
            <div className={styles.words}>
                {
                    text.map((w, index) => <Word key={index}
                                                 state={checkWordState(index)}
                                                 expectedWord={w}
                                                 indexLetter={index === typedText.length - 1 ? currLetter : null}
                                                 ourWord={index < typedText.length - 1 ? typedText[index] : index > typedText.length - 1 ? null : userWord}/>
                    )
                }
            </div>
        </div>
    )
}

export default Text