import { readMarkdownFile } from '../markdown/markdown.server';
import { Profile } from '../../interfaces/profile.interface';

export const getProfile = async (): Promise<Profile> => {
  const { frontmatter, content } = await readMarkdownFile('profile.md');

  return {
    name: frontmatter.name,
    title: frontmatter.title,
    location: frontmatter.location,
    email: frontmatter.email,
    phone: frontmatter.phone,
    linkedin: frontmatter.linkedin,
    website: frontmatter.website,
    yearsExperience: frontmatter.years_experience,
    consultingExperience: frontmatter.consulting_experience,
    specialization: frontmatter.specialization,
    content
  };
};
