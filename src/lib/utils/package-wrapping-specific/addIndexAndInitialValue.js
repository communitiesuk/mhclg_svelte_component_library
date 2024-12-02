export function addIndexAndInitalValue(array) {
  return array.map((el, i) => ({
    ...el,
    value:
      el.value ??
      (el.inputType === 'event' ? [0, null] : (el.options?.[0] ?? null)),
    index: i,
  }));
}
