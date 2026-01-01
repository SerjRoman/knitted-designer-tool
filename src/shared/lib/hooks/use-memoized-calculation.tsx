/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from "react";

export function useMemoizedCalculation<Args extends any[], Result>(
	calculateFn: (...args: Args) => Result,
	isEqual?: (prev: Args, next: Args) => boolean
) {
	const cacheRef = useRef<{ args: Args | null; result: Result | null }>({
		args: null,
		result: null,
	});

	return useCallback(
		(...args: Args): Result => {
			const { args: cachedArgs, result: cachedResult } = cacheRef.current;
			let shouldRecalculate = true;

			if (cachedArgs && cachedResult) {
				if (isEqual?.(cachedArgs, args)) {
					shouldRecalculate = false;
				} else if (
					cachedArgs.length === args.length &&
					cachedArgs.every((val, index) => val === args[index])
				) {
					shouldRecalculate = false;
				}
			}
			if (!shouldRecalculate && cachedResult) {
				return cachedResult;
			}
			const newResult = calculateFn(...args);

			cacheRef.current = { args, result: newResult };

			return newResult;
		},
		[calculateFn, isEqual]
	);
}
