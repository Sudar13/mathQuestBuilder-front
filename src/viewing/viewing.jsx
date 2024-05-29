import React from "react";
import styles from "./viewing.module.css";
import {
    PrintTask,
    GenerateMatrix,
    PrintSumMatrix,
    PrintMultiplicationMatrix,
    PrintEquationMatrix,
    GenerateSystemLinearEquations,
    PrintVectors,
    PrintVector
} from "./printModel";
import Button from "../ui-elements/button/button";
import { Link, useLocation } from "react-router-dom";
import { getTasksXML } from "../create/transport";


const checkContainsWord = (word, string) => {
    return string.includes(word)
}

const ChoosingPrintModel = (props) => {
    const quest = props.task
    const question = quest.task;
    if (checkContainsWord('размер', question)
        || checkContainsWord("Вычислите определитель", question)
        || checkContainsWord("ранг", question)
    )
        return (
            <PrintTask
                condition={question}
                task=
                {<GenerateMatrix
                    data={quest.data}
                    nameMatrix="A = "
                />}
                number={props.number}
                answer={quest.answer}
            />
        )
    else if (checkContainsWord('элемент', question)
        || checkContainsWord('определитель', question)
        || checkContainsWord('элемент', question))
        return (
            <PrintTask
                condition={question}
                task=
                {<GenerateMatrix
                    data={quest.data.matrix}
                    nameMatrix="A = "
                />}
                number={props.number}
                answer={quest.answer}
            />
        )
    else if (checkContainsWord('сумма', question))
        return (
            <PrintTask
                condition={question}
                task=
                {<PrintSumMatrix
                    data={quest.data}
                />}
                number={props.number}
                answer={<GenerateMatrix data={quest.answer} />}
            />
        )
    else if (checkContainsWord('умножения', question))
        if (checkContainsWord('числа', question))
            return (
                <PrintTask
                    condition={question}
                    task=
                    {<GenerateMatrix
                        data={quest.data.matrix}
                        nameMatrix="A = "
                    />}
                    number={props.number}
                    answer={<GenerateMatrix data={quest.answer} />}
                />
            )
        else return (
            <PrintTask
                condition={question}
                task=
                {<PrintMultiplicationMatrix
                    data={quest.data}
                />}
                number={props.number}
                answer={<GenerateMatrix data={quest.answer} />}
            />
        )
    else if (checkContainsWord('транспонированную', question) || checkContainsWord('обратную', question))
        return (
            <PrintTask
                condition={question}
                task=
                {<GenerateMatrix
                    data={quest.data}
                    nameMatrix="A = "
                />}
                number={props.number}
                answer={<GenerateMatrix data={quest.answer} />}
            />
        )
    else if (checkContainsWord('уравнение', question))
        return (
            <PrintTask
                condition={question}
                task=
                {<PrintEquationMatrix
                    data={quest.data}
                />}
                number={props.number}
                answer={<GenerateMatrix data={quest.answer} />}
            />
        )
    else if (checkContainsWord('линейных уравнений', question))
        return (
            <PrintTask condition={question}
                task=
                {<GenerateSystemLinearEquations
                    data={quest.data}
                />}
                number={props.number}
                answer={<GenerateMatrix data={quest.answer} />}
            />
        )
    else if (checkContainsWord('векторов', question)
        || checkContainsWord('вектора', question))
        if (checkContainsWord('скалярное', question)
            || checkContainsWord('длину', question))
            return (
                <PrintTask condition={question}
                    task=
                    {<PrintVectors data={quest.data} />}
                    number={props.number}
                    answer={quest.answer}
                />
            )
        else if (checkContainsWord('векторное', question))
            return (
                <PrintTask condition={question}
                    task=
                    {<PrintVectors data={quest.data} />}
                    number={props.number}
                    answer={<PrintVector data={quest.answer} />}
                />
            )
        else if (checkContainsWord('Да или Нет', question)
            || checkContainsWord('произведение', question))
            return (
                <PrintTask condition={question}
                    task=
                    {<PrintVectors data={quest.data} />}
                    number={props.number}
                    answer={quest.answer}
                />
            )

}

const Viewing = () => {
    const handleButtonDownloadClick = (data) => {
        const blob = new Blob([data], { type: 'application/xml' });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Задачи.XML")
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    let { state } = useLocation();
    console.log(state)
    return (<div>
        <div className={styles.header}></div>
        <div className={styles.main}>
            <div className={styles.download}></div>
            <div className={styles.tasks}>
                {/*{state.map((item, index) => (*/}

                {/*    <ChoosingPrintModel key={index} number={index + 1} task={item} />*/}
                {/*))}*/}
            </div>
            <div className={styles.containerButton}>
                <Link to="/">
                    <Button
                        title="Закончить просмотр"
                        size="big"
                        color="orange"
                    />
                </Link>
                {/* <Link to="https://math-generator-7450.onrender.com/convert"> */}
                    <button
                        className={styles.myButton}
                        onClick={async () => handleButtonDownloadClick(await getTasksXML())}
                    >
                        Экспорт в Moodle XML
                    </button>
                {/* </Link> */}
            </div>
        </div>
    </div>

    );
}

export default Viewing;
