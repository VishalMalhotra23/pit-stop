# Pit Stop

## The problem Pit Stop solves ❓
The world of fantasy sports is awesome. With Pit Stop, we made it even better by integrating fantasy F1 with web3. Players can create their own car garage in the metaverse, mint F1 cars as NFTs on the Polygon blockchain, and wager them on drivers from real life F1 Grand Prix. They can then compete with other players by scoring points on the basis of results of real life F1 races which will make their cars more valuable, and move their garage up on the global leaderboard. Players can also buy/sell/trade these cars among each other via our in-app marketplace, making their way to the top.

Pit Stop is currently deployed on the Polygon Mumbai Testnet for anyone to get started with test MATIC tokens!

## How it works 🚀
- Players start by building their own car garage in the metaverse, by minting F1 cars of different liveries as NFTs on the Polygon blockchain.
- These NFT cars have an initial points attribute equal to 0 (zero) and can be wagered on one driver during each real life F1 Grand Prix.
- After the race, each NFT is updated with the number of points scored by the driver in the Grand Prix.
- The more points a player racks up, the more valuable the NFT becomes, and the higher they move up the global leaderboard.
- Players can also buy and sell these NFT cars at any given time on the in-app marketplace, essentially trading some MATIC for points.

## What's next? 🎯
- We plan on rewarding top users on the leaderboard with our own crypto tokens ($CREW) so as to incentivize winnings even further.
- We also plan on upgrading our F1 car assets into 3D models.
- We look forward to deploy Pit Stop on the mainnet and have real-world F1 fans try it out in the coming weeks!

## Challenges we ran into ⚒️
- The initial problem we faced was implementing the concept of dynamic NFTs. Each car on Pit Stop is an NFT, the metadata for which is updated after every wager on real life races. We figured this out by leveraging the `_setTokenURI()` function on the ERC721 contract.
- Another major hurdle was figuring out the data storage and flow, and the distinction between on and off-chain user data. We got over this by using Firebase through Next.js API routes along with the contract ABIs.

## Tech Stack 💻
![image](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![image](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![image](https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black)
![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![image](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![image](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

## Try it out here📚

Get started - [Pit Stop](https://pit-stop.vercel.app/)

## Creators👥

This project was created for ETHernals 2022 hackathon by ETHIndia. Here are the contributors -

| [<img alt="AM1CODES" src="https://avatars.githubusercontent.com/u/52394145?v=4" width="115"><br><sub>Aayush Mishra</sub>](https://github.com/AM1CODES) | [<img alt="mizanxali" src="https://avatars.githubusercontent.com/u/59915742?v=4" width="115"><br><sub>Mizan Ali Panjwani</sub>](https://github.com/mizanxali) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: |
