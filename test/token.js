const { expect } = require("chai");
const { hardhatArguments } = require("hardhat");
describe("Token Contract", function () {
  let Token;
  let tokenhardhat;
  let owner;
  let address1;
  let address2;
  let addrs;
  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, address1, address2, ...addrs] = await ethers.getSigners();
    tokenhardhat = await Token.deploy();
  });

  describe("Token Contract", function () {
    it("should set the rigth owner", async function () {
      expect(await tokenhardhat.owner()).to.equal(owner.address);
    });
    it("should assign to total supply of tokens to the owner", async function () {
      const ownerBalance = await tokenhardhat.balanceOf(owner.address);
      expect(await tokenhardhat.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transation", function () {
    it("should transfer between account", async function () {
      await tokenhardhat.transfer(address1.address, 5);
      const addr1Balance = await tokenhardhat.balanceOf(address1.address);
      expect(addr1Balance).to.equal(5);
      await tokenhardhat.connect(address1).transfer(address2.address, 5);
      const addr2Balance = await tokenhardhat.balanceOf(address2.address);
      expect(addr2Balance).to.equal(5);
    });

    it("should fail if sender have not enough token", async function () {
      const initialOwnerBalance = await tokenhardhat.balanceOf(owner.address);
      await expect(
        await tokenhardhat.connect(address1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough Token");
      expect(await tokenhardhat.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
    it("should update balance", async function () {
      const initBalance = await tokenhardhat.balanceOf(owner.address);
      await tokenhardhat.transfer(address1.address, 5);
      await tokenhardhat.transfer(address2.address, 10);
      const finalBlance = await tokenhardhat.balanceOf(owner.address);
      expect(finalBlance).to.equal(initBalance - 15);
      const address1Balance = await tokenhardhat.balanceOf(address1.address);

      expect(address1Balance).to.equal(5);
      const address2Balance = await tokenhardhat.balanceOf(address2.address);
      expect(address2Balance).to.equal(10);
    });
  });
});

// describe("Token Contract", function () {
//   it("Deployement should assign to total supply of tokens", async function () {
//     const [owner] = await ethers.getSigners();
//     const Token = await ethers.getContractFactory("Token");
//     const token = await Token.deploy();
//     const ownerBalance = await token.balanceOf(owner.address);
//     console.log("owner--Balance:", owner.address);
//     expect(await token.totalSupply()).to.equal(ownerBalance);
//   });

//   it("should transfer between account", async function () {
//     const [owner, address1, address2] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("Token");
//     const token = await Token.deploy();
//     await token.transfer(address1.address, 10);
//     expect(await token.balanceOf(address1.address)).to.equal(10);

//     await token.connect(address1).transfer(address2.address, 5);
//     expect(await token.balanceOf(address2.address)).to.equal(5);
//   });
// });
