import { lab, type LabColor } from "d3-color";

export function contrastingColor(color: string) {
  const colorLab = lab(color);

  const MIN_DIFF = 50;
  const MAX_DIFF = 90;

  let l = colorLab.l;
  let output = 100 - l;
  let contrast = Math.abs(l - output);
  let textColor: LabColor;
  let hoverBgColor: LabColor;
  let textOutlineColor: string;

  if (l < output) {
    if (contrast < MIN_DIFF) {
      output = l + MIN_DIFF;
    } else if (contrast > MAX_DIFF) {
      output = l + MAX_DIFF;
    }

    textColor = lab(output, colorLab.a, colorLab.b);
    textOutlineColor = "rgba(0, 0, 0, 0.5)";
    hoverBgColor = colorLab.brighter();
  } else {
    if (contrast < MIN_DIFF) {
      output = l - MIN_DIFF;
    } else if (contrast > MAX_DIFF) {
      output = l - MAX_DIFF;
    }

    textColor = lab(output, colorLab.a, colorLab.b);
    textOutlineColor = "rgba(255, 255, 255, 0.5)";
    hoverBgColor = colorLab.darker();
  }

  return {
    textColor: textColor.formatRgb(),
    textOutlineColor,
    hoverBgColor: hoverBgColor.formatRgb(),
  };
}

//From https://colorbrewer2.org/#type=sequential&scheme=YlGnBu
export const colorPalette = {
  3: ["#edf8b1", "#7fcdbb", "#2c7fb8"],
  4: ["#ffffcc", "#a1dab4", "#41b6c4", "#225ea8"],
  5: ["#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"],
  6: ["#ffffcc", "#c7e9b4", "#7fcdbb", "#41b6c4", "#2c7fb8", "#253494"],
  7: [
    "#ffffcc",
    "#c7e9b4",
    "#7fcdbb",
    "#41b6c4",
    "#1d91c0",
    "#225ea8",
    "#0c2c84",
  ],
  8: [
    "#ffffd9",
    "#edf8b1",
    "#c7e9b4",
    "#7fcdbb",
    "#41b6c4",
    "#1d91c0",
    "#225ea8",
    "#0c2c84",
  ],
};
