import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
  let SimpleStorage: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;

  beforeEach(async function () {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
  });

  it("Favourite number should be 0 at first", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue: number = 0;
    console.log(currentValue.toNumber());
    assert.equal(currentValue.toNumber(), expectedValue);
  });

  it("Favourite number should be 99", async function () {
    const inputValue: number = 99;
    const storeValue = await simpleStorage.store(inputValue);
    await storeValue.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toNumber(), inputValue);
  });
});
