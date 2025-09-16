# setup-maestro-action

[![version](https://badgen.net/github/release/remarkablemark/setup-maestro-action)](https://github.com/remarkablemark/setup-maestro-action/releases)
[![build](https://github.com/remarkablemark/setup-maestro-action/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/setup-maestro-action/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/setup-maestro-action/graph/badge.svg?token=mI5QlfDaz0)](https://codecov.io/gh/remarkablemark/setup-maestro-action)

📱 Set up GitHub Actions with [Maestro](https://github.com/mobile-dev-inc/Maestro) CLI.

## Quick Start

```yaml
name: setup-maestro-action
on: push
jobs:
  setup-maestro-action:
    runs-on: ubuntu-latest
    steps:
      - name: Setup Maestro
        uses: remarkablemark/setup-maestro-action@v1

      - name: See help
        run: maestro --help
```

## Usage

**Basic:**

```yaml
- uses: remarkablemark/setup-maestro-action@v1
```

See [action.yml](action.yml)

## Inputs

### `version`

**Optional**: The CLI [version](https://github.com/mobile-dev-inc/Maestro/releases). Defaults to [`2.0.3`](https://github.com/mobile-dev-inc/Maestro/releases/tag/cli-2.0.3):

```yaml
- uses: remarkablemark/setup-maestro-action@v1
  with:
    version: 2.0.3
```

## License

[MIT](LICENSE)
