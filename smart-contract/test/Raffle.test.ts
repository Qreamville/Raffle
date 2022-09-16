import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { Raffle, Raffle__factory } from "../typechain-types";

describe("Raffle Unit Test", function () {
  let raffle: Raffle;
  let Raffle: Raffle__factory;

  beforeEach(async () => {
    const [owner] = await ethers.getSigners();
    Raffle = await ethers.getContractFactory("Raffle", owner);
    raffle = await Raffle.deploy(
      "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
      ethers.utils.parseEther("0.01"),
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
      "1454",
      "50000",
      "60"
    );
  });

  describe("Constructor", async () => {
    it("Initializes the raffle state correctly", async function () {
      const raffleState = await raffle.getRaffleState();
      assert.equal(raffleState.toString(), "0");
    });

    it("Initializes the interval correctly", async function () {
      const interval = await raffle.getInterval();
      assert.equal(interval.toString(), "60");
    });
  });

  describe("EnterRaffle", async () => {
    it("reverts when you don't pay enough", async () => {
      await expect(raffle.enterRaffle()).to.be.revertedWith(
        "Raffle__SendMoreToEnterRaffle"
      );
    });
  });
});
