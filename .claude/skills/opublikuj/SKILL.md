---
name: opublikuj
description: Publish the current prototype changes to the shareable Cloudflare link (build, commit, push). Use when the user says "opublikuj", "wypchnij", "wrzuć na link", "zaktualizuj link", "deploy" or "publish".
---

# Publish

1. Check `git status` and the current branch. Nothing to commit and nothing to push → tell the user
   the link is already up to date and stop.
2. Run `npm run build`. If it fails, fix the errors and rebuild — never publish a broken build.
3. Stage and commit everything with a short Polish message describing the change from the user's
   point of view (e.g. `Ekran płatności: podsumowanie zamówienia`). If the diff contains `.env*`,
   `.dev.vars*`, something that looks like real client data or a secret — stop and ask.
4. Tell the user what will be published and where, then ask for OK:
   - on `main` → the production link (the one the team / client has),
   - on another branch → only that branch's Preview link; production stays untouched.
5. `git pull --rebase`, then `git push` (first push of a new branch: `git push -u origin <branch>`).
   On conflicts: stop, explain in plain words, ask how to proceed.
6. Reply with the link (production: see AGENTS.md → Links; branch:
   `https://<branch>-<worker-name>.<account-subdomain>.workers.dev`) and say Cloudflare needs about
   1–2 minutes to build. Build status: the commit's checks on GitHub
   (`gh api repos/{owner}/{repo}/commits/<sha>/check-runs`) or Cloudflare dashboard → Worker →
   Deployments.

## Promoting a variant to production

When the user wants a variant to become the main version ("przenieś na główny link"):
`git switch main && git pull && git merge --no-ff <branch>`, run `npm run build`, then publish `main`
as above.
