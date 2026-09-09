# Clever Forms for Payload CMS

**Clever Forms** is a universal form-building platform for [Payload CMS](https://payloadcms.com/) by CleverForge.

The goal is simple: give Payload developers and site owners a flexible form system that feels native to Payload, works with modern Next.js applications, and can grow from a basic contact form into advanced workflows, integrations, AI-assisted processes, secure document collection, payments, analytics, and automation.

Clever Forms is being designed as a **Payload-native plugin ecosystem**, not as a site-specific implementation.

---

## Project status

Clever Forms is under active development.

The architecture currently includes the foundation for:

- Payload-native plugin configuration
- multi-page forms
- configurable field types
- conditional logic
- server-side validation
- secure submissions
- React rendering
- localized form content
- internationalized admin text
- audit/activity events
- Payload Jobs integration
- secure Save & Continue tokens
- premium feature entitlements
- private file-storage adapters
- signature-provider contracts
- AI-provider adapters
- authentication adapters
- integration adapters
- payment-provider adapters
- OpenAPI documentation support

The public repository is the community-facing home for Clever Forms. Commercial implementation details and hosted CleverForge services are maintained separately.

> **Important:** APIs and package structure may change before the first stable `1.0.0` release.

---

# Why Clever Forms?

Payload already provides a strong developer platform and an official Form Builder plugin. Clever Forms is intended to complement the Payload ecosystem by focusing on forms as a broader workflow and integration platform.

The long-term goal is to support use cases such as:

- contact forms
- newsletter signups
- applications
- registrations
- intake forms
- surveys
- assessments
- client onboarding
- event registration
- program enrollment
- grant applications
- employment applications
- secure document collection
- electronic acknowledgments
- signatures
- payments and donations
- multilingual forms
- authenticated member forms
- CRM-connected workflows
- AI-assisted forms
- AI document extraction
- automated follow-up workflows

The architecture is intentionally provider-neutral wherever possible.

---

# Design principles

## Payload-native

Clever Forms follows Payload CMS plugin conventions and is designed around Payload concepts such as:

- `definePlugin`
- Collections
- Hooks
- Access Control
- Custom Endpoints
- Payload Jobs
- Admin components
- Local API
- REST API
- TypeScript
- localization

The plugin should feel like part of Payload instead of a separate application attached to it.

## Universal

Clever Forms should work on any Payload CMS project without requiring organization-specific data models or assumptions.

## Secure by default

Public form systems receive untrusted input. Clever Forms is being built around server-side validation and controlled access rather than relying on browser validation alone.

Security design includes:

- server-side choice validation
- required-field validation
- protected system-managed fields
- hashed Save & Continue tokens
- expiring resume tokens
- private file-storage abstractions
- MIME/content validation
- signed or authenticated downloads
- permission-aware authenticated forms
- server-side premium entitlement enforcement
- restricted access to submission and audit data

## Extensible

Clever Forms should not hard-code one CRM, one storage provider, one email service, one AI provider, or one payment processor.

Instead, external functionality is built around adapters.

## Useful free core

The free/core edition should remain useful on its own.

Premium products should add advanced operational capabilities rather than making the base plugin unusable without a subscription.

---

# Proposed package

```bash
pnpm add @cleverforge/payload-clever-forms
```

or:

```bash
npm install @cleverforge/payload-clever-forms
```

Example Payload configuration:

```ts
import { buildConfig } from 'payload'
import { cleverForms } from '@cleverforge/payload-clever-forms'

export default buildConfig({
  plugins: [
    cleverForms({
      enabled: true,
    }),
  ],
})
```

More configuration options will be documented as the package approaches public release.

---

# Architecture

At a high level:

```text
Payload CMS
    |
    +-- Clever Forms Core
    |     |
    |     +-- Forms
    |     +-- Pages
    |     +-- Fields
    |     +-- Validation
    |     +-- Submissions
    |     +-- Conditional Logic
    |     +-- React Renderer
    |     +-- i18n
    |     +-- Audit Events
    |     +-- Developer API
    |
    +-- Optional Clever Platform Modules
          |
          +-- Forms Pro
          +-- Clever AI
          +-- Clever Connect
          +-- Clever Communications
          +-- Clever Analytics
          +-- Clever Payments
```

A form submission should remain fast. Expensive work should happen through Payload Jobs whenever possible:

```text
Form submission
      |
      v
Validate on server
      |
      v
Save submission
      |
      v
Queue background tasks
      |
      +-- Send email
      +-- Generate PDF
      +-- Sync CRM
      +-- Trigger webhook
      +-- Analyze with AI
      +-- Update analytics
```

---

# Clever Forms Core

The long-term free/core edition is intended to include the essentials needed for general Payload sites.

## Form builder

Forms can contain pages and reorderable fields.

Planned field support includes:

- text
- textarea
- email
- number
- phone
- checkbox
- radio
- select
- multiselect
- date
- heading
- paragraph
- address
- country
- state/province

Advanced field types may be provided through optional modules.

## Multi-page forms

Forms can be divided into multiple pages with Previous and Next navigation.

This makes Clever Forms suitable for longer applications and intake processes.

## Conditional logic

Fields can appear or disappear based on previous answers.

Examples:

```text
Are you currently employed?

Yes -> Show employer information
No  -> Show unemployment questions
```

Advanced conditional logic may later support nested condition groups, AND/OR rules, calculations, and workflow routing.

## Server-side validation

Browser validation is useful for user experience but cannot be trusted for security.

Clever Forms validates submissions again on the Payload server.

Examples include:

- required fields
- valid emails
- numeric values
- allowed select/radio values
- allowed checkbox values
- conditional required fields

## Submission management

Submissions are stored in Payload and protected through Payload Access Control.

The system is designed so public visitors may submit forms without gaining public read access to submission data.

## React renderer

Clever Forms includes a reusable React rendering architecture for Payload + Next.js projects.

The intended experience is similar to:

```tsx
import { CleverForm } from '@cleverforge/payload-clever-forms/react'

export function ContactPage({ form }) {
  return <CleverForm form={form} />
}
```

The renderer is intended to remain customizable so developers can apply their own design system rather than being locked into one theme.

---

# Internationalization

Clever Forms treats internationalization as two separate concerns.

## Admin translations

Plugin interface text can be translated into languages supported by the Payload installation.

Initial translation infrastructure includes:

- English
- Spanish
- French

Additional translations can be added over time.

## Localized forms

Individual form labels, questions, help text, success messages, and other public content should support Payload localization.

This allows one form definition to serve multiple languages rather than duplicating entire forms.

---

# Audit and activity events

Clever Forms is being designed with an internal event history.

A submission could produce events such as:

```text
10:01 Submission received
10:01 Confirmation email queued
10:01 Salesforce sync queued
10:02 Confirmation email sent
10:02 Salesforce contact created
10:05 PDF generated
10:15 Submission reviewed
```

This event model can support:

- troubleshooting
- integration monitoring
- operational history
- audit requirements
- analytics
- workflow automation

---

# Forms Pro

Advanced workflow features are expected to be available through a commercial subscription.

Potential Forms Pro capabilities include:

## Save & Continue

Users can save a partially completed form and return later using a secure resume link.

The security design uses:

- cryptographically generated tokens
- SHA-256 token hashes in the database
- expiring links
- timing-safe comparison
- server-side entitlement validation

The raw resume token should never be stored in the database.

## Secure uploads

Private file collection is important for applications, onboarding, intake, and document workflows.

The storage architecture is provider-neutral and may support:

- AWS S3
- DigitalOcean Spaces
- Cloudflare R2
- Azure Blob Storage
- Google Cloud Storage
- private local storage
- other S3-compatible providers

The goal is to avoid storing sensitive files in publicly accessible web directories.

## Signatures

Planned signature functionality includes secure capture and storage of electronic signatures.

Potential use cases include:

- acknowledgments
- consent
- waivers
- applications
- agreements

## PDF generation

Form submissions may be converted into branded PDFs.

Possible workflows include:

- application PDFs
- confirmation documents
- signed agreements
- intake summaries
- certificates
- internal case files

## Advanced conditional logic

Potential advanced rules include:

- AND / OR groups
- nested conditions
- calculated values
- page skipping
- branching
- workflow routing
- conditional notifications
- conditional integrations

---

# Clever AI

Clever AI is planned as an optional AI integration layer for Payload and Clever Forms.

The central idea is **Bring Your Own AI Provider**.

Organizations should be able to connect their preferred provider instead of being locked into one vendor.

Potential providers include:

- OpenAI
- Anthropic
- Google Gemini
- OpenRouter
- Mistral
- Groq
- Azure OpenAI
- AWS Bedrock
- Ollama
- LM Studio
- other OpenAI-compatible APIs

API credentials should remain server-side.

## AI-assisted form creation

An administrator could describe a form in natural language:

> Create a workforce program intake form that collects contact information, employment status, education, income range, barriers to employment, and consent.

Clever AI could generate a structured Clever Forms definition for review.

Possible commands could include:

- "Make this bilingual in English and Spanish."
- "Add conditional questions for unemployed applicants."
- "Create a registration form from this program description."
- "Make this form shorter."
- "Add accessibility-friendly instructions."
- "Create Salesforce field mappings."

## AI document extraction

Future versions may allow uploaded documents to populate structured fields.

Examples:

- resumes
- invoices
- applications
- pay stubs
- identification documents
- assessments

## AI submission analysis

With appropriate privacy controls and administrator configuration, AI may be used to:

- summarize submissions
- classify responses
- identify missing information
- extract structured values
- recommend workflow routing
- create internal notes

AI processing should always be configurable and should not be silently applied to sensitive information.

---

# Clever Connect

Clever Connect is the planned integration layer for connecting submissions to external systems.

The architecture is adapter-based.

Potential integrations include:

- Salesforce
- HubSpot
- Microsoft Dynamics
- Airtable
- Zapier
- Make
- custom REST APIs
- generic webhooks

## Salesforce

Salesforce is expected to be one of the first major connectors.

Potential capabilities include:

- create records
- update records
- upsert records
- configurable object mapping
- relationship mapping
- duplicate handling
- retry support
- integration logs
- sandbox/production environments

Salesforce synchronization should generally run through Payload Jobs instead of blocking the original form submission.

---

# Clever Communications

Clever Communications is planned as a provider-neutral notification layer.

Potential providers and channels include:

- SMTP
- Resend
- SendGrid
- Mailgun
- Postmark
- Amazon SES
- Twilio
- SMS providers

Possible workflows:

- submission confirmations
- internal notifications
- reminders
- Save & Continue links
- approval notices
- rejection notices
- conditional email routing

---

# Clever Analytics

Clever Analytics may provide form-level operational and conversion data.

Potential metrics include:

- views
- starts
- submissions
- conversion rate
- abandonment rate
- page abandonment
- average completion time
- field-level drop-off
- Save & Continue activity
- integration failures
- submission trends

The event/audit architecture is designed so analytics can build on the same underlying operational data.

---

# Clever Payments

Clever Payments is planned as an optional payment integration layer.

Potential providers include:

- Stripe
- Square
- PayPal

Potential use cases include:

- donations
- event registration
- membership fees
- application fees
- paid reservations
- product/service payments

Payment credentials should remain server-side and provider-specific logic should remain isolated from Clever Forms Core.

---

# MCP and AI agents

Clever Forms may eventually integrate with Payload's Model Context Protocol ecosystem.

An authorized AI agent could potentially receive tools such as:

```text
list_forms
get_form
get_form_schema
create_form
search_submissions
get_submission
get_form_metrics
```

Access should always respect Payload permissions and configured authorization policies.

Possible clients could include AI development tools, internal agents, or other MCP-compatible systems.

---

# Authentication

Clever Forms is being designed so authenticated forms are not tied to one authentication implementation.

Potential use cases include:

- client portals
- employee forms
- membership forms
- student portals
- application portals
- authenticated intake workflows

The architecture allows authentication providers to supply identity and permissions to forms without hard-coding one provider into core.

---

# Developer API

A long-term goal is a well-documented API that can support frontends outside the Payload application.

Potential endpoints include:

```text
POST /api/clever-forms/:id/submit
POST /api/clever-forms/drafts
GET  /api/clever-forms/drafts/:token
PATCH /api/clever-forms/drafts/:token
POST /api/clever-forms/uploads
GET  /api/clever-forms/files/:token
GET  /api/clever-forms/:id/schema
GET  /api/clever-forms/:id/analytics
```

OpenAPI metadata is part of the architecture so third-party clients can eventually generate typed SDKs.

Possible consumers include:

- Next.js
- React
- Vue
- Svelte
- mobile applications
- Salesforce Experience Cloud
- external portals
- internal business applications
- AI agents

---

# Public and commercial architecture

Clever Forms uses a hybrid open/public and commercial model.

The public project provides the community-facing plugin, documentation, examples, interfaces, and free/core functionality.

Premium services may use a CleverForge entitlement service.

```text
Customer Payload site
       |
       | license / entitlement check
       v
CleverForge entitlement service
       |
       +-- Forms Pro
       +-- Clever AI
       +-- Clever Connect
       +-- Communications
       +-- Analytics
       +-- Payments
```

Commercial secrets should never be bundled into a customer's browser application.

Examples of information that must remain server-side include:

- license keys
- AI API keys
- Salesforce credentials
- email provider credentials
- webhook secrets
- payment secrets
- private storage credentials

---

# Free vs premium direction

The exact commercial packaging may evolve, but the current product direction is:

| Capability | Core | Premium |
| --- | :---: | :---: |
| Form builder | ✓ | |
| Multi-page forms | ✓ | |
| Basic conditional logic | ✓ | |
| React renderer | ✓ | |
| Server-side validation | ✓ | |
| Submission storage | ✓ | |
| Localization | ✓ | |
| Developer API | ✓ | |
| Save & Continue | | ✓ |
| Secure uploads | | ✓ |
| Signatures | | ✓ |
| PDF generation | | ✓ |
| Advanced conditional logic | | ✓ |
| Email automation | | ✓ |
| Webhooks | | ✓ |
| Salesforce integration | | ✓ |
| AI features | | ✓ |
| Advanced analytics | | ✓ |
| Payments | | ✓ |
| Advanced MCP tools | | ✓ |

The free version should remain useful for real websites.

---

# Security roadmap

Security work is being treated as part of the product architecture rather than a final checklist.

Current and planned controls include:

- server-side validation
- choice allow-list enforcement
- protected system fields
- hashed resume tokens
- expiring resume tokens
- private storage adapters
- content-signature inspection for common files
- filename sanitization
- signed download tokens
- authentication-aware forms
- server-side premium entitlement enforcement
- access-controlled submissions
- access-controlled audit events
- rate limiting
- bot protection
- CSRF/origin controls where appropriate
- webhook signature validation
- integration credential isolation

Security-sensitive deployments should be reviewed based on their specific regulatory and operational requirements.

---

# Roadmap

## Phase 1 — Core architecture

- [x] Payload plugin architecture
- [x] Forms and submissions collections
- [x] multi-page schema
- [x] React renderer foundation
- [x] conditional logic
- [x] server-side validation
- [x] extension adapters
- [x] audit event architecture
- [x] Payload Jobs foundation
- [x] licensing/entitlement foundation
- [x] localization architecture
- [x] OpenAPI metadata foundation

## Phase 2 — Forms Pro runtime

- [x] secure Save & Continue token architecture
- [x] dedicated Save & Continue endpoint foundation
- [x] private storage adapter interface
- [x] file content-signature validation foundation
- [x] secure download token foundation
- [x] signature provider interface
- [ ] complete secure upload endpoint
- [ ] complete signed download endpoint
- [ ] signature capture UI
- [ ] PDF generation
- [ ] rate limiting
- [ ] bot protection

## Phase 3 — Integrations

- [ ] generic webhooks
- [ ] Salesforce adapter
- [ ] email providers
- [ ] SMS providers
- [ ] integration retries and monitoring

## Phase 4 — Clever AI

- [ ] OpenAI-compatible adapter
- [ ] Anthropic adapter
- [ ] Gemini adapter
- [ ] Ollama adapter
- [ ] AI form generation
- [ ] AI translation
- [ ] AI document extraction
- [ ] AI submission summaries

## Phase 5 — Business modules

- [ ] analytics dashboard
- [ ] payment adapters
- [ ] workflow automation
- [ ] MCP integration
- [ ] generated SDKs

---

# Repository model

CleverForge uses separate repositories for public community materials and private commercial development.

This public repository is intended for:

- documentation
- public source code
- examples
- compatibility information
- issues
- feature requests
- contribution guidance
- community releases

Commercial backend infrastructure, license-service implementation, proprietary connectors, and hosted services may be maintained separately.

This separation allows Clever Forms to participate openly in the Payload ecosystem while supporting a sustainable commercial product.

---

# Contributing

Community feedback is welcome.

Useful contributions may include:

- bug reports
- accessibility feedback
- Payload compatibility testing
- translations
- documentation improvements
- examples
- field ideas
- adapter proposals
- security reports

Contribution guidelines will be added as the public package approaches release.

---

# Reporting security issues

Please do **not** publish sensitive security vulnerabilities in a public GitHub issue.

A private security reporting process will be published before the first production release.

---

# Compatibility

The current development target is **Payload CMS 3.x**.

Exact minimum versions will be documented for each release.

---

# License

The license for the public/core package will be finalized before the first public package release.

Commercial modules and hosted CleverForge services may use separate commercial terms.

---

# About CleverForge

CleverForge builds practical technology and automation tools for organizations that need flexible systems without being locked into one vendor or workflow.

Clever Forms is being developed as a reusable Payload CMS platform that can serve simple websites as well as complex operational workflows.

---

## Follow the project

Watch this repository for development updates, release notes, examples, and documentation as Clever Forms moves toward its first public release.
