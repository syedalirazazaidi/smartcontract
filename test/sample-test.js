// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Storage = await ethers.getContractFactory("SimpleStorage");
//     const storage = await Storage.deploy();
//     await storage.deployed();

//     const setUpdateTx = await storage.updateData(10);

//     // wait until the transaction is mined
//     await setUpdateTx.wait();

//     expect(await storage.readData()).to.equal(10);
//   });
// });
