# Two independent Sandbox development/release pairs

Domain owner: voßfit.de (xn--vofit-mqa.de). This is NOT the official vossfit.de project.

## Pair A - Homepage
- Public Sandbox: https://xn--vofit-mqa.de (Spaceship-hosted).
- Homepage editor/staging: https://lab.xn--vofit-mqa.de (Spaceship-hosted).
- Promotion: Lab -> homepage only by explicit approval, with backup, diff, health checks and rollback.

## Pair B - VossBot OS
- Existing preview: https://bot.xn--vofit-mqa.de (Cloudflare Pages vossbot-preview-lab).
- Proposed editor: https://bot.lab.xn--vofit-mqa.de.
- Proposed live editor preview: https://page.bot.lab.xn--vofit-mqa.de.
- Editing the Bot Lab must update its own preview without affecting Pair A.
- Promotion: Bot Lab preview -> Pair A Lab only by explicit approval, then Pair A Lab -> homepage separately.
- No automatic cross-pair publication and no writes to official vossfit.de.

## Shared services and isolation
- Use the existing sandbox Firebase auth and Gemini API Worker only after validating the allowed hostnames and token audience.
- Use server-side secrets only. Never place Gemini secrets, Firebase admin keys or R2 tokens in public Git.
- Keep a separate namespace/project path for Bot Lab files and preview artifacts; do not let preview writes overwrite live Lab data.
- Editor and preview require access control. DNS + TLS + Cloudflare Pages custom domains must be verified before announcing a host as live.
- Existing bot.xn--vofit-mqa.de is a preview, not proof that new hosts are configured.

## Current work status
- Architecture recorded; DNS for bot.lab and page.bot.lab not yet created.
- Hosting targets, custom domain validation, access rules, and deployment pipeline not yet configured.
- Source-of-truth of current Spaceship homepage and Lab must be verified before replacement.
