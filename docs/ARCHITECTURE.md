# Architecture — VoßFit Sandbox

## Environments

- **Sandbox Homepage:** `xn--vofit-mqa.de` (IDN: `voßfit.de`)
- **Sandbox Lab:** `lab.xn--vofit-mqa.de` (IDN: `lab.voßfit.de`)
- **Official Project:** `vossfit.de` and `lab.vossfit.de` — explicitly out of scope.

## Repository layout

- `apps/homepage/`: homepage source
- `apps/lab/`: lab source
- `docs/`: project docs and operating rules
- `scripts/`: local validation utilities

This layout is a target layout, not yet populated with live source files. Preserve the existing app structure during import if moving files would break relative paths or deployment assumptions; document any deviation before refactoring.

## Infrastructure boundaries

Sandbox and official Project must retain separate Firebase projects, authorized domains, API credentials, storage buckets, and deployment targets. Never infer that matching feature names imply matching credentials.

Privileged operations belong on a protected server-side service/Worker, not in browser code. Frontend code must not contain FTP passwords, service-account secrets, or privileged API tokens.
