import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/fonts/bold-affa96571d-v2.woff","assets/fonts/bold-b542beb274-v2.woff2","assets/fonts/light-94a07e06a1-v2.woff2","assets/fonts/light-f591b13f7d-v2.woff","assets/images/favicon.ico","assets/images/favicon.svg","assets/images/govuk-crest.svg","assets/images/govuk-icon-180.png","assets/images/govuk-icon-192.png","assets/images/govuk-icon-512.png","assets/images/govuk-icon-mask.svg","assets/images/govuk-opengraph-image.png","assets/images/oflog_crest_black.png","assets/images/oflog_crest_white.png","assets/manifest.json","css/govuk-frontend.min.css","css/govuk-frontend.min.css.map","data/svgFontDimensions.json","data/testData.json","fonts/bold-affa96571d-v2.woff","fonts/bold-b542beb274-v2.woff2","fonts/light-94a07e06a1-v2.woff2","fonts/light-f591b13f7d-v2.woff","js/govuk-frontend.min.js"]),
	mimeTypes: {".woff":"font/woff",".woff2":"font/woff2",".svg":"image/svg+xml",".png":"image/png",".json":"application/json",".css":"text/css",".map":"application/json",".js":"text/javascript"},
	_: {
		client: {"start":"_app/immutable/entry/start.Dcz7IS7o.js","app":"_app/immutable/entry/app.f9hZLmtz.js","imports":["_app/immutable/entry/start.Dcz7IS7o.js","_app/immutable/chunks/B6T8vOCz.js","_app/immutable/chunks/BqQgSr2I.js","_app/immutable/chunks/BgMzVouQ.js","_app/immutable/chunks/NWAaYpEX.js","_app/immutable/entry/app.f9hZLmtz.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BqQgSr2I.js","_app/immutable/chunks/DSCCKllV.js","_app/immutable/chunks/CKb67zNv.js","_app/immutable/chunks/BAnyEor3.js","_app/immutable/chunks/NrSncrqb.js","_app/immutable/chunks/vSpGRw5b.js","_app/immutable/chunks/BupwT6iW.js","_app/immutable/chunks/NWAaYpEX.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js')),
			__memo(() => import('../server/nodes/10.js')),
			__memo(() => import('../server/nodes/11.js')),
			__memo(() => import('../server/nodes/12.js')),
			__memo(() => import('../server/nodes/13.js')),
			__memo(() => import('../server/nodes/14.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/components-update/[slug]/[slug]",
				pattern: /^\/components-update\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/components/content/pill",
				pattern: /^\/components\/content\/pill\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/components/data-vis/bar",
				pattern: /^\/components\/data-vis\/bar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/components/data-vis/line",
				pattern: /^\/components\/data-vis\/line\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/components/layout/divider-line",
				pattern: /^\/components\/layout\/divider-line\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/components/ui/accordion",
				pattern: /^\/components\/ui\/accordion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/components/ui/checkbox",
				pattern: /^\/components\/ui\/checkbox\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/components/ui/radios",
				pattern: /^\/components\/ui\/radios\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/playground/create-a-bar-chart",
				pattern: /^\/playground\/create-a-bar-chart\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/playground/create-a-reactive-line-chart",
				pattern: /^\/playground\/create-a-reactive-line-chart\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/playground/passing-snippets-to-accordion",
				pattern: /^\/playground\/passing-snippets-to-accordion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/user-guide",
				pattern: /^\/user-guide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
