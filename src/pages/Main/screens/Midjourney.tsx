import Flex from "@/components/Flex";
import { Button } from "@/components/UI/Button";
import { BodyMRegular, H2 } from "@/components/UI/Typography";
import useDeviceType from "@/hooks/useDeviceType";
import { FC } from "react";

const Midjourney: FC = () => {
	const { isTablet } = useDeviceType();

	return (
		<div className="midjourney">
			<div className="container">
				<Flex
					$column={isTablet ? true : false}
					$textCenter={isTablet ? true : false}
					$gap={isTablet ? 30 : 40}
					$alignItems="center"
					$justifyContent="space-between"
				>
					<img src="/midjourney.png" style={{ maxWidth: isTablet ? "330px" : "100%" }} alt="midjourney pictures" />
					<Flex $column $gap={isTablet ? 18 : 20} $alignItems={isTablet ? "center" : "start"} $maxWidth={isTablet ? 834 : 520}>
						<H2>Генерация Изображений Через Midjourney</H2>
						<BodyMRegular>
							MidJourney - инструмент для создания уникальных изображений. Наши алгоритмы помогут вам воплотить в жизнь вашу идею.
							Начните генерировать изображения с MidJourney прямо сейчас! Кликните на кнопку ниже, чтобы начать творить.
						</BodyMRegular>
						<Button>Попробовать Midjourney</Button>
					</Flex>
				</Flex>
			</div>
		</div>
	);
};

export default Midjourney;
