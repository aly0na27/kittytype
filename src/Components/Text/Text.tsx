import React from "react";

const Text: React.FC = () => {
    const text = ["server", "hello", "cat", "thing", "will", "never", "ever", "almost"]
    // const [position, setPosition] = useState()
    return (
        <div>
            {
                text.map(w => <Word word={w + " "}/>)
            }
        </div>
    )
}

const Word: React.FC<{word: string}> = ({word}) => {
    const wordArray: Array<string> = word.split("")
    return (
        <>
            {
                wordArray.map(l => <Letter letter={l}/>)
            }
        </>
    )
}

const Letter: React.FC<{letter: string}> = ({letter}) => {
    return (
        <>
            {letter}
        </>
    )
}

export default Text