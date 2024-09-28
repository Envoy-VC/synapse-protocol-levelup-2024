// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

library ConduitMessage {
    struct Message {
        address sender;
        address recipient;
        bytes data;
    }

    error EmptyData();

    function initializeConduitMessage(address sender, address recipient, bytes calldata data)
        public
        pure
        returns (Message memory)
    {
        if (data.length == 0) {
            revert EmptyData();
        }

        return Message(sender, recipient, data);
    }

    function decodeMessage(bytes memory _data) public pure returns (Message memory) {
        return abi.decode(_data, (Message));
    }
}
