# Data Privacy

This is private accounting software. Real financial data must never enter git history.

- Never `git add` or commit MySQL data/dumps, exported data files (CSV/JSON/SQL), or any plain-text file containing actual account, transaction, or balance information.
- Never commit `.env` files, `google_sheet_writer/credentials.json`, or any other credentials/secrets.
- Only commit and push source code and business logic (backend, frontend, scripts, config templates, docs).
- Before staging with a broad `git add`, review `git status`/`git diff` for data files or secrets and exclude them. If something questionable is already tracked or about to be committed, stop and ask the user instead of committing it.
