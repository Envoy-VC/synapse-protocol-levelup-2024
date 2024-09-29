// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Libraries
import {ConduitMessage} from "./libraries/ConduitMessage.sol";

import {Test, console2 as console, Vm} from "forge-std/Test.sol";

// Interfaces
import "./interfaces/ISynapse.sol";

contract Synapse is ISynapse, Ownable {
    uint256 public _conduitCount;

    // Counter => Address
    mapping(uint256 => address) public _conduits;
    // Conduit => Whitelist Status
    mapping(address => bool) public _whitelistedConduits;

    error AlreadyRegistered(address conduit);
    error NotAWhitelistedConduit(address conduit);

    // Events
    event ExecutionSuccess(ConduitMessage.Message message, bytes returnData);
    event ExecutionFailed(ConduitMessage.Message message);

    constructor(address _initialOwner) Ownable(_initialOwner) {}

    function registerConduit(address _conduit) public onlyOwner {
        if (_whitelistedConduits[_conduit]) {
            revert AlreadyRegistered(_conduit);
        }

        _whitelistedConduits[_conduit] = true;
        _conduits[_conduitCount] = _conduit;

        _conduitCount++;
    }

    function onlyWhitelistConduits(address _conduit) internal view {
        if (!_whitelistedConduits[_conduit]) {
            revert NotAWhitelistedConduit(_conduit);
        }
    }

    function receiveMessage(ConduitMessage.Message memory _message) public payable {
        onlyWhitelistConduits(_message.recipient);
        console.log("Synapse Received Message with Value: ", msg.value);
        (bool success, bytes memory data) =
            _message.recipient.call{value: msg.value}(abi.encodeWithSignature("execute(bytes)", _message.data));

        if (success) {
            console.log("Execution Success");
            emit ExecutionSuccess(_message, data);
        } else {
            console.log("Execution Failed");
            emit ExecutionFailed(_message);
        }
    }
}
