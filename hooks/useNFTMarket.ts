import axios from 'axios';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Web3Modal from 'web3modal';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import {
  getListedItems,
  getMarketItems,
  getPurchasedItems
} from '../store/marketplace/actions';

export default function useNFTMarket() {
  const dispatch = useDispatch();
  const router = useRouter();

  async function listItemOnMarketplace(tokenId: string, sellingPrice: string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      // @ts-ignore
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFT.abi,
      signer
    );

    const data = await contract.removeMintedNFTOnSale(tokenId);

    console.log(data);

    const thePrice = ethers.utils.parseUnits(sellingPrice, 'ether');

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string,
      Market.abi,
      signer
    );
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    let transaction = await contract.createMarketItem(
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      tokenId,
      thePrice,
      { value: listingPrice }
    );
    await transaction.wait();
    router.push('/garage');
    fetchMarketItems();
  }

  async function buyItem(nft: any, address: string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      NFT.abi,
      provider
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      nft.itemId,
      {
        value: price
      }
    );
    await transaction.wait();

    const tokenUri = await tokenContract.tokenURI(nft.itemId);
    const meta = await axios.get(tokenUri);
    let points = meta.data.points;
    const authData = await fetch(
      `/api/sale?address=${address}&points=${points}`
    );
    const user = await authData.json();
    console.log(user);
    // @ts-ignore
    dispatch(getUserSuccess(user.user));

    router.push('/garage');
    fetchMarketItems();
  }

  async function fetchMarketItems() {
    const provider = new ethers.providers.JsonRpcProvider();

    const tokenContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      NFT.abi,
      provider
    );
    const marketContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          itemId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          name: `${meta.data.name} #${i.tokenId}`,
          points: meta.data.points
        };
        return item;
      })
    );

    dispatch(getMarketItems(items));
  }

  async function fetchMyItems() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      NFT.abi,
      provider
    );
    const purchasedNFTsData = await marketContract.fetchMyNFTs();
    const listedNFTsData = await marketContract.fetchItemsCreated();

    const purchasedNFTItems = await Promise.all(
      purchasedNFTsData.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          itemId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          name: `${meta.data.name} #${i.tokenId}`,
          points: meta.data.points
        };
        return item;
      })
    );

    const listedNFTItems = await Promise.all(
      listedNFTsData.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          itemId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          name: `${meta.data.name} #${i.tokenId}`,
          points: meta.data.points
        };
        return item;
      })
    );

    dispatch(getPurchasedItems(purchasedNFTItems));
    dispatch(getListedItems(listedNFTItems.filter((i: any) => !i.sold)));
  }

  return {
    listItemOnMarketplace,
    fetchMarketItems,
    buyItem,
    fetchMyItems
  };
}
