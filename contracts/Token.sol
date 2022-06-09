// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Token {
    string public name = "HardHet Token";
    string public symbol = "HHE";
    uint256 public totalSupply = 10000;

    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        console.log("sender balance is % tokens",balances[msg.sender]);
        console.log("---sender balance is % tokens",amount,to);
        require(balances[msg.sender] >= amount, "Not Enough Token");

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
