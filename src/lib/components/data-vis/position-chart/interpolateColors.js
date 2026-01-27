export function interpolateColors(hex1, hex2, steps, hexMid = null) {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
      hex = hex.replace(/^#/, "");
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((x) => x + x)
          .join("");
      }
      const bigint = parseInt(hex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };
    // Convert RGB to hex
    const rgbToHex = ({ r, g, b }) =>
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");
    // Helper: interpolate between two colors
    const interpolate = (start, end, count) => {
      const arr = [];
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const r = Math.round(start.r + (end.r - start.r) * t);
        const g = Math.round(start.g + (end.g - start.g) * t);
        const b = Math.round(start.b + (end.b - start.b) * t);
        arr.push({ r, g, b });
      }
      return arr;
    };
    const start = hexToRgb(hex1);
    const end = hexToRgb(hex2);
    // Case 1: just two colors
    if (!hexMid) {
      return interpolate(start, end, steps).map(rgbToHex);
    }
    // Case 2: three colors
    const mid = hexToRgb(hexMid);
    const result = [];
    if (steps % 2 === 1) {
      // Odd steps → midpoint included
      const half = (steps - 1) / 2;
      const firstHalf = interpolate(start, mid, half + 1); // includes mid
      const secondHalf = interpolate(mid, end, half + 1); // includes mid again
      result.push(
        ...firstHalf.slice(0, -1).map(rgbToHex), // drop duplicate mid
        ...secondHalf.map(rgbToHex),
      );
    } else {
      // Even steps → midpoint excluded
      const half = steps / 2;
      const firstHalf = interpolate(start, mid, half + 1); // includes mid
      const secondHalf = interpolate(mid, end, half + 1); // includes mid again
      result.push(
        ...firstHalf.slice(0, -1).map(rgbToHex), // drop mid
        ...secondHalf.slice(1).map(rgbToHex), // drop mid
      );
    }
    return result;
  }