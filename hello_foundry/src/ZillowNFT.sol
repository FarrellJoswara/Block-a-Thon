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

    mapping(uint256 => bool) public forSale; 


    constructor() ERC721("ZillowNFT", "ZNFT") {}

    function mintNFT(address recipient, string memory metadataURI, string memory tokenName, string memory tokenLabel, string memory homeLocation, uint256 homePrice)
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

        emit MintHouse(newItemId, recipient, metadataURI, homeLocation, homePrice, true);

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

    function setPrice(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Only owner can set the price");
        _homePrice[tokenId] = price;

        emit PriceChanged(tokenId, price);
    }

    function getPrice(uint256 tokenId) public view returns (uint256){
        return _homePrice[tokenId];
    }

    function setSaleStatus(uint256 tokenId) public view returns (uint256){
        return forSale[tokenId];
    }

    function setSaleStatus(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Only owner can list/unlist the house");
        forSale[tokenId] = price;

        emit PriceChanged(tokenId, price);
    }

    function buyHouse(uint256 tokenId) public payable {
        uint256 price = _homePrice[tokenId];
        address owner = ownerOf(tokenId);
        address buyer = msg.sender;
        require(price > 0, "Home not for sale.");
        require(forSale[tokenId], "House is not listed for sale.");
        require(msg.value==price, "Not correct amount.");
        require(owner!=buyer, "You already own this house, period.");
        //transfer payment to seller
        payable(owner).transfer(msg.value);
        //transfer the NFT from owner to buyer
        _transfer(owner, buyer, tokenId);
        forSale[tokenId] = false;

        emit HomePurchased(tokenId, buyer, price);
    }

    //events
    event HomePurchased(uint256 tokenId, address buyer, uint256 price);
    event PriceChanged(uint256 tokenId, uint256 price);
    event MintHouse(uint256 tokenId, address owner, string metadataURI, string homeLocation, uint256 homePrice, bool forSale);


}