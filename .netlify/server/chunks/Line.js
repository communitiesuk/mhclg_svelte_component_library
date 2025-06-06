import { Z as attr, a0 as ensure_array_like, _ as stringify, T as pop, Q as push } from "./index.js";
function Line($$payload, $$props) {
  push();
  let {
    dataArray,
    opacity = 1,
    pathStrokeColor = "#b312a0",
    pathStrokeWidth = 1,
    pathFillColor = "none",
    pathStrokeDashArray = "none",
    includeMarkers = false,
    markerShape = "circle",
    markerRadius = 5,
    markerFill = "#b312a0",
    markerStroke = "white",
    markerStrokeWidth = 3,
    lineFunction,
    xFunction,
    yFunction,
    dataId,
    markersDataId,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onClickMarker,
    onMouseEnterMarker,
    onMouseLeaveMarker,
    onMouseMoveMarker
  } = $$props;
  $$payload.out += `<g${attr("data-id", dataId)}${attr("opacity", opacity)}><path${attr("d", lineFunction(dataArray))}${attr("fill", pathFillColor)}${attr("stroke", pathStrokeColor)}${attr("stroke-width", pathStrokeWidth)}${attr("stroke-dasharray", pathStrokeDashArray)}></path>`;
  if (includeMarkers) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(dataArray);
    $$payload.out += `<!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let marker = each_array[i];
      $$payload.out += `<g${attr("data-id", markersDataId + "-" + i)}${attr("transform", `translate(${stringify(xFunction(marker.x))},${stringify(yFunction(marker.y))})`)}>`;
      if (markerShape === "circle") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<circle${attr("r", markerRadius)}${attr("stroke", markerStroke)}${attr("fill", markerFill)}${attr("stroke-width", markerStrokeWidth)}></circle>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (["square", "diamond"].includes(markerShape)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<rect${attr("transform", `rotate(${stringify(markerShape === "diamond" ? 45 : 0)})`)}${attr("x", -markerRadius)}${attr("y", -markerRadius)}${attr("width", markerRadius * 2)}${attr("height", markerRadius * 2)}${attr("stroke", markerStroke)}${attr("fill", markerFill)}${attr("stroke-width", markerStrokeWidth)}></rect>`;
        } else {
          $$payload.out += "<!--[!-->";
          if (markerShape === "triangle") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<polygon${attr("points", `0,${stringify(-markerRadius * 2)} ${stringify(markerRadius * 1.733)},${stringify(markerRadius)} ${stringify(-markerRadius * 1.733)},${stringify(markerRadius)}`)}${attr("stroke", markerStroke)}${attr("fill", markerFill)}${attr("stroke-width", markerStrokeWidth)}></polygon>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></g>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></g>`;
  pop();
}
export {
  Line as L
};
