// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../lib/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title TokenFarm
 * @dev A contract for staking tokens to earn rewards. Users can stake ERC20 tokens in
 * the contract to earn rewards in the form of Dapp tokens. The contract allows for
 * staking multiple types of tokens, with each token having its own price feed to
 * calculate the value of the stake in terms of Dapp tokens.
 */

contract TokenFarm is Ownable {
    /**
     * @notice Tracks the amount of a specific token staked by a user.
     */
    // mapping token address -> staker address -> amount
    mapping(address => mapping(address => uint256)) public stakingBalance;

    /**
     * @notice Tracks the number of unique tokens each user has staked.
     */
    mapping(address => uint256) public uniqueTokensStaked;

    /**
     * @notice Maps a token to its corresponding price feed contract.
     */
    mapping(address => address) public tokenPriceFeedMapping;

    /**
     * @notice An array of all stakers.
     */
    address[] public stakers;

    /**
     * @notice An array of all the tokens that can be staked in this contract.
     */
    address[] public allowedTokens;

    /**
     * @notice The token distributed as a reward for staking.
     */
    IERC20 public dappToken;

    /**
     * @dev Sets the Dapp token used for rewards.
     * @param _dappTokenAddress The address of the Dapp token contract.
     */
    // 100 ETH 1:1 for every 1 ETH, we give 1 DappToken
    // 50 ETH and 50 DAI staked, and we want to give a reward of 1 DAPP / 1 DAI

    constructor(address _dappTokenAddress) public {
        dappToken = IERC20(_dappTokenAddress);
    }

    /**
     * @dev Allows the owner to set the price feed contract for a token.
     * @param _token The address of the token.
     * @param _priceFeed The address of the token's price feed contract.
     */
    function setPriceFeedContract(address _token, address _priceFeed) public onlyOwner {
        tokenPriceFeedMapping[_token] = _priceFeed;
    }

    /**
     * @dev Issues rewards to all stakers based on their total value staked.
     */
    function issueTokens() public onlyOwner {
        // Issue tokens to all stakers
        for (uint256 stakersIndex = 0; stakersIndex < stakers.length; stakersIndex++) {
            address recipient = stakers[stakersIndex];
            uint256 userTotalValue = getUserTotalValue(recipient);
            dappToken.transfer(recipient, userTotalValue);
        }
    }

    /**
     * @dev Calculates the total value staked by a user across all tokens.
     * @param _user The address of the user.
     * @return The total value staked by the user.
     */
    function getUserTotalValue(address _user) public view returns (uint256) {
        uint256 totalValue = 0;
        require(uniqueTokensStaked[_user] > 0, "No tokens staked!");
        for (
            uint256 allowedTokensIndex = 0;
            allowedTokensIndex < allowedTokens.length;
            allowedTokensIndex++
        ) {
            totalValue =
                totalValue +
                getUserSingleTokenValue(_user, allowedTokens[allowedTokensIndex]);
        }
        return totalValue;
    }

    /**
     * @dev Calculates the value staked by a user in a specific token.
     * @param _user The address of the user.
     * @param _token The address of the token.
     * @return The value staked by the user in the specified token.
     */
    function getUserSingleTokenValue(address _user, address _token) public view returns (uint256) {
        if (uniqueTokensStaked[_user] <= 0) {
            return 0;
        }
        // price of the token * stakingBalance[_token][user]
        (uint256 price, uint256 decimals) = getTokenValue(_token);
        return // 10000000000000000000 ETH
        // ETH/USD -> 10000000000
        // 10 * 100 = 1,000
        ((stakingBalance[_token][_user] * price) / (10 ** decimals));
    }

    /**
     * @dev Retrieves the current price and decimal precision of a token from its price feed.
     * @param _token The address of the token.
     * @return price The current price of the token.
     * @return decimals The decimal precision of the price.
     */
    function getTokenValue(address _token) public view returns (uint256, uint256) {
        // priceFeedAddress
        address priceFeedAddress = tokenPriceFeedMapping[_token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
        (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 decimals = uint256(priceFeed.decimals());
        return (uint256(price), decimals);
    }

    /**
     * @dev Allows users to stake tokens in the contract.
     * @param _amount The amount of tokens to stake.
     * @param _token The address of the token to stake.
     */
    function stakeTokens(uint256 _amount, address _token) public {
        require(_amount > 0, "Amount must be more than 0");
        require(tokenIsAllowed(_token), "Token is currently no allowed");
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        updateUniqueTokensStaked(msg.sender, _token);
        stakingBalance[_token][msg.sender] = stakingBalance[_token][msg.sender] + _amount;
        if (uniqueTokensStaked[msg.sender] == 1) {
            stakers.push(msg.sender);
        }
    }

    /**
     * @dev Allows users to unstake tokens and withdraw them from the contract.
     * @param _token The address of the token to unstake.
     */
    function unstakeTokens(address _token) public {
        uint256 balance = stakingBalance[_token][msg.sender];
        require(balance > 0, "Staking balance cannot be 0");
        IERC20(_token).transfer(msg.sender, balance);
        stakingBalance[_token][msg.sender] = 0;
        uniqueTokensStaked[msg.sender] = uniqueTokensStaked[msg.sender] - 1;
        // The code below fixes a problem not addressed in the video, where stakers could appear twice
        // in the stakers array, receiving twice the reward.
        if (uniqueTokensStaked[msg.sender] == 0) {
            for (uint256 stakersIndex = 0; stakersIndex < stakers.length; stakersIndex++) {
                if (stakers[stakersIndex] == msg.sender) {
                    stakers[stakersIndex] = stakers[stakers.length - 1];
                    stakers.pop();
                }
            }
        }
    }

    /**
     * @dev Updates the count of unique tokens staked by a user.
     * @param _user The address of the user.
     * @param _token The address of the staked token.
     */
    function updateUniqueTokensStaked(address _user, address _token) internal {
        if (stakingBalance[_token][_user] <= 0) {
            uniqueTokensStaked[_user] = uniqueTokensStaked[_user] + 1;
        }
    }

    /**
     * @dev Allows the owner to add a token to the list of allowed tokens for staking.
     * @param _token The address of the token to add.
     */
    function addAllowedTokens(address _token) public onlyOwner {
        allowedTokens.push(_token);
    }

    /**
     * @dev Checks if a token is allowed to be staked in the contract.
     * @param _token The address of the token to check.
     * @return True if the token is allowed, false otherwise.
     */
    function tokenIsAllowed(address _token) public view returns (bool) {
        for (
            uint256 allowedTokensIndex = 0;
            allowedTokensIndex < allowedTokens.length;
            allowedTokensIndex++
        ) {
            if (allowedTokens[allowedTokensIndex] == _token) {
                return true;
            }
        }
        return false;
    }
}
