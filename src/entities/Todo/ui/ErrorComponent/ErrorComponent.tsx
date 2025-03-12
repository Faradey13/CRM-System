import cls from './Error.module.scss';
import {FC} from "react";

interface ErrorComponentProps {
    textError: string | null;
}

export const ErrorComponent: FC<ErrorComponentProps> = ({textError}) => {

    return textError &&
        <span className={cls.error} role="alert">{textError}</span>

};

