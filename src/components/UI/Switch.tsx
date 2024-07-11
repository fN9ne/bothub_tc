import classNames from "classnames";
import { FC } from "react";

interface SwitchStatedText {
	offText: string;
	onText: string;
}

interface SwitchProps {
	isChecked: boolean;
	disabled?: boolean;
	text?: string | SwitchStatedText;
	onClick: (value: boolean) => void;
}

const Switch: FC<SwitchProps> = ({ isChecked, disabled, text, onClick }) => {
	const switchClassNames = classNames("switch", { "switch--checked": isChecked }, { "switch--disabled": disabled });

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => onClick(event.target.checked);

	const renderText = (): string => {
		if (typeof text === "string") {
			return text;
		} else if (typeof text === "object") {
			return isChecked ? text.onText : text.offText;
		}
		return "";
	};

	return (
		<label className={switchClassNames}>
			<input type="checkbox" onChange={handleChange} checked={isChecked} className="switch__input" />
			<div className="switch__origin">
				<div className="switch__bundle"></div>
			</div>
			{renderText() !== "" && <div className="switch__text">{renderText()}</div>}
		</label>
	);
};

export default Switch;
