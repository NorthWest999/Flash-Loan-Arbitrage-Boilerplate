// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/// @title Chainlink Price Consumer
/// @notice This contract fetches the latest price data from a Chainlink price feed.
contract ChainlinkPriceConsumer {
    AggregatorV3Interface internal priceFeed;

    /// @notice Constructor initializes the price feed address.
    /// @param _priceFeed The address of the Chainlink price feed.
    constructor(address _priceFeed) {
        require(_priceFeed != address(0), "Invalid price feed address");
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    /// @notice Fetches the latest price from the Chainlink price feed.
    /// @return price The latest price data.
    /// @return updatedAt The timestamp of the last price update.
    function getLatestPrice() public view returns (int price, uint updatedAt) {
        (
            ,
            price,
            ,
            updatedAt,
            
        ) = priceFeed.latestRoundData();

        require(price > 0, "Invalid price data");
        require(block.timestamp - updatedAt < 1 days, "Price data is outdated");

        return (price, updatedAt);
    }
}
