# Contributing to TipJar

TipJar is a transparent, permissionless tip jar on Ethereum Sepolia: a
Hardhat contract plus a static frontend.

## Setup

```bash
npm install
npx hardhat compile
```

## Day-to-day

```bash
npx hardhat test                    # contract tests
npx hardhat node                    # local chain
npm run deploy:local                # deploy to the local chain
npm run serve                       # serve the frontend on :3000
```

Sepolia deploys (`npm run deploy:sepolia`) need your own RPC URL and key in
the Hardhat config - never commit either.

## Pull requests

Keep PRs focused on one change. For contract changes, say what the tests
cover; for frontend changes, a screenshot helps. Never commit private keys,
mnemonics or RPC endpoints with keys in them.
