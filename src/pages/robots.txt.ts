import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
	const text = `
User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /
Disallow: /cdn-cgi

Sitemap: ${new URL("sitemap-index.xml", site)}
`;

	return new Response(text);
};
