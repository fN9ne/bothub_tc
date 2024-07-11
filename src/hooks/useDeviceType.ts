import { isWidthInViewport } from "@/functions";
import { useCallback, useEffect, useState } from "react";

const useDeviceType = () => {
	const [isTablet, setIsTablet] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);

	const updateDeviceType = useCallback(() => {
		if (isWidthInViewport(834)) setIsTablet(true);
		else setIsTablet(false);

		if (isWidthInViewport(550)) setIsMobile(true);
		else setIsMobile(false);
	}, []);

	useEffect(() => {
		updateDeviceType();

		window.addEventListener("resize", updateDeviceType);

		return () => {
			window.removeEventListener("resize", updateDeviceType);
		};
	}, [updateDeviceType]);

	return { isTablet, isMobile };
};

export default useDeviceType;
