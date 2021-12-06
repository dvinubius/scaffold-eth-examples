pragma solidity >=0.6.0 <0.7.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//learn more: https://docs.openzeppelin.com/contracts/3.x/erc721

import "./MetadataGenerator.sol";

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

contract YourCollectible is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("Nubs", "Nubs") {
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    mapping(uint256 => bytes3) public color;
    mapping(uint256 => uint256) public chubbiness;
    mapping(uint256 => string) public message;

    function mintItem(
        bytes3 _color,
        uint8 _chubbiness,
        string memory _message
    ) public returns (uint256) {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _mint(msg.sender, id);

        color[id] = _color;
        chubbiness[id] = _chubbiness;
        message[id] = _message;

        return id;
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        require(_exists(id), "not exist");
        return
            MetadataGenerator.tokenURI(
                ownerOf(id),
                id,
                color[id],
                chubbiness[id],
                message[id]
            );
    }
}
