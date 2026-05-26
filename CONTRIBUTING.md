# Contributing to TN Info

Thank you for helping improve the open-source Tamil Nadu information platform.

## Ways to Contribute

- **Data corrections** — Fix inaccurate election results, MLA info, scheme details, or district data
- **Bug reports** — Report broken features via GitHub Issues
- **New features** — Build or suggest improvements
- **Documentation** — Improve guides and README files

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/tn-info.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feat/your-feature`
5. Make your changes and run `pnpm lint`
6. Push and open a pull request against `main`

## Pull Request Guidelines

- One change per PR — keep scope focused
- Write a clear description of what changed and why
- Reference related issues with `Closes #123`
- Ensure CI passes before requesting review

## Data Contributions

For data corrections (election results, MLAs, schemes, cabinet, etc.):
1. Cite an official source (Election Commission, TN Government portal, Gazette)
2. Include the source URL in your PR description
3. Prefer data from `eci.gov.in`, `tn.gov.in`, or official gazette publications

## Commit Messages

Short, imperative, sentence-case (3–7 words). Examples:
- `Fix Coimbatore constituency boundary data`
- `Add 2024 LS winners for Dharmapuri`

## Questions?

Open a [GitHub Discussion](https://github.com/tamilnadu-info/tn-info/discussions) or email hello@tn-info.in
