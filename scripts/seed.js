/**
 * scripts/seed.js — Seed the local Hardhat node with sample tips
 * Run AFTER deploy.js:  npx hardhat run scripts/seed.js --network localhost
 */
const hre  = require("hardhat");
const fs   = require("fs");
const path = require("path");

const SAMPLE_TIPS = [
  { amount: "0.005", msg: "Been reading for two years — keep it up! ☕" },
  { amount: "0.01",  msg: "Your art made my Monday better. Thank you!" },
  { amount: "0.001", msg: "" },   // anonymous, no message
  { amount: "0.02",  msg: "Can't wait for next week's strip 🎉" },
  { amount: "0.003", msg: "A small coffee from Germany 🇩🇪" },
];

async function main() {
  const signers = await hre.ethers.getSigners();

  // Load deployed address
  const addrFile = path.join(__dirname, "..", "frontend", "contract-address.json");
  if (!fs.existsSync(addrFile)) {
    throw new Error("frontend/contract-address.json not found — deploy first!");
  }
  const { address } = JSON.parse(fs.readFileSync(addrFile, "utf8"));

  // Load ABI
  const abiFile = path.join(__dirname, "..", "frontend", "TipJarABI.json");
  const abi     = JSON.parse(fs.readFileSync(abiFile, "utf8"));

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  TipJar — Seed Script");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Contract: ${address}`);
  console.log(`  Seeding ${SAMPLE_TIPS.length} tips…\n`);

  for (let i = 0; i < SAMPLE_TIPS.length; i++) {
    const signer  = signers[(i + 1) % signers.length];  // rotate through test accounts
    const { amount, msg } = SAMPLE_TIPS[i];
    const contract = new hre.ethers.Contract(address, abi, signer);

    const tx = await contract.tip(msg, { value: hre.ethers.parseEther(amount) });
    await tx.wait();

    console.log(`  ✅ Tip ${i + 1}/${SAMPLE_TIPS.length}: ${amount} ETH from ${signer.address.slice(0,8)}… — "${msg.slice(0, 40) || "<no message>"}"`);
  }

  // Print final stats
  const roContract = new hre.ethers.Contract(address, abi, signers[0]);
  const [total, amount] = await Promise.all([
    roContract.totalTips(),
    roContract.totalAmount(),
  ]);

  console.log(`\n  📊 Total tips:   ${total}`);
  console.log(`  📊 Total amount: ${hre.ethers.formatEther(amount)} ETH`);
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Seeding complete! Open frontend/index.html to see the wall.");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch(err => { console.error(err); process.exitCode = 1; });
