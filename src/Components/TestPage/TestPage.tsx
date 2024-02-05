import {ConfigTest} from "./TypingConfig/ConfigTest";
import Text from "./Text/Text";
import styles from "./TestPage.module.css"
import {useAppSelector} from "../../hooks/redux";
import {TimerAndLiveWpm} from "./TimerAndLiveWpm/TimerAndLiveWpm";

export const TestPage = () => {
    const typingState = useAppSelector(state => state.typingSliceReducer.typingState)
    return (
        <main className={styles.main}>
            <ConfigTest/>
            {typingState === 'started' && <TimerAndLiveWpm/>}
            <Text/>
        </main>
    )
}