const hre = require("hardhat");

async function main() {
  const VendingMachine = await hre.ethers.getContractFactory("VendingMachine");
  const vendingMachine = await VendingMachine.deploy("Hello, VendingMachine!");

  await vendingMachine.deployed();

  console.log("Greeter deployed to:", vendingMachine.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
