import React from "react";
import type { CosmosIcon } from "./icon.types";

const ClosedEyeIcon: React.FC<CosmosIcon> = React.memo((props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={20} height={20} fill="none" {...props}>
			<title>ClosedEye Icon</title>
			<path d="M10 3.75C5.83337 3.75 2.27504 6.34167 0.833374 10C2.27504 13.6583 5.83337 16.25 10 16.25C14.1667 16.25 17.725 13.6583 19.1667 10C17.725 6.34167 14.1667 3.75 10 3.75ZM10 14.1667C7.70004 14.1667 5.83337 12.3 5.83337 10C5.83337 7.7 7.70004 5.83333 10 5.83333C12.3 5.83333 14.1667 7.7 14.1667 10C14.1667 12.3 12.3 14.1667 10 14.1667ZM10 7.5C8.61671 7.5 7.50004 8.61667 7.50004 10C7.50004 11.3833 8.61671 12.5 10 12.5C11.3834 12.5 12.5 11.3833 12.5 10C12.5 8.61667 11.3834 7.5 10 7.5Z" />
		</svg>
	);
});

export default ClosedEyeIcon;
