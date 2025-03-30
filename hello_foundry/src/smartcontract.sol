// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ZillowNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to names and labels
    mapping(uint256 => string) private _tokenNames;
    mapping(uint256 => string) private _tokenLabels;
    // Mapping from token ID to location and price
    mapping(uint256 => string) private _homeLocation;
    mapping(uint256 => uint256) private _homePrice;


    constructor() ERC721("ZillowNFT", "ZNFT") {}

    function mintNFT(address recipient, string memory metadataURI, string memory tokenName, string memory tokenLabel, string homeLocation, uint256 homePrice)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);
        _tokenNames[newItemId] = tokenName;
        _tokenLabels[newItemId] = tokenLabel;
        _homeLocation[newItemId] = homeLocation;
        _homePrice[newItemId] = homePrice;

        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

 
    function getTokenName(uint256 tokenId) public view returns (string memory) {
    address owner = ownerOf(tokenId); 
    if (owner == address(0)) {
        revert("ERC721: Query for nonexistent token");
    }
    return _tokenNames[tokenId];
}


    function getTokenLabel(uint256 tokenId) public view returns (string memory) {
         address owner = ownerOf(tokenId); 
        if (owner == address(0)) {
        revert("ERC721: Query for nonexistent token");
    }
        return _tokenLabels[tokenId];
    }

    function setPrice(uint256 tokenId, uint256 price) public view returns (string memory){
        require(ownerOf(tokenid) == msg.sender, "Only owner can set the price");
        _homePrice[tokenId] = price;
    }

    function buyHouse(uint256 tokenId) public payable {
        unit256 price = _homePrice[tokenId];
        address owner = ownerOf(tokenId);
        require(price > 0, "Home not for sale.");
        require(msg.value==price, "Not correct amount.")
        //transfer the NFT from owner to buyer
        _transfer(address owner, msg.sender, tokenId);
        //transfer payment to seller
        payable(owner).transfer(msg.sender);
    }
}