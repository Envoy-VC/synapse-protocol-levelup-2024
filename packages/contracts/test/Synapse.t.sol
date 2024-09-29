// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console2 as console, Vm} from "forge-std/Test.sol";
import {Synapse} from "src/Synapse.sol";
import {NeuronFactory} from "src/neuron/NeuronFactory.sol";
import {UltraVerifier} from "src/verifiers/sudoku.sol";
import "src/conduits/Sudoku.sol";
import "src/conduits/Stablecoin.sol";
import {Neuron} from "src/neuron/Neuron.sol";
import {INeuron} from "src/interfaces/INeuron.sol";

import {ConduitMessage} from "src/libraries/ConduitMessage.sol";
import {NeuronMessage} from "src/libraries/NeuronMessage.sol";

import {MockPriceFeed} from "src/mocks/MockPriceFeed.sol";

contract CounterTest is Test {
    Synapse public synapse;
    NeuronFactory public factory;
    UltraVerifier public sudokuVerifier;
    MockPriceFeed public mockPriceFeed;

    // Conduits
    Sudoku public sudokuConduit;
    Stablecoin public stablecoinConduit;

    // Wallets
    Vm.Wallet public alice;
    Vm.Wallet public bob;
    Vm.Wallet public owner;

    // Neurons
    INeuron public aliceNeuron;
    INeuron public bobNeuron;

    function setUp() public {
        alice = vm.createWallet("alice");
        bob = vm.createWallet("bob");
        owner = vm.createWallet("owner");

        vm.startBroadcast(owner.addr);
        synapse = new Synapse(owner.addr);
        factory = new NeuronFactory(owner.addr, address(synapse));
        sudokuVerifier = new UltraVerifier();
        sudokuConduit = new Sudoku(address(synapse), address(sudokuVerifier));
        aliceNeuron = INeuron(factory.createNeuron(keccak256("alice"), alice.addr));
        bobNeuron = INeuron(factory.createNeuron(keccak256("bob"), bob.addr));

        mockPriceFeed = new MockPriceFeed(owner.addr);

        stablecoinConduit = new Stablecoin(address(synapse), address(mockPriceFeed));

        // Start Price is 2500 USD
        mockPriceFeed.updatePrice(2500 * 10 ** 6);

        // Whitelist
        synapse.registerConduit(address(sudokuConduit));
        synapse.registerConduit(address(stablecoinConduit));

        vm.stopBroadcast();
    }

    function test_createNeuron() public {
        vm.startBroadcast(owner.addr);
        bytes32 salt = keccak256("some-random-salt");
        factory.createNeuron(salt, owner.addr);
        vm.stopBroadcast();
    }

    function printSudokuBoard() public view {
        uint8[] memory board = sudokuConduit.getBoard();
        console.log(board[0], board[1], board[2], board[3]);
        console.log(board[4], board[5], board[6], board[7]);
        console.log(board[8], board[9], board[10], board[11]);
        console.log(board[12], board[13], board[14], board[15]);
    }

    function test_getBoard() public view {
        console.log("Sudoku Board: ");
        printSudokuBoard();
    }

    function test_sendMessage() public {
        vm.startBroadcast(alice.addr);

        SudokuMessage memory sudokuMessage = SudokuMessage({position: 0, value: 1});
        bytes memory encodedSudokuMessage = abi.encode(sudokuMessage);

        bytes memory data = abi.encode(
            ConduitMessage.initializeConduitMessage(address(alice.addr), address(sudokuConduit), encodedSudokuMessage)
        );

        NeuronMessage.Message memory message = NeuronMessage.Message({
            sender: address(alice.addr),
            recipient: address(sudokuConduit),
            receiver: NeuronMessage.Receiver.Synapse,
            data: data
        });

        aliceNeuron.sendMessage(message);

        vm.stopBroadcast();

        printSudokuBoard();
    }

    function test_stableCoin() public {
        vm.startBroadcast(alice.addr);
        vm.deal(alice.addr, 10 ether);

        console.log("Current Price: ", mockPriceFeed.getCurrentPrice());
        console.log("Stability Factor: ", stablecoinConduit.getStabilityFactor());

        stablecoinConduit.mint{value: 1 ether}();

        console.log("Current Balance: ", stablecoinConduit.balanceOf(address(alice.addr)));
        console.log("Stability Factor: ", stablecoinConduit.getStabilityFactor());

        vm.stopBroadcast();

        vm.startBroadcast(owner.addr);
        mockPriceFeed.updatePrice(2450 * 10 ** 6);
        console.log("Changed Price: ", mockPriceFeed.getCurrentPrice());
        vm.stopBroadcast();

        vm.startBroadcast(alice.addr);
        console.log("Stability Factor: ", stablecoinConduit.getStabilityFactor());
        uint256 additionalRequired = stablecoinConduit.additionalValueForStability();

        console.log("Additional Required: ", additionalRequired);
        console.log("Balance Before: ", address(stablecoinConduit).balance);

        StableCoinMessage memory stablecoinMsg = StableCoinMessage({value: additionalRequired, sender: alice.addr});
        bytes memory encodedStablecoinMsg = abi.encode(stablecoinMsg);

        bytes memory data = abi.encode(
            ConduitMessage.initializeConduitMessage(
                address(alice.addr), address(stablecoinConduit), encodedStablecoinMsg
            )
        );

        NeuronMessage.Message memory message = NeuronMessage.Message({
            sender: address(alice.addr),
            recipient: address(stablecoinConduit),
            receiver: NeuronMessage.Receiver.Synapse,
            data: data
        });
        aliceNeuron.sendMessage{value: additionalRequired}(message);

        console.log("Balance After: ", address(stablecoinConduit).balance);

        console.log("Stability Factor: ", stablecoinConduit.getStabilityFactor());
        vm.stopBroadcast();
    }
}
