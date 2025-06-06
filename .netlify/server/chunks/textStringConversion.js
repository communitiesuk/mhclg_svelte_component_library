function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function textStringConversion(text, caseType) {
  const words = text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[_-]/g, " ").split(/\s+/);
  switch (caseType) {
    case "pascal":
      return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
    case "camel":
      return words.map(
        (word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      ).join("");
    case "snake":
      return words.join("_");
    case "kebab":
      return words.join("-");
    case "upper-snake":
      return words.map((word) => word.toUpperCase()).join("_");
    case "title":
      return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    case "title-first-word":
      return words.map(
        (word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
      ).join(" ");
    default:
      throw new Error(
        'Invalid caseType provided. Choose from "pascal", "camel", "snake", "kebab", "upper-snake", "title", or "title-first-word".'
      );
  }
}
export {
  html as h,
  textStringConversion as t
};
