import { useAppSelector } from "@/shared/lib";
import type { ToolButtonProps } from "./tool-button.types";

export const ToolButton = ({
	toolName,
	icon: Icon,
	label,
	onClick,
	disabled = false,
}: ToolButtonProps) => {
	const { tool } = useAppSelector((state) => state.editor.toolState);
	const isSelected = toolName ? tool === toolName : false;
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all duration-200 ${
				isSelected
					? "bg-blue-500 text-white border-blue-500 shadow-md scale-105"
					: "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm"
			} ${
				disabled
					? "opacity-50 cursor-not-allowed"
					: "hover:scale-105 cursor-pointer"
			}`}
			title={label}
		>
			<Icon size={20} />
			<span className="text-xs mt-1 font-medium">{label}</span>
		</button>
	);
};
