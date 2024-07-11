import classNames from "classnames";
import { FC, useState } from "react";

import EyeOffIcon from "@icons/eyeOff.svg?react";
import EyeIcon from "@icons/eye.svg?react";

export enum InputTypes {
	text = "text",
	password = "password",
}

interface InputProps {
	type?: InputTypes;
	value: string;
	placeholder?: string;
	disabled?: boolean;
	isError?: boolean;
	isShowPassword?: boolean;
	errorMessage?: string;
	onBlur?: () => void;
	onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({
	type = InputTypes.text,
	value,
	placeholder,
	disabled,
	isError,
	isShowPassword,
	errorMessage,
	onBlur,
	onChange,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const inputClassNames = classNames("input", { "input--error": isError }, { "input--disabled": disabled });

	const getInputType = (): string => {
		if (isShowPassword) {
			if (isPasswordVisible) return "text";

			return "password";
		}

		return type;
	};

	return (
		<div className={inputClassNames}>
			<input
				type={getInputType()}
				placeholder={placeholder}
				value={value}
				onBlur={onBlur}
				disabled={disabled}
				onChange={(event) => onChange(event.target.value)}
			/>
			{isShowPassword && (
				<button className="input__toggle-password" type="button" onClick={() => setIsPasswordVisible((state) => !state)}>
					{isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
				</button>
			)}
			{isError && <div className="input__error">{errorMessage}</div>}
		</div>
	);
};

export default Input;
