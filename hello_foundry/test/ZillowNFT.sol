// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ZillowNFT} from "../src/ZillowNFT.sol";

contract CounterTest is Test {
    ZillowNFT public house;

    function test_setPrice() public {
        house = new ZillowNFT();
        
        uint256 token_id = house.mintNFT(
        0x70c8Af5E0D1B00B166421505a034f0BA7B31a73c,
        "hello",
        "potato",
        "my house",
        "olathe",
        2000000
        );

        house.setPrice(token_id,3000000);
        assertEq(house.getPrice(token_id), 3000000);
    }

}
