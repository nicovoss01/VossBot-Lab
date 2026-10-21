# One-entry-point approach

The homepage and Lab should retain a clear main HTML entry point for easy visual iteration. Shared styles/scripts can be externalized gradually only where doing so reduces risk and makes testing easier.

Most visual/product changes should be made in the relevant page entry point, with a small number of stable adapters:
- public non-secret settings (brand, feature flags, endpoints) in a safe config file;
- authentication through the already verified Firebase project for the matching environment;
- Gemini behind an authenticated server-side endpoint;
- private media and durable project state through a storage/database adapter;
- deploy/release controls kept outside the browser.

Do not put credentials, privileged storage keys, FTP credentials, or admin operations in the main HTML. A single HTML file is a convenient entry point, not a safe place for every backend responsibility.
