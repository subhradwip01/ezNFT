const hre = require("hardhat");

async function main() {
  const NFTPunk = await hre.ethers.getContractFactory("NFTPunk");
  const nftPunk = await NFTPunk.deploy("NFTPunk","NFP");

  await greeter.deployed();

  console.log("NFTPunk deployed to:", nftPunk.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
