import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';

const dataPath = path.join(process.cwd(), 'data/cv');

export const readMarkdownFile = async (relativePath: string) => {
  const fullPath = path.join(dataPath, relativePath);
  const fileContent = await fs.readFile(fullPath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  return { frontmatter, content };
};
