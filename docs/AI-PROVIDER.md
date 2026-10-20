# AI Provider Strategy — VoßFit Sandbox

## Decision

- **Runtime target:** Google Gemini API.
- **OpenAI:** may be used by ChatGPT as a development assistant, but is not the runtime provider for the VoßFit website by default.
- **Google sign-in is separate from Gemini API access.** A successful Google Login does not authorize API calls and must not expose the Gemini key.
- **No provider key is committed to Git.** The key is configured only in the protected server/Worker environment.

## Design

The Lab calls an authenticated server-side AI endpoint. The endpoint validates the user's session, project/environment scope, request size and allowed capabilities before invoking the provider adapter. Provider-specific request/response formats stay behind the adapter contract so the rest of the Lab does not depend on Gemini-specific SDK types.

Target flow:

`Lab UI → authenticated Control Plane → permission/policy checks → AI provider adapter → Google Gemini API → normalized response → UI`

The server must never accept a provider URL, model name, tool name, or arbitrary external endpoint directly from the browser. Model selection is server configuration, allowlisted and logged. Uploaded content and model output are untrusted data; neither may override authorization or tool policy.

## Environment variables

- `GEMINI_API_KEY`: secret; set in the server/Worker secret store, never in frontend code or Git.
- `GEMINI_MODEL`: explicitly configured supported Gemini model ID.
- `AI_PROVIDER`: use `gemini` for the Sandbox runtime.
- `AI_REQUEST_TIMEOUT_MS`: server-side timeout.
- `AI_MAX_OUTPUT_TOKENS`: output budget enforced by the server.

Use `.env.example` only as a list of variable names/placeholders. Do not create or commit a real `.env`.

## Rollout gates

1. Import the current Sandbox/Lab source read-only, back it up and run a secret scan.
2. Identify the existing runtime (static hosting, Worker, or another backend) and auth/session mechanism.
3. Implement the adapter in that actual backend; do not invent a parallel backend before the source is inspected.
4. Add rate limits, request-size limits, timeouts, error redaction and audit events.
5. Test with a non-production key and a dedicated Sandbox configuration.
6. Keep deployment disabled until the user explicitly approves a Sandbox release.

## Current status

This document and a provider contract scaffold are local-only planning changes. The actual live Lab has **not** been wired to Gemini by this change. No key was requested or stored, and no website or hosting account was changed.
