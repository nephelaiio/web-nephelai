# Nephelai
nephelai.io web frontend build system

## Editing
Please perform commits/pull requests to the staging branch. CI will upload to staging.nephelai.io where changes can be previewed.
Perform merge to the master branch once changes are validated. CI will upload to production.nephelai.io and associated cnames.

## Building
```bash
npm install
gulp build
```

## Testing
```bash
gulp test
```
