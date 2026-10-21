# Agent Instructions — VoßFit Sandbox

## Scope
- Work only inside this repository unless the user explicitly authorizes otherwise.
- This repository is for the VoßFit Sandbox homepage and Sandbox Lab only.
- Official Project sites (`vossfit.de` and `lab.vossfit.de`) are out of scope.

## Safety rules
- Never deploy, upload, or modify any live website or hosting account without explicit, per-deployment user approval.
- Never copy credentials, API secrets, FTP passwords, Firebase service-account keys, private tokens, `.env` files, user data, or private logs into Git.
- Use `.env.example` with placeholders only; keep real secrets outside the repository.
- Before importing source files, inventory them and scan for secrets. Report file paths and finding categories, never print secret values.
- Do not overwrite existing files without checking their contents and making a backup where appropriate.
- Keep Sandbox and official Project configuration separated. Do not reuse production Firebase/API credentials.

## Collaboration
- Read `docs/ARCHITECTURE.md` and `docs/SYNC-POLICY.md` before editing.
- Keep changes focused and reviewable. Use feature branches and pull requests for integration.
- Document new environment variables, APIs, and storage requirements.
- Test changes locally before proposing deployment.
