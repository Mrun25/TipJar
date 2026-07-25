/**
 * scripts/generate-wallet.js
 * Generates a new Ethereum wallet for deployment.
 * Run: node scripts/generate-wallet.js
 * 
 * ⚠️  Use ONLY as a burner/deployer wallet. Never put your main MetaMask seed here.
 */
const { ethers } = require("ethers");

const wallet = ethers.Wallet.createRandom();

console.log("\n🔑 New Deployer Wallet Generated\n");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`  Address     : ${wallet.address}`);
console.log(`  Private Key : ${wallet.privateKey}`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("\n📋 Next steps:");
console.log("  1. Copy the private key into your .env file as PRIVATE_KEY=<key>");
console.log("  2. Fund the address with Sepolia ETH from:");
console.log("       https://sepoliafaucet.com");
console.log("       https://faucet.quicknode.com/ethereum/sepolia");
console.log("  3. Run: npm run deploy:sepolia");
console.log("\n⚠️  NEVER share this private key or commit it to Git!\n");
