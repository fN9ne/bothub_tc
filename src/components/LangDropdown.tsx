import { FC, useState } from "react";

import { AnimatePresence as AP, motion as m } from "framer-motion";
import { Lang } from "@/redux/slices/global";

import LangIcon from "@icons/lang.svg?react";
import ArrowIcon from "@icons/arrowDown.svg?react";

interface LangDropdownProps {
	value: Lang;
	onChange: (value: Lang) => void;
}

const LangDropdown: FC<LangDropdownProps> = ({ value, onChange }) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	const handleChangeLang = (lang: Lang) => {
		onChange(lang);
		setIsActive(false);
	};

	const transitions = {
		initial: { opacity: 0, scale: 0.95, y: -10 },
		animate: { opacity: 1, scale: 1, y: 0 },
		exit: { opacity: 0, scale: 0.95, y: -10 },
	};

	return (
		<button className={`lang-dropdown${isActive ? " lang-dropdown--active" : ""}`}>
			<div className="lang-dropdown__main" onClick={() => setIsActive((state) => !state)}>
				<LangIcon />
				<div className="lang-dropdown__value">{value}</div>
				<ArrowIcon />
			</div>
			<AP mode="wait" initial={false}>
				{isActive && (
					<m.div className="lang-dropdown__body" {...transitions}>
						<div className="lang-dropdown__list">
							{Object.values(Lang).map((lang, index) => (
								<li onClick={() => handleChangeLang(lang)} className="lang-dropdown__item" key={index}>
									{lang}
								</li>
							))}
						</div>
					</m.div>
				)}
			</AP>
		</button>
	);
};

export default LangDropdown;
