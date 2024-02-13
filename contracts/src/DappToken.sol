// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title DappToken
/// @dev This contract is for creating a custom ERC20 token.

contract DappToken is ERC20 {
    /// @notice Constructor to create DappToken
    /// @dev Calls ERC20 constructor with name and symbol, mints initial supply to deployer.
    /// @dev Mint 1 million tokens at deployment to msg.sender
    constructor() public ERC20("Dapp Token", "DAPP") {
        _mint(msg.sender, 1000000000000000000000000);
    }
}
