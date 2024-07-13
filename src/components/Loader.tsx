import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	border-radius: 4px;
	background-color: var(--gray3);
`;

const Circle = styled.div`
	width: 16px;
	height: 16px;
	border: 2px solid var(--gray2);
	border-radius: 50%;
	position: relative;

	&::before {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		top: -2px;
		left: -2px;
		border-radius: 50%;
		border: 2px solid transparent;
		border-top-color: var(--primary);
		animation: 1s rotate linear infinite;
	}

	@keyframes rotate {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 360deg;
		}
	}
`;

const Loader: FC = ({}) => {
	return (
		<Container>
			<Circle />
		</Container>
	);
};

export default Loader;
