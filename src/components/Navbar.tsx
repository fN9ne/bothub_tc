import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import { BodyMSemibold, BodyXSRegular } from "./UI/Typography";

import ArrowIcon from "@icons/arrowDown.svg?react";

interface INavbarItem {
	name: string;
	path: string;
}

interface INavbarDropdownItem {
	icon: React.ReactNode;
	name: string;
	description: string;
	path: "/";
}

export type ILinkList = Array<INavbarItem | { name: string; content: INavbarDropdownItem[] }>;

interface NavbarProps {
	linkList: ILinkList;
}

const Navbar: FC<NavbarProps> = ({ linkList }) => {
	return (
		<div className="navbar">
			<ul className="navbar__list">
				{linkList.map((item, index) => (
					<li className="navbar__item" key={index}>
						{"path" in item ? (
							<Link to={item.path} className="navbar__link">
								<BodyMSemibold>{item.name}</BodyMSemibold>
							</Link>
						) : (
							<DropdownItem {...item} />
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Navbar;

const DropdownItem: FC<{ name: string; content: INavbarDropdownItem[] }> = ({ name, content }) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	const transitions = {
		initial: { opacity: 0, scale: 0.95, y: -10 },
		animate: { opacity: 1, scale: 1, y: 0 },
		exit: { opacity: 0, scale: 0.95, y: -10 },
	};

	useEffect(() => {
		const closeDropdown = (event: MouseEvent) => {
			const element = event.target as Element;
			if (!element.closest(".navbar__link")) setIsActive(false);
		};

		document.addEventListener("click", closeDropdown);

		return () => document.removeEventListener("click", closeDropdown);
	}, []);

	return (
		<>
			<div className="navbar__link" onClick={() => setIsActive((state) => !state)}>
				<BodyMSemibold>{name}</BodyMSemibold>
				<ArrowIcon />
			</div>
			<AP mode="wait" initial={false}>
				{isActive && (
					<m.div className="navbar-dropdown" {...transitions}>
						{content.map((item, index) => (
							<Link to={item.path} className="navbar-dropdown__item" key={index}>
								<div className="navbar-dropdown__icon">{item.icon}</div>
								<div className="navbar-dropdown__content">
									<BodyMSemibold>{item.name}</BodyMSemibold>
									<BodyXSRegular>{item.description}</BodyXSRegular>
								</div>
							</Link>
						))}
					</m.div>
				)}
			</AP>
		</>
	);
};
