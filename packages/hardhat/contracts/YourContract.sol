pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract is Ownable {
    // event SetPurpose(address sender, string purpose);

    string public name;
    string public purpose;

    constructor(string memory _name, string memory _purpose) {
        name = _name;
        purpose = _purpose;
    }

    function setPurpose(string memory newPurpose) public {
        purpose = newPurpose;
        console.log(msg.sender, "set purpose to", purpose);
        // emit SetPurpose(msg.sender, purpose);
    }
}
