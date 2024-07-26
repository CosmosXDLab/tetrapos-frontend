import React from "react";
import type { CosmosIcon } from "./icon.types";

const LockClockIcon: React.FC<CosmosIcon> = React.memo((props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 35 35"
			width={35}
			height={35}
			fill="none"
			{...props}
		>
			<title>LockClock Icon</title>
			<path d="M21.875 14H19.25v8.75l6.3 3.85 1.4-2.275-5.075-2.975V14ZM21 8.75c-.525 0-1.225 0-1.75.175V8.75c0-3.675-3.325-7-7-7s-7 3.325-7 7v1.75h-.875c-1.4 0-2.625 1.225-2.625 2.625v14c0 1.4 1.225 2.625 2.625 2.625h8.05c2.275 2.1 5.25 3.5 8.575 3.5 6.825 0 12.25-5.425 12.25-12.25S27.825 8.75 21 8.75Zm-12.25 0a3.51 3.51 0 0 1 3.5-3.5 3.51 3.51 0 0 1 3.5 3.5v1.75h-7V8.75Zm12.25 21c-4.9 0-8.75-3.85-8.75-8.75s3.85-8.75 8.75-8.75 8.75 3.85 8.75 8.75-3.85 8.75-8.75 8.75Z" />
		</svg>
	);
});

export default LockClockIcon;
