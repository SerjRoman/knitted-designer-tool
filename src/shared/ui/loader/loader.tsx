import cn from "clsx";
type LoaderSize = "xs" | "s" | "m" | "l" | "xl";
type LoaderColor = "primary" | "secondary" | "white";

export interface LoaderProps {
	className?: string;
	size?: LoaderSize;
	color?: LoaderColor;
}

const sizeClasses: Record<LoaderSize, string> = {
	xs: "w-4 h-4 border-2",
	s: "w-6 h-6 border-2",
	m: "w-8 h-8 border-4",
	l: "w-12 h-12 border-4",
	xl: "w-16 h-16 border-4",
};
const colorClasses: Record<LoaderColor, string> = {
	primary: "border-t-blue-500",
	secondary: "border-t-gray-500",
	white: "border-t-white",
};

export const Loader = ({
	className,
	size = "m",
	color = "primary",
}: LoaderProps) => {
	const loaderClasses = cn(
		"animate-spin",
		"rounded-full",
		"border-solid",
		"border-gray-200",
		sizeClasses[size],
		colorClasses[color],
		className
	);

	return (
		<div role="status" className="inline-block">
			<div className={loaderClasses} />
			<span className="sr-only">Loading...</span>
		</div>
	);
};
