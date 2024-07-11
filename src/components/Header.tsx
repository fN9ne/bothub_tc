import { FC, useState } from "react";

import Logo from "@/img/logo.svg?react";

import { AnimatePresence as AP, motion as m } from "framer-motion";

import Navbar, { ILinkList } from "./Navbar";
import LangDropdown from "./LangDropdown";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useActions } from "@/hooks/useActions";
import { Button } from "./UI/Button";
import Divider from "./UI/Divider";
import { Link } from "react-router-dom";

import AgregatorIcon from "@icons/agregator.svg?react";
import TelegramIcon from "@icons/telegram.svg?react";
import BusinessIcon from "@icons/business.svg?react";
import MenuIcon from "@icons/menu.svg?react";
import CloseIcon from "@icons/close.svg?react";

import useDeviceType from "@/hooks/useDeviceType";

const Header: FC = () => {
	const { lang } = useAppSelector((state) => state.global);

	const { setLang } = useActions();

	const [isActive, setIsActive] = useState<boolean>(false);

	const linkList: ILinkList = [
		{
			name: "Продукты",
			content: [
				{
					icon: <AgregatorIcon />,
					name: "Агрегатор нейросетей BotHub",
					description: "ChatGPT на базе 3.5 и 4.0 версии OpenAI",
					path: "/",
				},
				{
					icon: <TelegramIcon />,
					name: "Telegram бот",
					description: "Удобный бот в Telegram который всегда под рукой",
					path: "/",
				},
				{ icon: <BusinessIcon />, name: "Бизнес бот", description: "ChatGPT для эффективного решения бизнес задач", path: "/" },
			],
		},
		{ name: "Пакеты", path: "/packages" },
		{ name: "API", path: "/api" },
		{ name: "Блог", path: "/blog" },
	];

	const { isMobile, isTablet } = useDeviceType();

	const transitions = {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -10 },
	};
	const transitions2 = {
		initial: { scale: 0 },
		animate: { scale: 1 },
		exit: { scale: 0 },
		transition: { duration: 0.15 },
	};

	return (
		<>
			<header className="header">
				<div className="header__wrapper">
					<div className="header__container container">
						<div className="header__main">
							<Link to="/">
								<Logo className="header__logo" />
							</Link>
							{!isTablet && (
								<>
									<Divider />
									<Navbar linkList={linkList} />
								</>
							)}
						</div>
						<div className="header__info">
							<LangDropdown value={lang} onChange={setLang} />
							{!isMobile && <Button>Авторизация</Button>}
							{isTablet && (
								<Button
									onClick={() => setIsActive((state) => !state)}
									$icon={
										<AP mode="wait" initial={false}>
											{isActive ? (
												<m.div key="close" {...transitions2}>
													<CloseIcon style={{ width: 12, height: 12 }} />
												</m.div>
											) : (
												<m.div key="menu" {...transitions2}>
													<MenuIcon />
												</m.div>
											)}
										</AP>
									}
								></Button>
							)}
						</div>
					</div>
				</div>
			</header>
			<AP mode="wait" initial={false}>
				{isActive && (
					<m.div {...transitions} className="header-menu">
						<div className="header-menu__wrapper">
							<div className="container">
								<Navbar linkList={linkList} />
							</div>
						</div>
					</m.div>
				)}
			</AP>
		</>
	);
};

export default Header;
