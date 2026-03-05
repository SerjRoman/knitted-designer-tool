import { Download } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { convertGridToColorsArray, convertColorsArrayToUrl } from "../../lib";
import { saveImageToCloud } from "../../model";

export function SaveImageButton() {
	const { grid, numberColumns, numberRows } = useAppSelector(
		(state) => state.canvas
	);
	const dispatch = useAppDispatch();
	function downloadImage(url: string) {
		const link = document.createElement("a");
		link.href = url;
		link.download = "image.png";
		link.style.display = "none";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
	function handleClick() {
		const width = numberColumns;
		const height = numberRows;
		const colorsArray = convertGridToColorsArray(grid);
		const url = convertColorsArrayToUrl(colorsArray, width, height);
		downloadImage(url);
		dispatch(saveImageToCloud());
	}
	return (
		<button
			onClick={handleClick}
			className="flex flex-col items-center gap-3 p-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all"
		>
			<Download size={24} />
			<span className="font-semibold">Save</span>
		</button>
	);
}
