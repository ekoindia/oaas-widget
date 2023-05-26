type InputProps = {
    type: string;
    id: string;
    className: string;
    placeholder: string;
    value?: any;
    name?: string;
    onChange?: any;
    maxLength?: any;
    minLength?: any;
};
declare const InputGlobal: ({ type, id, className, placeholder, onChange, value, name, maxLength, minLength, ...props }: InputProps) => JSX.Element;
export default InputGlobal;
