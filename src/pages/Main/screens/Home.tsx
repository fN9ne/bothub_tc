import Flex from "@/components/Flex";
import { Button } from "@/components/UI/Button";
import { BodyMMedium, H1 } from "@/components/UI/Typography";
import { FC } from "react";
import Chat from "../Chat";
import useDeviceType from "@/hooks/useDeviceType";

import BGGrid from "@/img/bgGrid.svg?react";
import BGLights from "@/img/bgLights.svg?react";

const Home: FC = () => {
	const { isTablet } = useDeviceType();

	return (
		<div className="getting-started">
			<div className="container">
				<Flex $gap={30} $alignItems={isTablet ? "stretch" : "center"} $flexWrap $column={isTablet}>
					<Flex $column $gap={42} $alignItems={isTablet ? "center" : "start"} $maxWidth={isTablet ? 834 : 519}>
						<Flex $column $gap={20} $textCenter={isTablet}>
							<H1>ChatGPT: ваш умный помощник</H1>
							<BodyMMedium>
								Экспериментируйте с ChatGPT-4, Midjourney и Claude в одном месте. Без VPN и абонентской платы. Создавайте контент,
								обрабатывайте данные и получайте ответы на вопросы через удобный интерфейс!
							</BodyMMedium>
						</Flex>
						<Button $large>Начать работу</Button>
					</Flex>
					<Chat />
				</Flex>
			</div>
			<div className="getting-started__bg">
				<BGGrid />
			</div>
			<BGLights className="getting-started__lights"></BGLights>
		</div>
	);
};

export default Home;
