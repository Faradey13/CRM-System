import {ButtonHTMLAttributes, FC} from "react";
import cls from './Button.module.scss'
import {ButtonColor} from "./model/types.ts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    square: boolean;
    color?: ButtonColor;
    isDisabled?: boolean;


}

export const Button:FC<ButtonProps> = ({
                                           square,
                                           color = ButtonColor.primary,
                                           isDisabled = false,
                                           ...otherProps
                                       }) => {
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