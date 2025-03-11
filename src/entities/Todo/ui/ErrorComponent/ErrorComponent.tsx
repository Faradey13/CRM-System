import cls from './Error.module.scss';
import {FC} from "react";

interface ErrorComponentProps {
    textError: string | null;
}

export const ErrorComponent:FC<ErrorComponentProps> = (props) => {
    const {textError} = props
    return textError ? (
        <span className={cls.error} role="alert">{textError}</span>
    ) : null;
};

