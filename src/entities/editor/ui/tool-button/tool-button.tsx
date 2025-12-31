import { useAppSelector } from "@/shared/store";
import type { ToolButtonProps } from "./tool-button.types";

export const ToolButton = ({
	toolName,
	icon: Icon,
	label,
	onClick,
	iconProps,
	className,
	isSelected = true,
	disabled = false,
}: ToolButtonProps) => {
	const { tool } = useAppSelector((state) => state.editor.toolState);
	const isSelectedInner =
		(toolName ? tool === toolName : false) && isSelected;
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all duration-200 ${
				isSelectedInner
					? "bg-blue-500 text-white border-blue-500 shadow-md scale-105"
					: "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm"
			} ${
				disabled
					? "opacity-50 cursor-not-allowed"
					: "hover:scale-105 cursor-pointer"
			} ${className}`}
			title={label}
		>
			<Icon size={20} {...iconProps} />
			<span className="text-xs mt-1 font-medium">{label}</span>
		</button>
	);
};
