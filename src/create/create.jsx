import React, { useState, useEffect } from "react";
import styles from './create.module.css';
import ImgLogo from "../img/logoWhite.png";
import linearAlgebra from "./linear-algebra.json"
import mathematicalAnalysis from "./mathematicalAnalysis.json"
import differentialCalculusOne from "./differentialCalculusOne.json"
import differentialCalculusSeveral from "./differentialCalculusSeveral.json"
import Button from "../ui-elements/button/button";
import clsx from "clsx";
import { sendTasks, getSendTasksRequestModel } from "./transport";
import { Link } from "react-router-dom";
import {Input, Typography} from "@material-tailwind/react";


function getRandomComplexity(min, max) {
    if (min === max) return min;
    return Math.floor(Math.random() * (max - min) + min);
}


const ButtonClick = (props) => {
    const [selectedButtonId, setSelectedButtonId] = useState(props.id);

    const handleClick = (buttonID, complexity) => {
        setSelectedButtonId(buttonID);
        props.onChangeComplexity(complexity)

    }



    const complexity = props.complexity;
    const easyNumber = getRandomComplexity(Number(complexity[0].easy[0]), Number(complexity[0].easy.at(-1)));
    const mediumNumber = getRandomComplexity(Number(complexity[0].medium[0]), Number(complexity[0].medium.at(-1)));
    const hardNumber = getRandomComplexity(Number(complexity[0].hard[0]), Number(complexity[0].hard.at(-1)));

    return (
        <div className={styles.buttons} >
            <Button
                title='Низкий'
                click={() => handleClick(props.id + 0, easyNumber)}
                active={selectedButtonId === (props.id + 0) ? 'active' : ''}
                color="empty"
            />
            <Button
                title='Средний'
                click={() => handleClick(props.id + 1, mediumNumber)}
                active={selectedButtonId === (props.id + 1) ? 'active' : ''}
                color="empty"
            />
            <Button
                title='Высокий'
                click={() => handleClick(props.id + 2, hardNumber)}
                active={selectedButtonId === (props.id + 2) ? 'active' : ''}
                color="empty"
            />
        </div>
    );
}



function LeftDiv() {

    const [buttonStyle, setButtonStyle] = useState('button1');
    const [TaskData, setTaskData] = useState(linearAlgebra);
    const handleButtonClick = (buttonId) => {
        if (buttonId === 'button1') {
            setTaskData(linearAlgebra)
        }
        else if (buttonId === 'button2') {
            setTaskData(mathematicalAnalysis)
        }
        else if (buttonId === 'button3') {
            setTaskData(differentialCalculusOne)
        }
        else if (buttonId === 'button4') {
            setTaskData(differentialCalculusSeveral)
        }
        setButtonStyle(buttonId)
    }
    const button1 = buttonStyle === "button1" ? styles.checked : "";
    const button2 = buttonStyle === "button2" ? styles.checked : "";
    const button3 = buttonStyle === "button3" ? styles.checked : "";
    const button4 = buttonStyle === "button4" ? styles.checked : "";


    const [check, setCheck] = useState(TaskData);
    const checkClick = (idx) => {
        const checkChange = { ...check };
        checkChange.themes[idx].isVisible = !checkChange.themes[idx].isVisible;
        setCheck(checkChange)
    }



    const handleChangeCount = (idx, count) => {
        const checkChange = { ...check };
        checkChange.themes[idx].count = count;
        setCheck(checkChange)
    }

    const handleClickComplexity = (idx, complexity) => {
        const checkChange = { ...check };
        checkChange.themes[idx].selectedComplexity = complexity;
        setCheck(checkChange)
    }

    useEffect(() => {
        setCheck(TaskData)
    }, [TaskData])

    const [generating, setGenerating] = useState(false);
    const [dataTasks, setDataTasks] = useState();

    const changeButton = async () => setDataTasks(await sendTasks(check))

    const handleButtonGeneratingClick = () => {
        setGenerating(true);
        changeButton();
    }

    const handleButtonDownloadClick = (data) => {
        const blob = new Blob([data], { type: 'application/json' });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Запрос.json")
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    return (<><div className={styles.leftDiv}>
        <Link to="/.."><img src={ImgLogo} alt='логотип' className={styles.logo} width="225" height="29"></img></Link>
        <button
            id="button1"
            className={clsx(styles.theme, button1)}
            onClick={() => handleButtonClick("button1")}
        >
            Элементы линейной алгебры и аналитическая геометрия
        </button>
        <button
            id="button2"
            disabled
            className={clsx(styles.theme, button2)}
            onClick={() => handleButtonClick("button2")}
        >
            Введение в математический анализ
        </button>
        <button
            id="button3"
            disabled
            className={clsx(styles.theme, button3)}
            onClick={() => handleButtonClick("button3")}
        >
            Дифференциальное исчисление функции одной переменной
        </button>
        <button
            id="button4"
            disabled
            className={clsx(styles.theme, button4)}
            onClick={() => handleButtonClick("button4")}
        >
            Дифференциальное исчисление функции нескольких переменных
        </button>
    </div>
        <div className={styles.centerDiv}>
            {check.themes.map((theme, idx) => (
                <div key={idx} className={styles.checkboxContainer}>
                    <input
                        id={idx}
                        type="checkbox"
                        defaultChecked={theme.isVisible}
                        onClick={() => checkClick(idx)}
                        name="parameters"
                        className={styles.customCheckbox}
                    />
                    <label className={styles.label} htmlFor={idx}>{theme.title}</label>
                </div>
            ))}
        </div>
        <div className={styles.rightDiv}>
            {check.themes.map((div, idx) => (
                !div.isVisible ? <div key={idx}></div> :
                    <div key={idx} className={styles.oneTheme} id={idx + 100}>{div.title}
                        <div className={styles.parameters}>Выберите начальный уровень сложности</div>
                        <ButtonClick
                            id={idx + 1000}
                            complexity={div.complexity}
                            onChangeComplexity={(complexity) => handleClickComplexity(idx, complexity)}
                        />
                        <div className={styles.parameters}>Введите количество задач</div>
                        {/*<input*/}
                        {/*    className={styles.numberInput}*/}
                        {/*    type="number"*/}
                        {/*    value={div.count}*/}
                        {/*    onChange={(e) => handleChangeCount(idx, e.target.value)}*/}
                        {/*/>*/}
                        <div className={'mt-4'}></div>
                        <Input
                            className={'w-5'}
                            type="number"
                            size={'lg'}
                            label={'Кол-во задач'}
                            // label={<Typography variant="h3" color="textSecondary">Foo</Typography>}
                            value={div.count}
                            onChange={(e) => handleChangeCount(idx, e.target.value)}
                        />
                    </div>
            ))}
            <div className={styles.buttonContainer}>
                <div className={generating ? styles.hidden : ''}>
                    <Button
                        color="orange"
                        size="big"
                        title="Начать генерацию"
                        shadow=''
                        click={() => handleButtonGeneratingClick()}
                    />
                </div>
                <Link to='viewing' className={generating ? '' : styles.hidden} state={dataTasks}>
                    <Button
                        color="orange"
                        size="big"
                        shadow=''
                        title="Перейти к просмотру"
                    />
                </Link>
                <Button
                    size='big'
                    title='Скачать файл'
                    shadow=''
                    disabled={!generating}
                    click={() => handleButtonDownloadClick(getSendTasksRequestModel(check))} />
            </div>
        </div>
    </>)
}






const Create = (props) => {

    return (<div className={styles.flex + ' min-h-screen'}>
        <LeftDiv />
    </div>

    );
}

export default Create;
