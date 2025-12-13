import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Note and jotting collections removed — replaced by `christianity` and `technology` collections.

/**
 * Preface collection configuration
 * Represents introductory content, site announcements, or special pages
 */
const preface = defineCollection({
	// Load all markdown files
	loader: glob({ pattern: "**/*.md", base: "./src/content/preface" }),
	schema: z.object({
		timestamp: z.date() // Creation timestamp
	})
});

/**
 * Christianity collection configuration
 * Allows placing Christianity-specific posts under src/content/christianity
 */
const christianity = defineCollection({
	loader: glob({ pattern: ["**/*.md", "!**/_*.md", "!**/_*/*.md"], base: "./src/content/christianity" }),
	schema: z.object({
		title: z.string(),
		timestamp: z.date(),
		tags: z.array(z.string()).optional(),
		description: z.string().optional(),
		cover: z.string().optional(),
		coverAlt: z.string().optional(),
		sensitive: z.boolean().default(false),
		top: z.number().int().nonnegative().default(0),
		draft: z.boolean().default(false)
	})
});

/**
 * Technology collection configuration
 * Allows placing technology-specific posts under src/content/technology
 */
const technology = defineCollection({
	loader: glob({ pattern: ["**/*.md", "!**/_*.md", "!**/_*/*.md"], base: "./src/content/technology" }),
	schema: z.object({
		title: z.string(),
		timestamp: z.date(),
		tags: z.array(z.string()).optional(),
		description: z.string().optional(),
		cover: z.string().optional(),
		coverAlt: z.string().optional(),
		sensitive: z.boolean().default(false),
		top: z.number().int().nonnegative().default(0),
		draft: z.boolean().default(false)
	})
});

/**
 * Information collection configuration
 * Represents static content like about pages, policies, or site information
 */
const information = defineCollection({
	// Load both markdown and YAML files for mixed content types
	loader: glob({ pattern: "**/*.{md,mdx,yaml}", base: "./src/content/information" })
});

export const collections = { preface, christianity, technology, information };
