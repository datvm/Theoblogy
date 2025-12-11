#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (e) => {
    const res = path.resolve(dir, e.name);
    return e.isDirectory() ? walk(res) : res;
  }));
  return Array.prototype.concat(...files);
}

function extractFrontmatter(content) {
  if (!content.startsWith('---')) return null;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return null;
  return content.slice(3, end + 1).trim();
}

function parseTimestamp(frontmatter) {
  const m = frontmatter.match(/^timestamp:\s*(.+)$/m);
  if (!m) return { found: false };
  let v = m[1].trim();
  // strip surrounding quotes
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  const d = new Date(v);
  return { found: true, raw: v, valid: !Number.isNaN(d.getTime()) };
}

async function main() {
  const root = path.resolve(process.cwd(), 'src', 'content');
  try {
    const all = await walk(root);
    const md = all.filter(f => f.endsWith('.md'));
    let ok = true;
    for (const f of md) {
      const content = await fs.readFile(f, 'utf8');
      const fm = extractFrontmatter(content);
      if (!fm) {
        console.warn(`MISSING_FRONTMATTER: ${path.relative(process.cwd(), f)}`);
        ok = false;
        continue;
      }
      const ts = parseTimestamp(fm);
      if (ts.found && !ts.valid) {
        console.error(`BAD_TIMESTAMP: ${path.relative(process.cwd(), f)} -> ${ts.raw}`);
        ok = false;
      }
    }
    if (!ok) process.exit(2);
    console.log('All frontmatter timestamps look valid.');
  } catch (err) {
    console.error('Error scanning content:', err.message || err);
    process.exit(1);
  }
}

main();
