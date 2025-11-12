import type { LucideIcon, LucideProps } from "lucide-react";
import type { EditorTools } from "../../model";

export interface ToolButtonProps {
	toolName?: EditorTools;
	icon: LucideIcon;
	iconProps?: LucideProps;
	label: string;
	onClick: () => void;
	disabled?: boolean;
}
