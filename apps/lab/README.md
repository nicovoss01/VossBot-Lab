# VoßFit Sandbox Lab

## Repository status

- The `apps/lab/index.html` page is currently a standalone **demo/workshop UI**. Its chat and file preview are not yet connected to production APIs.
- `assets/firebase-config.js` contains public Firebase browser configuration for the **Sandbox** project `vossfit-sandbox` and the intended API hostnames.
- `assets/lab-runtime.js` contains a **staged** Firebase authentication, Gemini API, and file-storage client module. It is **not loaded by the current `index.html`** and therefore does not make the live Lab functional on its own.
- Cloudflare workers and R2 bindings exist separately; worker source, custom domain routing, Firebase authorized domains, and end-to-end login need independent verification.
- The protected live Sandbox Lab is not yet proven identical to the local UI prototype. Its current deployed source must be imported from authorized hosting access.

## Boundaries

- Sandbox: `https://xn--vofit-mqa.de` and `https://lab.xn--vofit-mqa.de`.
- Official Project: `https://vossfit.de` and `https://lab.vossfit.de` — do not alter as part of this repository.
- No automatic GitHub-to-live deployment is enabled. Sync direction is **Sandbox → GitHub** only.
- Do not commit server secrets, Firebase service-account JSON, Cloudflare tokens, or private `.env` files. Firebase browser keys are public identifiers and should have appropriate Google Cloud restrictions.
