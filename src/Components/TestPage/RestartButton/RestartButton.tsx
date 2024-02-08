import React from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import {useAppDispatch} from "../../../hooks/redux";
import {typingSlice} from "../../../store/reducers/TypingSlice";

type RestartButtonType = {
    setTypedText: React.Dispatch<React.SetStateAction<string[]>>
    setUserWord: React.Dispatch<React.SetStateAction<string>>
    setCurrLetter: React.Dispatch<React.SetStateAction<number>>
}
export const RestartButton: React.FC<RestartButtonType> = ({setTypedText, setUserWord, setCurrLetter}) => {

    const dispatch = useAppDispatch()
    const typingSliceActions = typingSlice.actions

    const onClickHandler = () => {
        dispatch(typingSliceActions.setTypingState('notStarted'))
        dispatch(typingSliceActions.setTypedText([]))
        dispatch(typingSliceActions.generateNewText())
        setTypedText([''])
        setCurrLetter(0)
        setUserWord('')
    }

    return (
        <div>
            <button onClick={onClickHandler}>
                <ReplayIcon/>
            </button>
        </div>
    )
}
