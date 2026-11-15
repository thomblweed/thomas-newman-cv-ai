import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import matter from 'gray-matter';

import { resolveTechStack, techStack } from './tech-stack';

const rolesPath = path.join(process.cwd(), 'data/cv/roles');

const readRoleTechStackSlugs = (): string[] => {
  const files = fs
    .readdirSync(rolesPath)
    .filter((file) => file.endsWith('.md'));

  const slugs = files.flatMap((file) => {
    const { data } = matter(
      fs.readFileSync(path.join(rolesPath, file), 'utf-8')
    );

    return Array.isArray(data.tech_stack) ? (data.tech_stack as string[]) : [];
  });

  return [...new Set(slugs)];
};

it('should have a curated label for every tech stack slug in the role data', () => {
  const missing = readRoleTechStackSlugs().filter(
    (slug) => !(slug in techStack)
  );

  expect(missing).toEqual([]);
});

it('should map a known slug to its curated label and icon', () => {
  const chips = resolveTechStack(['typescript']);

  expect(chips[0]).toMatchObject({ slug: 'typescript', label: 'TypeScript' });
  expect(chips[0]?.Icon).toBeDefined();
});

it('should render a label-only chip for a slug with no curated icon', () => {
  const chips = resolveTechStack(['docker']);

  expect(chips[0]).toMatchObject({ slug: 'docker', label: 'Docker' });
  expect(chips[0]?.Icon).toBeUndefined();
});

it('should humanise a slug that is not in the curated map', () => {
  const chips = resolveTechStack(['brand-new-tool']);

  expect(chips[0]).toMatchObject({
    slug: 'brand-new-tool',
    label: 'Brand New Tool'
  });
  expect(chips[0]?.Icon).toBeUndefined();
});

it('should return an empty list when a role has no tech stack', () => {
  expect(resolveTechStack(undefined)).toEqual([]);
});
