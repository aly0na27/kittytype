import {ConfigTest} from "./TypingConfig/ConfigTest";
import Text from "./Text/Text";
import styles from "./TestPage.module.css"

export const TestPage = () => {
    return (
        <main className={styles.main}>
            <ConfigTest/>
            <Text/>
        </main>
    )
}