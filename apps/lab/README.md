# Sandbox Lab — Local UI Prototype

This directory currently contains a standalone UI prototype in `index.html` plus a provider-neutral AI contract scaffold under `server/ai/`.

## Prototype features

- Responsive Lab navigation and overview dashboard.
- Workbench for local experiment notes and local file metadata previews.
- Demo task list with add/toggle interactions.
- Conceptual Research, Build and QA agent cards.
- VoßBot chat mock that does not call a model.
- Systems, files and project-memory overview.

## Explicit limitations

- Not connected to Firebase authentication, Gemini, Cloudflare R2, Spaceship, or a task database.
- UI state is in-memory and disappears on reload.
- File picker only displays metadata in the current page; it does not upload file bytes.
- No code execution, filesystem write tool, or deployment function is exposed from this page.
- No production source has been imported yet; this prototype must not be treated as the current live Lab.

## Local smoke test

Open `index.html` directly in a modern browser. No build tool or package install is required. Verify navigation, adding/toggling tasks, creating a local experiment, selecting a file, and the demo chat. The JavaScript syntax was checked with Node.js on 2026-10-20.

## Next integration gate

Confirm the live Sandbox Lab source and backend/auth model first. Then port/reconcile the design with the real source, implement server-side authorization and Gemini adapter, add R2 only if appropriate to the verified hosting architecture, and test locally before requesting a Sandbox deployment approval.
