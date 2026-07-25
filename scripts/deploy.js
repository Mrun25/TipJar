const hre = require("hardhat");
const fs  = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  TipJar — Deploy Script");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Deployer : ${deployer.address}`);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`  Balance  : ${hre.ethers.formatEther(balance)} ETH`);

  if (balance === 0n) {
    throw new Error("Deployer wallet has 0 ETH — fund it from a Sepolia faucet first.");
  }

  // ── Deploy ──────────────────────────────────────────────────────────────────
  console.log("\n  Deploying TipJar…");
  const TipJar = await hre.ethers.getContractFactory("TipJar");
  const tipJar = await TipJar.deploy();
  await tipJar.waitForDeployment();

  const address = await tipJar.getAddress();
  console.log(`  ✅ TipJar deployed to: ${address}`);
  console.log(`  🔗 Etherscan: https://sepolia.etherscan.io/address/${address}`);

  // ── Persist address + ABI for the frontend ──────────────────────────────────
  const frontendDir = path.join(__dirname, "..", "frontend");
  if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

  // Contract address
  const addrFile = path.join(frontendDir, "contract-address.json");
  fs.writeFileSync(addrFile, JSON.stringify({ address, network: hre.network.name }, null, 2));
  console.log(`  📄 Address saved → frontend/contract-address.json`);

  // ABI (extract from compiled artifact)
  const artifactPath = path.join(
    __dirname, "..", "artifacts", "contracts", "TipJar.sol", "TipJar.json"
  );
  if (fs.existsSync(artifactPath)) {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    const abiFile  = path.join(frontendDir, "TipJarABI.json");
    fs.writeFileSync(abiFile, JSON.stringify(artifact.abi, null, 2));
    console.log(`  📄 ABI saved      → frontend/TipJarABI.json`);
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Deployment complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // ── Optional Etherscan verification ─────────────────────────────────────────
  if (process.env.ETHERSCAN_API_KEY && hre.network.name !== "localhost") {
    console.log("  Waiting 5 blocks before Etherscan verification…");
    // Wait a bit for Etherscan to index the contract
    await new Promise(r => setTimeout(r, 30_000));
    try {
      await hre.run("verify:verify", { address, constructorArguments: [] });
      console.log("  ✅ Contract verified on Etherscan");
    } catch (e) {
      console.warn("  ⚠️  Etherscan verification failed:", e.message);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
