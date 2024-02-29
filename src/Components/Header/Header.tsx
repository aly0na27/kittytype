import React from 'react'
import styles from "../../styles/Header.module.css"
import logo from "../../assets/logo.svg"
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {typeTestSlice} from "../../store/reducers/typeTestSlice";

export const Header: React.FC = () => {
    const setTypingState = typeTestSlice.actions.setTypingState
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(setTypingState('update'))
    }

    return (
        <header className={styles.header}>
            <NavLink className={styles.logo} to={'/'} onClick={onClickHandler}>
                <img className={styles.logoImg} src={logo} alt={""}/>
                <h1 className={styles.logoText}>
                    <div className={styles.top}>kitty see</div>
                    kittytype
                </h1>
            </NavLink>
            <nav className={styles.nav}>
                <div className={styles.navIcon}>
                    <KeyboardIcon sx={{"&:hover": {color: "#9d2752"}}} color={"primary"}/>
                </div>
                <div className={styles.navIcon}>
                    <SettingsRoundedIcon sx={{"&:hover": {color: "#9d2752"}}} color={"primary"}/>
                </div>
                <div></div>
                <div className={styles.navIcon}>
                    <PersonOutlineRoundedIcon sx={{"&:hover": {color: "#9d2752"}}} color={"primary"}/>
                </div>
            </nav>
        </header>
    )
}