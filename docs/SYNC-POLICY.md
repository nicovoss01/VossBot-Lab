# Synchronization and Release Policy

1. The local workspace is the working copy.
2. GitHub branches and pull requests are development history, not live deployments.
3. Feature work happens on branches; integration happens via reviewed PRs into `develop`.
4. Only an explicitly approved release can be deployed to the Sandbox host.
5. No workflow in this repository may deploy to the official Project domains.
6. Do not enable automatic production deployment from `main` until the deployment target, credentials, backup, health check, and rollback procedure have been verified.
7. Changes made directly on the hosting account are not automatically synchronized. If needed, import them into a review branch after a backup and secret scan; do not create a bidirectional auto-sync loop.
8. Before any release: run secret scan, review diff, build/test, backup current Sandbox files, deploy to Sandbox only, verify, and document rollback instructions.
