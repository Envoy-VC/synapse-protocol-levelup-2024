// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Libraries
import {NeuronMessage} from "../libraries/NeuronMessage.sol";
import {ConduitMessage} from "../libraries/ConduitMessage.sol";

// Interfaces
import "../interfaces/INeuron.sol";
import {ISynapse} from "../interfaces/ISynapse.sol";

contract Neuron is INeuron, Ownable {
    ISynapse public synapse;

    constructor(address _initialOwner, address _synapse) Ownable(_initialOwner) {
        synapse = ISynapse(_synapse);
    }

    function sendMessage(NeuronMessage.Message memory _message) public payable onlyOwner {
        _handleMessage(_message);
    }

    function receiveMessage(NeuronMessage.Message memory _message) public payable {
        // Only Accept calls from Smart Contracts
        NeuronMessage.isSmartContract(_message.sender);
        _handleMessage(_message);
    }

    function _handleMessage(NeuronMessage.Message memory _message) public payable {
        // Only Send Messages to Smart Contracts
        NeuronMessage.isSmartContract(_message.recipient);
        if (_message.receiver == NeuronMessage.Receiver.Neuron) {
            INeuron _neuron = INeuron(_message.recipient);
            NeuronMessage.Message memory _forwardedMsg = NeuronMessage.decodeRequest(_message.data);
            _neuron.receiveMessage{value: msg.value}(_forwardedMsg);
        } else {
            ConduitMessage.Message memory _executionMessage = ConduitMessage.decodeMessage(_message.data);
            synapse.receiveMessage{value: msg.value}(_executionMessage);
        }
    }
}
