import styled from "styled-components";

interface FlexProps {
	$column?: boolean;
	$alignItems?: "center" | "start" | "end" | "stretch";
	$justifyContent?: "center" | "start" | "end" | "space-between";
	$gap?: number | [number, number];
	$flexWrap?: boolean;
	$fit?: [boolean, boolean];
	$itemsPerRow?: number;
	$maxWidth?: number;
	$textCenter?: boolean;
}

const calculateItemWidth = ($itemsPerRow: number, $gap?: number | [number, number]): string => {
	const gapValue = Array.isArray($gap) ? $gap[0] : $gap || 0;
	const gapCalc = gapValue ? ` - (${gapValue}px - ${gapValue}px / ${$itemsPerRow})` : "";
	return `calc(100% / ${$itemsPerRow}${gapCalc})`;
};

const Flex = styled.div<FlexProps>`
	display: flex;
	${({ $column }) => ($column ? "flex-direction: column;" : "")}
	${({ $alignItems }) => ($alignItems ? `align-items: ${$alignItems};` : "")}
	${({ $justifyContent }) => ($justifyContent ? `justify-content: ${$justifyContent};` : "")}
	${({ $gap }) => ($gap ? (Array.isArray($gap) ? `column-gap: ${$gap[0]}px; row-gap: ${$gap[1]}px;` : `gap: ${$gap}px;`) : "")}
	${({ $flexWrap }) => ($flexWrap ? "flex-wrap: wrap;" : "")}
	${({ $fit }) => ($fit ? `${$fit[0] ? "width: 100%;" : ""}${$fit[1] ? "height: 100%;" : ""}` : "")}
	${({ $itemsPerRow, $gap }) =>
		$itemsPerRow
			? `
				& > div {
					flex: 0 0 ${calculateItemWidth($itemsPerRow, $gap)};
				}
			`
			: ""}
	${({ $maxWidth }) => ($maxWidth ? `max-width: ${$maxWidth}px;` : "")}
	${({ $textCenter }) => ($textCenter ? "text-align: center;" : "")}
`;

export default Flex;
