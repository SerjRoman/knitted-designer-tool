import { useDispatch } from "react-redux";
import type { AppDispatchSchema } from "@shared/lib";

export const useAppDispatch = useDispatch.withTypes<AppDispatchSchema>();
