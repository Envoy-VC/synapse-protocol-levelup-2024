// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ConduitMessage} from "../libraries/ConduitMessage.sol";

interface ISynapse {
    function registerConduit(address _conduit) external;

    function receiveMessage(ConduitMessage.Message memory message) external;
}
