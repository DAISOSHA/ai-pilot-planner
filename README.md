# AI Pilot Planner / AI試行計画ノート

A small, functional browser app by **Daisosha (大創社)** for planning a four-week AI pilot and recording preparation, work and review time. Japanese and English interfaces are included.

**Try it:** https://daisosha.com/demos/ai-pilot-planner/

## What works

- Define scope, responsibilities, data boundaries and weekly evidence.
- Record up to 200 observations; missing times are excluded, not converted to zero.
- Compare total effort, including human review, alongside quality checks.
- Optional browser storage, validated JSON import/export, CSV export and printing.
- No build step, account, API key, AI provider, analytics, advertisements or third-party JavaScript.

Open `index.html` directly, or serve the folder with `python -m http.server 8000` and visit `http://localhost:8000/`. Browser storage behavior can vary for local files. JSON export works as a portable backup.

Run the data-validation tests with Node.js: `node --test core.test.cjs`.

## Privacy and scope

Inputs are processed in the page. Saving is opt-in and uses this browser's local storage. Storage is not encrypted and can be read by other scripts on the same origin or by people with access to the device. Do not enter personal information, counseling records or business secrets. Exported files need appropriate handling. Opening external links or loading the hosted page creates ordinary web requests; this app contains no input-submission endpoint.

The example is entirely fictional. This is a planning and arithmetic tool, not an AI model, an automated evaluation of employees or evidence that AI improves productivity. Time differences do not establish causality. Compare similar tasks and review quality before deciding what to do next.

This project was written separately for public demonstration. It does not include client data, internal credentials, private platform implementation, unpublished research or patent application materials. It is not the source code of Daisosha's proprietary learning portfolio system.

## Daisosha

Founded in 2013, Daisosha works across AI co-creation and web development, learning appreciation portfolios, and translation and publishing. It is separate from the DAISO retail chain.

- [Website](https://daisosha.com/)
- [Four-week pilot guide](https://daisosha.com/en/ai-adoption-first-month.html)
- [公式解説記事（日本語）](https://daisosha.com/ai-adoption-first-month.html)
- [YouTube](https://www.youtube.com/channel/UCzHP6NIUVXF40AuBzMLWosw)

## Rights

Copyright © 2026 Daisosha. All rights reserved. Source is published for review and demonstration. No additional license for redistribution or commercial reuse is granted here. This repository is source-available; it is not represented as an OSI-licensed open-source project. Contact Daisosha to discuss reuse. This notice does not limit rights provided by applicable law or GitHub's terms.
