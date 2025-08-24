import { useSelector } from "react-redux";
import type { StateSchema } from "@shared/lib";

export const useAppSelector = useSelector.withTypes<StateSchema>();
