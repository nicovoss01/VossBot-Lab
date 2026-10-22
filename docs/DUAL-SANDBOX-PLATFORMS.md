# Environment names and domain mapping (2026-10-22)

All three environments have their own main site and Lab workbench.

| Environment | Main site | Lab workbench |
| --- | --- | --- |
| Project (untouched) | vossfit.de | lab.vossfit.de |
| Sandbox | voßfit.de (xn--vofit-mqa.de) | lab.voßfit.de (lab.xn--vofit-mqa.de) |
| Playground | bot.voßfit.de (bot.xn--vofit-mqa.de) | lab.bot.voßfit.de (lab.bot.xn--vofit-mqa.de) |

## Release boundaries
- Playground Lab edits and tests Playground only. Once saved/published, changes appear on bot.voßfit.de.
- Promotion Playground -> Sandbox is explicit, backed up, tested and reversible; never automatic.
- Sandbox Lab edits and stages Sandbox main site; its release to voßfit.de is separate.
- The official Project and Project Lab are completely out of scope. No deployment, DNS or API edits there.
- Share sandbox infrastructure only when permission checks and data namespaces are isolated. Never publish server secrets in Git.

## Current verified status
- bot.voßfit.de already maps to Cloudflare Pages project vossbot-preview-lab.
- lab.bot.voßfit.de is not yet configured in the observed DNS/Pages inventory.
- GitHub repository nicovoss01/VossBot-Lab is public. The existing worktree has uncommitted changes which must be preserved.
- This document records target architecture, not a claim of completed deployment or authentication tests.
