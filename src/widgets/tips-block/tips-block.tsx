import { useState } from "react";

interface AbstractTip {
	title: string;
	description: string;
	isTriggered: (params: unknown) => boolean;
	triggered: boolean;
}

class Tip implements AbstractTip {
	public title = "Panning/moving the camera";
	description: string;
	isTriggered: (params: unknown) => boolean;
	triggered: boolean;
}

const TIPS: {} = [
	{
		title: "Panning/moving the camera",
		description: "",
		isTriggered: ({ zoom }: { zoom: number }) => {
			return zoom > 5 ? true : false;
		},
		triggered: false,
	},
];

export function TipsBlock() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<div>
			<ol>
				<li></li>
			</ol>
		</div>
	);
}
