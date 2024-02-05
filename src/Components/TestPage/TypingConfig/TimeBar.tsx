import styles from "../../../styles/TypingMode.module.css";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {testConfigSlice} from "../../../store/reducers/TestConfigSlice";

export const TimeBar = () => {
    const baseSettings = [15, 30, 60, 120]

    const time = useAppSelector(state => state.configTestReducer.time)
    const {setTime} = testConfigSlice.actions
    const dispatch = useAppDispatch()

    const handleTimeBarClick = (event: React.MouseEvent<HTMLElement>) => {
        const time = +event.currentTarget.innerText
        dispatch(setTime(time))
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