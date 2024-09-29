// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ConduitBase} from "../common/ConduitBase.sol";

// Verifier
import {UltraVerifier} from "../verifiers/sudoku.sol";

struct SudokuMessage {
    uint8 position;
    uint8 value;
}

contract Sudoku is ConduitBase {
    UltraVerifier public verifier;

    // Position => Value
    mapping(uint8 => uint8) public _values;

    // Errors
    error InvalidPosition();
    error OutOfRangeValue();

    constructor(address _synapse, address _verifier) ConduitBase(_synapse) {
        verifier = UltraVerifier(_verifier);
    }

    function execute(bytes memory data) public payable {
        SudokuMessage memory message = abi.decode(data, (SudokuMessage));
        if (message.position >= 16) {
            revert InvalidPosition();
        }

        if (message.value >= 5 || message.value == 0) {
            revert OutOfRangeValue();
        }

        _values[message.position] = message.value;
    }

    function getBoard() public view returns (uint8[] memory) {
        // get 4* 4 board from _values
        uint8[] memory board = new uint8[](16);
        for (uint8 i = 0; i < 16; i++) {
            board[i] = _values[i];
        }

        return board;
    }

    function solveBoard(bytes memory proof) public view returns (bool) {
        bytes32[] memory publicInputs = new bytes32[](0);
        bool verified = verifier.verify(proof, publicInputs);
        return verified;
    }
}
