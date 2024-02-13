// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "../lib/forge-std/src/Script.sol";
import {DappToken} from "../src/DappToken.sol";
import {TokenFarm} from "../src/TokenFarm.sol";

contract DeployDappToken is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy the DappToken and TokenFarm contract
        DappToken dappToken = new DappToken();
        TokenFarm tokenFarm = new TokenFarm(address(dappToken));

        vm.stopBroadcast();
    }
}
