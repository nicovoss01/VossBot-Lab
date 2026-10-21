# VoßBot experiment previews

The official project (vossfit.de) and the live Sandbox (xn--vofit-mqa.de) are NEVER deployment targets of this workflow.

## Reusable deployment

Workflow: `.github/workflows/deploy-preview.yml`

Two separate Cloudflare Pages projects must first exist:
- `vossbot-preview-homepage` -> `apps/homepage`
- `vossbot-preview-lab` -> `apps/lab`

In GitHub, create environment `sandbox-preview`. Set secrets `CLOUDFLARE_API_TOKEN` (limited to Pages deployments) and `CLOUDFLARE_ACCOUNT_ID` for the Sandbox account. The workflow can then be started from Actions -> Deploy VoßBot experiment to Cloudflare Pages -> Run workflow. This is intentionally manual at first; it never deploys to live domains.

For other repositories, call the reusable workflow:

```yaml
jobs:
  preview:
    uses: nicovoss01/VossBot-Lab/.github/workflows/deploy-preview.yml@main
    with:
      target: lab
    secrets: inherit
```

**Note:** The current workflow assumes the same `apps/lab` or `apps/homepage` directory layout in the calling repository. General-purpose repositories need a parameterized directory/project mapping before using it.

## Shared services

Firebase project `vossfit-sandbox` may be reused by previews, but each preview hostname must be added to Firebase Authentication authorized domains. API Workers must explicitly allow the preview origins via CORS and validate Firebase tokens. Gemini secrets must remain in Cloudflare Worker secrets. R2 buckets should use test prefixes and restrictive permissions to prevent accidental deletion of Sandbox files.

The Lab HTML is currently a prototype and does not yet load `assets/lab-runtime.js`. Deploying it does NOT magically enable Gemini, Firebase sign-in or R2. Verify these separately before claiming parity.

Cloudflare Pages projects, GitHub secrets, Firebase authorized domains, and API CORS are not created by committing this file. They require provisioning and verification.
