// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract MockV3Aggregator is AggregatorV3Interface {
    int256 private s_price;

    uint8 public override decimals;
    string public override description;
    uint256 public override version = 1;

    constructor(uint8 _decimals, int256 _initialAnswer) {
        decimals = _decimals;
        s_price = _initialAnswer;
        description = "Mock Price Feed";
    }

    function latestRoundData()
        public
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (0, s_price, 0, 0, 0);
    }

    function getRoundData(uint80) external view override returns (
        uint80, int256, uint256, uint256, uint80
    ) {
        return (0, s_price, 0, 0, 0);
    }
}
