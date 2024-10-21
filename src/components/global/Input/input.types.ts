interface IInputProps {
    required: boolean;
    pattern?: string;
    type: string;
    maxLength?: number;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
    step?: number;
    max?: string | number;
    min?: string | number;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    label?: string;
    accept?: string;
    passedRef?: React.RefObject<HTMLInputElement>
}

export type { IInputProps };