import React from "react";
import styles from './button.module.css';
import clsx from 'clsx';

const Button = (props) => {
    const sizeClass = props.size === 'big' ? styles.big : '';
    const colorClass = props.color === 'orange' ? styles.orange :
        'empty' ? styles.empty :
            'blue' ? styles.blue : '';
    const active = props.active === 'active' ? styles.active : '';
    const shadowClass = props.shadow === 'shadow' ? styles.shadow : '';

    const className = props.className

    return (
        <button
            className={clsx(
                styles.myButton,
                shadowClass,
                sizeClass,
                colorClass,
                active) + " " + className}
            onClick={props.click} disabled={props.disabled}>
            {props.title}
        </button>
    );
}

export default Button;
