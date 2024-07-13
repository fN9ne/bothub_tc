import { FC } from "react";
import Capabilities from "./screens/Capabilities";
import Midjourney from "./screens/Midjourney";
import Flex from "@/components/Flex";
import Home from "./screens/Home";

const Main: FC = () => {
	return (
		<div className="mainpage">
			<Flex $column $gap={86}>
				<Home />
				<Capabilities />
				<Midjourney />
			</Flex>
		</div>
	);
};

export default Main;
