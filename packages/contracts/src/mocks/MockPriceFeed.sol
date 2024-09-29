// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MockPriceFeed is Ownable {
    uint256 _currentPrice;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function updatePrice(uint256 updatedPrice) public onlyOwner {
        _currentPrice = updatedPrice;
    }

    function getCurrentPrice() public view returns (uint256) {
        return _currentPrice;
    }
} 
