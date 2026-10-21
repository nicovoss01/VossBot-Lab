# Source Inventory and Import Status

## Confirmed local candidates (not yet imported)

A metadata inventory was run on the ThinkPad's synced Google Drive on 2026-10-20. These files are local candidates only; none is verified as the current deployed Sandbox source.

| Candidate | Size | Last modified (UTC) | SHA-256 |
|---|---:|---|---|
| `G:\Meine Ablage\VoßBot Sandbox 0.5.html` | 68,675 bytes | 2026-10-15 10:32:06 | `03C6E077463E645E93B778082EAD059B1FE016B0041B858747FB7815037F23EA` |
| `G:\Meine Ablage\VoßBot Lab 0.4.html` | 68,675 bytes | 2026-10-15 09:54:07 | `03C6E077463E645E93B778082EAD059B1FE016B0041B858747FB7815037F23EA` |
| `G:\Meine Ablage\VoßFit® - Office\Vault\VoßBot Lab\lab.vorlage1.html` | 48,566 bytes | 2026-10-05 06:55:10 | `B8038666987318BBB7398938C4D01BFE4DF206E20258268D6C9AC35A2C4D3A36` |
| `G:\Meine Ablage\VoßFit® - Office\Vault\VoßBot Lab\lab.vorlage2.html` | 15,056 bytes | 2026-10-05 06:55:17 | `BBC627DF6EAB753C2BECF4008281131544512D7DA55CEAF2945A94B93775E9C6` |
| `G:\Meine Ablage\VoßFit® - Office\Vault\Website Backup\VoßFit v2.5.html` | 35,851,809 bytes | 2026-10-03 21:55:37 | Not computed in this inventory |
| `G:\Meine Ablage\index-vossfit-utf8-fix.html` | 9,783,481 bytes | 2026-10-14 19:57:59 | Not computed in this inventory |

The files named `VoßBot Sandbox 0.5.html` and `VoßBot Lab 0.4.html` have identical SHA-256 hashes and byte sizes. They are byte-for-byte identical copies, not two distinct versions of the code. This does **not** establish that either file matches the live Sandbox Lab.

## Other candidates

- `C:\Users\User\Workspace\VoßFit Vitality.html` is a saved webpage and is not confirmed as the current Sandbox source.

## Import gate

Before importing, identify the exact current source for the Sandbox homepage and Sandbox Lab, preserve a backup, list files, scan for credentials and personal data without printing secret values, and confirm that project/production credentials are not mixed in. Prior heuristic scanning flagged credential-like patterns in the large homepage files and in the identical 68,675-byte Bot HTML copies. Those findings need redacted manual review before import. Do not import them blindly. No candidate file has been copied into this repository.


## Redacted scan update (2026-10-20)

A second scan used the same four heuristic pattern classes (Google API-key-like strings, private-key PEM blocks, credential assignments, and token assignments). Secret values were never printed.

| Candidate | SHA-256 | Matches | Decision |
|---|---|---:|---|
| `VoßBot Sandbox 0.5.html` | `03C6E077463E645E93B778082EAD059B1FE016B0041B858747FB7815037F23EA` | 2 (API-key-like: 1; credential assignment: 1) | Hold; redacted manual review required |
| `VoßBot Lab 0.4.html` | `03C6E077463E645E93B778082EAD059B1FE016B0041B858747FB7815037F23EA` | 2 (API-key-like: 1; credential assignment: 1) | Hold; identical copy of above |
| `lab.vorlage1.html` | `B8038666987318BBB7398938C4D01BFE4DF206E20258268D6C9AC35A2C4D3A36` | 0 | Clean by this heuristic only; not confirmed current source |
| `lab.vorlage2.html` | `BBC627DF6EAB753C2BECF4008281131544512D7DA55CEAF2945A94B93775E9C6` | 0 | Clean by this heuristic only; not confirmed current source |
| `VoßFit v2.5.html` | `495E49BD08671B9CB7DE068699DCC10920C1CE263B5BDB899AA3B126D1D8AD24` | 3 (API-key-like: 1; credential assignment: 2) | Hold; do not import yet |
| `index-vossfit-utf8-fix.html` | `2005F4C14FB687709A7EB3D0A8F55D886DBE666DFA8B79D021DA73F5163678A6` | 3 (API-key-like: 1; credential assignment: 2) | Hold; do not import yet |

These matches may include examples, placeholders, or legitimate configuration text; the scan does not establish whether any value is active. Do not print, commit, or upload candidate values. The two older Lab templates are the only candidates in this batch with zero heuristic matches, but their age and source identity still need verification.

## GitHub publication gate

The local `origin` currently points to `https://github.com/nicovoss01/VossBot-Lab.git`. GitHub reports this repository as **public and empty**; it is not the requested private Sandbox repository. A remote read check completed without returning a HEAD ref. Do not push to this origin. The GitHub connection currently exposes repository read/issue/PR operations but no repository-creation operation. A private repository must be created through an authorized GitHub UI/API path before changing the remote and pushing.

## Live source gate

The Sandbox and Sandbox Lab domains are protected by an HTTP 401 authentication barrier in this environment. No authenticated Spaceship/FTP source session was available to this read-only check. No live files were changed and no candidate has been imported.
