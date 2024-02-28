import styles from "../../../styles/TypingMode.module.css";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {typeTestSlice} from "../../../store/reducers/typeTestSlice"

export const TimeBar = () => {
    const baseSettings = [15, 30, 60, 120]

    const time = useAppSelector(state => state.typeTestSliceReducer.value)
    const setTime = typeTestSlice.actions.setValue
    const dispatch = useAppDispatch()

    const handleTimeBarClick = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(setTime(+event.currentTarget.innerText))
    }

    return (
        <div className={styles.time}>
            {
                baseSettings.map(el => {
                    return <div className={styles.timeItem + ' ' + (el === time ? styles.active : '')} onClick={handleTimeBarClick}>
                        {el}
                    </div>
                })
            }
        </div>
    )
}