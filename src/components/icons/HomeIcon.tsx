import React from "react";
import type { CosmosIcon } from "./icon.types";

const HomeIcon: React.FC<CosmosIcon> = React.memo((props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 35 35"
			width={35}
			height={35}
			fill="none"
			{...props}
		>
			<title>Home Icon</title>
			<path d="M14.583 27.708v-7.291h5.834v7.291c0 .802.656 1.459 1.458 1.459h4.375c.802 0 1.458-.657 1.458-1.459V17.5h2.48c.67 0 .991-.831.48-1.269L18.478 5.25a1.47 1.47 0 0 0-1.954 0L4.33 16.231c-.496.438-.19 1.269.481 1.269h2.48v10.208c0 .802.656 1.459 1.458 1.459h4.375c.802 0 1.458-.657 1.458-1.459Z" />
		</svg>
	);
});

export default HomeIcon;
