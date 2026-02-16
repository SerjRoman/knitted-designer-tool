export function getMajorTickMultiplier(tickSpacing: number): number {
	if (tickSpacing > 40) {
		return 0.5;
	}
	if (tickSpacing > 30) {
		return 1;
	}
	if (tickSpacing >= 20) {
		return 2;
	}
	if (tickSpacing >= 10) {
		return 3;
	}
	if (tickSpacing >= 5) {
		return 5;
	}
	if (tickSpacing >= 4) {
		return 10;
	}
	if (tickSpacing >= 2) {
		return 20;
	}
	if (tickSpacing >= 1) {
		return 50;
	}
    if (tickSpacing < 1) {
        return 100;
    }
	return 5;
}
