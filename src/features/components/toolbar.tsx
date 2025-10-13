import { SelectColor } from "../select-color/ui/index";
import { SelectToolPanel } from "../select-tool/ui/index";
import { ChangeNumberColumns } from "../change-grid-sizes/ui/index";
import { ChangeNumberRows } from "../change-grid-sizes/ui/index";
import { ChangePixelSize } from "../change-grid-sizes/ui/index";
import { ActionButtons } from "../components/ActionButtons";
import { useAppSelector } from "@/shared/lib";

export function Toolbar() {
  const { numberColumns, numberRows } = useAppSelector((state) => state.canvas);

  return (
    <div
      className="absolute top-4 right-4 w-80 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 z-50"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <div className="overflow-y-auto overflow-x-hidden h-full">
        <div className="p-4 space-y-4">
          {/* Grid Info Header - More Compact */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-3 text-center">
            <div className="text-xs font-medium uppercase tracking-wide opacity-90">
              Grid Size
            </div>
            <div className="text-xl font-bold mt-1">
              {numberColumns} × {numberRows}
            </div>
          </div>

          {/* Colors Section - More Compact */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Colors
            </h3>
            <SelectColor />
          </div>

          {/* Tools Section - More Compact */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Tools
            </h3>
            <SelectToolPanel />
          </div>

          {/* Grid Controls - More Compact */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Grid Controls
            </h3>
            <div className="space-y-2">
              <ChangeNumberColumns />
              <ChangeNumberRows />
              <ChangePixelSize />
            </div>
          </div>

          {/* Actions - More Compact */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Actions
            </h3>
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
