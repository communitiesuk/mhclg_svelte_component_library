import { a3 as rest_props, Q as push, S as setContext, a4 as fallback, a5 as element, a6 as slot, a7 as spread_attributes, a8 as clsx, a9 as bind_props, T as pop, aa as sanitize_props, $ as spread_props, V as getContext, Z as attr, X as copy_payload, Y as assign_payload, ab as sanitize_slots, a0 as ensure_array_like, W as escape_html, _ as stringify, ac as invalid_default_snippet } from "./index.js";
import { D as DividerLine } from "./DividerLine.js";
import { t as textStringConversion, h as html } from "./textStringConversion.js";
import * as dom from "@floating-ui/dom";
import { twMerge, twJoin } from "tailwind-merge";
import { w as writable } from "./index2.js";
import "@monaco-editor/loader";
import { L as Label, l as labelClass, i as inputClass, W as Wrapper, R as Radio, I as Input } from "./Input.js";
import "clsx";
const foldersLookup = {
  "ui": "user interaction",
  "data-vis": "data visualisation"
};
const propPillLookup = {
  true: {
    text: "{p}",
    textColor: "white",
    bgColor: "#ba029b",
    padding: "0.2rem 0.3rem 0.4rem 0.3rem"
  },
  false: {
    text: "=>",
    textColor: "white",
    bgColor: "#00695c",
    padding: "0.25rem 0.3rem 0.3rem 0.25rem"
  }
};
const defaultScreenWidthBreakpoints = {
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};
const bgColors = {
  gray: "bg-gray-50 dark:bg-gray-800",
  red: "bg-red-50 dark:bg-gray-800",
  yellow: "bg-yellow-50 dark:bg-gray-800 ",
  green: "bg-green-50 dark:bg-gray-800 ",
  indigo: "bg-indigo-50 dark:bg-gray-800 ",
  purple: "bg-purple-50 dark:bg-gray-800 ",
  pink: "bg-pink-50 dark:bg-gray-800 ",
  blue: "bg-blue-50 dark:bg-gray-800 ",
  light: "bg-gray-50 dark:bg-gray-700",
  dark: "bg-gray-50 dark:bg-gray-800",
  default: "bg-white dark:bg-gray-800",
  dropdown: "bg-white dark:bg-gray-700",
  navbar: "bg-white dark:bg-gray-900",
  navbarUl: "bg-gray-50 dark:bg-gray-800",
  form: "bg-gray-50 dark:bg-gray-700",
  primary: "bg-primary-50 dark:bg-gray-800 ",
  orange: "bg-orange-50 dark:bg-orange-800",
  none: ""
};
function Frame($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "tag",
    "color",
    "rounded",
    "border",
    "shadow",
    "node",
    "use",
    "options",
    "role",
    "transition",
    "params",
    "open"
  ]);
  push();
  const noop = () => {
  };
  setContext("background", true);
  let tag = fallback($$props["tag"], () => $$restProps.href ? "a" : "div", true);
  let color = fallback($$props["color"], "default");
  let rounded = fallback($$props["rounded"], false);
  let border = fallback($$props["border"], false);
  let shadow = fallback($$props["shadow"], false);
  let node = fallback($$props["node"], () => void 0, true);
  let use = fallback($$props["use"], noop);
  let options = fallback($$props["options"], () => ({}), true);
  let role = fallback($$props["role"], () => void 0, true);
  let transition = fallback($$props["transition"], () => void 0, true);
  let params = fallback($$props["params"], () => ({}), true);
  let open = fallback($$props["open"], true);
  const textColors = {
    gray: "text-gray-800 dark:text-gray-300",
    red: "text-red-800 dark:text-red-400",
    yellow: "text-yellow-800 dark:text-yellow-300",
    green: "text-green-800 dark:text-green-400",
    indigo: "text-indigo-800 dark:text-indigo-400",
    purple: "text-purple-800 dark:text-purple-400",
    pink: "text-pink-800 dark:text-pink-400",
    blue: "text-blue-800 dark:text-blue-400",
    light: "text-gray-700 dark:text-gray-300",
    dark: "text-gray-700 dark:text-gray-300",
    default: "text-gray-500 dark:text-gray-400",
    dropdown: "text-gray-700 dark:text-gray-200",
    navbar: "text-gray-700 dark:text-gray-200",
    navbarUl: "text-gray-700 dark:text-gray-400",
    form: "text-gray-900 dark:text-white",
    primary: "text-primary-800 dark:text-primary-400",
    orange: "text-orange-800 dark:text-orange-400",
    none: ""
  };
  const borderColors = {
    gray: "border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800",
    red: "border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800",
    yellow: "border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800",
    green: "border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800",
    indigo: "border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800",
    purple: "border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800",
    pink: "border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800",
    blue: "border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800",
    light: "border-gray-500 divide-gray-500",
    dark: "border-gray-500 divide-gray-500",
    default: "border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700",
    dropdown: "border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600",
    navbar: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
    navbarUl: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
    form: "border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700",
    primary: "border-primary-500 dark:border-primary-200  divide-primary-500 dark:divide-primary-200 ",
    orange: "border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800",
    none: ""
  };
  let divClass;
  color = color ?? "default";
  setContext("color", color);
  divClass = twMerge(bgColors[color], textColors[color], rounded && "rounded-lg", border && "border", borderColors[color], shadow && "shadow-md", $$sanitized_props.class);
  if (transition && open) {
    $$payload.out += "<!--[-->";
    element(
      $$payload,
      tag,
      () => {
        $$payload.out += `${spread_attributes({
          role,
          ...$$restProps,
          class: clsx(divClass)
        })}`;
      },
      () => {
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "default", {}, null);
        $$payload.out += `<!---->`;
      }
    );
  } else {
    $$payload.out += "<!--[!-->";
    if (open) {
      $$payload.out += "<!--[-->";
      element(
        $$payload,
        tag,
        () => {
          $$payload.out += `${spread_attributes({
            role,
            ...$$restProps,
            class: clsx(divClass)
          })}`;
        },
        () => {
          $$payload.out += `<!---->`;
          slot($$payload, $$props, "default", {}, null);
          $$payload.out += `<!---->`;
        }
      );
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    tag,
    color,
    rounded,
    border,
    shadow,
    node,
    use,
    options,
    role,
    transition,
    params,
    open
  });
  pop();
}
function Accordion($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "multiple",
    "flush",
    "activeClass",
    "inactiveClass",
    "defaultClass",
    "classActive",
    "classInactive"
  ]);
  push();
  let multiple = fallback($$props["multiple"], false);
  let flush = fallback($$props["flush"], false);
  let activeClass = fallback($$props["activeClass"], "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800");
  let inactiveClass = fallback($$props["inactiveClass"], "text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-800");
  let defaultClass = fallback($$props["defaultClass"], "text-gray-500 dark:text-gray-400");
  let classActive = fallback($$props["classActive"], "");
  let classInactive = fallback($$props["classInactive"], "");
  const ctx = {
    flush,
    activeClass: twMerge(activeClass, classActive),
    inactiveClass: twMerge(inactiveClass, classInactive),
    selected: multiple ? void 0 : writable()
  };
  setContext("ctx", ctx);
  let frameClass;
  frameClass = twMerge(defaultClass, $$sanitized_props.class);
  Frame($$payload, spread_props([
    $$restProps,
    {
      class: frameClass,
      color: "none",
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, {
    multiple,
    flush,
    activeClass,
    inactiveClass,
    defaultClass,
    classActive,
    classInactive
  });
  pop();
}
function AccordionItem($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  let contentClass;
  let tag = fallback($$props["tag"], "h2");
  let open = fallback($$props["open"], false);
  let activeClass = fallback($$props["activeClass"], () => void 0, true);
  let inactiveClass = fallback($$props["inactiveClass"], () => void 0, true);
  let defaultClass = fallback($$props["defaultClass"], "flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700");
  let transitionType = fallback($$props["transitionType"], "slide");
  let transitionParams = fallback($$props["transitionParams"], () => ({}), true);
  let paddingFlush = fallback($$props["paddingFlush"], "py-5");
  let paddingDefault = fallback($$props["paddingDefault"], "p-5");
  let textFlushOpen = fallback($$props["textFlushOpen"], "text-gray-900 dark:text-white");
  let textFlushDefault = fallback($$props["textFlushDefault"], "text-gray-500 dark:text-gray-400");
  let borderClass = fallback($$props["borderClass"], "border-s border-e group-first:border-t");
  let borderOpenClass = fallback($$props["borderOpenClass"], "border-s border-e");
  let borderBottomClass = fallback($$props["borderBottomClass"], "border-b");
  let borderSharedClass = fallback($$props["borderSharedClass"], "border-gray-200 dark:border-gray-700");
  let classActive = fallback($$props["classActive"], () => void 0, true);
  let classInactive = fallback($$props["classInactive"], () => void 0, true);
  let activeCls = twMerge(activeClass, classActive);
  let inactiveCls = twMerge(inactiveClass, classInactive);
  const ctx = getContext("ctx") ?? {};
  ctx.selected ?? writable();
  open = false;
  let buttonClass;
  buttonClass = twMerge([
    defaultClass,
    ctx.flush || borderClass,
    borderBottomClass,
    borderSharedClass,
    ctx.flush ? paddingFlush : paddingDefault,
    open && (ctx.flush ? textFlushOpen : activeCls || ctx.activeClass),
    !open && (ctx.flush ? textFlushDefault : inactiveCls || ctx.inactiveClass),
    $$sanitized_props.class
  ]);
  contentClass = twMerge([
    ctx.flush ? paddingFlush : paddingDefault,
    ctx.flush ? "" : borderOpenClass,
    borderBottomClass,
    borderSharedClass
  ]);
  element(
    $$payload,
    tag,
    () => {
      $$payload.out += ` class="group"`;
    },
    () => {
      $$payload.out += `<button type="button"${attr("class", clsx(buttonClass))}${attr("aria-expanded", open)}><!---->`;
      slot($$payload, $$props, "header", {}, null);
      $$payload.out += `<!----> `;
      if (open) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "arrowup", {}, () => {
          $$payload.out += `<svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"></path></svg>`;
        });
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "arrowdown", {}, () => {
          $$payload.out += `<svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"></path></svg>`;
        });
        $$payload.out += `<!---->`;
      }
      $$payload.out += `<!--]--></button>`;
    }
  );
  $$payload.out += ` `;
  if (open) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div><div${attr("class", clsx(contentClass))}><!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    tag,
    open,
    activeClass,
    inactiveClass,
    defaultClass,
    transitionType,
    transitionParams,
    paddingFlush,
    paddingDefault,
    textFlushOpen,
    textFlushDefault,
    borderClass,
    borderOpenClass,
    borderBottomClass,
    borderSharedClass,
    classActive,
    classInactive
  });
  pop();
}
function Popper($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "activeContent",
    "arrow",
    "offset",
    "placement",
    "trigger",
    "triggeredBy",
    "reference",
    "strategy",
    "open",
    "yOnly",
    "middlewares"
  ]);
  push();
  let middleware;
  let activeContent = fallback($$props["activeContent"], false);
  let arrow = fallback($$props["arrow"], true);
  let offset = fallback($$props["offset"], 8);
  let placement = fallback($$props["placement"], "top");
  let trigger = fallback($$props["trigger"], "hover");
  let triggeredBy = fallback($$props["triggeredBy"], () => void 0, true);
  let reference = fallback($$props["reference"], () => void 0, true);
  let strategy = fallback($$props["strategy"], "absolute");
  let open = fallback($$props["open"], false);
  let yOnly = fallback($$props["yOnly"], false);
  let middlewares = fallback($$props["middlewares"], () => [dom.flip(), dom.shift()], true);
  let referenceEl;
  let floatingEl;
  let arrowEl;
  const px = (n) => n ? `${n}px` : "";
  let arrowSide;
  const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function updatePosition() {
    dom.computePosition(referenceEl, floatingEl, { placement, strategy, middleware }).then(({
      x,
      y,
      middlewareData,
      placement: placement2,
      strategy: strategy2
    }) => {
      floatingEl.style.position = strategy2;
      floatingEl.style.left = yOnly ? "0" : px(x);
      floatingEl.style.top = px(y);
      if (middlewareData.arrow && arrowEl instanceof HTMLDivElement) {
        arrowEl.style.left = px(middlewareData.arrow.x);
        arrowEl.style.top = px(middlewareData.arrow.y);
        arrowSide = oppositeSideMap[placement2.split("-")[0]];
        arrowEl.style[arrowSide] = px(-arrowEl.offsetWidth / 2 - ($$sanitized_props.border ? 1 : 0));
      }
    });
  }
  function init(node, _referenceEl) {
    floatingEl = node;
    let cleanup = dom.autoUpdate(_referenceEl, floatingEl, updatePosition);
    return {
      update(_referenceEl2) {
        cleanup();
        cleanup = dom.autoUpdate(_referenceEl2, floatingEl, updatePosition);
      },
      destroy() {
        cleanup();
      }
    };
  }
  let arrowClass;
  placement && (referenceEl = referenceEl);
  middleware = [
    ...middlewares,
    dom.offset(+offset),
    arrowEl
  ];
  arrowClass = twJoin("absolute pointer-events-none block w-[10px] h-[10px] rotate-45 bg-inherit border-inherit", $$sanitized_props.border && arrowSide === "bottom" && "border-b border-e", $$sanitized_props.border && arrowSide === "top" && "border-t border-s ", $$sanitized_props.border && arrowSide === "right" && "border-t border-e ", $$sanitized_props.border && arrowSide === "left" && "border-b border-s ");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (!referenceEl) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (referenceEl) {
      $$payload2.out += "<!--[-->";
      Frame($$payload2, spread_props([
        {
          use: init,
          options: referenceEl,
          role: "tooltip",
          tabindex: activeContent ? -1 : void 0
        },
        $$restProps,
        {
          get open() {
            return open;
          },
          set open($$value) {
            open = $$value;
            $$settled = false;
          },
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            slot($$payload3, $$props, "default", {}, null);
            $$payload3.out += `<!----> `;
            if (arrow) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div${attr("class", clsx(arrowClass))}></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        }
      ]));
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    activeContent,
    arrow,
    offset,
    placement,
    trigger,
    triggeredBy,
    reference,
    strategy,
    open,
    yOnly,
    middlewares
  });
  pop();
}
function Checkbox($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "color",
    "custom",
    "inline",
    "group",
    "choices",
    "value",
    "checked",
    "spacing",
    "groupLabelClass",
    "groupInputClass"
  ]);
  push();
  let color = fallback($$props["color"], "primary");
  let custom = fallback($$props["custom"], false);
  let inline = fallback($$props["inline"], false);
  let group = fallback($$props["group"], () => [], true);
  let choices = fallback($$props["choices"], () => [], true);
  let value = fallback($$props["value"], "on");
  let checked = fallback($$props["checked"], () => void 0, true);
  let spacing = fallback($$props["spacing"], () => $$slots.default ? "me-2" : "", true);
  let groupLabelClass = fallback($$props["groupLabelClass"], "");
  let groupInputClass = fallback($$props["groupInputClass"], "");
  let background = getContext("background");
  if (choices.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(choices);
    $$payload.out += `<!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let { value: value2, label } = each_array[i];
      Label($$payload, {
        class: labelClass(inline, groupLabelClass),
        show: $$slots.default,
        for: `checkbox-${i}`,
        children: ($$payload2) => {
          $$payload2.out += `<!---->${escape_html(label)} <input${spread_attributes({
            id: `checkbox-${i}`,
            type: "checkbox",
            value: value2,
            checked: group.includes(value2),
            ...$$restProps,
            class: clsx(inputClass(custom, color, true, background, spacing, groupInputClass))
          })}> <!---->`;
          slot($$payload2, $$props, "default", {}, null);
          $$payload2.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    Label($$payload, {
      class: labelClass(inline, $$sanitized_props.class),
      show: $$slots.default,
      children: ($$payload2) => {
        $$payload2.out += `<input${spread_attributes({
          type: "checkbox",
          checked,
          value,
          ...$$restProps,
          class: clsx(inputClass(custom, color, true, background, spacing, $$slots.default || $$sanitized_props.class))
        })}> <!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    color,
    custom,
    inline,
    group,
    choices,
    value,
    checked,
    spacing,
    groupLabelClass,
    groupInputClass
  });
  pop();
}
function Select($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "items",
    "value",
    "placeholder",
    "underline",
    "size",
    "defaultClass",
    "underlineClass"
  ]);
  push();
  let items = fallback($$props["items"], () => [], true);
  let value = fallback($$props["value"], "");
  let placeholder = fallback($$props["placeholder"], "Choose option ...");
  let underline = fallback($$props["underline"], false);
  let size = fallback($$props["size"], "md");
  let defaultClass = fallback($$props["defaultClass"], "text-gray-900 disabled:text-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:disabled:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500");
  let underlineClass = fallback($$props["underlineClass"], "text-gray-500 disabled:text-gray-400 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:disabled:text-gray-500 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer");
  const common = "block w-full";
  const sizes = {
    sm: "text-sm p-2",
    md: "text-sm p-2.5",
    lg: "text-base py-3 px-4"
  };
  let selectClass;
  selectClass = twMerge(common, underline ? underlineClass : defaultClass, sizes[size], underline && "!px-0", $$sanitized_props.class);
  $$payload.out += `<select${spread_attributes({
    ...$$restProps,
    class: clsx(selectClass)
  })}>`;
  if (placeholder) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<option disabled${attr("selected", value === void 0 ? true : void 0, true)} value="">${escape_html(placeholder)}</option>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (items && items.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(items);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { value: itemValue, name, disabled } = each_array[$$index];
      $$payload.out += `<option${attr("disabled", disabled, true)}${attr("value", itemValue)}${attr("selected", itemValue === value ? true : void 0, true)}>${escape_html(name)}</option>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></select>`;
  bind_props($$props, {
    items,
    value,
    placeholder,
    underline,
    size,
    defaultClass,
    underlineClass
  });
  pop();
}
function Textarea($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "value",
    "wrappedClass",
    "unWrappedClass",
    "innerWrappedClass",
    "headerClass",
    "footerClass"
  ]);
  push();
  let textareaClass;
  let value = fallback($$props["value"], () => void 0, true);
  let wrappedClass = fallback($$props["wrappedClass"], "block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50");
  let unWrappedClass = fallback($$props["unWrappedClass"], "p-2.5 text-sm focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50");
  let innerWrappedClass = fallback($$props["innerWrappedClass"], "py-2 px-4 bg-white dark:bg-gray-800");
  let headerClass = fallback($$props["headerClass"], "");
  let footerClass = fallback($$props["footerClass"], "");
  const background = getContext("background");
  let wrapped;
  let wrapperClass;
  const headerCls = (header) => twMerge(header ? "border-b" : "border-t", "py-2 px-3 border-gray-200", background ? "dark:border-gray-500" : "dark:border-gray-600", header ? headerClass : footerClass);
  let innerWrapperClass;
  wrapped = $$slots.header || $$slots.footer;
  wrapperClass = twMerge("w-full rounded-lg bg-gray-50", background ? "dark:bg-gray-600" : "dark:bg-gray-700", "text-gray-900 dark:placeholder-gray-400 dark:text-white", "border border-gray-200", background ? "dark:border-gray-500" : "dark:border-gray-600", $$sanitized_props.class);
  textareaClass = wrapped ? wrappedClass : twMerge(wrapperClass, unWrappedClass);
  innerWrapperClass = twMerge(innerWrappedClass, $$slots.footer ? "" : "rounded-b-lg", $$slots.header ? "" : "rounded-t-lg");
  Wrapper($$payload, {
    show: wrapped,
    class: wrapperClass,
    children: ($$payload2) => {
      if ($$slots.header) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div${attr("class", clsx(headerCls(true)))}><!---->`;
        slot($$payload2, $$props, "header", {}, null);
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      Wrapper($$payload2, {
        show: wrapped,
        class: innerWrapperClass,
        children: ($$payload3) => {
          $$payload3.out += `<textarea${spread_attributes({
            ...$$restProps,
            class: clsx(textareaClass)
          })}>`;
          const $$body = escape_html(value);
          if ($$body) {
            $$payload3.out += `${$$body}`;
          }
          $$payload3.out += `</textarea>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      if ($$slots.footer) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div${attr("class", clsx(headerCls(false)))}><!---->`;
        slot($$payload2, $$props, "footer", {}, null);
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, {
    value,
    wrappedClass,
    unWrappedClass,
    innerWrappedClass,
    headerClass,
    footerClass
  });
  pop();
}
function Tooltip($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["type", "defaultClass"]);
  push();
  let type = fallback($$props["type"], "dark");
  let defaultClass = fallback($$props["defaultClass"], "py-2 px-3 text-sm font-medium");
  const types = {
    dark: "bg-gray-900 text-white dark:bg-gray-700",
    light: "border-gray-200 bg-white text-gray-900",
    auto: " bg-white text-gray-900 dark:bg-gray-700 dark:text-white border-gray-200 dark:border-gray-700",
    custom: ""
  };
  let toolTipClass;
  {
    if ($$restProps.color) type = "custom";
    else $$restProps.color = "none";
    if (["light", "auto"].includes(type)) $$restProps.border = true;
    toolTipClass = twMerge("tooltip", defaultClass, types[type], $$sanitized_props.class);
  }
  Popper($$payload, spread_props([
    { rounded: true, shadow: true },
    $$restProps,
    {
      class: toolTipClass,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  bind_props($$props, { type, defaultClass });
  pop();
}
function Pill($$payload, $$props) {
  let {
    textContent,
    size = "medium",
    bgColor,
    textColor,
    borderRadius = "5px",
    tooltipText = false,
    padding = null,
    tailwindClass = ""
  } = $$props;
  $$payload.out += `<div${attr("class", `pill-container ${stringify(tailwindClass)} svelte-yx40fi`)}${attr("data-role", `pill-container-${stringify(size)}`)}${attr("style", `color: ${stringify(textColor)}; background-color: ${stringify(bgColor)}; border-radius: ${stringify(borderRadius)}; padding: ${stringify(padding ?? null)};`)}>${escape_html(textContent)}</div> `;
  if (tooltipText) {
    $$payload.out += "<!--[-->";
    Tooltip($$payload, {
      placement: "bottom",
      color: "light",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(tooltipText)}`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
}
function linkedNameOfComponent($$payload, folder, name, isLinkToChildComponent = true) {
  $$payload.out += `<a class="underline underline-offset-4"${attr("href", `/components/${stringify(folder)}/${stringify(textStringConversion(name, "kebab"))}`)}>`;
  if (isLinkToChildComponent) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="m-0 svelte-128tt68">${escape_html(name)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<h6>${escape_html(name)}</h6>`;
  }
  $$payload.out += `<!--]--></a>`;
}
function ComponentDetails($$payload, $$props) {
  push();
  let { homepage, details } = $$props;
  const each_array = ensure_array_like(["description", "context"]);
  $$payload.out += `<div data-role="details-container"${attr("class", `${stringify(homepage ? "" : "g-top-level-container")} flex flex-col gap-6 ${stringify(homepage ? "bg-slate-100 p-5 rounded-lg" : "")}`)}><div data-role="name-and-pill-container" class="flex flex-row items-center gap-4">`;
  if (homepage) {
    $$payload.out += "<!--[-->";
    linkedNameOfComponent($$payload, details.folder, details.name, false);
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<h2>${escape_html(details.name)}</h2>`;
  }
  $$payload.out += `<!--]--> `;
  if (details.status) {
    $$payload.out += "<!--[-->";
    Pill($$payload, {
      size: homepage ? "small" : "medium",
      textContent: textStringConversion(details.status, "title-first-word"),
      bgColor: "black",
      textColor: "white"
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  DividerLine($$payload, { margin: "0.2rem 0rem" });
  $$payload.out += `<!----> <dl data-role="details-grid-container" class="grid gap-y-4 svelte-128tt68"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let detail = each_array[$$index_1];
    const detailData = details[detail];
    if (detailData?.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(detailData);
      $$payload.out += `<dt>${escape_html(textStringConversion(detail, "title-first-word"))}:</dt> <dd class="svelte-128tt68"><!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let paragraph = each_array_1[$$index];
        if (paragraph.markdown) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="svelte-128tt68">${html(paragraph.content)}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<p class="svelte-128tt68">${escape_html(paragraph.content)}</p>`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></dd>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  if (details.childComponents?.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(details.childComponents);
    $$payload.out += `<div class="col-span-2">`;
    DividerLine($$payload, { margin: "0.6rem 0rem" });
    $$payload.out += `<!----></div> <dt>Child components:</dt> <dd class="flex flex-row flex-wrap gap-4 svelte-128tt68"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let childComponent = each_array_2[$$index_2];
      linkedNameOfComponent($$payload, childComponent.folder, childComponent.name);
    }
    $$payload.out += `<!--]--></dd>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (!homepage) {
    $$payload.out += "<!--[-->";
    if (details.requirements?.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_3 = ensure_array_like(details.requirements);
      $$payload.out += `<div class="col-span-2">`;
      DividerLine($$payload, { margin: "0.6rem 0rem" });
      $$payload.out += `<!----></div> <dt>Requirements:</dt> <ul class="flex flex-col gap-4"><!--[-->`;
      for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
        let requirement = each_array_3[i];
        $$payload.out += `<li${attr("class", `flex flex-col gap-4 ${stringify(requirement.fulfilled ? "text-green-700 line-through" : "")}`)}><dt class="font-bold">${escape_html(requirement.label)}</dt> <dd>${escape_html(requirement.description)}</dd> `;
        if (i != details.requirements.length - 1) {
          $$payload.out += "<!--[-->";
          DividerLine($$payload, { margin: "0.2rem 0rem" });
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></li>`;
      }
      $$payload.out += `<!--]--></ul>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="col-span-2">`;
    DividerLine($$payload, { margin: "0.6rem 0rem" });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></dl></div>`;
  pop();
}
function InputForParameter($$payload, $$props) {
  push();
  let { source, value = void 0 } = $$props;
  let propPillObject = propPillLookup[source.isProp];
  function parameterName($$payload2, name, propPillObject2, inline = false) {
    $$payload2.out += `<div${attr("class", `flex flex-row flex-wrap gap-1 mb-${stringify(inline ? 0 : 1)} items-center`)}><p class="m-0 p-0 text-lg text-black italic" style="font-weight: 500;">${escape_html(source.name)}</p> `;
    Pill($$payload2, {
      size: "extraSmall",
      textContent: propPillObject2.text,
      bgColor: propPillObject2.bgColor,
      textColor: propPillObject2.textColor,
      borderRadius: "15px",
      padding: propPillObject2.padding
    });
    $$payload2.out += `<!----></div>`;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (source.inputType === "function" || source.inputType === "javascript") {
      $$payload2.out += "<!--[-->";
      parameterName($$payload2, source.name, propPillObject);
      $$payload2.out += `<!----> <div class="h-[280px] w-full border rounded"></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      if (source.inputType === "dropdown") {
        $$payload2.out += "<!--[-->";
        parameterName($$payload2, source.name, propPillObject);
        $$payload2.out += `<!----> `;
        Select($$payload2, {
          class: "text-base",
          items: source.options.map((el) => ({ name: el, value: el })),
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          }
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        if (source.inputType === "radio") {
          $$payload2.out += "<!--[-->";
          const each_array = ensure_array_like(source.options);
          parameterName($$payload2, source.name, propPillObject);
          $$payload2.out += `<!----> <!--[-->`;
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let option = each_array[i];
            Radio($$payload2, {
              value: option,
              get group() {
                return value;
              },
              set group($$value) {
                value = $$value;
                $$settled = false;
              },
              children: ($$payload3) => {
                $$payload3.out += `<span class="text-base font-normal">${escape_html(option)}</span>`;
              },
              $$slots: { default: true }
            });
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
          if (source.inputType === "textArea") {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div>`;
            parameterName($$payload2, source.name, propPillObject);
            $$payload2.out += `<!----> `;
            Textarea($$payload2, {
              id: "textarea-id",
              rows: 9,
              get value() {
                return value;
              },
              set value($$value) {
                value = $$value;
                $$settled = false;
              }
            });
            $$payload2.out += `<!----></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
            if (source.inputType === "checkbox") {
              $$payload2.out += "<!--[-->";
              Checkbox($$payload2, {
                color: "orange",
                get checked() {
                  return value;
                },
                set checked($$value) {
                  value = $$value;
                  $$settled = false;
                },
                children: ($$payload3) => {
                  parameterName($$payload3, source.name, propPillObject, true);
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
              if (source.inputType === "input") {
                $$payload2.out += "<!--[-->";
                parameterName($$payload2, source.name, propPillObject);
                $$payload2.out += `<!----> `;
                Input($$payload2, {
                  size: "lg",
                  get value() {
                    return value;
                  },
                  set value($$value) {
                    value = $$value;
                    $$settled = false;
                  }
                });
                $$payload2.out += `<!---->`;
              } else {
                $$payload2.out += "<!--[!-->";
                if (source.inputType === "numberInput") {
                  $$payload2.out += "<!--[-->";
                  parameterName($$payload2, source.name, propPillObject);
                  $$payload2.out += `<!----> `;
                  Input($$payload2, {
                    children: invalid_default_snippet,
                    $$slots: {
                      default: ($$payload3, { props }) => {
                        $$payload3.out += `<input${spread_attributes({
                          type: "number",
                          ...props,
                          step: source?.step,
                          min: source?.min,
                          max: source?.max,
                          value
                        })}>`;
                      }
                    }
                  });
                  $$payload2.out += `<!---->`;
                } else {
                  $$payload2.out += "<!--[!-->";
                  if (source.inputType === "event") {
                    $$payload2.out += "<!--[-->";
                    parameterName($$payload2, source.name, propPillObject);
                    $$payload2.out += `<!----> <p class="my-2 mx-0 p-0 text-sm text-black">The ${escape_html(source.name)} event handler has been called ${escape_html(value[0])} time${escape_html(value[0] === 1 ? "" : "s")}${escape_html(value[1] ? " (" + value[1] + ")" : "")}.</p>`;
                  } else {
                    $$payload2.out += "<!--[!-->";
                    if ("label" in source) {
                      $$payload2.out += "<!--[-->";
                      parameterName($$payload2, source.name, propPillObject);
                    } else {
                      $$payload2.out += "<!--[!-->";
                    }
                    $$payload2.out += `<!--]-->`;
                  }
                  $$payload2.out += `<!--]-->`;
                }
                $$payload2.out += `<!--]-->`;
              }
              $$payload2.out += `<!--]-->`;
            }
            $$payload2.out += `<!--]-->`;
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]-->`;
    }
    $$payload2.out += `<!--]--> `;
    if ("label" in source) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<p class="my-2 mx-0 p-0 text-sm text-black">${escape_html(source.label)}</p> `;
      if (source.exampleCode) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<p class="mt-4 mb-0 mx-0 p-0 break-words text-sm rounded-md" style="color: #ba029b"><code>${html(source.exampleCode)}</code></p>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { value });
  pop();
}
function ParametersSection($$payload, $$props) {
  push();
  let {
    details,
    parametersSourceArray,
    parametersVisibleArray,
    parametersValuesArray = void 0
  } = $$props;
  let parameterCategories = [
    ...new Set(parametersSourceArray.map((el) => el.category))
  ];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like([0, 1, 2]);
    $$payload2.out += `<div data-role="parameters-section" class="mx-auto svelte-28wf3w"><h5 class="mb-6 underline underline-offset-4">Parameters</h5> <div class="flex flex-row gap-8"><div class="flex flex-row gap-8 pr-4"><p class="m-0 p-0 font-bold">Key</p> <div class="flex flex-row gap-12 mb-2"><div class="flex flex-row gap-2 flex-1">`;
    Pill($$payload2, {
      size: "extraSmall",
      textContent: propPillLookup[true].text,
      bgColor: propPillLookup[true].bgColor,
      textColor: propPillLookup[true].textColor,
      borderRadius: "15px",
      padding: propPillLookup[true].padding,
      tailwindClass: "self-start"
    });
    $$payload2.out += `<!----> <p class="m-0 p-0 text-sm"${attr("style", `color: ${stringify(propPillLookup[true].bgColor)}`)}>${escape_html("Parameters with this label are props which are passed directly to the <" + details.name + "> component.")}</p></div> <div class="flex flex-row gap-2 flex-1">`;
    Pill($$payload2, {
      size: "extraSmall",
      textContent: propPillLookup[false].text,
      bgColor: propPillLookup[false].bgColor,
      textColor: propPillLookup[false].textColor,
      borderRadius: "15px",
      padding: propPillLookup[false].padding,
      tailwindClass: "self-start"
    });
    $$payload2.out += `<!----> <p class="m-0 p-0 text-sm"${attr("style", `color: ${stringify(propPillLookup[false].bgColor)}`)}>${escape_html("Parameters with this label are used in the calculation of a prop which is passed to the <" + details.name + "> component.")}</p></div></div></div></div> `;
    DividerLine($$payload2, { margin: "5px 0px 15px 0px" });
    $$payload2.out += `<!----> <div class="mb-6 svelte-28wf3w" data-role="parameters-container"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
      let columnNumb = each_array[$$index_2];
      const each_array_1 = ensure_array_like(parameterCategories);
      $$payload2.out += `<div data-role="parameters-container-column" class="min-w-60 svelte-28wf3w"><!--[-->`;
      for (let i = 0, $$length2 = each_array_1.length; i < $$length2; i++) {
        let category = each_array_1[i];
        if (i % 3 === columnNumb) {
          $$payload2.out += "<!--[-->";
          const visibleParametersForCategory = parametersSourceArray.filter((el) => el.category === category && (el.inputType || "label" in el) && parametersVisibleArray[el.index]);
          $$payload2.out += `<div data-role="parameters-category-group" class="px-4 pt-0 pb-4 rounded-xl bg-gray-200 bg-opacity-25 svelte-28wf3w">`;
          Accordion($$payload2, {
            flush: true,
            children: ($$payload3) => {
              AccordionItem($$payload3, {
                children: ($$payload4) => {
                  const each_array_2 = ensure_array_like(visibleParametersForCategory);
                  $$payload4.out += `<div class="flex flex-col"><!--[-->`;
                  for (let i2 = 0, $$length3 = each_array_2.length; i2 < $$length3; i2++) {
                    let parameter = each_array_2[i2];
                    $$payload4.out += `<div>`;
                    InputForParameter($$payload4, {
                      source: parameter,
                      get value() {
                        return parametersValuesArray[parameter.index];
                      },
                      set value($$value) {
                        parametersValuesArray[parameter.index] = $$value;
                        $$settled = false;
                      }
                    });
                    $$payload4.out += `<!----> `;
                    if (i2 < visibleParametersForCategory.length - 1) {
                      $$payload4.out += "<!--[-->";
                      DividerLine($$payload4, { margin: "15px 0px 15px 0px" });
                    } else {
                      $$payload4.out += "<!--[!-->";
                    }
                    $$payload4.out += `<!--]--></div>`;
                  }
                  $$payload4.out += `<!--]--></div>`;
                },
                $$slots: {
                  default: true,
                  header: ($$payload4) => {
                    $$payload4.out += `<span class="text-2xl text-black" slot="header">${escape_html(category)}</span>`;
                  }
                }
              });
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!----></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]--></div> `;
    DividerLine($$payload2, { margin: "15px 0px 15px 0px" });
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { parametersValuesArray });
  pop();
}
function ScreenSizeRadio($$payload, $$props) {
  push();
  let { demoScreenWidth = void 0 } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(Object.keys(defaultScreenWidthBreakpoints));
    $$payload2.out += `<ul class="my-4 mx-0 items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600" style="min-width: 800px;"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let screenSizeOption = each_array[$$index];
      $$payload2.out += `<li class="w-full">`;
      Radio($$payload2, {
        name: "hor-list",
        class: "p-4 text-base",
        value: defaultScreenWidthBreakpoints[screenSizeOption],
        get group() {
          return demoScreenWidth;
        },
        set group($$value) {
          demoScreenWidth = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(screenSizeOption)} (${escape_html(defaultScreenWidthBreakpoints[screenSizeOption])}px)`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></li>`;
    }
    $$payload2.out += `<!--]--></ul>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { demoScreenWidth });
  pop();
}
function getValueFromParametersArray(parametersSourceArray, parametersValuesArray, fieldName) {
  return parametersValuesArray[parametersSourceArray?.findIndex((el) => el.name === fieldName)];
}
function addIndexAndInitalValue(array) {
  return array.map((el, i) => ({
    ...el,
    value: el.value ?? (el.inputType === "event" ? [0, null] : el.options?.[0] ?? null),
    index: i
  }));
}
function createParametersObject(parametersSourceArray, parametersValuesArray, derivedObject = {}) {
  const result = { ...derivedObject };
  parametersSourceArray.forEach((param, index) => {
    const {
      name,
      isProp = true,
      // default to true if not provided
      inputType,
      handlerFunction
    } = param;
    if (!isProp) {
      return;
    }
    let newValue = inputType === "event" ? handlerFunction : parametersValuesArray[index];
    if (inputType === "function") {
      try {
        newValue = new Function(`return (${parametersValuesArray[index]})`)();
      } catch (e) {
        newValue = void 0;
      }
    }
    if (Object.prototype.hasOwnProperty.call(derivedObject, name)) {
      newValue = derivedObject[name];
    }
    result[name] = newValue;
  });
  return result;
}
function trackVisibleParameters(parametersSourceArray, parametersValuesArray) {
  return parametersSourceArray.map(
    (el) => !("visible" in el) ? true : typeof el.visible === "boolean" ? el.visible : Array.isArray(el.visible) ? el.visible.map(
      (elm) => getValueFromParametersArray(
        parametersSourceArray,
        parametersValuesArray,
        elm.name
      ) === elm.value
    ).every((elm) => elm === true) : getValueFromParametersArray(
      parametersSourceArray,
      parametersValuesArray,
      el.visible.name
    ) === el.visible.value
  );
}
export {
  ComponentDetails as C,
  ParametersSection as P,
  ScreenSizeRadio as S,
  addIndexAndInitalValue as a,
  Pill as b,
  createParametersObject as c,
  defaultScreenWidthBreakpoints as d,
  foldersLookup as f,
  getValueFromParametersArray as g,
  trackVisibleParameters as t
};
