# Uptime Monitoring

This app exposes vendor-neutral health endpoints that can be monitored by any free uptime tool or a self-hosted cron.

## Endpoints

### Basic app health

```text
GET /api/health
```

Use this for the main up/down monitor. It returns `200` when the Next.js app can respond.

### Deep health

```text
GET /api/health/deep
```

Checks:

- App runtime
- Database query
- Organization/user counts
- Upload storage write test
- Intake file storage write test
- Integration configuration counts for SMTP, SMS, payments, and CarePortals

The deep endpoint returns:

- `200` when critical checks pass
- `503` when database or storage is down
- `200` with `status: "degraded"` for warnings, unless strict mode is enabled

Strict mode:

```text
GET /api/health/deep?strict=1
```

In strict mode, warnings also return `503`.

## Optional Token

Set this environment variable to require a token for `/api/health/deep`:

```env
HEALTHCHECK_TOKEN="long-random-token"
```

Then call the deep endpoint using either:

```text
GET /api/health/deep?token=long-random-token
```

or:

```text
Authorization: Bearer long-random-token
```

## Free Monitoring Options

- UptimeRobot: basic free uptime monitoring is advertised on their pricing page.
- Better Stack: free tier is available for small uptime setups.
- Healthchecks.io: useful for scheduled jobs and cron-style dead-man-switch checks.

For zero third-party cost and full control, run Uptime Kuma on your own VPS/server and monitor these endpoints from there.

## Better Stack Error Tracking

Admin settings stores the Better Stack Error Tracking DSN and source-map upload credentials in the database. The app sends sanitized server/workflow errors only; patient data, request bodies, intake payloads, messages, contact details, and payment secrets are redacted before events leave the app.

Fill these fields in `/admin/settings` → Better Stack:

- DSN
- Environment
- Release
- Team / Org ID
- Application ID
- Source Map Upload URL
- Telemetry API Token
- Production Server Root, for example `/home/hlcportal/public_html`
- Frontend Browser Token, from the Better Stack Frontend tab

Use the same release value for error events and source maps. After each production build/deploy, upload source maps:

```bash
npm run betterstack:sourcemaps
```

If multiple organizations have Better Stack configured, pass the org id or slug:

```bash
npm run betterstack:sourcemaps -- --org <org-id-or-slug>
```

Dry run without uploading:

```bash
npm run betterstack:sourcemaps -- --dry-run
```

### Frontend Privacy Setup

Frontend browser tracking is optional and can be enabled from `/admin/settings` → Better Stack. The app only identifies signed-in users with internal id, role, portal, and organization id. It does not send email or name.

In Better Stack's Frontend configuration, add these selectors under **Exclude HTML elements** before enabling session replay or autocapture:

```text
.hlc-sensitive-data
input
textarea
select
[contenteditable="true"]
.ant-form
#credit-card-form
[data-sensitive]
[data-phi]
[data-payment]
```

Keep frontend tracking focused on browser errors. Avoid sending custom events that include patient, intake, checkout, payment, message, or prescription details.

## NDJSON Progress Streams

Most app APIs should continue returning normal JSON. NDJSON is used only for long-running actions where live progress helps the admin user.

Current stream:

```text
POST /api/crm/leads/sync-careportals-active-subscriptions
Accept: application/x-ndjson
```

The same endpoint still supports the original JSON response when called without the NDJSON `Accept` header. The CRM Leads page uses the stream for CarePortals active subscription dry runs/imports and displays fetch/process progress while preserving the final summary modal.

Admin CarePortals imports also support NDJSON progress while preserving their original JSON behavior:

```text
POST /api/admin/careportals/import-customers
POST /api/admin/careportals/import-subscriptions
POST /api/admin/careportals/import-orders
Accept: application/x-ndjson
```

The Admin Settings CarePortals panel uses these streams for customer, subscription, and order imports so large pulls show live progress instead of a silent loading state.

The main Safe CarePortals Import also supports NDJSON job status streaming:

```text
POST /api/admin/careportals/safe-import
Accept: application/x-ndjson
```

It still persists progress to the database and the existing `GET /api/admin/careportals/safe-import` polling/refresh path remains available as a fallback.
