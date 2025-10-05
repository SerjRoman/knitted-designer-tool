import { setPixelSize } from "@/entities/canvas";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

export function ChangePixelSize() {
<<<<<<< HEAD
  const dispatch = useAppDispatch();
  const { pixelSize } = useAppSelector((state) => state.canvas);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Select pixel size:
      </label>
      <select
        value={pixelSize}
        onChange={(event) => {
          dispatch(setPixelSize(+event.target.value));
        }}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {Array.from({ length: 100 }, (_, k) => k + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
=======
	const dispatch = useAppDispatch();
	const { pixelSize } = useAppSelector((state) => state.canvas);
	return (
		<div>
			<span>Select pixel size:</span>
			<select
				value={pixelSize}
				onChange={(event) => {
					dispatch(setPixelSize(+event.target.value));
				}}
			>
				{Array.from({ length: 100 }, (_, k) => k).map((num) => (
					<option key={num} value={num}>
						{num}
					</option>
				))}
			</select>
		</div>
	);
>>>>>>> 0e706c3 (feat: Implement action history functionality with undo and redo capabilities. To be finished due to perfomance issues)
}
