import { addColumn, removeColumn } from "@/entities/canvas";
import { useAppDispatch } from "@/shared/lib";

export function ChangeNumberColumns() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Columns</label>
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(removeColumn())}
          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          −
        </button>
        <button
          onClick={() => dispatch(addColumn())}
          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
