import { useModal } from "@/shared/lib";
import { useAppSelector } from "@/shared/store";
import { GridSettingsModal } from "./grid-settings-modal";
import { useState } from "react";

type GridSettingsModalCustomProps = {
  onTensionChange: (stitches: number, rows: number) => void;
};

export function GridSettings() {
  const [{ open }, ModalProvider] = useModal<GridSettingsModalCustomProps>();

  const { numberOfColumns, numberOfRows } = useAppSelector((state) => state.canvas);

  // Jag rekommenderar numbers här (formatera vid render)
  const [selectedTension, setSelectedTension] = useState({
    stitchesPer10cm: numberOfColumns / 10,
    rowsPer10cm: numberOfRows / 10,
  });

  const handleTensionChange = (newStitches: number, newRows: number) => {
    setSelectedTension({
      stitchesPer10cm: newStitches,
      rowsPer10cm: newRows,
    });
  };

  return (
    <>
      <button
        className="w-full bg-[#0D5C4A] text-white rounded-xl p-4 text-center shadow-lg transition-all duration-200"
        onClick={() => open({ onTensionChange: handleTensionChange })}
      >
        <div className="text-xl opacity-90">Resize Grid / Tension</div>

        <div className="text-xl font-bold mt-1 tracking-wide">
          {numberOfColumns} × {numberOfRows}
        </div>

        <div className="mt-2 text-md ">
          {selectedTension.stitchesPer10cm} stitches x{" "}
          {selectedTension.rowsPer10cm} rows in 10 cm
        </div>
      </button>

      <ModalProvider ModalComponent={GridSettingsModal} />
    </>
  );
}
