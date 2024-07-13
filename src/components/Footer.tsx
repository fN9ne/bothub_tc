import { FC } from "react";
import Flex from "./Flex";

import Logo from "@/img/logo.svg?react";
import { BodyMRegular, BodyMSemibold, BodySMedium } from "./UI/Typography";
import useDeviceType from "@/hooks/useDeviceType";

import TelegramIcon from "@icons/telegramAlt.svg?react";
import BotIcon from "@icons/bot.svg?react";
import EmailIcon from "@icons/email.svg?react";
import BlogIcon from "@icons/blog.svg?react";
import HabrIcon from "@icons/habr.svg?react";
import { Link } from "react-router-dom";

interface ILinkList {
	name: string;
	path: string;
	icon?: React.ReactNode;
}

interface IFooterLinkCol {
	name: string;
	content: ILinkList[];
}

const Footer: FC = () => {
	const { isMobile, isTablet } = useDeviceType();

	const links: IFooterLinkCol[] = [
		{
			name: "Информация",
			content: [
				{ name: "Главная страница", path: "/" },
				{ name: "Тарифы", path: "/" },
				{ name: "Контакты", path: "/" },
				{ name: "Наши возможности", path: "/" },
				{ name: "Модели нейросетей", path: "/" },
				{ name: "О нас", path: "/" },
				{ name: "Для инвесторов", path: "/" },
			],
		},
		{
			name: "Наши продукты",
			content: [
				{ name: "ChatGPT для бизнеса", path: "/" },
				{ name: "Агрегатор нейросетей", path: "/" },
				{ name: "ChatGPT в Telegram", path: "/" },
			],
		},
		{
			name: "Ссылки",
			content: [
				{ name: "Сообщество в телеграм", path: "/", icon: <TelegramIcon /> },
				{ name: "Телеграм бот", path: "/", icon: <BotIcon /> },
				{ name: "email@bothub.chat", path: "/", icon: <EmailIcon /> },
			],
		},
		{
			name: "Блог",
			content: [
				{ name: "Наш блог", path: "/", icon: <BlogIcon /> },
				{ name: "Habr", path: "/", icon: <HabrIcon /> },
				{ name: "Телеграм", path: "/", icon: <TelegramIcon /> },
			],
		},
	];

	return (
		<footer className="footer">
			<div className="container">
				<Flex $gap={isMobile ? 38 : 46} $justifyContent="space-between" $column={isTablet ? true : false}>
					<Flex $column $gap={20}>
						<Logo />
						<Flex $column $gap={12} $alignItems="start">
							<BodySMedium>ООО «Ботхаб» ОГРН 1236300016259</BodySMedium>
							<BodySMedium>@BotHub 2023</BodySMedium>
							<a href="#" className="footer__link">
								<BodySMedium>Пользовательское соглашение</BodySMedium>
							</a>
							<img src="/alri.png" alt="alrii logo" />
						</Flex>
					</Flex>
					<Flex $gap={isTablet ? 24 : 73} $flexWrap={isTablet ? true : false}>
						{links.map((col, index) => (
							<Flex $column $gap={20} key={index} $alignItems="start">
								<BodyMSemibold>
									<div style={{ color: "var(--gray1)" }}>{col.name}</div>
								</BodyMSemibold>
								{col.content.map((link, subIndex) => (
									<Link className="footer__link" to={link.path} key={subIndex}>
										{link.icon}
										<BodyMRegular>{link.name}</BodyMRegular>
									</Link>
								))}
							</Flex>
						))}
					</Flex>
				</Flex>
			</div>
		</footer>
	);
};

export default Footer;
