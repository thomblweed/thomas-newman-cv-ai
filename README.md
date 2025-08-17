# Thomas Newman CV AI

## Pre-requisites

This project uses the following technologies:

- [pnpm](https://pnpm.io/)
- [Turborepo](https://turborepo.com/)
- [Node.js](https://nodejs.org/)

Install Turborepo globally:

```bash
pnpm add turbo --global
```

You may see see this error when running `turbo` commands:

```
WARNING  No locally installed `turbo` found in your repository. Using globally installed version (CURRENT_VERSION), which can cause unexpected behavior.

Installing the version in your repository (CURRENT_VERSION) before calling `turbo` will result in more predictable behavior across environments.
```

To resolve this issue, install locally:

```bash
pnpm add turbo --save-dev --ignore-workspace-root-check
```

## Setup

Install dependencies:

```bash
pnpm install
```
