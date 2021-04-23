#  To The Moon NFT

This repository maintains a secure, efficient and standards-compliant implementation of the ERC-1155 token standard for Ethereum.

The ERC-1155 token standard contains multiple classes of tokens referenced by IDs from non-fungible (max supply=1), to semi-fungible (supply=low), to highly fungible (supply=high). Standard interface discussion at ERC-1155.

## Description

The contracts in this repository follow a standard implementation of an (ERC-1155 contract. This standard provides basic functionality to track and transfer multiple tokens and the interface provide an API other contracts and off-chain third parties can use.

ERC-1155 contracts keep track of many token balances, which can lead to significant efficiency gains when batch transferring multiple token classes simultaneously. This is particularly useful for fungible tokens that are likely to be transfered together, such as gaming items (cards, weapons, parts of objects, minerals, etc.). The possible efficiency gains are more significant if the amount of tokens each address can own is capped, as shown in this implementation examples.

This repository contains two main implementations of the ERC-1155 token standards: ERC1155 and ERC155PackedBalance. The latter implementation packs multiple balances within a single uint256 using bitwise operations. This brings the cost of transferring 100 different token classes to 467,173 gas, an average of 4,671 gas per token type transfer. Still using MT, but without balance packing, transferring 100 different token types costs 2,763,399 gas, an average of 27,633 gas per token transfer. The latter is already an improvement over multiple fungible tokens that are stored on different contracts, since cross-contract calls have a base cost of 700 gas. This is ignoring the cost of initial approvals that would need to be set for each user and existing ERC-20 tokens.

## What to do next

If you're a beginner with smart contract you can

Follow this tutorials https://www.youtube.com/watch?v=xWFba_9QYmc&list=PLS5SEs8ZftgUNcUVXtn2KXiE1Ui9B5UrY

If you programmed before: try https://hardhat.org/tutorial/


## Build

- Configure the correct values in the .env file (check env-sample)

run

~~~~
npx hardhat compile
~~~~

it should compile without any errors


## Deploy

~~~~
npx hardhat run scripts/deploy.js --network rinkeby
~~~~

Change to Mainnet when you're ready

### License: MIT
