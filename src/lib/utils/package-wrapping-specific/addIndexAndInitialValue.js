export function addIndexAndInitalValue(array) {
  return array.map((el, i) => ({
    ...el,
    isEditable: el.isEditable ?? true,
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
