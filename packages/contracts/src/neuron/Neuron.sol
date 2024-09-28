// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import "../interfaces/INeuron.sol";
import {ISynapse} from "../interfaces/ISynapse.sol";

contract Neuron is INeuron, Ownable {
    ISynapse public synapse;

    constructor(address _initialOwner, address _synapse) Ownable(_initialOwner) {
        synapse = ISynapse(_synapse);
    }
}
