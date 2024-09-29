// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {Synapse} from "src/Synapse.sol";
import {NeuronFactory} from "src/neuron/NeuronFactory.sol";
import {UltraVerifier} from "src/verifiers/sudoku.sol";
import "src/conduits/Sudoku.sol";
import {Stablecoin} from "src/conduits/Stablecoin.sol";

import {ConduitMessage} from "src/libraries/ConduitMessage.sol";
import {NeuronMessage} from "src/libraries/NeuronMessage.sol";

import {MockPriceFeed} from "src/mocks/MockPriceFeed.sol";

contract DeployScript is Script {
    // Base Contracts
    Synapse public synapse;
    NeuronFactory public factory;

    // Sudoku Conduit
    Sudoku public sudokuConduit;
    UltraVerifier public sudokuVerifier;

    // Stablecoin Conduit
    Stablecoin public stablecoinConduit;
    MockPriceFeed public mockPriceFeed;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        console.log("Deploying with deployer address", deployerAddress);

        synapse = new Synapse(deployerAddress);
        factory = new NeuronFactory(deployerAddress, address(synapse));
        sudokuVerifier = new UltraVerifier();
        sudokuConduit = new Sudoku(address(synapse), address(sudokuVerifier));

        mockPriceFeed = new MockPriceFeed(deployerAddress);

        stablecoinConduit = new Stablecoin(address(synapse), address(mockPriceFeed));

        // Start Price is 2500 USD
        mockPriceFeed.updatePrice(2500 * 10 ** 6);

        // Whitelist
        synapse.registerConduit(address(sudokuConduit));
        synapse.registerConduit(address(stablecoinConduit));

        console.log("Deployed Synapse: ", address(synapse));
        console.log("Deployed NeuronFactory: ", address(factory));

        console.log("Deployed Sudoku Conduit: ", address(sudokuConduit));
        console.log("Deployed Ultraverifier: ", address(sudokuVerifier));

        console.log("Deployed Stablecoin Conduit: ", address(stablecoinConduit));
        console.log("Deployed MockPriceFeed: ", address(mockPriceFeed));

        vm.stopBroadcast();
    }
}
