import React from 'react';
import styles from './App.module.css';
import Text from "./Components/Text/Text";
import {Header} from "./Components/Header/Header";
import {theme} from "./Theme/Theme";
import {ThemeProvider} from "@mui/material";


const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.contentWrapper}>
                <Header/>
                <Text/>
            </div>
        </ThemeProvider>
    )
}
export default App;
