import { Z as attr, _ as stringify } from "./index.js";
function DividerLine($$payload, $$props) {
  let {
    directionIsVertical = false,
    color = "#cbd5e1",
    margin = "0px",
    thickness = "1px"
  } = $$props;
  if (directionIsVertical) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div data-role="divider-line-vertical" class="self-stretch"${attr("style", `margin: ${stringify(margin)}; border-left: ${stringify(thickness)} solid ${stringify(color)};`)}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<hr data-role="divider-line-horizontal"${attr("style", `margin: ${stringify(margin)}; border-top: ${stringify(thickness)} solid ${stringify(color)}`)}>`;
  }
  $$payload.out += `<!--]-->`;
}
export {
  DividerLine as D
};
