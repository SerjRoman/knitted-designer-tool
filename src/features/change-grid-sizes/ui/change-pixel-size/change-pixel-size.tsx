import { setPixelSize } from "@/entities/canvas";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

export function ChangePixelSize() {
	const dispatch = useAppDispatch();
	const { pixelSize } = useAppSelector((state) => state.canvas);
	return (
		<div>
            <span>Select pixel size:</span>
			<select
				onChange={(event) => {
					dispatch(setPixelSize(+event.target.value));
				}}
			>
				{Array.from({ length: 100 }, (_, k) => k).map((num) => (
					<option selected={pixelSize === num} value={num}>
						{num}
					</option>
				))}
			</select>
		</div>
	);
}
