import { useSelector } from "react-redux";
import type { AppStateSchema } from "../types";

export const useAppSelector = useSelector.withTypes<AppStateSchema>();
