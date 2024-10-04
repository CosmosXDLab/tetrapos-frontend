import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

interface TabOption {
	value: string;
	label: string;
	content: React.ReactNode;
}

interface BaseTabsProps {
	defaultValue: string;
	options: TabOption[];
	onTabChange?: (value: string) => void;
}

export type TabsProps = BaseTabsProps;

const CosmosTabs = React.forwardRef<HTMLDivElement, TabsProps>(({ defaultValue, options, onTabChange }, ref) => {
	const handleTabChange = (value: string) => {
		if (onTabChange) {
			onTabChange(value);
		}
	};

	return (
		<Tabs
			className="flex flex-col justify-start gap-10"
			defaultValue={defaultValue}
			onValueChange={handleTabChange}
			ref={ref}
		>
			<TabsList className="flex justify-start w-full gap-2 border-b rounded-none border-cosmos-border">
				{options.map(({ value, label }) => (
					<TabsTrigger
						className="text-sm relative pb-2 px-4 text-cosmos-texto border-b-0 border-cosmos-label data-[state=active]:border-b-4 data-[state=active]:border-cosmos-label data-[state=active]:-mb-[2px]"
						key={value}
						value={value}
					>
						{label}
					</TabsTrigger>
				))}
			</TabsList>
			{options.map(({ value, content }) => (
				<TabsContent className="text-sm" key={value} value={value}>
					{content}
				</TabsContent>
			))}
		</Tabs>
	);
});

CosmosTabs.displayName = "CosmosTabs";

export { CosmosTabs };
