import { readMarkdownFile } from '../markdown/markdown.server';

export const getProfile = async () => {
  const { frontmatter } = await readMarkdownFile('profile.md');

  return {
    name: frontmatter.name
  };
};
