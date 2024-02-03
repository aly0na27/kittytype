import React, {memo, useEffect, useState} from "react";
import {colorLetter, LetterProps} from "../../../types/types";
import classNames from "classnames";
import styles from "../../../styles/Text.module.css";

const Letter: React.FC<LetterProps> = memo(({letter, color, isActive}) => {
    console.log('Rerender letter')

    useEffect(() => {
        const caret = document.getElementById("caret")
        const activeLetter = document.getElementById('active')
        const textBox = document.getElementById('textBox')

        if (isActive && textBox && activeLetter && caret) {
            caret.style.left = (activeLetter.getBoundingClientRect().left - textBox.getBoundingClientRect().left).toString() + 'px'
            caret.style.top = (activeLetter.getBoundingClientRect().top - textBox.getBoundingClientRect().top).toString() + 'px'
        }

    }, [isActive])

    const letterClass = classNames(styles.letter, {
        [styles.okey]: color === colorLetter.correct,
        [styles.error]: color === colorLetter.incorrect,
        [styles.underline]: color === colorLetter.extra_incorrect && !isActive
    })

    return (
        <div id={isActive ? 'active' : ''} className={letterClass}>
            {letter}
        </div>
    )
})

export default Letter