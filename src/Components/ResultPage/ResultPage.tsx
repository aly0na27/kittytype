import {useAppSelector} from "../../hooks/redux";
import styles from "../../styles/ResultsPage.module.css"

export const ResultPage = () => {

    const results = useAppSelector(state => state.typeTestSliceReducer.results)
    const typeMode = useAppSelector(state => state.typeTestSliceReducer.typeMode)
    const value = useAppSelector(state => state.typeTestSliceReducer.value)

    // const configuration = useAppSelector(state => {
    //     if (typeMode === 'words') {
    //         return state.configTestReducer.wordCount
    //     }
    //     return state.configTestReducer.time
    // })


    return (
        <main className={styles.main}>
            <div className={styles.resultBlock}>
                <div className={styles.resultBlockWpm}>
                    <span className={styles.wpmHeader}>wpm</span>
                    <span className={styles.value}>{results?.wpm}</span>
                </div>
                <div className={styles.resultBlockAcc}>
                    <span className={styles.accHeader}>acc</span>
                    <span className={styles.value}>{results?.accuracy}%</span>
                </div>
                <div className={styles.resultBlockTestType}>
                    <span className={styles.testTypeHeader}>test type</span>
                    <span className={styles.testTypeValue}>{typeMode + ' ' + value}</span>
                </div>
            </div>

            <img className={styles.img} src={'https://m.foolcdn.com/media/dubs/images/stock_market_crash_reaction.original.jpg'} alt={'bebe'}/>
            <div>

            </div>
        </main>
    )
}