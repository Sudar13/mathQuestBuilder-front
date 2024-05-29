import React, {useState, useEffect} from "react";
import styles from './created.module.css';
import ImgLogo from "../img/logoWhite.png";
import linearAlgebra from "./linear-algebra.json"
import mathematicalAnalysis from "./mathematicalAnalysis.json"
import differentialCalculusOne from "./differentialCalculusOne.json"
import differentialCalculusSeveral from "./differentialCalculusSeveral.json"
import Button from "../ui-elements/button/button";
import clsx from "clsx";
import {sendTasks, getSendTasksRequestModel} from "./transport";
import {Link} from "react-router-dom";
import {Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography, Button as ButtonTailwind} from "@material-tailwind/react";


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
        <div className={styles.buttons}>
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
        } else if (buttonId === 'button2') {
            setTaskData(mathematicalAnalysis)
        } else if (buttonId === 'button3') {
            setTaskData(differentialCalculusOne)
        } else if (buttonId === 'button4') {
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
        const checkChange = {...check};
        checkChange.themes[idx].isVisible = !checkChange.themes[idx].isVisible;
        setCheck(checkChange)
    }


    const handleChangeCount = (idx, count) => {
        const checkChange = {...check};
        checkChange.themes[idx].count = count;
        setCheck(checkChange)
    }

    const handleClickComplexity = (idx, complexity) => {
        const checkChange = {...check};
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


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);


    return (<>
        <div className={styles.leftDiv}>
            <Link to="/.."><img src={ImgLogo} alt='логотип' className={styles.logo} width="225"
                                height="29"></img></Link>
            <button
                id="button1"
                className={clsx(styles.theme, button1)}
                onClick={() => handleButtonClick("button1")}
            >
                Линейная алгебра
            </button>
            <button
                id="button2"
                disabled
                className={clsx(styles.theme, button2)}
                onClick={() => handleButtonClick("button2")}
            >
                Математический анализ
            </button>
            <button
                id="button3"
                disabled
                className={clsx(styles.theme, button3)}
                onClick={() => handleButtonClick("button3")}
            >
                Диф. исчисление одной переменной
            </button>
            <button
                id="button4"
                disabled
                className={clsx(styles.theme, button4)}
                onClick={() => handleButtonClick("button4")}
            >
                Диф. исчисление нескольких переменных
            </button>
        </div>

        <div className={styles.middleDiv}>
            <button
                id="button1"
                className={clsx(styles.theme, button1)}
                // onClick={() => handleButtonClick("button1")}
            >
                Матрицы и операции над ними
            </button>
            <button
                // id="button2"
                disabled
                className={clsx(styles.theme, button2)}
                // onClick={() => handleButtonClick("button2")}
            >
                Определители
            </button>
            <button
                // id="button3"
                disabled
                className={clsx(styles.theme, button3)}
                // onClick={() => handleButtonClick("button3")}
            >
                Обратная матрица
            </button>
            <button
                // id="button4"
                disabled
                className={clsx(styles.theme, button4)}
                // onClick={() => handleButtonClick("button4")}
            >
                Матричные уравнения
            </button>
            <button
                // id="button4"
                disabled
                className={clsx(styles.theme, button4)}
                // onClick={() => handleButtonClick("button4")}
            >
                Ранг матрицы
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

            {check.themes.some((div) => div.isVisible) && check.themes.map((div, idx) => (
                idx !== 1 ? <div key={idx}></div> :
                    <div key={idx} className={styles.oneTheme} id={idx + 100}>

                        {/*{div.title}*/}

                        <div className={'flex flex-row items-start justify-between'}>
                            <div className={styles.parameters}>Выберите начальный уровень сложности</div>

                            <ButtonClick
                                id={idx + 1000}
                                complexity={div.complexity}
                                onChangeComplexity={(complexity) => handleClickComplexity(idx, complexity)}
                            />
                        </div>

                        <div className={'py-0.5 my-8 w-full bg-[#14245E]'}></div>
                        {/* separator */}

                        <div className={'flex flex-row items-center justify-between'}>
                            <div className={styles.parameters}>Введите количество задач</div>

                            <div className={'w-min'}>
                                <Input
                                    type="number"
                                    size={'lg'}
                                    label={'Кол-во задач'}
                                    // label={<Typography variant="h3" color="textSecondary">Foo</Typography>}
                                    value={div.count}
                                    onChange={(e) => handleChangeCount(idx, e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={'py-0.5 my-8 w-full bg-[#14245E]'}></div>
                        {/* separator */}

                        <div className={'flex flex-row items-center justify-between'}>
                            <div className={styles.parameters}>Ограничение по времени</div>

                            <div className={'w-min'}>
                                <Input
                                    type="number"
                                    size={'lg'}
                                    label={'Кол-во минут'}
                                    placeholder={'40'}
                                    // value={div.count}
                                    // onChange={(e) => handleChangeCount(idx, e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
            ))}
            {check.themes.some((div) => div.isVisible) && (
            <div className={styles.buttonContainer}>
                <ButtonTailwind
                    className={'rounded-sm'}
                    onClick={handleOpen}
                    color="orange"
                >Начать</ButtonTailwind>
            </div>)}

            <Dialog open={open}
                    handler={handleOpen}
                    className={'p-10 rounded-sm'}
            >
                <DialogHeader className={'justify-center'}>Тест с ограничением по времени</DialogHeader>
                <DialogBody>
                    Время на тест ограничено и равно 30 мин. При правильном решении двух задач подряд уровень сложности будет повышен. Аналогично, при неправильном решении двух задач подряд уровень будет понижен. На решение задачи даётся одна попытка. Во время теста к предыдущей задаче вернуться нельзя. Вы должны завершить попытку теста до окончания времени.
                    Вы уверены, что хотите начать прямо сейчас?
                </DialogBody>
                <DialogFooter className={'justify-center gap-8'}>
                    <ButtonTailwind
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="rounded-sm"
                    >
                        <span>Отмена</span>
                    </ButtonTailwind>

                    <Link to='/test' className={''} state={dataTasks}>
                        <ButtonTailwind
                            className={'rounded-sm'}
                            onClick={handleOpen}
                            color="orange"
                        >
                            Начать
                        </ButtonTailwind>
                    </Link>
                </DialogFooter>
            </Dialog>

        </div>
    </>)
}


const Created = (props) => {

    return (<div className={styles.flex + ' min-h-screen'}>
            <LeftDiv/>
        </div>

    );
}

export default Created;
