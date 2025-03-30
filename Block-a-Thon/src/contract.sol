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
    mapping(uint256 => string) private _homeLocation; // include the location
    mapping(uint256 => uint256) private _homePrice; // include the price
    mapping(uint256 => bool) public forSale; // status of home

    constructor() ERC721("ZillowNFT", "ZNFT") {}

    function mintNFT(address recipient, string memory metadataURI, string memory tokenName, string memory tokenLabel, string homeLocation, uint256 homePrice, bool forSale)
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
        forSale[newItemId] = true;

        return newItemId;
    }

    function totalSupply() public view returns (uint256) { // how many NFTs have been created
        return _tokenIds.current();
    }

 
    function getTokenName(uint256 tokenId) public view returns (string memory) { // names for properties (ex: Luxury Mansion, Modern Loft)
    address owner = ownerOf(tokenId); 
    if (owner == address(0)) {
        revert("ERC721: Query for nonexistent token");
    }
    return _tokenNames[tokenId];
}

    function getTokenLabel(uint256 tokenId) public view returns (string memory) { // extra descriptor for token name
         address owner = ownerOf(tokenId); 
        if (owner == address(0)) {
        revert("ERC721: Query for nonexistent token");
    }
        return _tokenLabels[tokenId];
    }

    function setPrice(uint256 tokenId, uint256 price) public returns (string memory) {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can set the price");
        _homePrice[tokenId] = price;
        emit priceChanged(tokenId, price);
    }

    function buyHouse(uint256 tokenId) public payable {
        uint256 price = _homePrice[tokenId];
        address owner = ownerOf(tokenId);
        address buyer = msg.sender;
        require(price > 0, "Home not for sale."); 
        require(forSale[tokenId], "House is not listed for sale.");
        require(msg.value == price, "Not the correct amount!");

        payable(owner).transfer(msg.value); // makes owner address payable, transfer payment to contract to seller
        _transfer(owner, buyer, tokenId); // transfer NFT to seller (from, to, house)
        forSale[tokenId] = false;
        emit homePurchased(tokenId, buyer, price);
    }
    event homePurchased(uint256 tokenId, address buyer, uint256 price);
    event priceChanged(uint256 tokenId, uint256 price);
}