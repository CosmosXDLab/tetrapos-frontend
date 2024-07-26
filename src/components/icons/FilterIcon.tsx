import React from "react";
import type { CosmosIcon } from "./icon.types";

const FilterIcon: React.FC<CosmosIcon> = React.memo((props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 25"
			width={24}
			height={25}
			fill="none"
			{...props}
		>
			<title>Filtter Icon</title>
			<path d="M4.25006 6.11C6.57006 9.09 10.0001 13.5 10.0001 13.5V18.5C10.0001 19.6 10.9001 20.5 12.0001 20.5C13.1001 20.5 14.0001 19.6 14.0001 18.5V13.5C14.0001 13.5 17.4301 9.09 19.7501 6.11C20.2601 5.45 19.7901 4.5 18.9501 4.5H5.04006C4.21006 4.5 3.74006 5.45 4.25006 6.11Z" />
		</svg>
	);
});

export default FilterIcon;
