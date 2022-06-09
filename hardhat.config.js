require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const ALCHEMEY_API_KEY = "///";
const RINKEBY_KEY = "///";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  networks: {
    rinkeby: {
      url: `${ALCHEMEY_API_KEY}`,
      account: [`${RINKEBY_KEY}`],
    },
  },
};
