import React from "react";
import type { CosmosIcon } from "./icon.types";

const CloseIcon: React.FC<CosmosIcon> = React.memo((props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 30 30"
			width={32}
			height={32}
			fill="none"
			{...props}
		>
			<title>CloseIcon Icon</title>
			<path d="M23.0794 8.43208L21.4098 6.76245L14.7905 13.3818L8.17121 6.76245L6.50159 8.43208L13.1209 15.0514L6.50159 21.6707L8.17121 23.3403L14.7905 16.721L21.4098 23.3403L23.0794 21.6707L16.4601 15.0514L23.0794 8.43208Z" />
		</svg>
	);
});

export default CloseIcon;
