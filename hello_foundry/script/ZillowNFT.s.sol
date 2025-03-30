// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ZillowNFT} from "../src/ZillowNFT.sol";

contract CounterScript is Script {
    ZillowNFT public house;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        house = new ZillowNFT();

        vm.stopBroadcast();
    }
}
