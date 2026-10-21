# VoßFit Sandbox Lab

The Lab prototype is connected to the existing Sandbox Firebase project and two dedicated Cloudflare Worker endpoints.

- UI: `https://lab.xn--vofit-mqa.de`
- Gemini API: `https://api.lab.xn--vofit-mqa.de` (Worker `vossfit-sandbox-api`)
- Private file and conversation API: `https://files.lab.xn--vofit-mqa.de` (Worker `vossfit-sandbox-lab-files-api`)
- R2 binding: `SANDBOX_FILES` → `vossfit-sandbox-lab-files-eu` (EU jurisdiction)

## Implemented in the Lab runtime

- Google sign-in through Firebase project `vossfit-sandbox`
- Authenticated Gemini requests; Gemini credentials remain in Cloudflare Worker secrets
- Owner-only upload/download/delete for supported documents, images, audio and video (25 MB per file)
- Private conversation persistence in R2, scoped by Firebase user ID
- Health endpoint and CORS restricted to the Sandbox Lab origin
- Worker source and Wrangler configuration live alongside this app

## Important

- The Firebase web config is client-side configuration, not the Gemini secret. Keep Firebase API restrictions and authorized domains limited to the Sandbox.
- Never commit Gemini keys, Cloudflare API tokens, service-account JSON, or local `.env` files.
- No official Project website was changed. DNS changes only added `api.lab.xn--vofit-mqa.de` and `files.lab.xn--vofit-mqa.de`.
