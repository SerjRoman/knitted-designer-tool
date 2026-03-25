import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonVariant = "filled" | "ghost" | "cancel";

type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	variant?: ButtonVariant;
};

const baseClasses =
	"inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
	filled: "border border-transparent bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:hover:bg-blue-600",
	ghost: "border border-transparent bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200 disabled:hover:bg-transparent",
	cancel: "border border-gray-300 bg-transparent text-gray-700 hover:border-black hover:bg-gray-50 active:bg-gray-100 disabled:hover:border-gray-300 disabled:hover:bg-transparent",
};

export function Button({
	className,
	variant = "filled",
	...props
}: ButtonProps) {
	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]} ${className ?? ""}`}
			{...props}
		/>
	);
}
