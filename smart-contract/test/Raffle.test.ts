import { assert, expect } from "chai";
import { ethers, network } from "hardhat";
import { Raffle, Raffle__factory } from "../typechain-types";

describe("Raffle Unit Test", function () {
  let raffle: Raffle;
  let Raffle: Raffle__factory;
  // let VRFCoordinatorMock: VRFCoordinatorMock__factory;
  let owner: string;
  let interval: number;
  let entranceFee: string = ethers.utils.parseEther("1").toString();

  beforeEach(async () => {
    owner = (await ethers.getSigners())[0].address;
    // VRFCoordinatorMock = await ethers.getContractFactory("VRFCoordinatorMock");
    Raffle = await ethers.getContractFactory("Raffle", owner);
    raffle = await Raffle.deploy(
      "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
      ethers.utils.parseEther("0.01"),
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
      "1454",
      "50000",
      "60"
    );
    interval = (await raffle.getInterval()).toNumber();
  });

  describe("Constructor", () => {
    it("Initializes the raffle state correctly", async function () {
      const raffleState = await raffle.getRaffleState();
      assert.equal(raffleState.toString(), "0");
    });

    it("Initializes the interval correctly", async function () {
      const interval = await raffle.getInterval();
      assert.equal(interval.toString(), "60");
    });
  });

  describe("EnterRaffle", () => {
    it("reverts when you don't pay enough", async () => {
      await expect(
        raffle.enterRaffle({ value: ethers.utils.parseEther("0") })
      ).to.be.revertedWithCustomError(raffle, "Raffle__SendMoreToEnterRaffle");
    });

    // it("does not allow entry in calculating state", async () => {
    //   await raffle.enterRaffle({ value: entranceFee });
    //   await network.provider.send("evm_increaseTime", [interval + 10]);
    //   await network.provider.request({ method: "evm_mine", params: [] });
    //   await raffle.performUpkeep([]);
    // await expect(raffle.enterRaffle({ value: ethers.utils.parseEther("2") }))
    //   .to.be.reverted;
    // });

    it("adds new player to the player's array", async () => {
      await raffle.enterRaffle({ value: entranceFee });
      const firstPlayer = await raffle.getPlayer(0);
      assert.equal(firstPlayer, owner);
    });

    it("emit an event on enter", async () => {
      await expect(raffle.enterRaffle({ value: entranceFee }))
        .to.emit(raffle, "RaffleEnter")
        .withArgs(owner);
    });
  });

  describe("checkUpkeep", () => {
    it("returns false if there is no eth", async () => {
      await network.provider.send("evm_increaseTime", [interval + 10]);
      await network.provider.request({ method: "evm_mine", params: [] });
      const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([]);
      assert(!upkeepNeeded);
    });
  });

  describe("PerformUpkeep", () => {
    // it("it can only run if checkUpkeep is true", async () => {
    //   await raffle.enterRaffle({ value: entranceFee });
    //   await network.provider.send("evm_increaseTime", [interval + 10]);
    //   await network.provider.request({ method: "evm_mine", params: [] });
    //   const tx = await raffle.performUpkeep([]);

    //   assert(tx);
    // });

    it("revert with Raffle__UpkeepNotNeeded", async () => {
      await expect(raffle.performUpkeep([])).to.be.revertedWithCustomError(
        raffle,
        "Raffle__UpkeepNotNeeded"
      );
    });

    describe("", () => {});
  });
});
