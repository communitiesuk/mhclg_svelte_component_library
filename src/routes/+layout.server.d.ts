import type { LayoutServerLoad } from "./$types.js";
export interface ComponentItem {
  name: string;
  path: string;
  children?: ComponentItem[];
  hasWrapper?: boolean;
}
export declare const load: LayoutServerLoad;
