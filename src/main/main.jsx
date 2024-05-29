import React, {useRef} from "react";
import styles from './main.module.css';
import Button from "../ui-elements/button/button";
import {Link, useNavigate} from "react-router-dom";
import {Drawer, IconButton, Input, Typography, Button as ButtonTailwind, Checkbox} from "@material-tailwind/react";

async function sendImportTasks(data) {
    const response = await fetch('https://math-generator-7450.onrender.com/task', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json()
}

function LeftDiv() {
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const contents = event.target.result;
                resolve(contents)
            };
            reader.onerror = (error) => {
                reject(error)
            };
            reader.readAsText(file);
        })

    };

    const handleFileSelectChange = async (event) => {
        const fileContent = await readFile(event.target.files[0])
        navigate('/viewing', {state: await sendImportTasks(fileContent)});
    }

    const handleChooseFileClick = () => {
        fileInputRef.current.click();
    };


    return (
        <div className={styles.leftDiv}>
            <div className={styles.outside}>
                <div className={styles.header}>
                    Используй
                </div>
                <div className={styles.text}>
                    Вы&nbsp;можете использовать уже готовые задачи.
                    А&nbsp;затем самостоятельно или автоматически создавать тесты
                </div>

                <input
                    type="file"
                    style={{display: 'none'}}
                    ref={fileInputRef}
                    accept=".json"
                    onChange={handleFileSelectChange}
                />
                <Button
                    shadow="shadow"
                    size='big'
                    title='Загрузить'
                    click={handleChooseFileClick}/>
            </div>
        </div>
    )
}


function RightDiv() {
    const [openLogin, setOpenLogin] = React.useState(false);
    const openDrawerLogin = () => setOpenLogin(true);
    const closeDrawerLogin = () => setOpenLogin(false);

    const [openRegister, setOpenRegister] = React.useState(false);
    const openDrawerRegister = () => setOpenRegister(true);
    const closeDrawerRegister = () => setOpenRegister(false);

    return (
        <div className={styles.rightDiv}>
            <div className='flex justify-end gap-8 items-center px-12 pt-14 pb-4'>
                <div onClick={openDrawerLogin} className='font-bold text-lg cursor-pointer'>
                    Вход
                </div>
                <ButtonTailwind
                    onClick={openDrawerRegister}
                    className='font-bold bg-white text-blue-gray-800 rounded-sm text-md cursor-pointer'>
                    Регистрация
                </ButtonTailwind>
            </div>
            <div className={styles.outside_right}>
                <div className={styles.header}>
                    Создавай
                </div>
                <div className={styles.text}>
                    Или&nbsp;же введите нужные параметры и&nbsp;наш сервис
                    автоматически создаст подходящие вам тесты из&nbsp;уникальных задач
                </div>
                <Link to='/create'>
                    <button
                        className={styles.shadow_white}>Начать
                    </button>
                </Link>
            </div>

            <React.Fragment>
                <Drawer open={openLogin}
                        onClose={closeDrawerLogin}
                        className="p-4"
                        placement="right"
                >
                    <div className="mb-6 flex items-center justify-between">
                        <Typography variant="h3" color="blue-gray">
                            Вход
                        </Typography>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawerLogin}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <Typography color="gray" className="mb-8 pr-4 font-normal">
                        Используйте свои данные для входа
                    </Typography>
                    <div className="flex gap-2 flex-col">
                        <Input
                            label={'Почта'}
                        />
                        <Input
                            label={'Пароль'}
                            type={'password'}
                        />
                        <ButtonTailwind
                            className='mt-2 rounded-full bg-[#14245E]'
                        >
                            Вход
                        </ButtonTailwind>
                    </div>
                </Drawer>
            </React.Fragment>

            <React.Fragment>
                <Drawer open={openRegister}
                        onClose={closeDrawerRegister}
                        className="p-4"
                        placement="right"
                >
                    <div className="mb-6 flex items-center justify-between">
                        <Typography variant="h3" color="blue-gray">
                            Регистрация
                        </Typography>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawerRegister}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <Typography color="gray" className="mb-8 pr-4 font-normal">
                        Используйте свои данные для регистрации
                    </Typography>
                    <div className="flex gap-2 flex-col">
                        <div className="flex gap-4 flex-col">
                            <Input
                                label={'Фамилия'}
                            />
                            <Input
                                label={'Имя'}
                            />
                            <Input
                                label={'Почта'}
                            />
                            <Input
                                label={'Пароль'}
                                type={'password'}
                            />
                        </div>
                        <div className={'ml-[-0.7rem]'}>
                            <Checkbox
                                // color='indigo'
                                label={<Typography type='lead' color="blue-gray" className="flex text-[13px]">
                                    Я даю согласие на обработку своих персональных данных
                                </Typography>}
                            />
                        </div>

                        <ButtonTailwind
                            className='mt-2 rounded-full bg-[#14245E]'
                        >
                            Регистрация
                        </ButtonTailwind>

                        <Typography color="blue-gray" className="flex items-center text-sm justify-center">
                            Уже зарегистрированы?
                            <Typography
                                as="a"
                                href="#"
                                color="blue"
                                className="transition-colors hover:text-blue-700"
                                onClick={() => {
                                    closeDrawerRegister()
                                    openDrawerLogin()
                                }}
                            >
                                &nbsp; Вход
                            </Typography>
                        </Typography>
                    </div>
                </Drawer>
            </React.Fragment>
        </div>
    )
}

const Main = (props) => {

    return (
        <div className={styles.flex}>
            <LeftDiv/>
            <RightDiv/>
        </div>
    );
}

export default Main;
