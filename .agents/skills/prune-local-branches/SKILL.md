---
name: prune-local-branches
description: Delete local git branches whose remote tracking branches no longer exist on GitHub. Use when the user asks to clean up branches, prune local branches, or remove stale branches after merging PRs.
---

# Prune Local Branches

Delete local branches that have been merged and deleted from the remote.

## Workflow

1. **Fetch and prune remote tracking refs**

```bash
git fetch --prune
```

2. **List branches with tracking status**

```bash
git branch -vv
```

Branches marked `[origin/branch-name: gone]` have deleted remotes.

3. **Delete stale branches**

Delete each branch marked as `gone`:

```bash
git branch -D branch-name
```

Or delete multiple at once:

```bash
git branch -D branch1 branch2 branch3
```

## Notes

- Never delete `main` or `master`
- The `-D` flag force-deletes; use `-d` if you want git to warn about unmerged changes
- Always confirm with the user before bulk deletion
