import {ButtonHTMLAttributes, FC} from "react";
import cls from './Button.module.scss'
import {ButtonColor} from "./model/types.ts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    square: boolean;
    color?: ButtonColor;
    isDisabled?: boolean;


}

export const Button:FC<ButtonProps> = (props) => {
    const {
        square,
        color = ButtonColor.primary,
        isDisabled = false,
        ...otherProps
    } = props
    const buttonClasses = [
        cls.button,
        square ? cls.square : cls.general,
        cls[color]
    ].join(' ')

    return (
        <button
            className={buttonClasses}
            disabled={isDisabled}
            {...otherProps}
        >
        </button>
    )

}