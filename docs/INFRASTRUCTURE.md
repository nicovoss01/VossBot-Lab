# Sandbox infrastructure status

This document describes the **Sandbox only**. The official VossFit project must remain separate.

## Current public/source setup

- GitHub repository: `nicovoss01/VossBot-Lab` (public). Do not commit `.env` files, private tokens, service-account keys, or API secrets.
- Sandbox homepage: `https://xn--vofit-mqa.de/`
- Sandbox Lab: `https://lab.xn--vofit-mqa.de/`
- DNS for the Sandbox root and Lab already exists in Cloudflare and currently targets the existing Spaceship hosting IP. The Lab apex record is DNS-only, while several other records are proxied. Do not replace these records without a deliberate hosting migration plan.
- Unauthenticated HTTP access to the protected Lab currently returns `401`; that is not proof that the site is broken. Use an authorized browser or hosting-file access to obtain the deployed source.

## Existing Cloudflare components observed

- Worker `vossfit-sandbox-api` has secret bindings named `GEMINI_API_KEY` and `GEMINI_MODEL`; values must never be copied into Git.
- Worker `vossfit-sandbox-lab-files-api` has an R2 binding named `SANDBOX_FILES`, configured for bucket `vossfit-sandbox-lab-files-eu` in the EU jurisdiction.
- The corresponding Project Lab worker and `PROJECT_FILES` binding are production/project infrastructure and must not be changed as part of Sandbox work.
- No Cloudflare Worker route was listed for the Sandbox zone during the read-only check. Verify how the Worker is invoked before attaching any custom domain or route.

## Firebase / Google login

- The Sandbox homepage source uses Firebase project ID `vossfit-sandbox`. Firebase web configuration includes a browser-visible API key, which is normal for Firebase client apps; restrict it in Google Cloud to the required APIs and approved HTTP referrers.
- Verify Firebase Authentication enabled providers and authorized domains in the Firebase Console. Expected domains include the Sandbox root and Lab hostnames; do not add Sandbox domains to the official Project's Firebase configuration.
- Do not put service-account credentials or server-side secrets in the frontend or GitHub.

## Deployment policy

- This repository is the Sandbox development source. No automatic deployment to a live site is configured by this document or the validation workflow.
- DNS, Firebase settings, Worker routes, secret values and hosting changes require read-back verification and must target Sandbox resources only.
- The Lab prototype is a UI scaffold, not yet a verified copy of the deployed protected Lab or a complete AI/file backend.
