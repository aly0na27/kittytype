import React from 'react';
import styles from './App.module.css';
import {Header} from "./Components/Header/Header";
import {theme} from "./theme/theme";
import {ThemeProvider} from "@mui/material";
import {useAppSelector} from "./hooks/redux";
import {TestPage} from "./Components/TestPage/TestPage";
import {Footer} from "./Components/Footer/Footer";
import {ResultPage} from "./Components/ResultPage/ResultPage";


const App: React.FC = () => {
    const typingState = useAppSelector(state => state.typeTestSliceReducer.typingState)

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.contentWrapper}>
                <Header/>
                {
                    typingState === 'completed' ? <ResultPage/> : <TestPage/>
                }
                <Footer/>
            </div>
        </ThemeProvider>
    )
}
export default App;
