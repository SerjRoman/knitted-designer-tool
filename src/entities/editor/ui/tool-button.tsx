import type { LucideIcon, LucideProps } from "lucide-react";
import { useAppSelector } from "@/shared/store";
import type { EditorTools } from "../model";

interface ToolButtonProps {
	icon: LucideIcon;
	label: string;
	onClick?: () => void;
	isSelected?: boolean;
	disabled?: boolean;
	iconProps?: LucideProps;
	toolName?: EditorTools;
	className?: string;
}

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

const IconButton = (props: ToolButtonProps) => {
	const {
		icon: Icon,
		label,
		onClick,
		iconProps,
		className,
		disabled,
		isSelected,
	} = props;
	const selectedClassName = isSelected
		? "bg-blue-500 text-white"
		: "bg-gray-100 text-gray-700";

	const disabledClassName = disabled
		? "opacity-50 cursor-not-allowed max-w-[40px]"
		: `group shadow-sm hover:shadow-md cursor-pointer max-w-[40px] hover:max-w-[200px] ${
				isSelected ? "hover:bg-blue-600" : "hover:bg-gray-200"
			}`;

	const classNames = [
		"absolute right-0 top-0 h-10",
		"flex flex-row-reverse items-center rounded",
		"overflow-hidden transition-all duration-300 ease-in-out px-2",
		selectedClassName,
		disabledClassName,
		className,
	]
		.filter(Boolean)
		.join(" ");
	return (
		<div className="relative w-10 h-10 flex-shrink-0 z-10 hover:z-50">
			<button
				className={classNames}
				onClick={onClick}
				title={label}
				disabled={disabled}
			>
				<div className="flex-shrink-0 flex items-center justify-center w-6 h-6">
					<Icon size={20} {...iconProps} />
				</div>
				<span className="mr-2 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
					{label}
				</span>
			</button>
		</div>
	);
};
ToolButton.Icon = IconButton;
