// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IConduit {
    function execute(bytes memory data) external payable;
}
