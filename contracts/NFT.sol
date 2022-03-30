// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address contractAddress;

  mapping(address => uint256[]) private itemIdToTokenItem;

  constructor(address marketplaceAddress) ERC721('Pit Stop NFTs', 'PTSTP') {
    contractAddress = marketplaceAddress;
  }

  function createToken(string memory tokenURI) public returns (uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    itemIdToTokenItem[msg.sender].push(newItemId);

    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    setApprovalForAll(contractAddress, true);
    return newItemId;
  }

  function updateTokenURI(uint256 tokenId, string memory tokenURI)
    public
    returns (uint256)
  {
    _setTokenURI(tokenId, tokenURI);
    return tokenId;
  }

  function fetchNFTs() public view returns (uint256[] memory) {
    return itemIdToTokenItem[msg.sender];
  }
}
