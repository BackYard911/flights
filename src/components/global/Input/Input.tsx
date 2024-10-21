import { IInputProps } from "./input.types";
import styles from "./input.module.css";

export function Input(props: IInputProps) {
    return (
        <label>
            {props.label}
            <input
            type={props.type}
            required={props.required}
            pattern={props.pattern}
            maxLength={props.maxLength}
            value={props.value}
            onChange={props.onChange}
            title={props.title}
            step={props.step}
            max={props.max}
            min={props.min}
            placeholder={props.placeholder}
            disabled={props.disabled}
            className={styles.input}
            accept={props.accept}
            ref={props.passedRef}
            />
        </label>
    )
}