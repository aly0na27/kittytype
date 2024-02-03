import React, {useState} from 'react'
import styles from "../../../styles/TypingMode.module.css"
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import NumbersIcon from '@mui/icons-material/Numbers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpellcheckRoundedIcon from '@mui/icons-material/SpellcheckRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import TuneIcon from '@mui/icons-material/Tune';
import {TypingModeType} from "../../../types/types";


export const ConfigTest: React.FC = () => {
    const [typingMode, setTypingMode] = useState<TypingModeType>('time')

    const handleClick = () => {

    }

    const handleTimeBarClick = (event: React.MouseEvent<HTMLElement>) => {
        const time = +event.currentTarget.innerText

        debugger
    }

    return (
        <div className={styles.configTestWrapper}>
            <div className={styles.row}>
                <div className={styles.puncAndNum}>
                    <div className={styles.puncAndNumItem}>
                        <AlternateEmailIcon/>punctuation
                    </div>
                    <div className={styles.puncAndNumItem}>
                        <NumbersIcon/>numbers
                    </div>
                </div>
                <div className={styles.spacer}></div>
                <div className={styles.mode} onClick={handleClick}>
                    <div className={styles.modeItem}>
                        <AccessTimeIcon/><span>time</span>
                    </div>
                    <div className={styles.modeItem}>
                        <SpellcheckRoundedIcon/>words
                    </div>
                    <div className={styles.modeItem}>
                        <FormatQuoteRoundedIcon/>quote
                    </div>
                    <div className={styles.modeItem}>
                        <SelfImprovementIcon/>zen
                    </div>
                    <div className={styles.modeItem}>
                        <TuneIcon/>custom
                    </div>
                </div>
                <div className={styles.spacer}>
                </div>
                <div className={styles.time} >
                    <div className={styles.timeItem} onClick={handleTimeBarClick}>
                        15
                    </div>
                    <div className={styles.timeItem} onClick={handleTimeBarClick}>
                        30
                    </div>
                    <div className={styles.timeItem} onClick={handleTimeBarClick}>
                        60
                    </div>
                    <div className={styles.timeItem} onClick={handleTimeBarClick}>
                        120
                    </div>
                </div>
            </div>
        </div>
    )
}

