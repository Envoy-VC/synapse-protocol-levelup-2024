// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

library NeuronMessage {
    enum Receiver {
        Synapse, // Receiver is Synapse Entrypoint
        Neuron // Receiver is another Neuron

    }

    struct Message {
        address sender;
        address recipient;
        Receiver receiver;
        bytes data;
    }

    error EmptyData();

    function initializeSynapseRequest(address _sender, address _recipient, bytes memory _data)
        internal
        pure
        returns (Message memory)
    {
        if (_data.length == 0) {
            revert EmptyData();
        }

        return Message(_sender, _recipient, Receiver.Synapse, _data);
    }

    function initializeNeuronRequest(address _sender, address _recipient, bytes memory _data)
        internal
        pure
        returns (Message memory)
    {
        if (_data.length == 0) {
            revert EmptyData();
        }

        return Message(_sender, _recipient, Receiver.Neuron, _data);
    }

    function encodeRequest(Message memory self) public pure returns (bytes memory) {
        return abi.encode(self);
    }

    function decodeRequest(bytes memory _data) public pure returns (Message memory) {
        return abi.decode(_data, (Message));
    }
}
