import { ethers, run } from "hardhat";

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

async function main() {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  await simpleStorage.deployed();
  await verify(simpleStorage.address, []);
  console.log("Verified");
  console.log(simpleStorage.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
