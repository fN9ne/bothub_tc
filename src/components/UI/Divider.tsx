import styled from "styled-components";

interface DividerProps {
	$orientation?: "horizontal" | "vertical";
}

const Divider = styled.div<DividerProps>`
	width: ${(props) => (props.$orientation === "vertical" ? "1px" : "")};
	height: ${(props) => (props.$orientation === "vertical" ? "" : "1px")};
	background-color: var(--gray3);
`;

Divider.defaultProps = {
	$orientation: "vertical",
};

export default Divider;
