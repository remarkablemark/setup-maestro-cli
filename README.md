<p align="center">
  <img width="500" alt="Maestro logo" src="https://github.com/remarkablemark/setup-maestro-cli/blob/master/maestro-logo.svg?raw=true" />
</p>

# setup-maestro-cli

[![version](https://img.shields.io/github/release/remarkablemark/setup-maestro-cli)](https://github.com/remarkablemark/setup-maestro-cli/releases)
[![build](https://github.com/remarkablemark/setup-maestro-cli/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/setup-maestro-cli/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/setup-maestro-cli/graph/badge.svg?token=mI5QlfDaz0)](https://codecov.io/gh/remarkablemark/setup-maestro-cli)

📱 Set up GitHub Actions with [Maestro](https://github.com/mobile-dev-inc/Maestro) CLI.

## Quick Start

```yaml
name: setup-maestro
on: push
jobs:
  setup-maestro:
    runs-on: ubuntu-latest
    steps:
      - name: Setup Maestro
        uses: remarkablemark/setup-maestro-cli@v1

      - name: See help
        run: maestro --help
```

## Usage

**Basic:**

```yaml
- uses: remarkablemark/setup-maestro-cli@v1
```

See [action.yml](action.yml)

## Inputs

### `version`

**Optional**: The CLI [version](https://github.com/mobile-dev-inc/Maestro/releases). Defaults to [`2.2.0`](https://github.com/mobile-dev-inc/Maestro/releases/tag/cli-2.2.0):

```yaml
- uses: remarkablemark/setup-maestro-cli@v1
  with:
    version: 2.2.0
```

## License

[MIT](LICENSE)
