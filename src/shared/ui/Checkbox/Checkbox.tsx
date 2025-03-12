import {FC, InputHTMLAttributes, useId, useState} from "react";
import cls from './Checkbox.module.scss'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    isComplete: boolean,
    onChecked: () => void,
    isEditing: boolean,
}

export const Checkbox: FC<CheckboxProps> = ({
                                                children,
                                                onChecked,
                                                isComplete,
                                                isEditing
                                            }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const uniqueId = useId()
    const handleCheckboxChange = () => {
        onChecked()
        setIsChecked(!isChecked)
    }
    return (
        <div className={cls.checkbox}>
            {
                !isEditing && <input
                    type="checkbox"
                    id={uniqueId}
                    onChange={handleCheckboxChange}
                    checked={isComplete ? true : isChecked}
                    disabled={ isEditing}
                    className={cls.checkboxInput}
                />
            }

            <label
                htmlFor={uniqueId}
                className={`${cls.checkboxLabel} ${isChecked && cls.checked || isComplete && cls.checked}`}
            >
                {children}
            </label>
        </div>
    );
};
