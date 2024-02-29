import React from 'react';
import styles from './App.module.css';
import {Header} from "./Components/Header/Header";
import {theme} from "./theme/theme";
import {ThemeProvider} from "@mui/material";
import {useAppSelector} from "./hooks/redux";
import {TestPage} from "./Components/TestPage/TestPage";
import {Footer} from "./Components/Footer/Footer";
import {ResultPage} from "./Components/ResultPage/ResultPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";


const App: React.FC = () => {
    const typingState = useAppSelector(state => state.typeTestSliceReducer.typingState)

    const onKeyDownHandler = () => {
        debugger
    }

    return (
        <ThemeProvider theme={theme}>
            <div onKeyDown={onKeyDownHandler} className={styles.contentWrapper}>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        {
                            typingState === 'completed' ?<Route path={'/'} element={<ResultPage/>}/> : <Route path={'/'} element={<TestPage/>}/>
                        }
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    )
}
export default App;
