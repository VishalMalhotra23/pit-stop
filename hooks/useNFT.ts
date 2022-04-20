import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { create as ipfsHttpClient } from 'ipfs-http-client';
//@ts-ignore
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
import teams from '../data/teams.json';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import { useDispatch } from 'react-redux';
import { getGarageItems } from '../store/garage/actions';
import { useRouter } from 'next/router';
import axios from 'axios';
import useNFTMarket from './useNFTMarket';
import { bootLoadingFinished, bootLoadingStarted } from '../store/boot/actions';
import { useCallback } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';

export default function useNFT() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { fetchMarketItems, fetchMyItems } = useNFTMarket();

  const getWeb3Modal = useCallback(async () => {
    const web3Modal = new Web3Modal({
      // network: 'testnet',
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              80001: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
            }
          }
        }
      }
    });
    return web3Modal;
  }, []);

  async function uploadMetaDataToIPFS(teamKey: string) {
    const data = JSON.stringify({
      name: teams.find((t) => t.key === teamKey)?.name,
      image: `https://ipfs.infura.io/ipfs/${
        teams.find((t) => t.key === teamKey)?.livery
      }`,
      points: 0
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      console.log(url);
      return url;
    } catch (error) {
      console.log('Error uploading data: ', error);
    }
  }

  async function mintNFT(teamKey: string) {
    const url = await uploadMetaDataToIPFS(teamKey);

    const web3Modal = await getWeb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      NFT.abi,
      signer
    );
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    console.log(tx);

    router.push('/garage');
    dispatch(bootLoadingStarted());
    await fetchMintedNFTs();
    await fetchMarketItems();
    await fetchMyItems();
    dispatch(bootLoadingFinished());
  }

  async function fetchMintedNFTs() {
    const web3Modal = await getWeb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      NFT.abi,
      signer
    );

    const data = await contract.fetchNFTs();

    console.log(data);

    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await contract.tokenURI(i);
        const meta = await axios.get(tokenUri);

        let item = {
          itemId: i.toNumber(),
          image: meta.data.image,
          name: `${meta.data.name} #${i}`,
          points: meta.data.points
        };
        return item;
      })
    );

    dispatch(getGarageItems(items));
  }

  async function updateNFTPoints(itemId: number, newPoints: number) {
    const web3Modal = await getWeb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      NFT.abi,
      signer
    );

    const tokenUri = await contract.tokenURI(itemId);
    const meta = await axios.get(tokenUri);
    const metaData = meta.data;
    const oldPoints = metaData.points;

    const totalPoints = oldPoints + newPoints;

    const data = JSON.stringify({
      name: metaData.name,
      image: metaData.image,
      points: totalPoints
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      console.log(url);
      await contract.updateTokenURI(itemId, url);
      router.push('/garage');
      dispatch(bootLoadingStarted());
      await fetchMintedNFTs();
      await fetchMarketItems();
      await fetchMyItems();
      dispatch(bootLoadingFinished());
    } catch (error) {
      console.log('Error uploading data: ', error);
    }
  }

  return {
    mintNFT,
    fetchMintedNFTs,
    updateNFTPoints
  };
}
