import { useId, type InputHTMLAttributes } from "react";

interface TextInputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"className"
> {
	label?: string;
	classNames?: {
		root?: string;
		label?: string;
		input?: string;
	};
}

export function TextInput({
	label,
	classNames,
	...inputProps
}: Readonly<TextInputProps>) {
	const generatedId = useId();
	const inputId = inputProps.id ?? generatedId;

	return (
		<div className={`flex flex-col gap-1 ${classNames?.root ?? ""}`}>
			{label && (
				<label
					htmlFor={inputId}
					className={`text-sm font-medium text-gray-700 ${classNames?.label ?? ""}`}
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors outline-none hover:border-black focus:border-blue-500 ${classNames?.input ?? ""}`}
				{...inputProps}
			/>
		</div>
	);
}
