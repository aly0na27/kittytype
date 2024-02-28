import React from 'react'
import styles from "../../../styles/TypingMode.module.css"
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import NumbersIcon from '@mui/icons-material/Numbers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpellcheckRoundedIcon from '@mui/icons-material/SpellcheckRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import TuneIcon from '@mui/icons-material/Tune';
import {TimeBar} from "./TimeBar";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {WordCountBar} from "./WordCountBar";
import {TypingModeType} from "../../../types/types";
import {typeTestSlice} from "../../../store/reducers/typeTestSlice";

export const ConfigTest: React.FC = () => {
    const activeMode = useAppSelector(state => state.typeTestSliceReducer.typeMode)
    const dispatch = useAppDispatch()
    const typeTestActions = typeTestSlice.actions

    const handleModeClick = (e: React.MouseEvent<HTMLElement>) => {
        const mode = e.currentTarget.innerText as TypingModeType

        dispatch(typeTestActions.setTypeMode(mode))

        if (mode === 'words') {
            dispatch(typeTestActions.setValue(10))
        } else if (mode === 'time') {
            dispatch(typeTestActions.setValue(15))
        }
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
                <div className={styles.mode}>
                    <div className={styles.modeItem + ' ' + (activeMode === 'time' ? styles.active : '')} onClick={handleModeClick}>
                        <AccessTimeIcon/><span>time</span>
                    </div>
                    <div className={styles.modeItem + ' ' + (activeMode === 'words' ? styles.active : '')} onClick={handleModeClick}>
                        <SpellcheckRoundedIcon/>words
                    </div>
                    <div className={styles.modeItem + ' ' + (activeMode === 'qoute' ? styles.active : '')} onClick={handleModeClick}>
                        <FormatQuoteRoundedIcon/>quote
                    </div>
                    <div className={styles.modeItem + ' ' + (activeMode === 'zen' ? styles.active : '')} onClick={handleModeClick}>
                        <SelfImprovementIcon/>zen
                    </div>
                    <div className={styles.modeItem + ' ' + (activeMode === 'custom' ? styles.active : '')} onClick={handleModeClick}>
                        <TuneIcon/>custom
                    </div>
                </div>
                <div className={styles.spacer}>
                </div>
                {
                    activeMode === 'time' ? <TimeBar/> : <WordCountBar/>
                }
            </div>
        </div>
    )
}

