import siteConfig from "./src/utils/config";

const config = siteConfig({
	title: "Theoblogy",
	prologue: "Reflections on faith, theology, and technology.",
	author: {
		name: "datvm",
		email: "",
		link: "https://theoblogy.lukevo.com"
	},
	description: "A modern Astro-powered blog for theology and tech.",
	copyright: {
		type: "CC BY-NC-ND 4.0",
		year: "2025"
	},
	i18n: {
		locales: ["en", "vi"],
		defaultLocale: "en"
	},
	feed: {
		section: "*",
		limit: 20
	},
	latest: "*"
});

export const monolocale = Number(config.i18n.locales.length) === 1;

export default config;
