# Changelog

All notable changes to Clever Forms will be documented here.

## 0.2.0-beta.1 - 2026-09-23

### Changed

- prepared npm Trusted Publishing through GitHub Actions OIDC
- moved CI and publishing workflows to Node.js 24
- enabled npm provenance for automated releases
- retained beta releases on the `beta` dist-tag

### Release

- first release intended to validate end-to-end GitHub Actions trusted publishing after the manual `0.2.0-beta.0` bootstrap

## 0.1.0 - 2026-09-09

Initial public core implementation.

### Added

- Payload `definePlugin` integration
- forms collection
- submissions collection
- multi-page forms
- configurable core field types
- conditional logic
- localized form content
- server-side submission validation
- choice allow-list enforcement
- React renderer
- client submission helper
- English, Spanish, and French translation tables
- automated tests
- GitHub Actions CI
- Apache-2.0 license and NOTICE
