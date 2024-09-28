// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {IConduit} from "../interfaces/IConduit.sol";
import {ISynapse} from "../interfaces/ISynapse.sol";

abstract contract ConduitBase is IConduit {
    ISynapse public synapse;

    error OnlySynapse();

    constructor(address _synapse) {
        synapse = ISynapse(_synapse);
    }

    modifier onlySynapse() {
        if (msg.sender != address(synapse)) {
            revert OnlySynapse();
        }
        _;
    }
}
