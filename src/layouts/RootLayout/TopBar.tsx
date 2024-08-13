import { CosmosInput } from "@/components/cosmos/CosmosInput";
import { MessageIcon, NotificationIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Avvvatars from "avvvatars-react";

const TopBar = () => {
	return (
		<div className="flex items-center justify-between h-20 px-12 border-b border-b-cosmos-border">
			<CosmosInput
				id="search"
				type="text"
				placeholder="Buscar"
				showLabel
				iconStart={<MagnifyingGlassIcon className="fill-cosmos-label size-4" />}
			/>
			<div className="flex items-center justify-center gap-2">
				<Button variant="ghost" size="icon">
					<MessageIcon className="fill-current" />
				</Button>
				<Button variant="ghost" size="icon">
					<NotificationIcon className="fill-current" />
				</Button>

				<div className="flex items-center justify-center gap-2">
					<p className="text-sm">Sherry Miranda</p>
					<Avvvatars value="Sherry Miranda" border shadow size={40} />
				</div>
			</div>
		</div>
	);
};

export default TopBar;
