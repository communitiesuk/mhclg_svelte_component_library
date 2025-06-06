import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Dh8kUbB4.js","_app/immutable/chunks/BgMzVouQ.js","_app/immutable/chunks/CKb67zNv.js","_app/immutable/chunks/BqQgSr2I.js","_app/immutable/chunks/CQyCnfGD.js","_app/immutable/chunks/DOpM9Ngp.js","_app/immutable/chunks/BAnyEor3.js","_app/immutable/chunks/BupwT6iW.js"];
export const stylesheets = ["_app/immutable/assets/0.CUdpAKdf.css"];
export const fonts = [];
