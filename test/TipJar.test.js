const { expect } = require("chai");
const { ethers }  = require("hardhat");

describe("TipJar", function () {
  let tipJar, owner, tipper, other;

  beforeEach(async () => {
    [owner, tipper, other] = await ethers.getSigners();
    const TipJar = await ethers.getContractFactory("TipJar");
    tipJar = await TipJar.deploy();
    await tipJar.waitForDeployment();
  });

  // ── Deployment ─────────────────────────────────────────────────────────────

  it("sets the deployer as owner", async () => {
    expect(await tipJar.owner()).to.equal(owner.address);
  });

  it("starts with zero tips and zero amount", async () => {
    expect(await tipJar.totalTips()).to.equal(0n);
    expect(await tipJar.totalAmount()).to.equal(0n);
  });

  // ── tip() ─────────────────────────────────────────────────────────────────

  it("accepts a valid tip and emits NewTip", async () => {
    const amount  = ethers.parseEther("0.01");
    const message = "Great comics, keep it up!";

    await expect(tipJar.connect(tipper).tip(message, { value: amount }))
      .to.emit(tipJar, "NewTip")
      .withArgs(tipper.address, amount, message, anyValue);
  });

  it("increments totalTips and totalAmount", async () => {
    const amount = ethers.parseEther("0.005");
    await tipJar.connect(tipper).tip("First!", { value: amount });
    await tipJar.connect(other).tip("Second!", { value: amount });

    expect(await tipJar.totalTips()).to.equal(2n);
    expect(await tipJar.totalAmount()).to.equal(amount * 2n);
  });

  it("reverts on zero-value tip", async () => {
    await expect(
      tipJar.connect(tipper).tip("free?", { value: 0 })
    ).to.be.revertedWithCustomError(tipJar, "ZeroTip");
  });

  it("reverts when message exceeds 280 bytes", async () => {
    const longMsg = "a".repeat(281);
    await expect(
      tipJar.connect(tipper).tip(longMsg, { value: ethers.parseEther("0.001") })
    ).to.be.revertedWithCustomError(tipJar, "MessageTooLong");
  });

  it("accepts exactly 280-character message", async () => {
    const maxMsg = "x".repeat(280);
    await expect(
      tipJar.connect(tipper).tip(maxMsg, { value: ethers.parseEther("0.001") })
    ).to.emit(tipJar, "NewTip");
  });

  it("accepts empty message", async () => {
    await expect(
      tipJar.connect(tipper).tip("", { value: ethers.parseEther("0.001") })
    ).to.emit(tipJar, "NewTip");
  });

  // ── withdraw() ────────────────────────────────────────────────────────────

  it("allows owner to withdraw all funds", async () => {
    await tipJar.connect(tipper).tip("thanks", { value: ethers.parseEther("0.05") });

    const balanceBefore = await ethers.provider.getBalance(owner.address);
    const tx   = await tipJar.connect(owner).withdraw();
    const rcpt = await tx.wait();
    const gas  = rcpt.gasUsed * rcpt.gasPrice;

    const balanceAfter = await ethers.provider.getBalance(owner.address);
    expect(balanceAfter).to.be.closeTo(
      balanceBefore + ethers.parseEther("0.05") - gas,
      ethers.parseEther("0.0001")
    );
  });

  it("reverts withdraw if called by non-owner", async () => {
    await tipJar.connect(tipper).tip("yo", { value: ethers.parseEther("0.01") });
    await expect(tipJar.connect(tipper).withdraw())
      .to.be.revertedWithCustomError(tipJar, "NotOwner");
  });

  // ── receive() ────────────────────────────────────────────────────────────

  it("rejects plain ETH transfers (no calldata)", async () => {
    await expect(
      tipper.sendTransaction({ to: await tipJar.getAddress(), value: ethers.parseEther("0.01") })
    ).to.be.reverted;
  });
});

// Chai helper for any value match (timestamp)
const anyValue = () => true;
