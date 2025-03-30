export function addIndexAndInitalValue(array) {
  return array.map((el, i) => ({
    ...el,
    isEditable:
      (el.value == null && el.options == null) ||
      typeof el.value === "function" ||
      el.isBinded ||
      el.propType === "fixed"
        ? false
        : true,
    isProp: el.isProp ?? true,
    value:
      el.value ??
      (el.inputType === "event"
        ? [0, null]
        : el.inputType === "checkbox"
          ? false
          : (el.options?.[0] ?? null)),
    index: i,
  }));
}
