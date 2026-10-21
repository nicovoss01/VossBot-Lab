# R2 storage status

Cloudflare R2 bucket created for Sandbox Lab on 2026-10-20:
- Bucket: vossfit-sandbox-lab-files-eu
- Placement hint: WEUR
- Storage class: Standard
- Initial state: empty/private; no custom public domain configured.
- Existing Worker binding: SANDBOX_FILES on vossfit-sandbox-lab-files-api.
- Worker endpoint: https://vossfit-sandbox-lab-files-api.nico-voss01.workers.dev

Read-only verification:
- Worker health endpoint returned HTTP 200 with the expected service identifier.
- Unauthenticated GET /files returned HTTP 401, so the endpoint is not anonymously listing files.
- Worker code includes Firebase token validation and CORS allowlisting for the Sandbox Lab origin.
- The R2 bucket is now present in the account list and matches the binding name.

The bucket was absent before creation although the deployed Worker already referenced it. This setup only creates an empty Sandbox Lab bucket; it does not modify the official Project bucket or website files.

Not yet verified:
- Authenticated upload/download/delete end-to-end.
- File type/size limits and path normalization.
- Error/log behavior and abuse/rate limits.
- EU-only storage jurisdiction. WEUR is a placement hint; the API reported jurisdiction "default", not "eu".

Keep the bucket private and use the authenticated Worker API. Do not expose the bucket or add public CORS/domain settings just to make browser uploads work.
