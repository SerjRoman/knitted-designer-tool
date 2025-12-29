import type { LucideIcon, LucideProps } from "lucide-react";
import type { EditorTools } from "../../model";

export interface ToolButtonProps {
	icon: LucideIcon;
	label: string;
	onClick: () => void;
	isSelected?: boolean;
	disabled?: boolean;
	iconProps?: LucideProps;
	toolName?: EditorTools;
	className?: string;
}
