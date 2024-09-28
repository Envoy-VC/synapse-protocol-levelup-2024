// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {NeuronMessage} from "../libraries/NeuronMessage.sol";

interface INeuron {
    function sendMessage(NeuronMessage.Message memory _message) external;
    function receiveMessage(NeuronMessage.Message memory _message) external;
}
