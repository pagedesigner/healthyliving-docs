---
sidebar_position: 8
---

# Troubleshooting

Use this page for common operational checks.

## Workflow Did Not Fire

Check:

- Workflow is active
- Trigger type matches the event
- Trigger conditions match the payload
- Re-entry settings are appropriate
- The latest release is deployed

## Intake Reminder Did Not Send

Check:

- The workflow uses `intake.pending`
- The wait step refreshes the payload from the database
- The condition checks `intake.status equals PENDING`
- The patient has not submitted the form before the wait finishes

## Public Docs Look Like Docusaurus Defaults

Check:

- Changes are committed and pushed to GitHub
- Vercel deployment completed successfully
- The homepage and `docusaurus.config.ts` are updated
- Browser cache is refreshed
