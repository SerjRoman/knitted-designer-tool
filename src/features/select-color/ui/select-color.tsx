import type { ChangeEvent } from "react";
import { setCurrentColor } from "@/entities/editor";
import { COLORS, useAppDispatch, useAppSelector } from "@/shared/lib";

export function SelectColor() {
	const dispatch = useAppDispatch();
	const { currentColor } = useAppSelector((state) => state.editor);
	function handleChange(event: ChangeEvent<HTMLSelectElement>) {
		dispatch(setCurrentColor(event.target.value));
	}
	const colors = Object.entries(COLORS);
	return (
		<select onChange={handleChange} value={currentColor}>
			{colors.map((color) => (
				<option key={color[1]} value={color[1]}>
					{color[0]}
				</option>
			))}
		</select>
	);
}
