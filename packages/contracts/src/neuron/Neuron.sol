// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import "../interfaces/INeuron.sol";

contract Neuron is INeuron, Ownable {
    constructor(address _initialOwner) Ownable(_initialOwner) {}
}
