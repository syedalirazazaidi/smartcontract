// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
      address public owner;
      address payable[] public players;
      uint public lotteryId;
      mapping (uint => address payable) public lotteryHistory;
       constructor(){
        owner  = msg.sender;
        lotteryId=1;
    }
    function getBalance() public view returns(uint){
        return address(this).balance;
    }
    function getPlayer() public view returns(address payable[] memory){
        return players;
    }
    function enter() public payable {
         require (msg.value>.01 ether);
        // address of the player  entering  lottery
        players.push(payable(msg.sender));
    }
    function getWinnerByLottery(uint lottery) public view returns(address payable) {
        return lotteryHistory[lottery];
    }
    function getrendomNumber() public view returns(uint) {
        return uint(keccak256(abi.encodePacked(owner,block.timestamp)));
    }
    
    function pickWinner() public onlyOwner {
        
      uint index = getrendomNumber() %  players.length;
      players[index].transfer(address(this).balance);
       lotteryHistory[lotteryId] = players[index];
      lotteryId++;
     
    //   0xddaAd340b0f1Ef65169Ae5E41A8b10776a75482d
      
    //   reset the state of the contract
      players = new address payable[](0);
    }
    modifier  onlyOwner(){
         require (msg.sender==owner,"Only the owner can do  this.");
         _;

    }

}