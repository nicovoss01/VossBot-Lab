# VoßFit environments and ownership (2026-10-22)

| Environment | Workbench (Lab) | Test homepage |
| --- | --- | --- |
| Official Project - OUT OF SCOPE | lab.vossfit.de | vossfit.de |
| Sandbox | lab.voßfit.de / lab.xn--vofit-mqa.de | voßfit.de / xn--vofit-mqa.de |
| Playground | bot.voßfit.de / bot.xn--vofit-mqa.de | lab.bot.voßfit.de / lab.bot.xn--vofit-mqa.de |

**Important:** bot.voßfit.de serves the VoßBot OS workbench, NOT the VoßFit homepage. lab.bot.voßfit.de serves the test homepage, NOT the workbench. The official Project is never changed here.

## Editing and promotion
- The Playground workbench edits/stages the Playground test homepage. The visible Playground homepage can update immediately after a saved preview, with version history and rollback.
- Promotion from Playground to Sandbox is explicit, reviewed and reversible; never automatic.
- Sandbox workbench separately stages the Sandbox homepage.
- Never automatically deploy Playground changes to the Sandbox or Project.
- Frontend/UI ownership: other chat (layout, windows, buttons, direct tap/click behavior).
- Infrastructure ownership: this chat (repository, auth, data, API, storage, preview/release pipeline).
- Coordinate through docs/TEAM-HANDOFF.md and separate branches/PRs; no assumption of live chat-to-chat messaging.

## Observed status
- Cloudflare Pages vossbot-preview-lab already owns bot.xn--vofit-mqa.de, but its actual deployed content must be validated against the desired workbench.
- lab.bot.xn--vofit-mqa.de was not present in the checked DNS or Pages custom domains.
- Repository already tracks apps/homepage and apps/lab, but they are NOT verified byte-identical to the current Spaceship-hosted Sandbox sites.
- Never blindly overwrite live sites or import potentially secret-bearing source into this public repository.
