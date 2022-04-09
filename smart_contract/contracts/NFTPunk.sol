//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTPunk is ERC721, Ownable {
    uint256 public maxNFT; // defining maximum nft that can be deployed your nft collection
    uint256 public totalSuply; // How much nft is deployed and also tokenID
    uint256 public priceToMint; // Price to mint
    uint256 public maxNFTPerAccount; // NFT minting per account
    string internal baseTokenUri; // setting up base token uri
    mapping (address=>uint256) public walletsMint; // just check the how many mints has been done by a particular wallets
    event nftMinted(uint256 tokenId,address minter,string tokenURI); //Event to indicate nft is minted
    event setTokenUri(uint256 tokenId,string tokenUri); // Event will emit when token uri will be set up
    // nft structure
    struct NFTDetails{
        string uri;
        address owner;
        uint256 tokenId;
        uint256 timeStamp;
    }
    // storing nft details in an array of NFTDeatils structure
    NFTDetails[] NFTDetailsList;
    
    constructor (string name,string symbol) ERC721 (name,symbol){
        maxNFT=1000;
        totalSuply=0;
        priceToMint=0.01 ether;
        maxNFTPerAccount=2;
    }
    
    
    // Getting all NFTs that are minted by differnet account
    function getAllNFTDetails() returns(NFTDetails[] memory) {
        return NFTDetailsList;
        
    }
    


    // Getting all NFT
    function getTotalNUmberDeployedNFT() returns(uint256) {
        return totalSuply;
    }

    // minting the nft
    function mint(string memory tokenURI) public payable {
        require(msg.value == priceToMint , "Wrong mint value");
        require(totalSuply<=maxNFT,"Maximum NFT is minted");
        require(walletsMint[msg.sender] <= maxNFTPerAccount,"Limit exceed for this account");
        
        uint256 newTokenId=totalSuply;
        _safeMint(msg.sender,newTokenID);
        emit nftMinted(newTokenId, msg.sender, tokenURI);
        totalSuply=totalSuply+1;

        _setTokenURI(newTokenId, _tokenURI);
        emit setTokenUri(newTokenId, tokenURI);
        NFTDetailsList.push(NFTDetails(tokenURI,msg.sender,newTokenId,block.timeStamp));
    }
    

}

