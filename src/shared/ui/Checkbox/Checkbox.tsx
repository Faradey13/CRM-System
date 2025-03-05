import {FC, InputHTMLAttributes, useId, useState} from "react";
import cls from './Checkbox.module.scss'
// export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>{}

export const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const {children, onChange} = props
    const uniqueId = useId()

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)

    }
    return (
        <div className={cls.checkbox}>
            <input
                type="checkbox"
                id={uniqueId}
                onChange={handleCheckboxChange}
                checked={isChecked}
                className={cls.checkboxInput}
            />
            <label
                htmlFor={uniqueId}
                className={`${cls.checkboxLabel} ${isChecked ? cls.checked : ''}`}
            >
                {children}
            </label>
        </div>
    );
};
