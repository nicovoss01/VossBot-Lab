# VoßBot OS team handoff

Updated: 2026-10-22

## Shared objective
- Playground workbench: bot.voßfit.de, source target apps/lab (subject to reconciliation with UI branch).
- Playground test homepage: lab.bot.voßfit.de, source target apps/homepage (subject to reconciliation with current Sandbox source).
- Sandbox workbench: lab.voßfit.de; Sandbox homepage: voßfit.de.
- Official vossfit.de and lab.vossfit.de are out of scope.

## UI/Layout chat owns
- Visual structure, responsive layout, buttons, windows, navigation and immediate UI interactions.
- Please use a dedicated UI feature branch and record changed files and integration expectations here or in a PR.
- Do not commit API secrets or directly deploy to official Project.

## Infrastructure chat owns
- Source reconciliation, secure Firebase login, Cloudflare Workers/Gemini, persistent data and R2, Pages domains, deployment, rollback, permissions.
- Provide stable interface contracts to UI modules; do not overwrite UI work without review.

## Current handoff
- Corrected Playground host mapping documented in docs/DUAL-SANDBOX-PLATFORMS.md.
- Git tracks apps/homepage/index.html and apps/lab/index.html with assets, but these are not confirmed as the latest deployed Spaceship files.
- Local UI work is uncommitted: apps/lab/index.html, apps/lab/werkbank.html and preview directories. Preserve and coordinate before merging.
- Existing Cloudflare Pages project vossbot-preview-lab is attached to bot.voßfit.de. Its content is not yet verified.
- lab.bot.voßfit.de DNS, custom domain and deployment are still outstanding.
- Do not use bot.lab.voßfit.de or page.bot.lab.voßfit.de; those are obsolete proposals.

## Next integration checkpoint
1. Verify current Spaceship Sandbox and Lab source (read-only backup and checksum comparison).
2. Review and sanitize source before committing to public Git.
3. Publish workbench to bot.voßfit.de and test homepage to lab.bot.voßfit.de in isolated Pages projects.
4. Validate Firebase authorized domains, Gemini Worker CORS/auth and R2 access, with secrets server-side.
5. Implement preview update and explicit Playground -> Sandbox promotion with rollback.
