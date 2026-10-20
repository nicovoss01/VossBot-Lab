# Source Candidate Security Scan

Date: 2026-10-19

This was a heuristic scan of candidate HTML files in the locally synced Google Drive. It did not print or copy any matched values. Results are indicators for manual review, not proof that a value is valid or secret.

## Candidates requiring review

- `G:\Meine Ablage\index-vossfit-utf8-fix.html` — 9,783,481 bytes; Google API-key-like value and credential-assignment pattern detected.
- `G:\Meine Ablage\VoßFit® - Office\Vault\Website Backup\VoßFit v2.5.html` — 35,851,809 bytes; Google API-key-like value and credential-assignment pattern detected.
- `G:\Meine Ablage\VoßBot Lab 0.4.html` — 68,675 bytes; Google API-key-like value and credential-assignment pattern detected.
- `G:\Meine Ablage\VoßBot Sandbox 0.5.html` — 68,675 bytes; Google API-key-like value and credential-assignment pattern detected.

## No matches from the configured patterns

- `G:\Meine Ablage\VoßFit® - Office\Vault\VoßBot Lab\lab.vorlage1.html` — 48,566 bytes.
- `G:\Meine Ablage\VoßFit® - Office\Vault\VoßBot Lab\lab.vorlage2.html` — 15,056 bytes.

## Decision

None of these candidate files has been imported into this repository. First identify the exact currently deployed Sandbox homepage and Sandbox Lab sources, then review the flagged patterns and move sensitive configuration out of committed frontend source where appropriate. Do not print key values in logs or issue reports. Do not deploy or alter any live website during this process.
