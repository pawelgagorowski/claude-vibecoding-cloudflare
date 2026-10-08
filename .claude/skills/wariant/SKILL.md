---
name: wariant
description: Start a prototype variant on its own git branch so it gets a separate Cloudflare Preview link while the main link stays unchanged. Use when the user asks for "wariant", "wersja B", "osobny link", an alternative to show the client, or wants to try something without changing what the client sees.
---

# New variant

1. Get a short name (ask if missing) and turn it into an English branch name — it ends up in a link
   the client sees: lowercase a–z, 0–9 and dashes, starts with a letter, ≤ 25 chars
   (`side-menu`, `checkout-v2`). If the user gives a Polish name, translate it.
2. Uncommitted changes? Ask whether they belong to the new variant (carry them over) or to the
   current branch (commit them there first).
3. Branch from an up-to-date `main` unless the user wants to build on another variant:
   `git switch main && git pull && git switch -c <name>`.
4. Make the changes the user asks for, as usual.
5. Publish with `/opublikuj`. The first push creates the Preview link
   `https://<name>-<worker-name>.<account-subdomain>.workers.dev`.

Explain that `npm run dev` always shows the branch that is currently checked out, and that
switching versions is `git switch <branch>` (do it for the user).

Removing a variant (only when the user asks): `git push origin --delete <name>`,
`git branch -d <name>`, and the Preview itself with `npx wrangler preview delete --name <name>`
(needs `npx wrangler login`).
