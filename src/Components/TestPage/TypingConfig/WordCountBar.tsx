import React from 'react'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {testConfigSlice} from "../../../store/reducers/TestConfigSlice";
import styles from '../../../styles/TypingMode.module.css'

export const WordCountBar = () => {
    const baseSettings = [10, 25, 50, 100]

    const wordCount = useAppSelector(state => state.configTestReducer.wordCount)
    const dispatch = useAppDispatch()
    const setWordCount = testConfigSlice.actions.setWordCount

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(setWordCount(+e.currentTarget.innerText))
    }
    return (
        <div className={styles.words}>
            {
                baseSettings.map(el => {
                    return <div onClick={handleClick} className={styles.wordsItem + ' ' + (wordCount === el ? styles.active : '')}>
                        {el}
                    </div>
                })
            }
        </div>
    )
}