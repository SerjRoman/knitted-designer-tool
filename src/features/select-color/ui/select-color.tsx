import type { ChangeEvent } from "react";
import { setColor } from "@/entities/canvas";
import { COLORS, useAppDispatch } from "@/shared/lib";

export function SelectColor() {
	const dispatch = useAppDispatch();
	function handleChange(event: ChangeEvent<HTMLSelectElement>) {
		dispatch(setColor(event.target.value));
	}
	const colors = Object.entries(COLORS);
	return (
		<select onChange={handleChange}>
			{colors.map((color) => (
				<option key={color[1]} value={color[1]}>
					{color[0]}
				</option>
			))}
		</select>
	);
}
