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
  const Raffle = await ethers.getContractFactory("Raffle");
  const raffle = await Raffle.deploy(
    "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    ethers.utils.parseEther("0.01"),
    "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    "1454",
    "50000",
    "60"
  );

  await raffle.deployed();
  await verify(raffle.address, []);
  console.log("Verified");
  console.log(raffle.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
