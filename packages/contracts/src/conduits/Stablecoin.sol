// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ConduitBase} from "../common/ConduitBase.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

import {MockPriceFeed} from "../mocks/MockPriceFeed.sol";

import {Test, console2 as console, Vm} from "forge-std/Test.sol";

struct StableCoinMessage {
    address sender;
    uint256 value;
}

contract Stablecoin is ConduitBase, ERC20, ERC20Permit {
    MockPriceFeed public mockPriceFeed;

    error InsufficientValueSent();

    event PriceStability(uint256 newStabilityFactor, uint256 value);

    constructor(address _synapse, address _mockPriceFeed)
        ConduitBase(_synapse)
        ERC20("Synapse", "SYN")
        ERC20Permit("Synapse")
    {
        mockPriceFeed = MockPriceFeed(_mockPriceFeed);
    }

    function getTokensForEther(uint256 _ether) public view returns (uint256) {
        return (mockPriceFeed.getCurrentPrice() * _ether) / 10 ** 6;
    }

    function execute(bytes memory data) public payable {
        StableCoinMessage memory message = abi.decode(data, (StableCoinMessage));
        if (message.value >= msg.value) {
            emit PriceStability(getStabilityFactor(), msg.value);
        } else {
            revert InsufficientValueSent();
        }
    }

    function getContractValue() public view returns (uint256) {
        return address(this).balance;
    }

    function getStabilityFactor() public view returns (uint256) {
        uint256 _totalSupply = totalSupply();

        if (_totalSupply == 0) {
            return 0;
        }
        // Current Value / Tokens Minted (Round to 6 decimal places)
        return (getTokensForEther(getContractValue()) * 10 ** 6) / _totalSupply;
    }

    function additionalValueForStability() public view returns (uint256) {
        uint256 contractValue = getContractValue();
        uint256 tokensForEther = getTokensForEther(contractValue);
        uint256 totalTokensNeeded = (contractValue * totalSupply() / tokensForEther);
        return totalTokensNeeded - contractValue;
    }

    function getRewardAmount(uint256 sent) public view returns (uint256) {
        uint256 needed = additionalValueForStability();
        uint256 reward = (sent * 10 ** 6 / needed);
        return reward;
    }

    // Fall back function
    receive() external payable {}

    function mint() public payable {
        uint256 tokens = getTokensForEther(msg.value);
        _mint(msg.sender, tokens);
    }
}
