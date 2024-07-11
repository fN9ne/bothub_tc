import { FC } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";

import ModalWrapper from "./ModalWrapper";

const TestModal: FC = () => {
	const { test } = useAppSelector((state) => state.modal);

	return (
		<ModalWrapper className="test" isActive={test} name="test">
			<h1>Test</h1>
		</ModalWrapper>
	);
};

export default TestModal;
