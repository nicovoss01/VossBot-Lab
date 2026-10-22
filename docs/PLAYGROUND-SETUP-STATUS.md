# Playground setup status — 2026-10-22

## Exact host roles
- bot.voßfit.de (bot.xn--vofit-mqa.de): VoßBot OS workbench / main Playground.
- lab.bot.voßfit.de (lab.bot.xn--vofit-mqa.de): VoßFit test homepage controlled from Playground workbench.
- lab.voßfit.de: existing Sandbox workbench; voßfit.de: existing Sandbox homepage.
- vossfit.de and lab.vossfit.de: official Project, explicitly excluded.

## Repository/source
- Public GitHub repo: nicovoss01/VossBot-Lab.
- Existing tracked apps/lab and apps/homepage include HTML/assets and Firebase sandbox browser config.
- Local UI changes in apps/lab/index.html and untracked werkbank.html are preserved, not overwritten.
- Local safety copies on ThinkPad Desktop/Playground-Source-Backup-2026-10-22 (NOT in public Git).
- Repo homepage and local lab HTML scan detected key-like patterns. They are heuristic matches and require redacted review before further public commits or deployment.
- Exact byte parity with current Spaceship-hosted Sandbox homepage and Lab has not yet been established. Do not claim a completed live copy.

## Cloudflare progress
- Existing Pages project vossbot-preview-lab already has custom domain bot.xn--vofit-mqa.de.
- Existing Pages project vossbot-preview-homepage is the intended target for lab.bot.xn--vofit-mqa.de.
- Registered custom domain lab.bot.xn--vofit-mqa.de on Pages project vossbot-preview-homepage; it is INITIALIZING and verification PENDING.
- Existing DNS AAAA for lab.bot.xn--vofit-mqa.de is 100:: and read-only; Cloudflare refused direct replacement (error 1043). Pages reports 'CNAME record not set'. This must be reconciled through the owning Cloudflare feature, not bypassed.
- No existing Sandbox DNS or official Project DNS was changed.

## Backend remaining
- Verify Firebase authorized domains and actual sign-in flow for both Playground hosts.
- Verify Gemini Worker CORS and token audience for both hosts; keep provider secret server-side.
- Verify private R2 file worker authenticated upload/download and storage namespaces.
- Ensure the workbench publishes only to its own test homepage; Playground -> Sandbox is separately approved and reversible.
- Verify current source on Spaceship via authorized access before deploying a supposedly identical clone.

## Coordination with UI chat
- UI chat owns layout and immediate window/button/navigation interactions.
- Infrastructure chat owns auth, storage, APIs, preview/release and domain setup.
- Discuss scope and decisions through project conversation context; use GitHub docs/PRs as a durable record, not as a substitute for discussing decisions.
