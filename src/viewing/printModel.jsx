import styles from "./printModel.module.css";



export function GenerateMatrix(props) {

    const data = props.data
    return (
        <div>
            <div className={styles.taskContainer}>
                <p className={styles.nameMatrix}>{props.nameMatrix}</p>
                <div className={styles.matrixSkob}>
                    (<table className={styles.matrix}>
                        <tbody >
                            {data.map((row, i) => (
                                <tr key={i}>
                                    {row.map((col, j) => (
                                        <td key={j}>
                                            {col}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>)
                </div>
            </div>
        </div>
    )
}

export function PrintTask(props) {
    return (
        <div>
            <p className={styles.questionNumber}>Вопрос {props.number}</p>
            <p className={styles.condition}>{props.condition}</p>
            <div className={styles.task}>{props.task}</div>
            <div className={`${styles.flex} ${styles.answer}`}>Ответ: {props.answer}</div>
        </div>
    )
}

export function PrintSumMatrix(props) {
    const data = props.data
    return (
        <div className={styles.containerSumMatrix}>
            <GenerateMatrix nameMatrix="A=" data={data.first} />
            <GenerateMatrix nameMatrix="B=" data={data.second} />
        </div>
    )
}

export function PrintMultiplicationMatrix(props) {
    const data = props.data
    return (
        <div className={styles.containerSumMatrix}>
            <GenerateMatrix nameMatrix="A=" data={data.matrix1} />
            <GenerateMatrix nameMatrix="B=" data={data.matrix2} />
        </div>
    )
}

export function PrintEquationMatrix(props) {
    const data = props.data
    const keys = Object.keys(data)
    return (
        <div className={styles.containerSumMatrix}>
            {keys.map((key, index) => <GenerateMatrix key={index} nameMatrix={`${key}=`} data={data[key]} />)}

        </div>
    )
}

export function PrintVector(props) {
    const numbers = props.data
    const vector = numbers.join(', ')
    return (<div className={styles.vector}>
        {props.nameVector}{`(${vector})`}
    </div>)
}

export function PrintVectors(props) {
    const data = props.data
    const keys = Object.keys(data)
    return (<div>
        {keys.map((key, index) =>
            <PrintVector
                key={index}
                nameVector={`${key}=`}
                data={data[key]}
            />)}
    </div>
    )
}

export function GenerateSystemLinearEquations(props) {
    const data = props.data
    const keys = Object.keys(data)
    return (
        <>
            {keys.map((key, index) => <div className={styles.linearEquations} key={index}>{data[key]}</div>)}
        </>
    )
}

