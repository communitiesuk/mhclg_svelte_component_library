/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-svelte"],
  svelteStrictMode: true,
  svelteBracketNewLine: true,
  svelteAllowShorthand: true,
  svelteIndentScriptAndStyle: true,
};

export default config;
