import type { LucideIcon } from "lucide-react";
import type { EditorTools } from "../../model";

export interface ToolButtonProps {
	toolName?: EditorTools;
	icon: LucideIcon;
	label: string;
	onClick: () => void;
	disabled?: boolean;
}
