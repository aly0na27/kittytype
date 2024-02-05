import {useAppSelector} from "../../hooks/redux";
import styles from "../../styles/ResultsPage.module.css"

export const ResultPage = () => {

    const results = useAppSelector(state => state.typingSliceReducer.results)

    return (
        <main className={styles.main}>
            {
                results ? results.wpm : 0
            } WPM
        </main>
    )
}