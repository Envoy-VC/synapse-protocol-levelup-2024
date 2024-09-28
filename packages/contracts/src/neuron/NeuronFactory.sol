// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";

// Neuron Contract for Bytecode
import {Neuron} from "./Neuron.sol";

import {ISynapse} from "../interfaces/ISynapse.sol";

contract NeuronFactory is Ownable {
    ISynapse public synapse;
    mapping(address => address) public _neurons;

    event NeuronCreated(address indexed owner, address neuron);

    error NeuronAlreadyCreated(address owner);

    constructor(address _initialOwner, address _synapse) Ownable(_initialOwner) {
        synapse = ISynapse(_synapse);
    }

    function createNeuron(bytes32 salt, address owner) external returns (address) {
        if (_neurons[owner] != address(0)) {
            revert NeuronAlreadyCreated(owner);
        }

        bytes memory bytecode = getNeuronByteCode(owner);
        address addr = Create2.deploy(0, salt, bytecode);
        _neurons[owner] = addr;
        emit NeuronCreated(owner, addr);
        return addr;
    }

    function getNeuronByteCode(address owner) public view returns (bytes memory) {
        return abi.encodePacked(type(Neuron).creationCode, abi.encode(owner, address(synapse)));
    }
}
