import { FC } from "react";
import styled from "styled-components";
import Flex from "./Flex";
import { BodyMRegular, BodyXLSemibold } from "./UI/Typography";
import useDeviceType from "@/hooks/useDeviceType";

interface DescriptionCardProps {
	title: string;
	text: string;
}

const StyledDescriptionCard = styled.div`
	border-radius: 12px;
	position: relative;
	overflow: hidden;
	padding: 1px;

	.co-wrapper {
		padding: 27px 23px 25px;
		border-radius: 12px;
		position: relative;
		z-index: 1;
		background-color: var(--gray4);
		height: 100%;

		@media (max-width: 834px) {
			padding: 23px 17px;
		}

		@media (max-width: 375px) {
			padding: 29px 15px;
			text-align: center;
		}

		&::before {
			content: "";
			width: 250%;
			opacity: 0.3;
			aspect-ratio: 1 / 1;
			background: radial-gradient(circle, rgba(28, 100, 242, 1) 9%, rgba(0, 0, 0, 0) 50%);
			position: absolute;
			top: -130px;
			left: 70px;
			translate: -50% -50%;
			pointer-events: none;
		}

		& > div {
			position: relative;
			z-index: 1;
		}
	}

	&::after {
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 0;
		width: calc(100% + 2px);
		height: calc(100% + 2px);
		background: linear-gradient(150deg, rgba(28, 100, 242, 1) 0%, rgba(28, 100, 242, 0) 56%);
	}
`;

const DescriptionCard: FC<DescriptionCardProps> = (props) => {
	const { isMobile } = useDeviceType();

	return (
		<StyledDescriptionCard>
			<div className="co-wrapper">
				<Flex $column $gap={16} $alignItems={isMobile ? "center" : "stretch"}>
					<BodyXLSemibold>{props.title}</BodyXLSemibold>
					<BodyMRegular>{props.text}</BodyMRegular>
				</Flex>
			</div>
		</StyledDescriptionCard>
	);
};

export default DescriptionCard;
