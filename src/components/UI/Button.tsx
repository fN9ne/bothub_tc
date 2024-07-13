import { FC } from "react";
import styled from "styled-components";

interface ButtonProps {
	$icon?: React.ReactNode;
	$large?: boolean;
	$circle?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	$iconOrientation?: "left" | "right";
	children?: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
	background-color: var(--primary);
	height: ${({ $icon, $large }) => ($icon ? ($large ? "48px" : "38px") : $large ? "52px" : "40px")};
	${({ $icon, $large }) => ($icon ? `width: ${$large ? "48px" : "38px"};` : "")}
	padding: 0 ${({ $icon, $large }) => ($icon ? "0" : $large ? "24px" : "18px")};
	border-radius: ${({ $circle }) => ($circle ? "26px" : "8px")};
	box-shadow: inset 0px 1px 1px 0px rgba(255, 255, 255, 0.4);
	font-weight: 500;
	font-size: 15px;
	line-height: calc(20 / 15);
	color: var(--white);
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 250ms;
	${({ $iconOrientation }) => ($iconOrientation === "right" ? "flex-direction: row-reverse" : "")}
	gap: 10px;

	svg {
		width: ${({ $large }) => ($large ? "20px" : "18px")};
		height: ${({ $large }) => ($large ? "20px" : "18px")};

		path {
			fill: var(--white);
		}
	}

	&:hover {
		background-color: var(--strong);
	}

	&:active {
		background-color: var(--strongDown);
		translate: 0 1px;
	}
`;

export const Button: FC<ButtonProps> = (props) => (
	<StyledButton {...props}>
		{props.$icon}
		{props.children}
	</StyledButton>
);
