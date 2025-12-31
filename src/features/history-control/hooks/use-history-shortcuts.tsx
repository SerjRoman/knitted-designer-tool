import { useEffect } from "react";
import { useAppDispatch } from "@/shared/store";
import { applyRedo, applyUndo } from "../model";

export function useHistoryShortcuts() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.metaKey) return;
			if (e.key.toLowerCase() === "z") {
				if (e.shiftKey) {
					dispatch(applyRedo());
				} else {
					dispatch(applyUndo());
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dispatch]);
}
