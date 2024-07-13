import { FC } from "react";

import classNames from "classnames";

import CheckmarkIcon from "@icons/checkmark.svg?react";

interface CheckboxProps {
	value: string;
	textOrientation?: "left" | "right";
	state: string[];
	disabled?: boolean;
	children?: React.ReactNode;
	onClick: (value: string[]) => void;
}

const Checkbox: FC<CheckboxProps> = ({ value, state, disabled, children, onClick, textOrientation = "left" }) => {
	const isChecked = state.includes(value);

	const checkboxClassNames = classNames(
		"checkbox",
		{ "checkbox--checked": isChecked },
		{ "checkbox--disabled": disabled },
		{ "checkbox--text-right": textOrientation === "right" }
	);

	const handleChange = (): void => {
		if (isChecked) onClick(state.filter((item) => item !== value));
		else onClick([...state, value]);
	};

	return (
		<button className="checkbox-wrapper">
			<label className={checkboxClassNames}>
				{children && <div className="checkbox__text">{children}</div>}
				<input type="checkbox" onChange={handleChange} value={value} checked={isChecked} className="checkbox__input" />
				<div className="checkbox__custom">
					<CheckmarkIcon />
				</div>
			</label>
		</button>
	);
};

export default Checkbox;
