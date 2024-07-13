import styled, { css } from "styled-components";

/* HEADINGS */

const Heading = styled.h1`
	color: var(--white);
	font-weight: 600;
`;

export const H1 = styled(Heading).attrs({ as: "h1" })`
	font-weight: 700;
	font-size: 46px;

	@media (max-width: 834px) {
		font-size: 40px;
	}

	@media (max-width: 375px) {
		font-size: 28px;
	}
`;
export const H2 = styled(Heading).attrs({ as: "h2" })`
	font-size: 34px;

	@media (max-width: 375px) {
		font-size: 24px;
	}
`;
export const H3 = styled(Heading).attrs({ as: "h3" })`
	font-size: 30px;

	@media (max-width: 375px) {
		font-size: 22px;
	}
`;
export const H4 = styled(Heading).attrs({ as: "h4" })`
	font-size: 26px;

	@media (max-width: 834px) {
		font-size: 22px;
	}

	@media (max-width: 375px) {
		font-size: 20px;
	}
`;
export const H5 = styled(Heading).attrs({ as: "h5" })`
	font-size: 22px;

	@media (max-width: 834px) {
		font-size: 20px;
	}

	@media (max-width: 375px) {
		font-size: 18px;
	}
`;
export const H6 = styled(Heading).attrs({ as: "h6" })`
	font-size: 18px;

	@media (max-width: 375px) {
		font-size: 16px;
	}
`;

/* CHAT HEADINGS */

export const CH1 = styled(Heading).attrs({ as: "h1" })`
	font-size: 32px;
`;
export const CH2 = styled(Heading).attrs({ as: "h2" })`
	font-size: 28px;
`;
export const CH3 = styled(Heading).attrs({ as: "h3" })`
	font-size: 24px;
`;
export const CH4 = styled(Heading).attrs({ as: "h4" })`
	font-size: 20px;
`;
export const CH5 = styled(Heading).attrs({ as: "h5" })`
	font-size: 18px;
`;
export const CH6 = styled(Heading).attrs({ as: "h6" })`
	font-size: 16px;
`;

/* BODY TEXT */

interface FontSize {
	desktop: number;
	tablet: number;
	mobile: number;
}

interface Theme {
	fontSizes: {
		xxl: FontSize;
		xl: FontSize;
		l: FontSize;
		m: FontSize;
		s: FontSize;
		xs: FontSize;
	};
	fontWeights: {
		semibold: number;
		medium: number;
		regular: number;
	};
}

const theme: Theme = {
	fontSizes: {
		xxl: {
			desktop: 26,
			tablet: 22,
			mobile: 20,
		},
		xl: {
			desktop: 22,
			tablet: 20,
			mobile: 18,
		},
		l: {
			desktop: 18,
			tablet: 18,
			mobile: 14,
		},
		m: {
			desktop: 16,
			tablet: 14,
			mobile: 14,
		},
		s: {
			desktop: 14,
			tablet: 12,
			mobile: 12,
		},
		xs: {
			desktop: 12,
			tablet: 10,
			mobile: 10,
		},
	},
	fontWeights: {
		regular: 400,
		medium: 500,
		semibold: 600,
	},
};

interface TextProps {
	$size?: keyof typeof theme.fontSizes;
	$weight?: keyof typeof theme.fontWeights;
	$fontStyle?: "normal" | "italic";
	$color?: string;
}

const getSize = (size: keyof typeof theme.fontSizes) => {
	const fontSize = theme.fontSizes[size];

	return css`
		font-size: ${fontSize.desktop}px;

		@media (max-width: 834px) {
			font-size: ${fontSize.tablet}px;
		}

		@media (max-width: 375px) {
			font-size: ${fontSize.mobile}px;
		}
	`;
};

const getWeight = (weight: keyof typeof theme.fontWeights) => theme.fontWeights[weight];

export const Text = styled.div<TextProps>`
	color: ${(props) => (props.color ? props.color : "var(--white)")};
	font-weight: ${(props) => getWeight(props.$weight || "regular")};
	${(props) => getSize(props.$size || "m")};
	font-style: ${(props) => props.$fontStyle || "normal"};
	line-height: 1.3;
`;

export const BodyXXLSemibold = (props: any) => <Text $size="xxl" $weight="semibold" {...props} />;
export const BodyXLSemibold = (props: any) => <Text $size="xl" $weight="semibold" {...props} />;
export const BodyLSemibold = (props: any) => <Text $size="l" $weight="semibold" {...props} />;
export const BodyLMedium = (props: any) => <Text $size="l" $weight="medium" {...props} />;
export const BodyLMediumItalic = (props: any) => <Text $size="l" $weight="medium" $fontStyle="italic" {...props} />;
export const BodyMSemibold = (props: any) => <Text $size="m" $weight="semibold" {...props} />;
export const BodyMMedium = (props: any) => <Text $size="m" $weight="medium" {...props} />;
export const BodyMRegular = (props: any) => <Text $size="m" $weight="regular" {...props} />;
export const BodySMedium = (props: any) => <Text $size="s" $weight="medium" {...props} />;
export const BodySRegular = (props: any) => <Text $size="s" $weight="regular" {...props} />;
export const BodyXSRegular = (props: any) => <Text $size="xs" $weight="regular" {...props} />;
