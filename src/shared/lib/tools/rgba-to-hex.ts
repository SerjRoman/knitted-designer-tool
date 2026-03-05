export function RGBAToHEX(rgba: string): string {
    const parts = rgba.match(/(\d+(\.\d+)?)/g);
    if (!parts || parts.length < 3) {
        return "#000000";
    }

    const r = parseInt(parts[0], 10);
    const g = parseInt(parts[1], 10);
    const b = parseInt(parts[2], 10);

    const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}