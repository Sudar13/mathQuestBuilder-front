import React, {useState, useEffect} from "react";
import styles from './test.module.css';
import ImgLogo from "../img/logoWhite.png";

import Button from "../ui-elements/button/button";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Typography,
    Button as ButtonTailwind,
    Progress
} from "@material-tailwind/react";


function LeftDiv() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    function next(){
        setCompletedPercentage(50)

        tasks[0].is_active = false;
        tasks[1].is_active = true;

        setTasks(tasks)
    }

    const [completedPercentage, setCompletedPercentage] = React.useState(0);

    const [tasks, setTasks] = React.useState([
        {
            'number': 1,
            'question': 'Каков размер матрицы А?',
            'img': '1.png',
            'is_active': true
        },
        {
            'number': 2,
            'question': 'Каков размер матрицы А?',
            'img': '2.svg',
            'is_active': false
        }
    ])

    return (<div>
            <div className={styles.header}></div>
            <div className={styles.main}>
                {/*<div className={styles.download}></div>*/}


                <div className="w-full">
                    <div className="mb-2 flex items-center  gap-4">
                        <Typography color="blue-gray" variant="h6">
                            {completedPercentage}%
                        </Typography>
                        <Typography color="blue-gray" variant="h6">
                            Выполнено
                        </Typography>
                    </div>
                    <Progress className={'mb-10'}
                              value={completedPercentage}
                              size="lg"
                              color='indigo'
                              barProps={{
                                  className: 'transition-all duration-300'
                              }}
                    />
                </div>

                {/*<div className={styles.tasks}>*/}
                {/*</div>*/}
                <div
                    id={'tasks'}
                >
                    {tasks.map((task, idx) => (
                        !task.is_active ? <div key={idx}></div> :
                            <div>
                                <Typography
                                    className={'mb-6'}
                                    color="blue-gray"
                                    variant="h5"
                                >
                                    Вопрос {task.number}
                                </Typography>

                                <Typography
                                    className={'mb-4'}
                                    color="blue-gray"
                                    variant="lead"
                                >
                                    {task.question}
                                </Typography>

                                <img
                                    className="h-48 w-full rounded-lg object-contain object-center mb-10"
                                    src={require('/src/test/' + task.img)}
                                    alt={'test'}
                                />

                                <div className={'w-min mb-16'}>
                                    <Input
                                        type="number"
                                        // className={'mb-8'}
                                        size={'lg'}
                                        label={'Ответ'}
                                        // label={<Typography variant="h3" color="textSecondary">Foo</Typography>}
                                    />
                                </div>
                            </div>
                    ))}
                </div>
                <div className={styles.containerButton}>
                    <ButtonTailwind
                        className={'rounded-sm bg-[#14245E]'}
                        onClick={handleOpen}
                    >
                        Прервать тест
                    </ButtonTailwind>

                    <ButtonTailwind
                        className={'rounded-sm'}
                        onClick={next}
                        color="orange"
                    >
                    Далее
                    </ButtonTailwind>

                    <Dialog open={open}
                            handler={handleOpen}
                            className={'p-10 rounded-sm'}
                    >
                        <DialogHeader className={'justify-center'}>
                            Вы уверены, что хотите завершить сеанс досрочно?
                        </DialogHeader>
                        <DialogBody className={'justify-center text-center'}>
                            <Typography color="blue-gray" variant="lead">
                                Ответы не будут сохранены.
                            </Typography>
                        </DialogBody>
                        <DialogFooter className={'justify-center gap-8'}>
                            <Link to='/created' className={''}>
                                <ButtonTailwind
                                    className={'rounded-sm'}
                                    color="orange"
                                >
                                    Завершить
                                </ButtonTailwind>
                            </Link>

                            <ButtonTailwind
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="rounded-sm"
                            >
                                Продолжить
                            </ButtonTailwind>
                        </DialogFooter>
                    </Dialog>
                </div>
            </div>
        </div>

    );
}


const Test = (props) => {

    return (<div className={styles.flex + ' min-h-screen'}>
            <LeftDiv/>
        </div>

    );
}

export default Test;
