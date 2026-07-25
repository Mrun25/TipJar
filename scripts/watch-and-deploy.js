/**
 * scripts/watch-and-deploy.js
 * Polls the deployer wallet every 10s and auto-deploys as soon as funded.
 * Run: node scripts/watch-and-deploy.js
 */
require("dotenv").config();
const { ethers } = require("ethers");
const { execSync } = require("child_process");

const RPC_URL = process.env.QUICKNODE_SEPOLIA_URL || "https://ethereum-sepolia-rpc.publicnode.com";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY || PRIVATE_KEY === "0x" + "0".repeat(64)) {
  console.error("❌ PRIVATE_KEY not set in .env");
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet   = new ethers.Wallet(PRIVATE_KEY, provider);
const MIN_ETH  = ethers.parseEther("0.01");

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  TipJar — Watch & Deploy");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`  Deployer : ${wallet.address}`);
console.log(`  RPC      : ${RPC_URL}`);
console.log("  Waiting for ≥ 0.01 Sepolia ETH...\n");
console.log("  📋 Fund this address from a faucet:");
console.log("       https://sepoliafaucet.com");
console.log("       https://faucets.chain.link/sepolia");
console.log("       https://faucet.quicknode.com/ethereum/sepolia");
console.log(`\n  Address: ${wallet.address}\n`);

let attempt = 0;

async function poll() {
  attempt++;
  process.stdout.write(`\r  Checking balance (attempt ${attempt})...`);

  try {
    const balance = await provider.getBalance(wallet.address);
    process.stdout.write(`\r  Balance: ${ethers.formatEther(balance)} ETH            \n`);

    if (balance >= MIN_ETH) {
      console.log(`\n  ✅ Funded! Deploying TipJar to Sepolia...`);

      try {
        const output = execSync("npx hardhat run scripts/deploy.js --network sepolia", {
          cwd: process.cwd(),
          encoding: "utf8",
          stdio: "pipe",
        });
        console.log(output);
        console.log("\n  🎉 Deploy complete! Restart the frontend server to use the new contract.");
        process.exit(0);
      } catch (deployErr) {
        console.error("\n  ❌ Deploy failed:", deployErr.message);
        process.exit(1);
      }
    } else {
      setTimeout(poll, 10_000); // retry in 10s
    }
  } catch (err) {
    console.error(`\n  RPC error: ${err.message}`);
    setTimeout(poll, 15_000);
  }
}

poll();
