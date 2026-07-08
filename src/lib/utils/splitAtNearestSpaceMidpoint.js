export function splitAtNearestSpaceMidpoint(input) {
    if (!input.includes(' ')) return [input, '']; // no space to split

    const mid = Math.floor(input.length / 2);
    let closest = -1;
    let minDistance = Infinity;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === ' ') {
            const distance = Math.abs(i - mid);
            if (distance < minDistance) {
                minDistance = distance;
                closest = i;
            }
        }
    }

    if (closest === -1) return [input, '']; // fallback

    return [input.slice(0, closest), input.slice(closest + 1)];
}