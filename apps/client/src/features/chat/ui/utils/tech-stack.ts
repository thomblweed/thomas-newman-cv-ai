import { AwsLambdaIcon } from '../components/AnswerCard/icons/AwsLambdaIcon';
import { CssIcon } from '../components/AnswerCard/icons/CssIcon';
import { HtmlIcon } from '../components/AnswerCard/icons/HtmlIcon';
import { JavaScriptIcon } from '../components/AnswerCard/icons/JavaScriptIcon';
import { NextJsIcon } from '../components/AnswerCard/icons/NextJsIcon';
import { NodeIcon } from '../components/AnswerCard/icons/NodeIcon';
import { PlaywrightIcon } from '../components/AnswerCard/icons/PlaywrightIcon';
import { ReactIcon } from '../components/AnswerCard/icons/ReactIcon';
import { RemixIcon } from '../components/AnswerCard/icons/RemixIcon';
import { TestingLibraryIcon } from '../components/AnswerCard/icons/TestingLibraryIcon';
import { TypeScriptIcon } from '../components/AnswerCard/icons/TypeScriptIcon';
import { VitestIcon } from '../components/AnswerCard/icons/VitestIcon';

import type { ComponentType } from 'react';

export interface TechStackEntry {
  label: string;
  Icon?: ComponentType<{ className?: string }>;
}

export interface TechChipData {
  slug: string;
  label: string;
  Icon?: ComponentType<{ className?: string }>;
}

export const techStack: Record<string, TechStackEntry> = {
  'amplience-cms': { label: 'Amplience CMS' },
  angular: { label: 'Angular' },
  archon: { label: 'Archon' },
  'aws-cognito': { label: 'AWS Cognito' },
  'aws-eks': { label: 'AWS EKS' },
  'aws-kinesis': { label: 'AWS Kinesis' },
  'aws-lambda': { label: 'AWS Lambda', Icon: AwsLambdaIcon },
  'aws-rds': { label: 'AWS RDS' },
  'aws-s3': { label: 'AWS S3' },
  'aws-sqs': { label: 'AWS SQS' },
  bitbucket: { label: 'Bitbucket' },
  camel: { label: 'Apache Camel' },
  'chakra-ui': { label: 'Chakra UI' },
  'claude-code': { label: 'Claude Code' },
  cloudflare: { label: 'Cloudflare' },
  connectrpc: { label: 'ConnectRPC' },
  csharp: { label: 'C#' },
  css: { label: 'CSS', Icon: CssIcon },
  'css-modules': { label: 'CSS Modules' },
  'cursor-ai': { label: 'Cursor AI' },
  cypress: { label: 'Cypress' },
  docker: { label: 'Docker' },
  dropwizard: { label: 'Dropwizard' },
  'dynamics-crm': { label: 'Dynamics CRM' },
  'entity-framework': { label: 'Entity Framework' },
  enzyme: { label: 'Enzyme' },
  eslint: { label: 'ESLint' },
  figma: { label: 'Figma' },
  flatfile: { label: 'Flatfile' },
  gcloud: { label: 'Google Cloud' },
  gherkin: { label: 'Gherkin' },
  github: { label: 'GitHub' },
  'github-actions': { label: 'GitHub Actions' },
  gitlab: { label: 'GitLab' },
  html: { label: 'HTML', Icon: HtmlIcon },
  java: { label: 'Java' },
  javascript: { label: 'JavaScript', Icon: JavaScriptIcon },
  jenkins: { label: 'Jenkins' },
  jest: { label: 'Jest' },
  jira: { label: 'Jira' },
  jotai: { label: 'Jotai' },
  jquery: { label: 'jQuery' },
  junit: { label: 'JUnit' },
  kafka: { label: 'Apache Kafka' },
  kubernetes: { label: 'Kubernetes' },
  'legend-state': { label: 'Legend State' },
  linear: { label: 'Linear' },
  linq: { label: 'LINQ' },
  mantine: { label: 'Mantine' },
  'material-ui': { label: 'Material UI' },
  maven: { label: 'Maven' },
  'micro-frontends': { label: 'Micro-frontends' },
  microservices: { label: 'Microservices' },
  middy: { label: 'Middy' },
  'mock service worker': { label: 'Mock Service Worker' },
  mockito: { label: 'Mockito' },
  'module-federation': { label: 'Module Federation' },
  nextjs: { label: 'Next.js', Icon: NextJsIcon },
  node: { label: 'Node.js', Icon: NodeIcon },
  'npm-workspaces': { label: 'npm Workspaces' },
  nx: { label: 'Nx' },
  playwright: { label: 'Playwright', Icon: PlaywrightIcon },
  postgres: { label: 'PostgreSQL' },
  powershell: { label: 'PowerShell' },
  prettier: { label: 'Prettier' },
  protobuf: { label: 'Protobuf' },
  rancher: { label: 'Rancher' },
  react: { label: 'React', Icon: ReactIcon },
  'react-router': { label: 'React Router' },
  'redux-toolkit': { label: 'Redux Toolkit' },
  remix: { label: 'Remix', Icon: RemixIcon },
  renovate: { label: 'Renovate' },
  rspack: { label: 'Rspack' },
  'semantic-release': { label: 'semantic-release' },
  sentry: { label: 'Sentry' },
  serverless: { label: 'Serverless' },
  sharepoint: { label: 'SharePoint' },
  'sharepoint-2010': { label: 'SharePoint 2010' },
  'sharepoint-2013': { label: 'SharePoint 2013' },
  'sharepoint-2016': { label: 'SharePoint 2016' },
  'sharepoint-365': { label: 'SharePoint 365' },
  spfx: { label: 'SPFx' },
  'spring-boot': { label: 'Spring Boot' },
  'sql-server': { label: 'SQL Server' },
  storybook: { label: 'Storybook' },
  'styled-components': { label: 'styled-components' },
  stylelint: { label: 'Stylelint' },
  supertest: { label: 'Supertest' },
  tailwind: { label: 'Tailwind CSS' },
  'tanstack-form': { label: 'TanStack Form' },
  'tanstack-query': { label: 'TanStack Query' },
  'tanstack-table': { label: 'TanStack Table' },
  testcafe: { label: 'TestCafe' },
  'testing-library': { label: 'Testing Library', Icon: TestingLibraryIcon },
  typescript: { label: 'TypeScript', Icon: TypeScriptIcon },
  vite: { label: 'Vite' },
  vitest: { label: 'Vitest', Icon: VitestIcon },
  wcf: { label: 'WCF' },
  webpack: { label: 'Webpack' },
  xstate: { label: 'XState' },
  zod: { label: 'Zod' },
  zustand: { label: 'Zustand' }
};

const humanizeSlug = (slug: string): string =>
  slug
    .split(/[-_ ]+/)
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const resolveTechStack = (slugs?: string[]): TechChipData[] =>
  (slugs ?? []).map((slug) => {
    const entry = techStack[slug];

    return entry
      ? { slug, label: entry.label, Icon: entry.Icon }
      : { slug, label: humanizeSlug(slug) };
  });
